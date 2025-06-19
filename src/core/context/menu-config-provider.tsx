import { type ReactNode, useMemo } from 'react';
import { MenuConfigContext, type MenuConfigContextType, defaultConfig } from './menu-config.context';

export interface MenuConfigProviderProps {
  children: ReactNode;
  config?: Partial<MenuConfigContextType>;
}

export const MenuConfigProvider = ({ children, config = {} }: MenuConfigProviderProps) => {
  const value = useMemo(
    () => ({
      ...defaultConfig,
      ...config
    }),
    [config]
  );

  return (
    <MenuConfigContext.Provider value={value}>
      {children}
    </MenuConfigContext.Provider>
  );
}; 