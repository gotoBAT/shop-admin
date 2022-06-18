import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from './vite/alias'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  },
  server: {
    proxy: {
      '/api/admin': {
        target: 'https://shop.fed.lagounews.com',
        changeOrigin: true
      }
    }
  }
})
