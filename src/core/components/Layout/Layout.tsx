import { useState, useEffect, createContext, useCallback, useRef } from 'react';
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
  
  // Cargar la preferencia del usuario al montar el componente
  useEffect(() => {
    const savedPreference = localStorage.getItem('menu-collapsed-state');
    if (savedPreference !== null) {
      setIsMenuCollapsed(savedPreference === 'true');
    }
  }, []);
  
  const handleMenuToggle = (collapsed: boolean) => {
    setIsMenuCollapsed(collapsed);
  };
  
  // Nueva función para colapsar el menú desde hijos
  const collapseMenu = useCallback(() => {
    setIsMenuCollapsed(true);
    localStorage.setItem('menu-collapsed-state', 'true');
  }, []);
  
  // Determinar el título basado en la ubicación actual si no se proporciona uno
  const currentPageTitle = pageTitle || pageTitles[location.pathname] || '';

  return (
    <MenuCollapseProvider>
      <LegacyMenuCollapseContext.Provider value={{ collapseMenu }}>
        <div className="layout" style={{ 
          flex: 1, // Para que ocupe el espacio en #root
          display: 'flex', 
          flexDirection: 'column' 
        }}>
          <Header 
            logoUrl={logoSrc}
            altText="Consalud Logo"
            pageTitle={currentPageTitle}
          />
          
          <div className="layout-body" style={{ 
            paddingTop: "4rem", 
            display: "flex",
            flexDirection: 'row', // Asegura que el menú y el main estén en el mismo flujo
            flex: 1, // Hacer que el contenido ocupe el espacio disponible entre Header y Footer
            position: 'relative',
            overflow: 'hidden'
          }}>
            <NavMenuApp 
              onToggle={handleMenuToggle}
            />
            
            <main 
              className="instant-stable navigation-stable no-flash"
              style={{ 
                // marginLeft eliminado, ahora el layout es fluido
                width: "100%", // Ocupa el ancho disponible menos el NavMenu
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                backgroundColor: backgroundColor,
                overflowY: 'auto',
                padding: "1rem",
                boxSizing: 'border-box',
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <PageTransition
                duration={transitionDuration}
                type={transitionType}
                disabled={!enableTransitions}
                preset="minimal"
              >
                {/* El contenido (children) se renderizará aquí. 
                    Si HomePage o sus hijos tienen paddings/margins, se considerarán dentro de este main.
                    El padding de 1rem de main está incluido en su tamaño gracias a box-sizing: border-box. */}
                {children}
              </PageTransition>
            </main>
          </div>
          {showFooter && <Footer footerImageSrc={footerImageSrc!} />} {/* Footer tomará su espacio natural o será empujado por flex:1 de layout-body */}
        </div>
      </LegacyMenuCollapseContext.Provider>
    </MenuCollapseProvider>
  );
};

export default Layout;