# Unificación del stack pa11y (ci 5 + reporter 9) + docs + job a11y.yml + retirada de advisories extract-zip

- **Fecha**: 2026-10-31
- **Herramienta/modelo**: OpenCode · Qwen3.8 Flash
- **Estado**: in progress

## Contexto

Dependabot abrió en este repo las PRs #258 (`pa11y-ci` 4.1.1→5.0.0) y #273
(`pa11y-ci-reporter-html` 8.1.1→9.0.0): dos mitades del mismo upgrade mayor (el
reporter 9 requiere `pa11y-ci` 5). Ninguna combinación mixna está cubierta por CI
(ningún workflow de PR ejecuta pa11y).

Extra específico de este repo: `docs/security/accepted-advisories.md` silenciaba
dos advisories de `extract-zip` cuya ruta pasaba por `pa11y-ci > puppeteer >
@puppeteer/browsers`. Con `pa11y-ci@5` (puppeteer 25 → `@puppeteer/browsers` 3.x)
`extract-zip` **desaparece del árbol** (verificado: `grep -c extract-zip
pnpm-lock.yaml` → 0), así que el silencio deja de aplicar y debe retirarse en la
misma PR (regla de advisories aceptados).

**Decisión del usuario**: cerrar las PRs de Dependabot y aplicar ambos bumps en una
sola rama propia, con la documentación de pa11y y el job `a11y.yml` incluidos.

## Objetivos

1. `pa11y@10` + `pa11y-ci@5` + `pa11y-ci-reporter-html@9` lockados y verificados con `pnpm a11y` real.
2. Retirar los 2 advisories aceptados de `extract-zip` del registro y del `ACCEPTED` del gate de `security.yml`.
3. Documentación: sección a11y en README, guía completa en `docs/accessibility.md`, política de upgrade en AGENTS.md.
4. Job `a11y.yml`: semanal + dispatch, backend + imagen de BD del proyecto en contenedor (PoC: BD sin datos semilla hasta publicar imagen poblada), artifact de informes, sin gate de merge.
5. Cerrar #258 y #273 referenciando esta PR.

## Cambios

| Archivo | Cambio |
|---|---|
| `package.json` + `pnpm-lock.yaml` | `pnpm up 'pa11y-ci@^5.0.0' 'pa11y-ci-reporter-html@^9.0.0'` |
| `docs/security/accepted-advisories.md` | Registro a 0 advisories + historial de retirada 2026-10-31 |
| `.github/workflows/security.yml` | `ACCEPTED=""` en el gate prod y en el dev-warning (ya no hay extract-zip) |
| `.github/workflows/a11y.yml` | Nuevo: schedule lunes 03:00 UTC + `workflow_dispatch`; imagen `isidromerayo/postgres-tfg:1.1` (BD vacía — PoC) + backend `isidromerayo/spring-backend-tfg:0.7.1` (host network), `pnpm dev`, `pnpm a11y` con `continue-on-error`, resumen `jq` en Step Summary, artifact `a11y-reports` 14 días. Actions pinneadas por SHA de 40 chars |
| `README.md` | Sección ♿ a11y + enlace en Documentación |
| `AGENTS.md` | Stack pa11y unificado, caveat `supports`, política de upgrade con re-check de advisories |
| `docs/accessibility.md` | Nuevo: referencia completa |

## Decisiones de diseño

- Un solo PR: evita el conflicto de lockfile entre #258 y #273 y deja el repo en el
  estado final coherente (5+9).
- Seed **no** vendorizado (revisado el mismo día): el job arranca la imagen `postgres-tfg`
  con BD vacía — **PoC** a la espera de publicar una imagen de BD que se pueble en su propia
  creación; entonces el job audita con datos reales sin más cambios. El audit completo con
  datos se verificó localmente (podman-pod + `recursos/db`, 8/8).
- Retirada de los silencios de `extract-zip` **en esta misma PR** (regla: el silencio
  se quita cuando deja de aplicar, en la iteración que lo provoca).
- `a11y.yml` informativo: el job solo falla si la infra o el toolchain fallan, no por
  hallazgos WCAG.

## Verificación realizada

- `pnpm install --frozen-lockfile` ✅; `extract-zip`: 0 ocurrencias en el lock ✅.
- `pnpm audit --prod` → 0 vulnerabilidades ✅; audit completo: 9 dev-only preexistentes
  (qs/glob/minimatch/systeminformation, warning-only en el gate, ajenas al árbol pa11y).
- `./scripts/check-accepted-advisories.sh` → 0 advisories, pasa ✅.
- `pnpm a11y` real (pa11y-ci 5 + reporter 9) contra dev server :5173 + backend :8080
  con seed: **8/8 URLs, 0 errores** ✅.
- `pnpm lint` → 0 errores (8 warnings esperados) ✅; `pnpm type-check` ✅;
  `pnpm test-headless` → 20 files / 70 tests ✅; `pnpm cypress:component` ✅; `pnpm build` ✅.
- `a11y.yml` y `security.yml`: YAML parseados; `jq` del resumen probado contra `report.json` real.

## Pendiente al cerrar

- [ ] Primera corrida `workflow_dispatch` de `a11y.yml` tras el merge.
- [ ] Cerrar PRs #258 y #273 con referencia a esta PR.
- [ ] Actualizar submodule `vue3/` del monorepo.
