import { useContext } from 'react';
import { MenuConfigContext, type MenuConfigContextType } from '../context/MenuConfigContext';

function useMenuConfig(): MenuConfigContextType {
  const context = useContext(MenuConfigContext);
  if (!context) {
    throw new Error('useMenuConfig debe usarse dentro de un MenuConfigProvider');
  }
  return context;
}

export default useMenuConfig; 