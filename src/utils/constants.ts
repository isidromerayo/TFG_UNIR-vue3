// La URL se hornea en la build (Vite sustituye import.meta.env.PROD): la
// imagen publicada apunta al backend del homelab detras de Traefik/Cloudflare;
// el servidor de desarrollo local sigue usando el backend en :8080.
export const API_URL = import.meta.env.PROD
    ? 'https://tfg-api.estilolibre.eu/api/'
    : 'http://localhost:8080/api/';

export const USER = 'usuario';

export const TOKEN = 'token';