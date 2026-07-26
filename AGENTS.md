# AGENTS.md

## Stack

Vue 3.5 + TypeScript 5.9 + Vite 7 + Pinia + pnpm. Single-package repo (not a real monorepo despite `pnpm-workspace.yaml`).

## Commands

```bash
pnpm dev                # Vite dev server (localhost:5173)
pnpm build              # Production build
pnpm lint               # ESLint autofix (run before type-check)
pnpm type-check         # vue-tsc --build
pnpm test:unit          # Vitest in watch mode
pnpm test-headless      # Vitest single run
pnpm test-headless-cc   # Vitest with coverage
pnpm cypress:component  # Cypress component tests (headless)
pnpm cypress:open       # Cypress interactive
pnpm cypress:e2e        # Cypress E2E (expects app on localhost:4173)
```

### Single test

```bash
pnpm test-headless tests/unit/componentes/HeaderComponent.spec.ts
pnpm test-headless -t "test name"
```

### Mandatory pre-commit order

```bash
pnpm lint && pnpm type-check && pnpm test-headless && pnpm cypress:component && pnpm build
```

## Project structure

```
src/
  main.ts              # Entry — creates app with router + Pinia
  App.vue
  router/index.ts      # Vue Router
  stores/              # Pinia stores
  services/            # API layer (axios)
  components/          # PascalCase + Component suffix
  views/               # Route-level views
  types/               # TypeScript types
  utils/
tests/
  setup.ts             # Global Vitest setup (mocks axios, vue-router, localStorage)
  unit/
    componentes/       # Component specs (bulk of tests)
    servicios/
    stores/
    router/
    views/
cypress/
  component/           # Cypress component tests (very few, prefer Vitest)
  e2e/
```

## Test setup quirks

- `tests/setup.ts` globally mocks **axios**, **vue-router** (useRoute/useRouter), and **localStorage** — tests don't need to set these up individually.
- `router-link` and `router-view` are globally stubbed.
- Vitest resolves `vue` to `vue/dist/vue.esm-bundler.js` for template compilation in tests.
- Coverage has **80% thresholds** (branches, functions, lines, statements) for SonarQube.
- Cypress coverage uses Istanbul/nyc; Vitest coverage uses v8 — they are separate systems.

## Code conventions

- **Components**: `PascalCase` + `Component` suffix (e.g., `HeaderComponent.vue`)
- **TS files**: `camelCase` (e.g., `sessionService.ts`)
- **Test files**: `*.spec.ts` (Vitest), `*.cy.ts` (Cypress)
- **Path alias**: `@/` → `src/`
- **Imports order**: external → internal → types
- **ESLint**: `no-unused-vars` = warn, `no-explicit-any` = off, `require-v-for-key` = error
- **Error display**: SweetAlert2
- **Form validation**: yup
- **HTTP client**: axios (via services layer)

## Documentation policy

- **Every PR** must review and update `README.md` and/or `AGENTS.md` if the change affects dependencies, scripts, project structure, or toolchain.
- `README.md` versions must match `package.json` (version, Node requirements, dependency versions).
- If a directory or config is added/removed, update the project structure section in both files.

## Branch & PR workflow

- **Always branch** for: new features, bug fixes, security/vulnerability fixes, refactorings.
- **Branch naming**: `feat/<name>`, `fix/<name>`, `chore/<name>`, `security/<name>`.
- **Direct to main** is allowed only for: trivial doc/config edits, automated dependabot patch bumps.
- **PR required** before merging any branch into `main`.
- **Pre-commit order** must pass on the branch before opening a PR.

## Gotchas

- Cypress E2E expects a running app on port 4173 (`pnpm preview`).
- Cypress component tests are minimal (1 file) — use Vitest for new unit/component tests.
- `CYPRESS_COVERAGE=true` enables Istanbul instrumentation in vite.config.ts — needed for Cypress coverage scripts.
- Prettier only formats `src/` (`pnpm format`).
