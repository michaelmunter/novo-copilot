/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    environmentOptions: { jsdom: { url: 'http://localhost/' } },
    setupFiles: ['./src/test-setup.ts'],
    // Uncomment if you want fake timers by default:
    // fakeTimers: { toFake: ['setTimeout', 'clearTimeout'] },
    css: true,
  },
})
