import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';

export interface MenuCollapseContextType {
  isMenuCollapsed: boolean;
  collapseMenu: () => void;
  expandMenu: () => void;
  setIsMenuCollapsed: (collapsed: boolean) => void;
}

const defaultContext: MenuCollapseContextType = {
  isMenuCollapsed: false,
  collapseMenu: () => console.warn('MenuCollapseContext: Provider not found'),
  expandMenu: () => console.warn('MenuCollapseContext: Provider not found'),
  setIsMenuCollapsed: () => console.warn('MenuCollapseContext: Provider not found'),
};

const MenuCollapseContext = createContext<MenuCollapseContextType>(defaultContext);
MenuCollapseContext.displayName = 'MenuCollapseContext';

export function useMenuCollapse() {
  const context = useContext(MenuCollapseContext);
  if (import.meta.env.DEV && context === defaultContext) {
    console.warn('useMenuCollapse must be used within a MenuCollapseProvider');
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
    console.log('[MenuCollapseContext] Colapsando menú');
    setIsMenuCollapsed(true);
  }, []);

  const expandMenu = useCallback(() => {
    console.log('[MenuCollapseContext] Expandiendo menú');
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