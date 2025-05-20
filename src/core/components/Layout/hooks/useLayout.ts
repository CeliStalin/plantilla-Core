import { useState, useCallback, useEffect } from 'react';
import useLocalStorage from '@/core/hooks/useLocalStorage';

interface UseLayoutReturn {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
}

export const useLayout = (): UseLayoutReturn => {
  // Valor predeterminado a false para que el menú esté desplegado por defecto
  const [isCollapsed, setIsCollapsed] = useLocalStorage<boolean>('sidebar-collapsed', false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = useCallback(() => {
    // Añadimos tipo explícito para 'prev'
    setIsCollapsed((prev: boolean) => {
      const newState = !prev;
      // Guardar la preferencia del usuario
      localStorage.setItem('menu-collapsed-state', String(newState));
      return newState;
    });
  }, [setIsCollapsed]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // En móviles, mantener el sidebar colapsado por defecto
  // En desktop, respetamos la preferencia guardada o lo dejamos expandido si es primera visita
  useEffect(() => {
    if (isMobile && !isCollapsed) {
      // En móviles siempre colapsado
      setIsCollapsed(true);
    } else if (!isMobile) {
      // Leer preferencia guardada
      const savedPreference = localStorage.getItem('menu-collapsed-state');
      if (savedPreference !== null) {
        // Solo actualizamos si es diferente a la preferencia guardada
        const preferredState = savedPreference === 'true';
        if (isCollapsed !== preferredState) {
          setIsCollapsed(preferredState);
        }
      } else if (isCollapsed) {
        // Si no hay preferencia guardada y está colapsado, lo expandimos
        setIsCollapsed(false);
      }
    }
  }, [isMobile, isCollapsed, setIsCollapsed]);

  return {
    isCollapsed,
    toggleSidebar,
    isMobile,
  };
};