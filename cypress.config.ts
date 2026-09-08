import { defineConfig } from 'cypress'
import codeCoverageTask from '@cypress/code-coverage/task'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    setupNodeEvents(on, config) {
      // Always setup code coverage task
      codeCoverageTask(on, config)
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
      codeCoverageTask(on, config)
      return config
    },
    env: {
      // Pass coverage flag to tests
      coverage: process.env.CYPRESS_COVERAGE === 'true'
    }
  },
})
