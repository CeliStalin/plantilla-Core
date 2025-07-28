import { useState, useEffect, createContext, useCallback, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import NavMenuApp from '../NavMenu/NavMenuApp';
import Footer from '../Footer'; 
import { PageTransition } from '../PageTransition';
import { MenuCollapseProvider } from '../../context/MenuCollapseContext';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  backgroundColor?: string;
  showFooter?: boolean; // prop para controlar la visibilidad del footer
  // Nuevas props para transiciones
  enableTransitions?: boolean;
  transitionType?: 'fade' | 'slide' | 'zoom' | 'fadeSlide';
  transitionDuration?: number;
  logoSrc: string;
  footerImageSrc?: string;
}

// Mapa de rutas a títulos de página
const pageTitles: { [key: string]: string } = {
  '/': 'Inicio',
  '/home': 'Inicio',
  '/dashboard': 'Dashboard',
  '/profile': 'Mi Perfil',
  '/admin': 'Panel de Administración',
  '/MnHerederos/ingresoHer': 'Ingreso Herederos',
  '/MnHerederos/ingresoDoc': 'Ingreso Documentos'
};

export const LegacyMenuCollapseContext = createContext<{ collapseMenu: () => void } | undefined>(undefined);

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  pageTitle, 
  backgroundColor = '#F8F8FA',
  showFooter = true, // Por defecto mostrar el footer
  // Valores por defecto para transiciones
  enableTransitions = true,
  transitionType = 'fadeSlide',
  transitionDuration = 300,
  logoSrc,
  footerImageSrc
}) => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState<boolean>(false);
  const location = useLocation();
  
  // Memoizar valores para evitar re-renderizados
  const currentPageTitle = useMemo(() => 
    pageTitle || pageTitles[location.pathname] || '', 
    [pageTitle, location.pathname]
  );
  
  const footerImageSrcFinal = useMemo(() => 
    footerImageSrc || '/Footer.svg', // Cambiar a SVG
    [footerImageSrc]
  );
  
  // Cargar la preferencia del usuario al montar el componente
  useEffect(() => {
    const savedPreference = localStorage.getItem('menu-collapsed-state');
    if (savedPreference !== null) {
      setIsMenuCollapsed(savedPreference === 'true');
    }
  }, []);
  
  const handleMenuToggle = useCallback((collapsed: boolean) => {
    setIsMenuCollapsed(collapsed);
  }, []);
  
  // Nueva función para colapsar el menú desde hijos
  const collapseMenu = useCallback(() => {
    setIsMenuCollapsed(true);
    localStorage.setItem('menu-collapsed-state', 'true');
  }, []);

  return (
    <MenuCollapseProvider>
      <LegacyMenuCollapseContext.Provider value={{ collapseMenu }}>
        <div className="layout" style={{ 
          height: '100vh', // Altura fija para evitar scroll
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden', // Evitar scroll en el contenedor principal
        }}>
          <Header 
            logoUrl={logoSrc}
            altText="Consalud Logo"
            pageTitle={currentPageTitle}
          />
          
          <div className="layout-body" style={{ 
            paddingTop: "4rem",
            display: "flex",
            flexDirection: 'row',
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            minHeight: 0, // Importante para que flex funcione correctamente
          }}>
            <NavMenuApp 
              onToggle={handleMenuToggle}
            />
            
            <main 
              className="instant-stable navigation-stable no-flash"
              style={{ 
                width: "100%",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                backgroundColor: backgroundColor,
                overflowY: 'auto', // Permitir scroll solo en el contenido principal
                padding: "1.5rem",
                boxSizing: 'border-box',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0, // Importante para que flex funcione correctamente
              }}
            >
              <PageTransition
                duration={transitionDuration}
                type={transitionType}
                disabled={!enableTransitions}
                preset="minimal"
              >
                <div style={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 0, // Importante para que flex funcione correctamente
                }}>
                  {children}
                </div>
              </PageTransition>
            </main>
          </div>
          {showFooter && (
            <Footer 
              footerImageSrc={footerImageSrcFinal} 
              backgroundColor={backgroundColor}
            />
          )}
        </div>
      </LegacyMenuCollapseContext.Provider>
    </MenuCollapseProvider>
  );
};

export default Layout;