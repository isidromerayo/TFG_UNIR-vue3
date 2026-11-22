import type { AxiosError } from 'axios';

/** Cuerpo de error devuelto por la API (GlobalExceptionHandler del backend). */
export interface ApiError {
    message?: string;
    errors?: Record<string, string>;
}

/**
 * Mensaje legible a partir del cuerpo de error de la API. Prioriza los errores
 * de validación por campo (`errors.*`) sobre el mensaje genérico.
 */
export function formatError(err?: unknown): string {
    if (typeof err === 'string' && err.trim() !== '') {
        return err;
    }
    if (err && typeof err === 'object') {
        const apiError = err as ApiError;
        const fieldErrors = apiError.errors ? Object.values(apiError.errors) : [];
        if (fieldErrors.length > 0) {
            return fieldErrors.join('. ');
        }
        if (apiError.message) {
            return apiError.message;
        }
    }
    return 'Error desconocido';
}

/**
 * Segundos que el backend pide esperar mediante la cabecera `Retry-After`
 * (límite de intentos de acceso). Devuelve 0 si no viene o no es un número.
 * Axios normaliza las cabeceras a minúsculas, pero se comprueban ambas formas.
 */
export function retryAfterSeconds(error: Pick<AxiosError, 'response'>): number {
    const headers = error.response?.headers as Record<string, unknown> | undefined;
    const raw = headers?.['retry-after'] ?? headers?.['Retry-After'];
    if (raw === undefined || raw === null || raw === '') {
        return 0;
    }
    const seconds = Number(raw);
    return Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
}

/**
 * Mensaje específico para fallos de acceso (login) según el estado HTTP:
 * 401 credenciales, 403 sin permiso (anti-enumeración del backend),
 * 429 límite de intentos con `Retry-After`. Sin respuesta del servidor
 * (error de red) se mantiene la redacción genérica de credenciales.
 */
export function authErrorMessage(error: unknown): string {
    const credentialsMessage = 'No se ha podido logear, revise usuario/contraseña';
    const response = (error as AxiosError | undefined)?.response;
    const status = response?.status;

    if (status === 401) {
        return credentialsMessage;
    }
    if (status === 403) {
        return 'No tiene permiso para realizar esta operación';
    }
    if (status === 429) {
        const espera = retryAfterSeconds(error as AxiosError);
        return espera > 0
            ? `Demasiados intentos seguidos, vuelva a intentarlo en ${espera} segundos`
            : 'Demasiados intentos seguidos, espere unos minutos y vuelva a intentarlo';
    }
    if (status !== undefined) {
        return `No se ha podido acceder: ${formatError(response?.data)}`;
    }
    return credentialsMessage;
}
