import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';

interface MenuCollapseContextType {
  isMenuCollapsed: boolean;
  collapseMenu: () => void;
  expandMenu: () => void;
  setIsMenuCollapsed: (collapsed: boolean) => void;
}

const MenuCollapseContext = createContext<MenuCollapseContextType | undefined>(undefined);

export const useMenuCollapse = () => {
  const ctx = useContext(MenuCollapseContext);
  if (!ctx) throw new Error('useMenuCollapse must be used within a MenuCollapseProvider');
  return ctx;
};

export const MenuCollapseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  return (
    <MenuCollapseContext.Provider value={{ isMenuCollapsed, collapseMenu, expandMenu, setIsMenuCollapsed }}>
      {children}
    </MenuCollapseContext.Provider>
  );
};

export { MenuCollapseContext }; 