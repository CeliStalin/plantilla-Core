import React, { createContext, ReactNode } from 'react';

export interface MenuConfigContextType {
  // Configuración del menú
  enableDynamicMenu: boolean;
  // Configuración de efectos bounce
  enableBounceEffects: boolean;
  // Otros ajustes que podrías necesitar en el futuro
}

// Valores por defecto
const defaultConfig: MenuConfigContextType = {
  enableDynamicMenu: false,  // Por defecto, el core solo muestra la pantalla de inicio
  enableBounceEffects: true // Por defecto deshabilitado para no romper funcionalidad existente
};

// Crear el contexto
const MenuConfigContext = createContext<MenuConfigContextType>(defaultConfig);

// Props para el proveedor
interface MenuConfigProviderProps {
  children: ReactNode;
  config?: Partial<MenuConfigContextType>;
}

// Proveedor del contexto
const MenuConfigProvider: React.FC<MenuConfigProviderProps> = ({ 
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

export { MenuConfigProvider, MenuConfigContext };