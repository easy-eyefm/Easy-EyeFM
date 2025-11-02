import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
      }
    }
  },
  server: {
    host: '0.0.0.0',      // Listen on all interfaces
    port: 3000,            // Use port 3000
    allowedHosts: [         // Allowed host list
      's7.z100.vip'        // Permit this host
    ],
    proxy: {
      '/api': {
        target: 'http://s7.z100.vip:22937',
        changeOrigin: true
      }
    }
  }
})