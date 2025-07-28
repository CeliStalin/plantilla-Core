import { useMemo } from 'react';
import { isCoreDevelopment, getDevelopmentConfig } from '../config/development.config';

/**
 * Hook para detectar si estamos en modo desarrollo del core
 * Solo muestra la librería de componentes cuando estamos desarrollando el core
 */
export const useCoreDevelopment = () => {
  return useMemo(() => {
    const config = getDevelopmentConfig();
    
    // Verificar si estamos en desarrollo
    const isDevelopment = import.meta.env.DEV || 
                         (typeof window !== 'undefined' && window.location.hostname === 'localhost');
    
    // Verificar si estamos en el core (no en una aplicación externa)
    const isCoreProject = isCoreDevelopment();
    
    // Verificar si el paquete actual es el core
    const isCorePackage = import.meta.env.VITE_PACKAGE_NAME === '@consalud/core' ||
                         config.packageName === '@consalud/core';
    
    const showComponentLibrary = isDevelopment && (isCoreProject || isCorePackage) && config.library.enabled;
    
    // Logs para debugging
    console.log('[useCoreDevelopment] Debug info:', {
      isDevelopment,
      isCoreProject,
      isCorePackage,
      configPackageName: config.packageName,
      vitePackageName: import.meta.env.VITE_PACKAGE_NAME,
      libraryEnabled: config.library.enabled,
      showComponentLibrary
    });
    
    return {
      isDevelopment,
      isCoreProject,
      isCorePackage,
      showComponentLibrary,
      config
    };
  }, []);
}; 