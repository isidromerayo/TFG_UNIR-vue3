# AGENTS.md

## Stack

Vue 3.5 + TypeScript 5.9 + Vite 7 + Pinia + pnpm. Single-package repo (workspace root is `.`).

## Commands

```bash
pnpm dev                # Vite dev server (localhost:5173)
pnpm build              # production build
pnpm preview            # preview production build (localhost:4173)
pnpm lint               # ESLint --fix; unused-vars warnings are expected
pnpm type-check         # vue-tsc --build (uses project references)
pnpm format             # prettier --write src/
pnpm a11y               # pa11y-ci audit (htmlcs+axe, WCAG2AA) — requires dev server on :5173
```

### Testing

```bash
pnpm test:unit          # Vitest watch mode
pnpm test-headless      # Vitest single run
pnpm test-headless-cc   # Vitest with coverage
pnpm test-headless tests/unit/componentes/HeaderComponent.spec.ts
pnpm test-headless -t "test name"

pnpm cypress:component           # headless component tests
pnpm cypress:component:coverage  # CYPRESS_COVERAGE=true + nyc report
pnpm cypress:open                # interactive
pnpm cypress:e2e                 # needs app running on http://localhost:4173

pnpm test:all           # unit + component (no coverage)
pnpm test:all:ci        # coverage variant
pnpm coverage:merge     # merge Vitest + Cypress lcov into coverage/merged
pnpm coverage:verify    # node scripts/verify-coverage.cjs
```

### Mandatory pre-commit order

```bash
pnpm lint && pnpm type-check && pnpm test-headless && pnpm cypress:component && pnpm build
```

## Project structure

- `src/main.ts` — app entry (creates Vue + router + Pinia).
- `src/router/`, `src/stores/`, `src/services/`, `src/components/`, `src/views/`, `src/types/`, `src/utils/`.
- `tests/unit/` — Vitest specs; `tests/setup.ts` — global mocks.
- `cypress/component/`, `cypress/e2e/` — Cypress tests.
- `scripts/` — `security-check.sh`, `verify-coverage.cjs`.

## Test setup quirks

- `tests/setup.ts` globally mocks **axios**, **vue-router** (`useRoute`/`useRouter`), and `localStorage`.
- `router-link` and `router-view` are globally stubbed.
- `vitest.config.ts` resolves `vue` to `vue/dist/vue.esm-bundler.js` for template compilation.
- Coverage thresholds (80% branches/functions/lines/statements) are in `vitest.config.ts`; Vitest uses v8, Cypress uses Istanbul/nyc — they are separate until merged with `coverage:merge`.
- `CYPRESS_COVERAGE=true` enables Istanbul instrumentation in `vite.config.ts`.

## Code conventions

- Components: `PascalCase` + `Component` suffix (e.g. `HeaderComponent.vue`).
- TS files: `camelCase` (e.g. `sessionService.ts`).
- Tests: `*.spec.ts` (Vitest), `*.cy.ts` (Cypress).
- Path alias: `@/` → `src/`.
- Imports order: external → internal → types.
- ESLint: `@typescript-eslint/no-unused-vars` = warn, `@typescript-eslint/no-explicit-any` = off, `vue/require-v-for-key` = error.
- `cypress.config.ts` is ESM (`"type": "module"`) — use `import`.

## pnpm & security
- **pa11y uses system Chrome**: `.pa11yci` points `chromeLaunchConfig.executablePath` at `/usr/bin/google-chrome-stable`. Reports land in `reports/a11y/` (gitignored). Requires dev server on :5173 and backend on :8080 for `/categorias`, `/categoria/:id`, `/curso/:id`. Full guide: `docs/accessibility.md`.
- **pa11y stack (unificado 2026-10-31 con angular y react)**: `pa11y@10` + `pa11y-ci@5` + `pa11y-ci-reporter-html@9`; engines exigen Node ≥ 22.13. Con `pa11y-ci@5` (puppeteer 25) `extract-zip` ya NO existe en el árbol — los advisories aceptados ligados a esa ruta se retiraron (2026-10-31). El reporter 9 requiere pa11y-ci 5 vía su propiedad `supports`, pero **pa11y-ci no la valida**: la única prueba de compatibilidad es ejecutar `pnpm a11y`. Ningún check de PR corre pa11y (`a11y.yml` es semanal/dispatch, informativo) — verde de CI ≠ a11y funcionando.
- **pa11y upgrade policy**: bump `pa11y-ci` and `pa11y-ci-reporter-html` in the same branch (never reporter-only past a pa11y-ci major), re-lock locally, verify `pnpm-workspace.yaml` overrides survive, run `pnpm a11y` (dev server + backend) AND `./scripts/check-accepted-advisories.sh` before merging — if an accepted advisory's route left the tree, remove its registry entry and the `ACCEPTED` silencing in `security.yml` in the same PR. Close Dependabot PRs for this tree and apply the bump manually.

- **pnpm >=11 ignores the `pnpm` field in `package.json`.** All pnpm settings, including `overrides`, live in `pnpm-workspace.yaml`.
- Transitive dependency pins for CVE fixes are in `pnpm-workspace.yaml` under `overrides`. `pnpm audit` must stay clean.
- **Advisories aceptados (sin parche upstream)**: un advisory sólo se acepta si no hay versión parcheada publicada, y debe quedar registrado en `docs/security/accepted-advisories.md`. Se revisan en cada iteración con `pnpm security:accepted` (paso *Accepted advisories recheck* de `security.yml`), que **falla** en cuanto OSV publique un fix: entonces toca subir la dependencia y retirar el silencio (`ACCEPTED` del gate / dismissal de Dependabot) en la misma PR.
- pnpm 12 blocks build scripts by default. `pnpm-workspace.yaml` already lists `allowBuilds` for `cypress` and `esbuild`. If postinstall still fails, run `pnpm approve-builds cypress esbuild && pnpm install`.
- CI uses **pnpm 10.x** and **Node 22.x**; both respect `pnpm-workspace.yaml` overrides/allowBuilds.
- **Dependabot strips overrides from the lockfile** (known bug). Fix any Dependabot branch with `pnpm install --lockfile-only` and push.
- `axios` version is aligned across all frontend applications — do not update it unilaterally in this repo.

```bash
pnpm security           # multi-tool audit script (pnpm audit, npm audit, outdated, optional snyk/osv)
pnpm security:accepted  # revisa los advisories aceptados (sin parche) contra OSV
pnpm security:audit     # pnpm audit
pnpm security:outdated  # pnpm outdated
```

## Branch & PR workflow

- Branch naming: `feat/<name>`, `fix/<name>`, `chore/<name>`, `security/<name>`.
- Always branch for features, fixes, refactors, and security changes.
- Direct push to `main` is allowed only for trivial doc/config edits or automated Dependabot patch bumps.
- A PR is required before merging any branch into `main`.
- Pre-commit order must pass on the branch before opening a PR.
- PR description must include summary of changes, affected areas, and testing steps performed.

## Documentation policy

- Every PR must review and update `README.md` and/or `AGENTS.md` if it affects dependencies, scripts, project structure, or toolchain.
- `README.md` versions must match `package.json` (project version, Node requirements, listed dependency versions).
- Do not open a PR with code changes and plan to update docs later.
