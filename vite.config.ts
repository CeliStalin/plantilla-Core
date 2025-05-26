import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: '.',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Create a chunk for MSAL
          if (id.includes('node_modules/@azure/msal-browser')) {
            return 'vendor-msal'
          }
          // Create a chunk for react and related libraries
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/') ||
            id.includes('node_modules/react-router/')
          ) {
            return 'vendor-react'
          }
          // Create a general vendor chunk for other node_modules
          // This helps in grouping other third-party libraries
          if (id.includes('node_modules')) {
            return 'vendor-others'
          }
        },
      },
    },
    chunkSizeWarningLimit: 600, // Optional: Adjust if you still see warnings after optimization
  },
})