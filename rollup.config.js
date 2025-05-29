import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import path from 'path';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
      entryFileNames: 'index.js',
      chunkFileNames: '[name]-[hash].js'
    },
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      entryFileNames: 'index.esm.js',
      chunkFileNames: '[name]-[hash].esm.js'
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      preferBuiltins: false
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    image(),
    typescript({ 
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      sourceMap: true,
      jsx: 'react-jsx',
      exclude: ['**/*.test.*', '**/*.stories.*', 'node_modules/**']
    }),
    postcss({
      extensions: ['.css'],
      minimize: true,
      extract: path.resolve('dist/styles.css'),
      sourceMap: true
    }),
  ],
  external: [
    'react', 
    'react-dom', 
    'react-router-dom', 
    '@azure/msal-browser', 
    'bulma', 
    'axios',
    /^react\/jsx-runtime$/,
    /^react\/jsx-dev-runtime$/,
  ],
  onwarn(warning, warn) {
    // Suprimir warnings específicos que no son críticos
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  }
}