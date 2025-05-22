import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ElementMenu } from '@/core/interfaces/IMenusElementos';
import { buildAppPath } from '../utils';

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateToApp = useCallback((item: ElementMenu) => {
    const path = buildAppPath(item.Controlador, item.Accion);
    navigate(path);
  }, [navigate]);

  const openExternalLink = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return { navigateToApp, openExternalLink };
};