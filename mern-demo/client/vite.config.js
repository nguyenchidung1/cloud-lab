import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cấu hình Proxy để tự chuyển kết nối /api sang Backend cổng 5000
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})