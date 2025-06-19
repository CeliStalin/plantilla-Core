import { useContext } from 'react';
import { MenuConfigContext } from './menu-config.context';

export const useMenuConfig = () => {
  const context = useContext(MenuConfigContext);
  if (!context) {
    throw new Error('useMenuConfig debe ser usado dentro de un MenuConfigProvider');
  }
  return context;
}; 