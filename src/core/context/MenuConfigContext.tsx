import React, { createContext, useContext, ReactNode } from 'react';

interface MenuConfigContextType {
  // Configuración del menú
  enableDynamicMenu: boolean;
  // Otros ajustes que podrías necesitar en el futuro
}

// Valores por defecto
const defaultConfig: MenuConfigContextType = {
  enableDynamicMenu: false // Por defecto, el core solo muestra la pantalla de inicio
};

// Crear el contexto
const MenuConfigContext = createContext<MenuConfigContextType>(defaultConfig);

// Props para el proveedor
interface MenuConfigProviderProps {
  children: ReactNode;
  config?: Partial<MenuConfigContextType>;
}

// Proveedor del contexto
export const MenuConfigProvider: React.FC<MenuConfigProviderProps> = ({ 
  children, 
  config = {} 
}) => {
  // Combinar la configuración predeterminada con la proporcionada
  const configValue: MenuConfigContextType = {
    ...defaultConfig,
    ...config
  };
  
  return (
    <MenuConfigContext.Provider value={configValue}>
      {children}
    </MenuConfigContext.Provider>
  );
};

// Hook para acceder a la configuración
export const useMenuConfig = () => {
  const context = useContext(MenuConfigContext);
  if (!context) {
    throw new Error('useMenuConfig debe usarse dentro de un MenuConfigProvider');
  }
  return context;
};