import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_URL } from './constants';
import { clearSession, getToken } from '../services/session';

interface ApiRetryConfig extends InternalAxiosRequestConfig {
    _retryCount?: number;
}

// Rutas públicas del contrato del backend: POST de login y alta de usuario.
const PUBLIC_POST_PATHS = new Set<string>(['auth', 'usuarios']);

// Catálogo de solo lectura que el backend sirve sin token.
const PUBLIC_CATALOG_GET = /^(categorias|cursos|valoraciones)([/?#]|$)/;

/**
 * Path de la petición relativo a API_URL ('' equivale a la raíz de la API);
 * `null` cuando la URL absoluta apunta a otro origen.
 */
function apiPath(config: Pick<InternalAxiosRequestConfig, 'url' | 'baseURL'>): string | null {
    const url = config.url ?? '';
    if (/^https?:\/\//i.test(url)) {
        if (!url.startsWith(API_URL)) {
            return null;
        }
        return url.slice(API_URL.length).replace(/^\/+/, '');
    }
    return url.replace(/^\/+/, '');
}

/** Rutas a las que NO se añade Authorization (login, alta y catálogo público). */
function esRutaPublica(method: string, path: string): boolean {
    const verb = method.toLowerCase();
    if (verb === 'post' && PUBLIC_POST_PATHS.has(path.split(/[?#]/)[0] ?? '')) {
        return true;
    }
    return verb === 'get' && PUBLIC_CATALOG_GET.test(path);
}

/**
 * 401 en rutas protegidas: la sesión caducó o es inválida, se limpia y se
 * lleva al usuario a /acceso. El POST de login se excluye porque el
 * component muestra su propio error de credenciales (sin alertas duplicadas
 * ni redirecciones en bucle). No se lanza alerta aquí: la navegación a
 * /acceso es la señal para el usuario.
 */
function handleUnauthorized(error: AxiosError): void {
    if (error.response?.status !== 401) {
        return;
    }
    const config = error.config;
    const path = config ? apiPath(config) : '';
    if (config
        && (config.method ?? 'get').toLowerCase() === 'post'
        && (path ?? '').split(/[?#]/)[0] === 'auth') {
        return;
    }
    clearSession();
    if (typeof window !== 'undefined' && window.location.pathname !== '/acceso') {
        window.location.replace('/acceso');
    }
}

// Custom retry configuration
const RETRY_CONFIG = {
    maxRetries: 3,
    retryDelay: 500
};

// Only idempotent methods are retried (never POST/PUT/PATCH/DELETE)
const RETRYABLE_METHODS = new Set<string>(['get', 'head', 'options']);

// A failure is transient when no response was received (network level),
// when the server answers 429 (throttling) or with a 5xx status
const isTransientError = (error: AxiosError): boolean => {
    if (error.code === 'ERR_CANCELED') {
        return false;
    }
    if (!error.response) {
        return true;
    }
    return error.response.status === 429 || error.response.status >= 500;
};

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': 'application/json, application/hal+json',
        'Content-Type': 'application/json'
    },
    withCredentials: false,
    timeout: 30000, // 30 seconds timeout
    validateStatus: (status) => {
        return status >= 200 && status < 300 || status === 304;
    }
});

// Añade Authorization: Bearer <token> a las rutas protegidas de la API.
// El token vive en localStorage (clave 'token', ver services/session.ts); no
// se envía en los POST públicos (login/alta) ni en el catálogo de lectura
// para evitar preflights CORS innecesarios.
api.interceptors.request.use((config) => {
    const token = getToken();
    if (!token || token === 'undefined') {
        return config;
    }
    const path = apiPath(config);
    if (path === null || esRutaPublica(config.method ?? 'get', path)) {
        return config;
    }
    const authorization = `Bearer ${token}`;
    if (typeof config.headers?.set === 'function') {
        config.headers.set('Authorization', authorization);
    } else if (config.headers) {
        (config.headers as Record<string, string>)['Authorization'] = authorization;
    }
    return config;
});

// Retry transient failures of idempotent requests with incremental backoff
api.interceptors.response.use(undefined, async (err: AxiosError) => {
    const { config } = err;
    if (!config) {
        throw new Error(err.message);
    }

    const retryCount = (config as ApiRetryConfig)._retryCount ?? 0;
    const canRetry = retryCount < RETRY_CONFIG.maxRetries
        && RETRYABLE_METHODS.has((config.method ?? '').toLowerCase())
        && isTransientError(err);

    if (!canRetry) {
        throw err;
    }

    (config as ApiRetryConfig)._retryCount = retryCount + 1;
    const delayMs = RETRY_CONFIG.retryDelay * (retryCount + 1);

    await new Promise(resolve => setTimeout(resolve, delayMs));
    return api(config);
});

// Add response interceptor for better error handling:
// enriches the error message but preserves the original error
// (response, status, code) so components can discriminate error kinds
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        handleUnauthorized(error);

        let errorMessage: string;

        if (error.response) {
            // Server responded with error status
            const data = error.response.data as { message?: string } | undefined;
            errorMessage = data?.message ?? 'Server Error';
        } else if (error.request) {
            // Request made but no response
            errorMessage = 'No se pudo conectar con el servidor. Por favor, verifique su conexión a internet.';
        } else {
            // Request setup error
            errorMessage = error.message;
        }

        // Keep message readable while preserving response/status/code
        error.message = errorMessage;
        return Promise.reject(error);
    }
);

export default api;
