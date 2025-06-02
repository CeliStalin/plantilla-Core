import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ElementMenu } from '@/core/interfaces/IMenusElementos';

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateToApp = useCallback((app: ElementMenu) => {
    if (!app.Controlador || !app.Accion) {
      console.warn('Invalid app navigation data:', app);
      return;
    }

    const formattedControlador = app.Controlador.charAt(0).toLowerCase() + app.Controlador.slice(1);
    const path = `/${formattedControlador}/${app.Accion}`;
    
    navigate(path);
  }, [navigate]);

  const openExternalLink = useCallback((url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return { navigateToApp, openExternalLink };
};