# AGENTS.md - Vue3 Project Guide

## Project

- **Stack**: Vue 3.5 + TypeScript 5.9 + Vite 7 + Pinia
- **Package Manager**: pnpm
- **Testing**: Vitest + Cypress

---

## Commands

### Development

```bash
pnpm dev          # Dev server (localhost:5173)
pnpm build        # Production build
pnpm preview      # Preview build
```

### Testing

````bash
pnpm test:unit              # Watch mode
pnpm test-headless          # Single run
pnpm test-headless-cc       # With coverage

# Run SINGLE test file
pnpm test-headless tests/unit/componentes/NombreComponent.spec.ts

# Run SINGLE test by name
pnpm test-headless -t "test name"

# Run ALL tests (Vitest + Cypress)
pnpm test:all              # Single run all tests
pnpm test:all:ci          # With coverage

# Cypress
pnpm cypress:component    # Component tests (headless)
pnpm cypress:open         # Interactive
pnpm cypress:e2e          # E2E tests

### Security

```bash
pnpm security             # Run security check script
pnpm security:audit       # npm audit
pnpm security:outdated    # Check outdated packages
````

### Quality

```bash
pnpm type-check    # TypeScript check
pnpm lint          # ESLint with autofix
pnpm format        # Prettier
```

---

## Code Style

### Vue Component Structure

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

defineProps<{ title: string }>()
const emit = defineEmits<{ (e: 'update', value: string): void }>()

const count = ref(0)
const double = computed(() => count.value * 2)

const increment = () => {
  count.value++
}

onMounted(() => {
  /* ... */
})
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Styles */
</style>
```

### Imports

- Use path alias: `@/` → `./src/`
- Order: external → internal → types

### Naming

- **Components**: `PascalCase` + `Component` suffix (e.g., `HeaderComponent.vue`)
- **Files TS**: `camelCase` (e.g., `sessionService.ts`)
- **Tests**: `kebab-case.spec.ts`
- **Variables/Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`

### TypeScript

- Type all props, emits, variables, functions
- Avoid `any` - use specific types or `unknown`
- Use interfaces for complex objects
- Strict mode enabled

### ESLint Rules

- `@typescript-eslint/no-unused-vars`: warn
- `@typescript-eslint/no-explicit-any`: off
- `vue/require-v-for-key`: error

---

## Mandatory Workflow

```bash
pnpm lint
pnpm type-check
pnpm test-headless && pnpm cypress:component
pnpm build
```

**Do NOT commit if these steps fail.**

---

## Best Practices

### Vue 3

- Use `<script setup lang="ts">`
- Type props with TypeScript
- Use `computed` for derived values
- `v-show` vs `v-if`: show for frequent visibility

### Error Handling

- Try/catch for async operations
- Display errors with SweetAlert2
- Type API errors

### Testing

- Mock external dependencies (axios, sweetalert2)
- Use `data-cy` attributes for Cypress selectors
- Test behavior, not implementation
