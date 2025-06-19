import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';

export interface MenuCollapseContextType {
  isMenuCollapsed: boolean;
  collapseMenu: () => void;
  expandMenu: () => void;
  setIsMenuCollapsed: (collapsed: boolean) => void;
}

const MenuCollapseContext = createContext<MenuCollapseContextType | null>(null);

export function useMenuCollapse() {
  const ctx = useContext(MenuCollapseContext);
  if (!ctx) throw new Error('useMenuCollapse must be used within a MenuCollapseProvider');
  return ctx;
}

export interface MenuCollapseProviderProps {
  children: React.ReactNode;
}

export const MenuCollapseProvider = ({ children }: MenuCollapseProviderProps) => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(() => {
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

  const value: MenuCollapseContextType = {
    isMenuCollapsed,
    collapseMenu,
    expandMenu,
    setIsMenuCollapsed,
  };

  return (
    <MenuCollapseContext.Provider value={value}>
      {children}
    </MenuCollapseContext.Provider>
  );
}; 