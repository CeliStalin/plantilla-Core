import { createContext } from 'react';

export interface MenuConfigContextType {
  enableDynamicMenu: boolean;
  enableBounceEffects: boolean;
}

export const defaultConfig: MenuConfigContextType = {
  enableDynamicMenu: false,
  enableBounceEffects: true
};

export const MenuConfigContext = createContext<MenuConfigContextType>(defaultConfig); 