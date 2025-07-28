/**
 * Configuración de build para excluir componentes de desarrollo en producción
 */

export const buildConfig = {
  // Componentes que solo deben incluirse en desarrollo
  developmentOnly: [
    'ComponentLibrary',
    'ComponentLibraryWrapper', 
    'DevelopmentNav'
  ],
  
  // Rutas que solo deben incluirse en desarrollo
  developmentRoutes: [
    '/library'
  ],
  
  // Archivos CSS que solo deben incluirse en desarrollo
  developmentStyles: [
    'ComponentLibrary.styles.css',
    'DevelopmentNav.styles.css'
  ],
  
  // Configuración para el build de producción
  production: {
    excludeComponents: true,
    excludeRoutes: true,
    excludeStyles: true,
    minify: true,
    sourcemap: false
  },
  
  // Configuración para el build de desarrollo
  development: {
    excludeComponents: false,
    excludeRoutes: false,
    excludeStyles: false,
    minify: false,
    sourcemap: true
  }
};

/**
 * Función para verificar si un componente debe ser excluido del build
 */
export const shouldExcludeComponent = (componentName: string, isProduction: boolean = false): boolean => {
  if (!isProduction) return false;
  return buildConfig.developmentOnly.includes(componentName);
};

/**
 * Función para verificar si una ruta debe ser excluida del build
 */
export const shouldExcludeRoute = (routePath: string, isProduction: boolean = false): boolean => {
  if (!isProduction) return false;
  return buildConfig.developmentRoutes.includes(routePath);
};

/**
 * Función para verificar si un archivo CSS debe ser excluido del build
 */
export const shouldExcludeStyle = (styleFile: string, isProduction: boolean = false): boolean => {
  if (!isProduction) return false;
  return buildConfig.developmentStyles.includes(styleFile);
};

/**
 * Obtener configuración según el entorno
 */
export const getBuildConfig = (isProduction: boolean = false) => {
  return isProduction ? buildConfig.production : buildConfig.development;
}; 