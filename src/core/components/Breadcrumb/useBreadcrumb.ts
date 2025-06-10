import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { BreadcrumbItem, UseBreadcrumbOptions } from './types';

const defaultRouteTitleMap: Record<string, string> = {
  '/': 'Inicio',
  '/home': 'Inicio',
  '/dashboard': 'Dashboard',
  '/login': 'Iniciar Sesión',
  '/unauthorized': 'No Autorizado'
};

export const useBreadcrumb = (options: UseBreadcrumbOptions = {}) => {
  const location = useLocation();
  const {
    showHome = true,
    homeLabel = 'Inicio',
    homePath = '/',
    routeTitleMap = {}
  } = options;

  const breadcrumbItems = useMemo((): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const mergedTitleMap = { ...defaultRouteTitleMap, ...routeTitleMap };
    
    if (pathSegments.length === 0) {
      return showHome ? [{ label: homeLabel, path: homePath, isActive: true }] : [];
    }

    const items: BreadcrumbItem[] = [];
    
    // Agregar home si es necesario
    if (showHome && location.pathname !== homePath) {
      items.push({
        label: homeLabel,
        path: homePath,
        isActive: false
      });
    }

    // Generar items basados en los segmentos de la ruta
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Obtener título del mapa o capitalizar el segmento
      const title = mergedTitleMap[currentPath] || 
                   segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      
      items.push({
        label: title,
        path: currentPath,
        isActive: isLast
      });
    });

    return items;
  }, [location.pathname, showHome, homeLabel, homePath, routeTitleMap]);

  return {
    items: breadcrumbItems,
    currentPath: location.pathname
  };
};

export default useBreadcrumb;
