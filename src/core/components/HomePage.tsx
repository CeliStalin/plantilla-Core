import React, { useEffect, useState } from "react";
import { Layout } from "../../core/components/Layout/Layout";
import useAuth from "../../core/hooks/useAuth";
import { ApiGetMenus } from "../../core/services/GetApiArq";
import { ElementMenu } from "../../core/interfaces/IMenusElementos";
import { useNavigate } from "react-router-dom";
import { AppGridIcon, DirectAccessIcon, ChevronRightIcon, UserIcon } from "./HomePageIcons";
import { homePageStyles, responsiveStyles } from "./HomePage.styles";
import { LoadingPlaceholder, LoadingCard } from "./LoadingPlaceholder";
import "./HomePage.animations.css"; // Import the animations

// Logo imports
import miIntranetLogo from "../../assets/logoMiintranet.svg"; // You'll need to add this asset
import consaludLogo from "../../assets/Logo.png"; // You'll need to add this asset
import consaludSomosCDC from "../../assets/logoMiintranet.svg"; // You'll need to add this asset

const HomePage: React.FC = () => {
  const { usuario, roles, isSignedIn } = useAuth(); // Obtener roles e isSignedIn del hook useAuth
  const [menuItems, setMenuItems] = useState<ElementMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Añadir estado loading
  const navigate = useNavigate();
  
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect to fetch menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      try {
        // Find the Developers role or use the first role available
        const role = roles.find(r => r.Rol === 'Developers')?.Rol || 
                   (roles.length > 0 ? roles[0].Rol : '');
        
        if (role) {
          const items = await ApiGetMenus(role);
          setMenuItems(items || []);
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        // Add a small delay to ensure the loading animation is visible
        setTimeout(() => setLoading(false), 600);
      }
    };
    
    if (isSignedIn) {
      fetchMenuItems();
    } else {
      setLoading(false);
    }
  }, [isSignedIn, roles]);

  // Helper to build the path for navigation
  const buildPath = (controlador: string, accion: string): string => {
    const formattedControlador = controlador.toLowerCase();
    const formattedAccion = accion.toLowerCase();
    return `/${formattedControlador}/${formattedAccion}`;
  };
  
  // Handle navigation to applications
  const handleAppClick = (item: ElementMenu) => {
    const path = buildPath(item.Controlador, item.Accion);
    navigate(path);
  };
  
  // Handle external link navigation
  const handleExternalLinkClick = () => {
    window.open("https://www.consalud.cl", "_blank");
  };

  return (
    <Layout pageTitle="Inicio">
      <div className="content-container" style={{
        ...homePageStyles.container,
        ...(isMobile ? responsiveStyles.mobile.container : {})
      }}>
        {/* User greeting section */}
        <div className="welcome-section" style={{
          ...homePageStyles.welcomeSection,
          ...(isMobile ? responsiveStyles.mobile.welcomeSection : {})
        }}>
          <div className="icon-container" style={{
            ...homePageStyles.iconContainer,
            ...(isMobile ? responsiveStyles.mobile.iconContainer : {})
          }}>
            <UserIcon />
          </div>
          <div>
            <h1 className="title is-3 mb-2" style={homePageStyles.title}>
              Hola, {usuario?.displayName?.split(' ')[0] || "Usuario"}
            </h1>
            <p className="subtitle is-6" style={homePageStyles.subtitle}>
              Acompañar, entender y cuidar a nuestros afiliados también comienza aquí.
            </p>
          </div>
        </div>

        {/* Main content with two columns */}
        <div className="columns">
          {/* Applications column */}
          <div className={`column ${isMobile ? 'is-12' : 'is-7'}`}>
            <div className="section-header" style={homePageStyles.sectionHeader}>
              <AppGridIcon />
              <h2 className="title is-5 ml-2" style={homePageStyles.sectionTitle}>Aplicaciones</h2>
            </div>
            
            <div className="applications-grid" style={{
              ...homePageStyles.applicationsGrid,
              ...(isMobile ? responsiveStyles.mobile.applicationsGrid : {})
            }}>
              {loading ? (
                <LoadingPlaceholder rows={6} style={{ gridColumn: '1 / span 2' }} />
              ) : (
                <>
                  {/* Dynamic menu items */}
                  {menuItems.map((item) => (
                    <div 
                      key={item.Id}
                      className="app-card" 
                      style={homePageStyles.appCard}
                      onClick={() => handleAppClick(item)}
                      onMouseOver={(e) => {
                        Object.assign(e.currentTarget.style, homePageStyles.appCardHover);
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <span style={homePageStyles.appCardTitle}>{item.Nombre}</span>
                      <ChevronRightIcon />
                    </div>
                  ))}
                  
                  {/* Fallback empty cards if we don't have enough menu items */}
                  {menuItems.length < 6 && Array(6 - menuItems.length).fill(0).map((_, index) => (
                    <div 
                      key={`empty-${index}`}
                      className="app-card" 
                      style={{ 
                        ...homePageStyles.appCard,
                        opacity: 0.7
                      }}
                    >
                      <span style={homePageStyles.appCardTitle}>Aplicación {index + menuItems.length + 1}</span>
                      <ChevronRightIcon />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          
          {/* Direct access column */}
          <div className={`column ${isMobile ? 'is-12' : 'is-5'}`}>
            <div className="section-header" style={homePageStyles.sectionHeader}>
              <DirectAccessIcon />
              <h2 className="title is-5 ml-2" style={homePageStyles.sectionTitle}>Accesos directos</h2>
            </div>
            
            <div className="direct-access-grid" style={homePageStyles.directAccessGrid}>
              {loading ? (
                <>
                  <LoadingCard height="120px" />
                  <LoadingCard height="120px" />
                  <LoadingCard height="120px" />
                </>
              ) : (
                <>
                  {/* Mi Intranet access card */}
                  <div 
                    className="access-card" 
                    style={homePageStyles.accessCard}
                    onClick={handleExternalLinkClick}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <img 
                      src={miIntranetLogo} 
                      alt="Mi Intranet" 
                      style={homePageStyles.accessCardImage}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/150x50?text=Mi+Intranet";
                      }}
                    />
                  </div>
                  
                  {/* Portal Consalud access card */}
                  <div 
                    className="access-card" 
                    style={homePageStyles.accessCard}
                    onClick={handleExternalLinkClick}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <img 
                      src={consaludLogo} 
                      alt="Portal Consalud" 
                      style={homePageStyles.accessCardImage}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/150x50?text=Portal+Consalud";
                      }}
                    />
                  </div>
                  
                  {/* Consalud Somos CDC access card */}
                  <div 
                    className="access-card" 
                    style={homePageStyles.accessCard}
                    onClick={handleExternalLinkClick}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <img 
                      src={consaludSomosCDC} 
                      alt="Consalud Somos CDC" 
                      style={homePageStyles.accessCardImage}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/150x50?text=Consalud+Somos+CDC";
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;