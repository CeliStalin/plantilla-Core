import React, { useEffect, useState, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ApiGetMenus } from "../../services/GetApiArq";
import { ElementMenu } from "../../interfaces/IMenusElementos";
import useAuth from "../../hooks/useAuth";
import { useMenuConfig } from "../../context/MenuConfigContext";
import { navMenuStyles } from './styles/navMenu.styles';
import { MenuItem } from './components/MenuItem';
import { MenuSection } from './components/MenuSection';
import { LoadingDots } from '../Login/components/LoadingDots';
import { theme } from '../../styles/theme';
import { injectMenuStyles } from './utils/styleInjector';
import AppIcon from '../../../assets/app.svg';

interface NavMenuAppProps {
  onToggle?: (collapsed: boolean) => void;
}

const NavMenuApp: React.FC<NavMenuAppProps> = ({ onToggle }) => {
  const { roles, isSignedIn } = useAuth();
  const { enableDynamicMenu } = useMenuConfig();
  const location = useLocation();
  const [menuItems, setMenuItems] = useState<ElementMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(enableDynamicMenu);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const prevPathRef = useRef(location.pathname);

  // Inyectar estilos al montar el componente
  useEffect(() => {
    injectMenuStyles();
  }, []);

  // Verificar si el usuario tiene el rol 
  const hasDevelopersRole = useMemo(() => {
    return roles.some(role => role.Rol === "Developers");
  }, [roles]);

  useEffect(() => {
    if (onToggle) {
      // Informamos al componente padre que el menú está desplegado inicialmente
      onToggle(false);
    }
  }, [onToggle]);

  useEffect(() => {
    // Comprobamos si hay preferencia guardada del usuario
    const savedPreference = localStorage.getItem('menu-collapsed-state');
    if (savedPreference !== null) {
      // Si existe una preferencia guardada, la usamos
      setIsCollapsed(savedPreference === 'true');
      if (onToggle) {
        onToggle(savedPreference === 'true');
      }
    }
    // Si no hay preferencia guardada, mantiene el valor predeterminado (desplegado)
  }, [onToggle]);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname && prevPathRef.current !== '') {
      prevPathRef.current = location.pathname;
    } else {
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchMenu = async () => {
      // Si la carga dinámica está deshabilitada, no hacer la llamada a la API
      if (!enableDynamicMenu) {
        setMenuItems([]);
        setLoading(false);
        return;
      }

      try {
        if (roles.length === 0) {
          setMenuItems([]);
          setLoading(false);
          return;
        }
  
        // Solo cargar menús si el usuario tiene el rol 
        if (hasDevelopersRole) {
          const items = await ApiGetMenus("Developers");
          setMenuItems(items || []);
        } else {
          // Si no tiene rol Developers, dejar el menú vacío
          setMenuItems([]);
        }
      } catch (error) {
        setMenuItems([]);
        console.error("Error al cargar menús:", error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };
  
    fetchMenu();
  }, [hasDevelopersRole, roles, enableDynamicMenu]);

  const handleToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    
    // Efecto de rotación mejorado con fallback
    const hamburgerSvg = document.querySelector('.menu-hamburger svg') as HTMLElement;
    if (hamburgerSvg) {
      // Limpiar clases previas
      hamburgerSvg.classList.remove('menu-rotate-cw', 'menu-rotate-ccw');
      
      // Force reflow
      void hamburgerSvg.offsetWidth;
      
      // Aplicar animación apropiada
      if (isCollapsed) { 
        hamburgerSvg.classList.add('menu-rotate-cw');
      } else {
        hamburgerSvg.classList.add('menu-rotate-ccw');
      }

      // Fallback: remover clase después de la animación
      setTimeout(() => {
        hamburgerSvg.classList.remove('menu-rotate-cw', 'menu-rotate-ccw');
      }, 700); // Duración de la animación
    }
    
    localStorage.setItem('menu-collapsed-state', String(newState));
    
    if (onToggle) {
      onToggle(newState);
    }
  };

  const buildMenuItemPath = (controlador: string, accion: string): string => {
    const formattedControlador = controlador.charAt(0).toLowerCase() + controlador.slice(1);
    return `/${formattedControlador}/${accion}`;
  };

  const isPathActive = (path: string): boolean => {
    return location.pathname === path;
  };

  if (loading) {
    return (
      <div 
        style={{
          width: '220px',
          position: 'fixed',
          left: 0,
          top: '4rem',
          height: 'calc(100vh - 4rem)',
          backgroundColor: '#f9f9f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.07)'
        }}
      >
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <LoadingDots size="small" color={theme.colors.primary} />
          <span style={{ 
            color: theme.colors.gray.dark, 
            fontSize: theme.typography.fontSize.sm 
          }}>
            Cargando menú...
          </span>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div>
      <div 
        style={{
          ...navMenuStyles.container(isCollapsed),
          outline: 'none',
          border: 'none'
        }}
      >
        <aside className="menu" style={{ backgroundColor: '#f9f9f9', height: '100%' }}>
          <button 
            className={`menu-toggle-button ${!isCollapsed ? 'expanded' : ''}`}
            onClick={handleToggle}
            aria-label="Toggle menu"
            tabIndex={-1}
            style={{
              ...navMenuStyles.menuToggleButton,
              outline: 'none !important',
              border: 'none !important',
              boxShadow: 'none !important'
            }}
          >
            <div 
              className="menu-hamburger"
              style={navMenuStyles.menuHamburger}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={navMenuStyles.menuHamburgerSvg}
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </div>
            {!isCollapsed && (
              <span style={navMenuStyles.menuText}>Menú</span>
            )}
          </button>
          
          <div style={navMenuStyles.menuContent(isCollapsed)}>
            <ul className="menu-list" style={{ padding: 0, listStyle: 'none' }}>
              {/* Menú Básico - Inicio */}
              <MenuSection>
                <MenuItem 
                  to="/home" 
                  label={
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      Inicio
                    </span>
                  }
                  isActive={isPathActive('/home')}
                />
              </MenuSection>

              {/* Menú Dinámico */}
              {enableDynamicMenu && hasDevelopersRole && menuItems.length > 0 && (
                <MenuSection title={
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <img 
                      src={AppIcon} 
                      alt="Aplicaciones"
                      style={{ width: '16px', height: '16px' }}
                    />
                    Aplicaciones
                  </span>
                }>
                  {menuItems.map((item) => {
                    const itemPath = buildMenuItemPath(item.Controlador, item.Accion);
                    return (
                      <MenuItem 
                        key={item.Id}
                        to={itemPath}
                        label={item.Descripcion}
                        isActive={isPathActive(itemPath)}
                      />
                    );
                  })}
                </MenuSection>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NavMenuApp;