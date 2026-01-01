# Cypress Coverage Standardization - Vue3 Project

## Summary

Successfully implemented Cypress code coverage integration in the TFG_UNIR-vue3 project, following the same standardization as the React project.

## Implemented Changes

### 1. Configuration Files

#### `cypress.config.ts`
- Added component testing configuration
- Integrated `@cypress/code-coverage/task` for both E2E and component tests
- Added coverage environment variable support

#### `vite.config.ts`
- Added `vite-plugin-istanbul` for code instrumentation
- Configured Vitest coverage settings
- Added conditional Istanbul plugin loading based on `CYPRESS_COVERAGE` environment variable

#### `.nycrc.json`
- Created NYC configuration for Cypress coverage reporting
- Configured separate output directory (`coverage/cypress`)
- Added proper exclusions for test files and configurations

### 2. Support Files

#### `cypress/support/component.ts`
- Created component support file with Vue mounting commands
- Added code coverage support import
- Configured global Cypress commands

#### `cypress/support/component-index.html`
- Created HTML template for component testing
- Basic structure for Vue component mounting

### 3. Package Scripts

Updated `package.json` with standardized scripts:
- `cypress:component:coverage`: Run component tests with coverage and reporting
- `coverage:verify`: Verify coverage files and configuration using CommonJS script
- `test:all:ci`: Run all tests with coverage for CI environments

### 4. Dependencies

Added required dependencies:
- `vite-plugin-istanbul`: Vite plugin for Istanbul instrumentation
- All other coverage-related dependencies were already present

### 5. Verification Script

#### `scripts/verify-coverage.cjs`
- Created CommonJS verification script (compatible with ES modules project)
- Checks for all expected coverage files
- Validates configuration files
- Provides troubleshooting suggestions

### 6. Test Implementation

#### `cypress/component/HeaderComponent.cy.ts`
- Created sample component test for HeaderComponent
- Tests basic rendering, navigation, and accessibility
- Demonstrates working coverage instrumentation

## Results

### Coverage Files Generated
- ✅ `coverage/lcov.info` - Vitest coverage (13.25 KB, 29 files)
- ✅ `coverage/cypress/lcov.info` - Cypress coverage (1.88 KB, 3 files)
- ✅ `coverage/merged/lcov.info` - Merged coverage (9.90 KB, 29 files)

### Test Results
- **Vitest**: 41 tests passing (47.18% coverage)
- **Cypress Component**: 4 tests passing (63.26% coverage)
- **All tests**: ✅ Passing

### Coverage Metrics
- **Statements**: 63.26% (31/49) - Cypress only
- **Branches**: 55.17% (16/29) - Cypress only
- **Functions**: 45.45% (10/22) - Cypress only
- **Lines**: 65.11% (28/43) - Cypress only

## Standardization Achieved

The Vue3 project now follows the same structure and configuration as the React project:

1. **Same script naming conventions**
2. **Same coverage tools and plugins**
3. **Same directory structure for coverage reports**
4. **Same verification and debugging tools**
5. **Same CI/CD integration approach**

## Usage

### Run All Tests with Coverage
```bash
pnpm test:all:ci
```

### Run Individual Coverage Tests
```bash
# Vitest coverage
pnpm test:coverage

# Cypress component coverage
pnpm cypress:component:coverage

# Merge coverage reports
pnpm coverage:merge
```

### Verify Coverage Setup
```bash
pnpm coverage:verify
```

## Integration with SonarQube

The merged coverage report at `coverage/merged/lcov.info` is ready for SonarQube integration and quality gate analysis.

---

*Completed: January 2025*
*Standardization: ✅ Complete*