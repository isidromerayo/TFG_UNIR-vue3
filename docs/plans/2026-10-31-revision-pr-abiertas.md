# Plan: Revisión de PR abiertas — cierre de PR obsoletas y bumps manuales (vue3)

- **Fecha**: 2026-10-31
- **Herramienta/modelo**: opencode (opencode-go/minimax-m3.1-flash)
- **Estado**: done

## Objetivo

Revisar las PR abiertas del repo (vue3) y dejar la lista vacía sin fusionar nada que no deba
fusionarse. Resultado: 3 PR abiertas → 0 (una con los cambios aplicados a mano y dos cerradas por
obsoletas).

## Revisión

| PR | Autor | Estado | Veredicto |
|---|---|---|---|
| #275 · resolver advisories de Dependabot | propia | CONFLICTING, sin CI | **Superada** por la #282 (`fix(security): resolver los 5 advisories de la issue #237`, ya mergeada). Además su diff **reintroduce el silencio de `extract-zip`** (`ACCEPTED="extract-zip"` en `security.yml` + entradas en `docs/security/accepted-advisories.md`) que `main` ya retiró, y **baja el override de `follow-redirects` de `>=1.16.2` a `>=1.16.1`** → dejaría el árbol por debajo del fix del advisory |
| #272 · `jsdom` 27.4.0 → 30.1.3 (+ `@types/jsdom` 27 → 30) | dependabot | CONFLICTING, checks verdes | **No fusionar**: 3 majors con la rama desfasada respecto a `main` (en conflicto). Se aplica a mano |
| #271 · `npm-run-all2` 8.0.4 → 9.0.4 | dependabot | CONFLICTING, checks verdes | **No fusionar**: `npm-run-all2` no aparece en ningún script ni workflow, solo en `package.json`. La v9 además exige Node `^22.22.2` |

Causa raíz común: las PR de Dependabot arrastran lockfiles generados sobre bases antiguas, que es el
gotcha documentado en `AGENTS.md`: **los bumps se aplican a mano sobre `main`** y después se cierra
la PR del bot.

## Cambios (rama `chore/deps-refresh-jsdom-remove-runall`)

- `pnpm remove npm-run-all2` → desaparece de `devDependencies` y del lockfile.
- `pnpm up jsdom@30.1.3 @types/jsdom@30.0.0` → tres majors de jsdom (27 → 30). Requisitos de la
  versión: Node `^22.22.2 || ^24.15.0 || >=26` (CI usa `22.x`; local 22.23.2) y Vitest 5 lo acepta
  como *peer* opcional (`peerDependencies.jsdom: "*"`).
- El entorno de pruebas de Vitest es `jsdom` (`vite.config.ts` y `vitest.config.ts`), así que el
  bump queda validado por la suite unitaria completa.

## Verificación

| Comprobación | Resultado |
|---|---|
| `pnpm install --frozen-lockfile` | ✅ «Already up to date» |
| `follow-redirects` resuelto | ✅ **1.16.2** (y el pin de `pnpm-workspace.yaml` sigue en `>=1.16.2`) |
| Overrides | ✅ los 21 de `pnpm-workspace.yaml` intactos |
| `pnpm lint` | ✅ 0 errores (7 warnings preexistentes) |
| `pnpm type-check` | ✅ `vue-tsc --build` sin errores |
| `pnpm test-headless` | ✅ 21 ficheros / 84 tests con `environment: jsdom` |
| `pnpm cypress:component` | ✅ 3/3 |
| `pnpm build` | ✅ |

## PR cerradas

- **#271** → dependencia no usada, eliminada del árbol.
- **#272** → el bump se aplicó a mano sobre `main` (la rama estaba en conflicto y con base desfasada).
- **#275** → superada por la #282; además reintroducía el silencio de `extract-zip` y bajaba el
  override de `follow-redirects` a `>=1.16.1`.
