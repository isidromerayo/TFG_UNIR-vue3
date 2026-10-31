# 2026-10-31 — Revisión de axios en Vue3 (instancia compartida + bump 1.21.0)

**Fecha:** 2026-10-31
**Herramienta / modelo:** OpenCode (GLM-5.3-Flash)

## Objetivo

1. Subir axios de `1.20.0` a `1.21.0` (última publicada, 23-oct-2026) alineado con
   React (misma bump sincronizada; Angular elimina la dependencia: 0 usos).
2. Crear instancia HTTP compartida `src/utils/api.ts` (espejo de la de React con
   el retry ya corregido) y migrar los 10 componentes que usaban axios raw
   (14 llamadas) — sin timeout ni interceptors.
3. Corregir el bug de doble barra: `RegistroComponent` llamaba a
   `${API_URL}/usuarios` con `API_URL` terminado en `/` →
   `http://localhost:8080/api//usuarios`.

## Cambios

| Archivo | Cambio |
|---------|--------|
| `package.json` | `axios ^1.20.0` → `^1.21.0`; además se mueve de `devDependencies` a `dependencies` (coherencia con react/angular: es dependencia de runtime) |
| `pnpm-lock.yaml` | resuelto a 1.21.0 |
| `src/utils/api.ts` (**nuevo**) | Espejo del `api.ts` de React: baseURL `API_URL`, headers hal+json, timeout 30s, `validateStatus` 2xx+304, retry solo para métodos idempotentes (get/head/options) en fallos transitorios (red/429/5xx), interceptor de errores que preserva `response`/`status`/`code`. Sin logger (aún no existe `logger.ts` en este repo). |
| 10 `src/components/*.vue` | `axios.x` → `api.x` con rutas relativas al `baseURL` (p. ej. \`api.get('categorias/1')\`); imports de axios/API_URL sin uso eliminados; import muerto de axios en `MisCursosComponent` fuera |
| `tests/setup.ts` | **sin cambios**: el mock global ya contemplaba `create` + `interceptors` — la instancia compartida encaja en el mock existente |
| 9 `tests/unit/componentes/*.spec.ts` | Se eliminan los mocks locales de axios (5 bare + 3 factory incompletos sin `create` que habrían roto la carga de `utils/api.ts`) → rige el mock global de `setup.ts`; aserciones de URL ajustadas a rutas relativas |
| `README.md` | HTTP Client: Axios 1.21.0 + mención de la instancia compartida (política de docs: versiones coherentes) |

## Silencios / overrides

- axios no aparece en `pnpm-workspace.yaml` `overrides` ni en el registro de
  advisories aceptados; las 30 overrides existentes sobreviven al re-lock.
- `pnpm security:accepted` → 0 advisories aceptados en este repo.

## Verificación

- `pnpm install --frozen-lockfile` → OK tras el bump.
- `pnpm lint` → 0 errores (7 warnings unused-vars preexistentes; main tenía 9).
- `pnpm type-check` → OK (requirió import type-only por `verbatimModuleSyntax`).
- `pnpm test-headless` → 20/20 archivos, 70/70 tests.
- `pnpm cypress:component` → 3/3.
- `pnpm build` → OK.
- `pnpm audit` → sin vulnerabilidades.

## Decisiones de diseño

- Rutas relativas al `baseURL` en vez de URLs absolutas plantilla: coherente con
  el patrón de `mis-cursos.tsx` en React y elimina el bug de doble slash.
- `tests/setup.ts` se mantiene como única fuente del mock de axios (los specs
  duplicaban el mock y varios con shape incompleto).
- Breaking change de axios 1.21.0 (header defaults) no afecta: la instancia usa
  un plain object literal.
- Nota AGENTS: "axios version is aligned across all frontend applications" — el
  bump se aplicó sincronizado (React ^1.21.0 en el PR hermano; Angular elimina;
  no es un update unilateral).

## Estado

- **Planned** → ejecutado y verificado en la iteración 2026-10-31.
- PR: `refactor/shared-axios-instance` (branch) → PR a `main`.
