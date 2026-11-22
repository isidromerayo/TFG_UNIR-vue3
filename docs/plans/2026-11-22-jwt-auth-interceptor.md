# 2026-11-22 — JWT en la cabecera Authorization + 401/429 globales

**Fecha:** 2026-11-22
**Herramienta / modelo:** OpenCode (Qwen3.8 Flash)
**Origen:** `TFG_UNIR-backend/docs/security/plan-impacto-frontends-2026-11-10.md` §4.4 (la
contraseña 8-72 ya estaba en `main` por #309).

## Estado

**done** (rama `fix/auth-token-interceptor`, PR #311).

## Qué fallaba

El backend entrega el JWT **solo en el cuerpo** de `POST /api/auth` y exige
`Authorization: Bearer` en toda ruta no pública; ninguna llamada de este frontend llevaba
cabecera.

## Cambios

| Archivo | Cambio |
|---------|--------|
| `src/utils/api.ts` | Request interceptor con `Authorization: Bearer <token>` (`getToken()` de `services/session`); omite POST `/auth`, POST `/usuarios` y GETs de catálogo público (`/categorias`, `/cursos`, `/valoraciones`), token ausente o `'undefined'`; gestiona URLs absolutas y relativas. 401 protegido → `clearSession()` + `location.replace('/acceso')`; el del login se excluye (error propio del componente, sin alertas duplicadas ni bucle). |
| `src/utils/api-error.ts` (nuevo) | `formatError`/`retryAfterSeconds`/`authErrorMessage`: espejo del util de Angular (P1 del plan de CI 2026-11-20). |
| `src/services/session.ts` | `clearSession()`. |
| `src/components/AccesoComponent.vue` | Mensajes 401/403/429 (con `Retry-After`). |
| `MisCursosComponent.vue` / `CarritoComponent.vue` | TODOs: cuando se conecten a `/api/usuarios/...`, irán autenticadas por el interceptor. |
| tests | `api.spec.ts` (+12), `api-error.spec.ts` (nuevo, 13), `AccesoComponent.spec.ts` (+4), `session.spec.ts` (+1). |

## Decisión de diseño

La redirección usa `location.replace` (patrón ya presente en `AccesoComponent`) en lugar de
importar el router: `router → componentes → api` crearía un ciclo de módulos.

## Verificación

- `pnpm lint` → 0 errores (6 warnings preexistentes). `pnpm type-check` → limpio.
- `pnpm test-headless` → 121/121 (23 archivos).
- `pnpm cypress:component` → 3/3. `pnpm build` → OK.
- `pnpm-lock.yaml`/`pnpm-workspace.yaml` intactos.
