/**
 * Configuración específica para desarrollo del core
 */

export const developmentConfig = {
  // Activar librería de componentes en desarrollo
  showComponentLibrary: true,
  
  // Configuración de entorno
  environment: 'development',
  
  // Configuración del paquete
  packageName: '@consalud/core',
  
  // URLs de desarrollo
  baseUrl: 'http://localhost:5173',
  
  // Configuración de debugging
  enableDebug: true,
  enableLogs: true,
  
  // Configuración de la librería
  library: {
    enabled: true,
    route: '/library',
    title: 'Librería de Componentes Core'
  }
};

// Función para verificar si estamos en desarrollo del core
export const isCoreDevelopment = (): boolean => {
  // Verificar si estamos en modo desarrollo
  const isDev = import.meta.env.DEV;
  
  // Verificar si estamos en localhost
  const isLocalhost = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  );
  
  // Verificar si el paquete actual es el core
  const packageName = import.meta.env.VITE_PACKAGE_NAME || 
                     (typeof process !== 'undefined' ? process.env.npm_package_name : null);
  const isCorePackage = packageName === '@consalud/core';
  
  // Verificar si hay una variable de entorno específica para desarrollo del core
  const isCoreDevEnv = import.meta.env.VITE_CORE_DEVELOPMENT === 'true';
  
  // Verificar si es el proyecto core específicamente
  const isCoreProject = import.meta.env.VITE_IS_CORE_PROJECT === 'true';
  
  // Verificar si hay elementos específicos del core en el DOM
  const hasCoreElements = typeof window !== 'undefined' && 
    (document.querySelector('[data-core="true"]') !== null ||
     document.querySelector('.core-development') !== null ||
     document.getElementById('core-development-root') !== null);
  
  // Verificar si estamos en el contexto del core (por URL o estructura)
  const isCoreContext = typeof window !== 'undefined' && 
    (window.location.pathname.includes('/plantilla-Core') ||
     window.location.pathname.includes('/core') ||
     window.location.pathname.includes('plantilla-Core') ||
     window.location.href.includes('plantilla-Core'));
  
  // Verificar si el título indica que es el core
  const isCoreTitle = typeof window !== 'undefined' && 
    (document.title.includes('Core') || 
     document.title.includes('plantilla') ||
     document.title.includes('Libreria Core'));
  
  // SOLUCIÓN SIMPLIFICADA Y EFECTIVA:
  // Solo se considera desarrollo del core si cumple las condiciones básicas
  // Y tiene al menos 3 indicadores específicos del core
  const basicConditions = isDev && isLocalhost;
  
  const coreSpecificConditions = [
    isCorePackage,
    isCoreDevEnv,
    isCoreProject,
    hasCoreElements,
    isCoreContext,
    isCoreTitle
  ];
  
  const coreSpecificCount = coreSpecificConditions.filter(Boolean).length;
  const hasEnoughCoreIndicators = coreSpecificCount >= 3;
  
  const result = basicConditions && hasEnoughCoreIndicators;
  
  // Log para debugging
  if (typeof window !== 'undefined') {
    console.log('[isCoreDevelopment] Debug:', {
      isDev,
      isLocalhost,
      packageName,
      isCorePackage,
      isCoreDevEnv,
      isCoreProject,
      hasCoreElements,
      isCoreContext,
      isCoreTitle,
      basicConditions,
      coreSpecificCount,
      hasEnoughCoreIndicators,
      result,
      url: window.location.href,
      title: document.title
    });
  }
  
  return result;
};

// Función para obtener la configuración actual
export const getDevelopmentConfig = () => {
  return {
    ...developmentConfig,
    isDevelopment: isCoreDevelopment()
  };
}; 