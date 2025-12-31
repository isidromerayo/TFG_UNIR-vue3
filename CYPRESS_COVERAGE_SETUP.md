# Cypress Coverage Integration - Vue3 Project

## Overview

This document describes the Cypress code coverage integration implemented in the Vue3 project, following the same standardization as the React project.

## Configuration Files

### 1. Cypress Configuration (`cypress.config.ts`)

```typescript
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    setupNodeEvents(on, config) {
      // Always setup code coverage task
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) {
      // Always setup code coverage task
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
    env: {
      // Pass coverage flag to tests
      coverage: process.env.CYPRESS_COVERAGE === 'true'
    }
  },
})
```

### 2. Vite Configuration (`vite.config.ts`)

The Vite configuration includes:
- Istanbul instrumentation plugin for code coverage
- Vitest configuration for unit tests
- Source map generation for coverage tracking
- Proper exclusions for test files and configurations

### 3. Component Support (`cypress/support/component.ts`)

Includes:
- Cypress Vue mounting commands
- Code coverage support import
- Global configuration for component tests

## Package Scripts

### Coverage Scripts
- `cypress:component:coverage`: Run component tests with coverage
- `cypress:component:coverage:open`: Open component tests with coverage in interactive mode
- `cypress:e2e:coverage`: Run E2E tests with coverage
- `coverage:merge`: Merge Vitest and Cypress coverage reports
- `coverage:verify`: Verify coverage files and configuration

### Test Scripts
- `test:coverage`: Run Vitest with coverage
- `test:all`: Run all tests (Vitest + Cypress component)
- `test:all:ci`: Run all tests with coverage for CI

## Dependencies

### Required Dependencies
- `@cypress/code-coverage`: Cypress code coverage plugin
- `@cypress/vue`: Vue component testing support
- `vite-plugin-istanbul`: Vite plugin for Istanbul instrumentation
- `nyc`: Coverage reporting tool
- `lcov-result-merger`: Merge multiple LCOV reports

## Usage

### Running Tests with Coverage

1. **Unit Tests with Coverage**:
   ```bash
   pnpm test:coverage
   ```

2. **Component Tests with Coverage**:
   ```bash
   pnpm cypress:component:coverage
   ```

3. **All Tests with Coverage**:
   ```bash
   pnpm test:all:ci
   ```

4. **Merge Coverage Reports**:
   ```bash
   pnpm coverage:merge
   ```

### Verify Coverage Setup

```bash
pnpm coverage:verify
```

This script checks:
- Coverage files existence
- Configuration files
- Instrumentation setup
- File sizes and content

## Coverage Reports

Coverage reports are generated in the `coverage/` directory:
- `coverage/lcov.info`: Vitest coverage
- `coverage/cypress/lcov.info`: Cypress coverage  
- `coverage/merged/lcov.info`: Merged coverage
- `coverage/index.html`: HTML coverage report

## Environment Variables

- `CYPRESS_COVERAGE=true`: Enable coverage instrumentation
- `NODE_ENV=development`: Enable development mode instrumentation

## Integration with SonarQube

The merged coverage report (`coverage/merged/lcov.info`) can be used with SonarQube for quality gate analysis.

## Troubleshooting

### Common Issues

1. **No coverage data**: Ensure `CYPRESS_COVERAGE=true` is set
2. **Empty coverage files**: Check instrumentation configuration
3. **Missing dependencies**: Run `pnpm install`

### Debug Commands

```bash
# Check coverage files
pnpm coverage:verify

# Run with debug output
CYPRESS_COVERAGE=true DEBUG=cypress:* pnpm cypress:component:coverage
```

## Standardization

This setup follows the same structure and configuration as the React project to ensure consistency across the monorepo:

- Same script naming conventions
- Same coverage tools and plugins
- Same directory structure for coverage reports
- Same verification and debugging tools

---

*Last updated: January 2025*