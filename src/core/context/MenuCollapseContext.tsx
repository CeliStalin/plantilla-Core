import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';

export interface MenuCollapseContextType {
  isMenuCollapsed: boolean;
  collapseMenu: () => void;
  expandMenu: () => void;
  setIsMenuCollapsed: (collapsed: boolean) => void;
}

const defaultContext: MenuCollapseContextType = {
  isMenuCollapsed: false,
  collapseMenu: () => {},
  expandMenu: () => {},
  setIsMenuCollapsed: () => {},
};

const MenuCollapseContext = createContext<MenuCollapseContextType>(defaultContext);
MenuCollapseContext.displayName = 'MenuCollapseContext';

export function useMenuCollapse() {
  const context = useContext(MenuCollapseContext);
  if (import.meta.env.DEV && context === defaultContext) {
    // Warning silencioso - el contexto debe usarse dentro del provider
  }
  return context;
}

export interface MenuCollapseProviderProps {
  children: React.ReactNode;
  initialState?: boolean;
}

export const MenuCollapseProvider = ({ 
  children,
  initialState
}: MenuCollapseProviderProps) => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(() => {
    if (initialState !== undefined) return initialState;
    const saved = localStorage.getItem('menu-collapsed-state');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('menu-collapsed-state', isMenuCollapsed ? 'true' : 'false');
  }, [isMenuCollapsed]);
  const collapseMenu = useCallback(() => {
    setIsMenuCollapsed(true);
  }, []);
  const expandMenu = useCallback(() => {
    setIsMenuCollapsed(false);
  }, []);

  const value = {
    isMenuCollapsed,
    collapseMenu,
    expandMenu,
    setIsMenuCollapsed,
  };

  return React.createElement(MenuCollapseContext.Provider, { value }, children);
}; 