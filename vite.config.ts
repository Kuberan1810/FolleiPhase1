import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    // Forward API and Call Lab WebSocket traffic to the FastAPI backend so the
    // browser stays same-origin (no CORS, and cookies/auth headers just work).
    // ws:true is required — Call Lab talks over /api/.../call-lab/ws.
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: false,
        ws: true,
      },
    },
  },
})