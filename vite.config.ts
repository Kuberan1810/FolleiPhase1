import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    // In dev, leave VITE_API_BASE_URL empty and let this proxy forward /api to
    // FastAPI. The browser then stays same-origin, so there is no CORS
    // preflight and the auth header survives without extra server config.
    // 127.0.0.1 rather than localhost: localhost resolves to ::1 first on
    // macOS, where uvicorn's default IPv4 bind is not listening.
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: false,
      },
    },
  },
})
