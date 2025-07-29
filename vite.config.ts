import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

const peerDependencies = Object.keys(pkg.peerDependencies || {})

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // Development configuration
    return {
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      server: {
        port: 3000,
      },
      define: {
        // Definir variables globales para evitar errores de process
        'process.env': {},
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.env.npm_package_name': JSON.stringify(pkg.name),
        'import.meta.env.VITE_CORE_DEVELOPMENT': JSON.stringify('true'),
        'import.meta.env.VITE_PACKAGE_NAME': JSON.stringify(pkg.name),
        'import.meta.env.VITE_IS_CORE_PROJECT': JSON.stringify('true'),
      }
    }
  } else {
    // Build configuration (library)
    return {
      plugins: [
        react(),
        dts({
          insertTypesEntry: true,
          exclude: ['**/*.test.tsx', '**/*.spec.ts', 'test/**'],
        }),
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      define: {
        // Definir variables globales para producción
        'process.env': {},
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.npm_package_name': JSON.stringify(pkg.name),
        'import.meta.env.VITE_CORE_DEVELOPMENT': JSON.stringify('true'),
        'import.meta.env.VITE_PACKAGE_NAME': JSON.stringify(pkg.name),
        'import.meta.env.VITE_IS_CORE_PROJECT': JSON.stringify('true'),
      },
      build: {
        target: 'esnext',
        outDir: 'dist',
        lib: {
          entry: path.resolve(__dirname, 'src/core/index.ts'),
          name: '@consalud/core',
          formats: ['es', 'cjs'],
          fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
        },
        rollupOptions: {
          external: [...peerDependencies, 'react/jsx-runtime'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react-router-dom': 'ReactRouterDOM',
              'react/jsx-runtime': 'react/jsx-runtime',
              '@azure/msal-browser': 'msalBrowser',
              axios: 'axios',
              bulma: 'bulma',
            },
          },
        },
        sourcemap: true,
        cssCodeSplit: false, // Cambiar a false para incluir todos los estilos en un solo archivo
      },
    }
  }
})