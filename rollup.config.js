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
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    // El plugin de imagen convierte imágenes a base64
    image(),
    typescript({ 
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      sourceMap: true,
      jsx: 'react', 
    }),
    postcss({
      extensions: ['.css'],
      minimize: true,
      extract: path.resolve('dist/styles.css')
    }),
    // Eliminamos terser que está causando problemas
  ],
  external: [
    'react', 
    'react-dom', 
    'react-router-dom', 
    '@azure/msal-browser', 
    'bulma', 
    'axios',
    /^react\/jsx-runtime$/,
  ],
}