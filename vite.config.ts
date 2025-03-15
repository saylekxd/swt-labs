import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240 // Compress assets larger than 10KB
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174, // Specify a consistent port
    strictPort: false, // Allow fallback to another port if 5174 is taken
    hmr: {
      clientPort: 5174, // Ensure WebSockets use the same port
      host: 'localhost',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('Proxy error:', err);
          });
        }
      }
    },
  },
})