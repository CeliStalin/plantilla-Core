import React from 'react';
import { Layout } from '@/core/components/Layout/Layout';
import { WelcomeSection } from './components/WelcomeSection';
import { ApplicationsGrid } from './components/ApplicationsGrid';
import { DirectAccessGrid } from './components/DirectAccessGrid';
import { useAuth } from '@/core/hooks/useAuth';
import { useMenuItems, useResponsive, useNavigation } from './hooks';
import { getFirstName } from './utils';
import { homePageStyles, responsiveHomePageStyles } from './styles/HomePage.styles';
import { HomePageProps } from './types';
import './styles/animations.css';
import { EXTERNAL_LINKS as defaultExternalLinks } from './constants/externalLinks';
import { useMenuConfig } from '@/core/context/MenuConfigContext'; 

export const HomePage: React.FC<HomePageProps> = ({ 
  className = '',
  externalLinks 
}) => {
  // Hooks
  const { usuario } = useAuth();
  const { menuItems, loading } = useMenuItems();
  const { isMobile, isTablet } = useResponsive();
  const { navigateToApp, openExternalLink } = useNavigation();
  // const { enableDynamicMenu } = useMenuConfig(); // No longer needed here for this specific conditional rendering

  const firstName = getFirstName(usuario?.displayName);
  const linksToUse = externalLinks || defaultExternalLinks;

  // Styles - combinar estilos base con responsive
  const containerStyle = {
    ...homePageStyles.container,
    ...(isMobile ? responsiveHomePageStyles.mobile.container : {}),
    ...(isTablet && !isMobile ? responsiveHomePageStyles.tablet.container : {}),
    backgroundColor: '#ffffff',
    // Asegurar que no haya restricciones de ancho
    maxWidth: '100%',
    margin: 0
  };

  const mainContentStyle = {
    ...homePageStyles.mainContent,
    ...(isMobile ? responsiveHomePageStyles.mobile.mainContent : {}),
    ...(isTablet && !isMobile ? responsiveHomePageStyles.tablet.mainContent : {})
  };

  const leftColumnStyle = {
    ...homePageStyles.leftColumn,
    ...(isMobile ? responsiveHomePageStyles.mobile.leftColumn : {}),
    ...(isTablet && !isMobile ? { maxWidth: '600px' } : {})
  };

  const rightColumnStyle = {
    ...homePageStyles.rightColumn,
    ...(isMobile ? responsiveHomePageStyles.mobile.rightColumn : {}),
    ...(isTablet && !isMobile ? { maxWidth: '350px' } : {})
  };

  return (
    <Layout pageTitle="Inicio">
      <div 
        className={`homepage-container ${className}`}
        style={containerStyle}
      >
        {/*Seccion bienvenida */}
        <WelcomeSection userName={firstName} />

        {/* Main Content */}
        <div style={mainContentStyle}>
          {/* Aplicaciones */}
          <div style={leftColumnStyle}>
            <ApplicationsGrid
              menuItems={menuItems}
              loading={loading}
              onAppClick={navigateToApp}
            />
          </div>
          
          {/* Direct access column */}
          <div style={rightColumnStyle}>
            <DirectAccessGrid
              loading={loading}
              onExternalLinkClick={openExternalLink}
              externalLinks={linksToUse} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;