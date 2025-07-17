import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-'),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': 'vue/dist/vue.esm-bundler.js',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    deps: {
      inline: ['@vue/test-utils', 'vue', 'vue-router', 'pinia'],
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      all: true,
      include: ['src/**/*.{ts,vue}'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/types.ts',
        'src/main.ts',
        'src/App.vue',
        'src/router/**',
        'src/stores/**',
        'src/assets/**',
        '**/__tests__/**',
      ],
    },
    // Configuración para soportar Vue Router
    testTimeout: 10000,
    // Configuración para mocks globales
    mockReset: true,
    clearMocks: true,
  },
});
