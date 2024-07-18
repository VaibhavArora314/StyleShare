import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: `/app`,
  plugins: [react()],
  server: {
    proxy: {
      '/config': {
        target: 'http://localhost:3001', 
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:3001', 
        changeOrigin: true,
      },
    },
  },
})
