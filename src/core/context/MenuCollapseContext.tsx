import React, { createContext, useState, useCallback, useContext } from 'react';

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
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const collapseMenu = useCallback(() => setIsMenuCollapsed(true), []);
  const expandMenu = useCallback(() => setIsMenuCollapsed(false), []);

  return (
    <MenuCollapseContext.Provider value={{ isMenuCollapsed, collapseMenu, expandMenu, setIsMenuCollapsed }}>
      {children}
    </MenuCollapseContext.Provider>
  );
};

export { MenuCollapseContext }; 