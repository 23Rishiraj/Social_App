import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    //get rid of the course error
    proxy:{
      "/api":{
        target:"https://chatalyst-backend.onrender.com",
        changeOrigin:true,
        secure:false,
      }
    }
    build: {
    sourcemap: true // ✅ enable source maps for easier debugging in production
  }
  }
})
