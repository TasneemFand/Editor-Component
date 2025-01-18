import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // Polyfill global
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts', 
    globals: true,
  },
})
