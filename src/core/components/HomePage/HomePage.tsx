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

export const HomePage: React.FC<HomePageProps> = ({ 
  className = '',
  externalLinks // Recibir como prop
}) => {
  // Hooks
  const { usuario } = useAuth();
  const { menuItems, loading } = useMenuItems();
  const { isMobile } = useResponsive();
  const { navigateToApp, openExternalLink } = useNavigation();

  // Derived data
  const firstName = getFirstName(usuario?.displayName);

  // Styles
  const containerStyle = {
    ...homePageStyles.container,
    ...(isMobile ? responsiveHomePageStyles.mobile.container : {})
  };

  const mainContentStyle = {
    ...homePageStyles.mainContent,
    ...(isMobile ? responsiveHomePageStyles.mobile.mainContent : {})
  };

  const leftColumnStyle = {
    ...homePageStyles.leftColumn,
    ...(isMobile ? responsiveHomePageStyles.mobile.leftColumn : {})
  };

  const rightColumnStyle = {
    ...homePageStyles.rightColumn,
    ...(isMobile ? responsiveHomePageStyles.mobile.rightColumn : {})
  };

  return (
    <Layout pageTitle="Inicio">
      <div 
        className={`homepage-container ${className}`}
        style={containerStyle}
      >
        {/* Welcome Section */}
        <WelcomeSection userName={firstName} />

        {/* Main Content with two columns */}
        <div style={mainContentStyle}>
          {/* Applications column */}
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
              externalLinks={externalLinks} // Pasar la prop
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;