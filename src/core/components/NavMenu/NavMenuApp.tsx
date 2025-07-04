import React, { useEffect, useState, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ApiGetMenus } from "../../services/GetApiArq";
import { ElementMenu } from "../../interfaces/IMenusElementos";
import { useAuth } from "../../hooks/useAuth";
import { useMenuConfig, useMenuCollapse } from "../../hooks";
import { navMenuStyles } from './styles/navMenu.styles';
import { MenuItem } from './components/MenuItem';
import { MenuSection } from './components/MenuSection';
import { LoadingDots } from '../Login/components/LoadingDots';
import { theme } from '../../styles/theme';
import { injectMenuStyles } from './utils/styleInjector';

interface NavMenuAppProps {
  onToggle?: (collapsed: boolean) => void;
  appIconSrc?: string;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
}

const NavMenuApp: React.FC<NavMenuAppProps> = ({ onToggle, appIconSrc, onAnimationStart, onAnimationEnd }) => {
  const { roles, isSignedIn } = useAuth();
  const { enableDynamicMenu } = useMenuConfig();
  const location = useLocation();
  const [menuItems, setMenuItems] = useState<ElementMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Cambiar a false por defecto
  const prevPathRef = useRef(location.pathname);
  
  // Refs para optimización
  const hasLoadedRef = useRef(false);
  const lastRoleRef = useRef<string>('');
  const initialLoadRef = useRef(true);

  const { isMenuCollapsed, collapseMenu, expandMenu, setIsMenuCollapsed } = useMenuCollapse();

  // Estado para controlar la animación de rotación
  const [rotateClass, setRotateClass] = useState<string>("");
  const rotateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevCollapsedRef = useRef(isMenuCollapsed);

  // Inyectar estilos al montar el componente
  useEffect(() => {
    injectMenuStyles();
  }, []);

  // Efecto para manejar la animación de rotación y sincronización con Layout
  useEffect(() => {
    if (prevCollapsedRef.current !== isMenuCollapsed) {
      // Determinar dirección de la animación
      const direction = isMenuCollapsed ? "menu-rotate-ccw" : "menu-rotate-cw";
      setRotateClass(direction);
      // Notificar inicio de animación
      if (onAnimationStart) onAnimationStart();
      // Limpiar la clase después de la duración de la animación
      if (rotateTimeoutRef.current) clearTimeout(rotateTimeoutRef.current);
      rotateTimeoutRef.current = setTimeout(() => {
        setRotateClass("");
        // Notificar fin de animación
        if (onAnimationEnd) onAnimationEnd();
      }, 400); // Debe coincidir con la duración de la transición del menú y el main
      prevCollapsedRef.current = isMenuCollapsed;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuCollapsed]);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (rotateTimeoutRef.current) clearTimeout(rotateTimeoutRef.current);
    };
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
        hasLoadedRef.current = true;
        return;
      }

      // Si no está autenticado, limpiar estado
      if (!isSignedIn) {
        setMenuItems([]);
        setLoading(false);
        hasLoadedRef.current = false;
        lastRoleRef.current = '';
        return;
      }

      // Si no hay roles, no cargar aún
      if (roles.length === 0) {
        // Solo mostrar loading en la carga inicial si no tenemos roles
        if (initialLoadRef.current) {
          setLoading(true);
        }
        setMenuItems([]);
        return;
      }

      // Determinar el rol actual
      const currentRole = hasDevelopersRole ? 'Developers' : '';

      // Si ya hemos cargado con el mismo rol, no volver a cargar
      if (hasLoadedRef.current && lastRoleRef.current === currentRole) {
        setLoading(false);
        return;
      }

      // Solo mostrar loading si es la primera carga o cambió el rol
      const shouldShowLoading = !hasLoadedRef.current || lastRoleRef.current !== currentRole;

      if (shouldShowLoading) {
        setLoading(true);
      }

      try {
        if (currentRole) {
          const items = await ApiGetMenus(currentRole);
          setMenuItems(items || []);
        } else {
          // Si no tiene rol Developers, dejar el menú vacío
          setMenuItems([]);
        }
        
        hasLoadedRef.current = true;
        lastRoleRef.current = currentRole;
      } catch (error) {
        setMenuItems([]);
        console.error("Error al cargar menús:", error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
        initialLoadRef.current = false;
      }
    };
  
    fetchMenu();
  }, [hasDevelopersRole, roles, enableDynamicMenu, isSignedIn]);

  useEffect(() => {
    // Si la ruta es de aplicaciones y no es home, colapsa el menú
    if (
      (location.pathname.startsWith('/mnherederos') || location.pathname.startsWith('/otraApp')) &&
      location.pathname !== '/home'
    ) {
      setIsMenuCollapsed(true);
      collapseMenu();
    }
  }, [location.pathname, collapseMenu, setIsMenuCollapsed]);

  useEffect(() => {
    if (location.pathname === '/home') {
      setIsMenuCollapsed(false);
      expandMenu();
    }
  }, [location.pathname, expandMenu, setIsMenuCollapsed]);

  const handleToggle = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
    if (onToggle) {
      onToggle(!isMenuCollapsed);
    }
  };

  const buildMenuItemPath = (controlador: string, accion: string): string => {
    const formattedControlador = controlador.charAt(0).toLowerCase() + controlador.slice(1);
    return `/${formattedControlador}/${accion}`;
  };

  const isPathActive = (path: string): boolean => {
    return location.pathname === path;
  };

  // Solo mostrar loading durante la carga inicial de menús dinámicos
  if (loading && enableDynamicMenu && initialLoadRef.current) {
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
            fontSize: theme.typography.fontSize.sm,
            fontFamily: theme.typography.fontFamily
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
        className="nav-menu-container"  
        style={{
          ...navMenuStyles.container(isMenuCollapsed),
          boxShadow: isMenuCollapsed ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.07)',
          backgroundColor: '#FFF',
        }}
      >
        <aside 
          className="menu" 
          style={{ 
            backgroundColor: '#FFF', 
            height: '100%',
          }}
        >
          <button 
            className={`menu-toggle-button ${!isMenuCollapsed ? 'expanded' : ''}`}
            onClick={handleToggle}
            aria-label="Toggle menu"
            tabIndex={-1}
            style={{
              ...navMenuStyles.menuToggleButton,
            }}
          >
            <div 
              className={`menu-hamburger${rotateClass ? ' ' + rotateClass : ''}`}
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
            <span style={navMenuStyles.menuText(isMenuCollapsed)}>Menú</span>
          </button>
          
          <div style={navMenuStyles.menuContent(isMenuCollapsed)}>
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
                      <span style={navMenuStyles.menuItemLabel(isMenuCollapsed)}>Inicio</span>
                    </span>
                  }
                  isActive={isPathActive('/home')}
                  isMenuCollapsed={isMenuCollapsed}
                />
               
              </MenuSection>

              {/* Menú Dinámico */}
              {enableDynamicMenu && hasDevelopersRole && menuItems.length > 0 && (
                <MenuSection title={
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px'}}>
                    {appIconSrc && (
                      <img 
                        src={appIconSrc} 
                        alt="Aplicaciones"
                        style={{ width: '16px', height: '16px' }}
                      />
                    )}
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
                        isApplicationItem={true}
                        isMenuCollapsed={isMenuCollapsed}
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