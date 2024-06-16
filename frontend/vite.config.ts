import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/app`,
  plugins: [react()],
  define:{
    'process.env.VITE_KEY':JSON.stringify(process.env.VITE_KEY)
  }
})
