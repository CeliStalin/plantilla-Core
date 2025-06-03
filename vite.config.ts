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
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
  build: {
    // Configuración para biblioteca
    lib: {
      entry: 'src/index.ts',
      name: 'ConsaludCore',
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-router-dom',
        '@azure/msal-browser',
        'bulma',
        'axios',
      ],
      output: [
        // Configuración para ESM
        {
          format: 'es',
          exports: 'named',
          preserveModules: false,
          entryFileNames: '[name].js',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
            '@azure/msal-browser': 'msal',
            bulma: 'bulma',
            axios: 'axios',
          },
        },
        // Configuración para CommonJS
        {
          format: 'cjs',
          exports: 'named',
          preserveModules: false,
          entryFileNames: '[name].cjs',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
            '@azure/msal-browser': 'msal',
            bulma: 'bulma',
            axios: 'axios',
          },
        }
      ],
    },
    // Configuraciones que van dentro de build
    chunkSizeWarningLimit: 600,
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2020',
    // Configuración para TypeScript
    emptyOutDir: true,
    outDir: 'dist',
  },
  // Configuración de optimización de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    force: true,
  },
  // Configuración de esbuild - Remover jsxInject para evitar conflictos
  esbuild: {
    target: 'es2020',
    // Remover jsxInject ya que @vitejs/plugin-react lo maneja automáticamente
  },
  // Configuración adicional para desarrollo
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
})