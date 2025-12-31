import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import istanbul from 'vite-plugin-istanbul'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // Add Istanbul instrumentation for coverage when CYPRESS_COVERAGE is enabled
    ...(process.env.CYPRESS_COVERAGE === 'true' ? [
      istanbul({
        include: 'src/*',
        exclude: [
          'node_modules',
          'cypress',
          'coverage',
          'dist',
          '**/*.config.{js,ts}',
          '**/*.d.ts',
          'src/main.ts',
          '**/*.test.{js,ts,vue}',
          '**/*.spec.{js,ts,vue}',
          '**/*.cy.{js,ts,vue}'
        ],
        extension: ['.js', '.ts', '.vue']
      })
    ] : [])
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    // Enable coverage instrumentation in development and test environments
    __COVERAGE__: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' || process.env.CYPRESS_COVERAGE === 'true'
  },
  build: {
    // Enable source maps for coverage
    sourcemap: process.env.CYPRESS_COVERAGE === 'true' || process.env.NODE_ENV === 'development'
  },
  // Vitest configuration
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      exclude: [
        'node_modules/',
        'cypress/',
        'coverage/',
        'dist/',
        '**/*.config.{js,ts}',
        '**/*.d.ts',
        'src/main.ts'
      ]
    }
  }
})
