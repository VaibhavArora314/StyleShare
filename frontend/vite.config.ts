import { defineConfig,} from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';


// https://vitejs.dev/config/
export default defineConfig({
  base: `/app`,
  plugins: [react()],
  define:{
    'process.env.VITE_KEY':JSON.stringify(process.env.VITE_KEY),
    'process.env.DOMAIN':JSON.stringify(process.env.DOMAIN),
    'process.env.PROJECT_ID':JSON.stringify(process.env.PROJECT_ID),
    'process.env.APP_ID':JSON.stringify(process.env.APP_ID)
  }
})
