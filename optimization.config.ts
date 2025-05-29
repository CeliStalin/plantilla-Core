// Configuración para optimización de la biblioteca

export const libraryConfig = {
  // Dependencias que deben ser peer dependencies
  peerDependencies: [
    '@azure/msal-browser',
    'bulma', 
    'react',
    'react-dom',
    'react-router-dom'
  ],
  
  // Dependencias que pueden ser incluidas en el bundle
  bundledDependencies: [
    'axios'
  ],
  
  // Dependencias de desarrollo que no deben ir a producción
  devOnlyDependencies: [
    '@babel/*',
    '@rollup/*',
    '@testing-library/*',
    '@types/*',
    '@vitejs/*',
    'eslint*',
    'rollup*',
    'vite',
    'typescript',
    'jest*',
    'babel*'
  ],
  
  // Configuración de tree-shaking
  treeShaking: {
    // Marcar como sideEffect-free para mejor tree-shaking
    sideEffects: false,
    // Exportaciones que pueden ser eliminadas si no se usan
    purgeableExports: [
      'LazyComponents',
      'individual/*',
      'styles/animations'
    ]
  },
  
  // Configuración específica para Docker
  docker: {
    // Archivos a excluir del contexto de build
    excludeFromContext: [
      'node_modules',
      '.git',
      '*.md',
      '.env*',
      'coverage',
      '.nyc_output',
      'docs',
      'examples',
      'tests',
      '*.log'
    ],
    
    // Dependencias que NO deben estar en producción
    excludeFromProduction: [
      '@babel/*',
      '@rollup/*',
      '@testing-library/*',
      '@types/*',
      '@vitejs/*',
      'eslint*',
      'rollup*',
      'vite',
      'typescript',
      'jest*',
      'babel*',
      'storybook*',
      'chromatic'
    ]
  }
};
