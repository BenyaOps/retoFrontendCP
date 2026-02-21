import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // 1. Importar path

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/retoFrontendCP',
  resolve: {
    alias: {
      // 2. Definir el alias para que coincida con tu tsconfig
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    clearMocks: true,
  },
})
