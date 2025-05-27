import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import NavMenuApp from '../NavMenu/NavMenuApp';
import Footer from '../Footer'; 
import logoIcon from '../../../assets/Logo.png';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  backgroundColor?: string;
  showFooter?: boolean; // prop para controlar la visibilidad del footer
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

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  pageTitle, 
  backgroundColor = '#ffffff',
  showFooter = true // Por defecto mostrar el footer
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
  
  // Determinar el título basado en la ubicación actual si no se proporciona uno
  const currentPageTitle = pageTitle || pageTitles[location.pathname] || '';
  
  return (
    <div className="layout" style={{ 
      flex: 1, // Para que ocupe el espacio en #root
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header 
        logoUrl={logoIcon}
        altText="Consalud Logo"
        pageTitle={currentPageTitle}
      />
      
      <div className="layout-body" style={{ 
        paddingTop: "4rem", 
        display: "flex",
        flex: 1, // Hacer que el contenido ocupe el espacio disponible entre Header y Footer
        position: 'relative', // Necesario para NavMenuApp si es position:absolute/fixed relativo a este
        overflow: 'hidden' // Para evitar que layout-body genere su propio scroll si main lo maneja
      }}>
        <NavMenuApp 
          onToggle={handleMenuToggle} 
        />
        
        <main style={{ 
          marginLeft: isMenuCollapsed ? "50px" : "220px", 
          width: "100%", // Ocupa el ancho disponible menos el NavMenu
          transition: "margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: backgroundColor,
          overflowY: 'auto', // Main maneja su propio scroll vertical si el contenido excede
          padding: "1rem",
          boxSizing: 'border-box',
          flex: 1, // Para que main ocupe el espacio vertical en layout-body
          display: 'flex', // Para permitir que el contenido interno se comporte como flex item si es necesario
          flexDirection: 'column' // Para que el contenido interno se apile verticalmente
        }}>
          {/* El contenido (children) se renderizará aquí. 
              Si HomePage o sus hijos tienen paddings/margins, se considerarán dentro de este main.
              El padding de 1rem de main está incluido en su tamaño gracias a box-sizing: border-box. */}
          {children}
        </main>
      </div>
      {showFooter && <Footer />} {/* Footer tomará su espacio natural o será empujado por flex:1 de layout-body */}
    </div>
  );
};

export default Layout;