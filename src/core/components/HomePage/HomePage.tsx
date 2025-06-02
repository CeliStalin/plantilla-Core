import React, { useEffect } from 'react';
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
  externalLinks,
  enableBounce = true,
  // New props with backward compatibility
  bounceEnabled,
  enableInteractiveEffects = false,
  debug = false,
  onMounted,
  onCardClick,
  // ...other existing props
  showWelcomeSection = true,
  showApplicationsSection = true,
  showDirectAccessSection = true,
  bounceIntensity = 'medium',
  animationDuration = 300
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

  // Handle backward compatibility for bounce settings
  const shouldEnableBounce = bounceEnabled ?? enableBounce;
  
  // Development/debugging effects
  useEffect(() => {
    if (debug && process.env.NODE_ENV === 'development') {
      console.log('🏠 HomePage Debug Mode Enabled');
      console.log('Props:', {
        enableBounce: shouldEnableBounce,
        bounceIntensity,
        animationDuration,
        enableInteractiveEffects
      });
    }
    
    // Call onMounted callback if provided
    if (onMounted && typeof onMounted === 'function') {
      onMounted();
    }
  }, [debug, shouldEnableBounce, bounceIntensity, animationDuration, enableInteractiveEffects, onMounted]);

  // Enhanced navigation handler with card click callback
  const handleAppClick = (item: any) => {
    if (debug && process.env.NODE_ENV === 'development') {
      console.log('🎯 App card clicked:', item);
    }
    
    // Call external callback if provided
    if (onCardClick && typeof onCardClick === 'function') {
      onCardClick(item);
    }
    
    // Execute original navigation
    navigateToApp(item);
  };

  return (
    <Layout pageTitle="Inicio">
      <div 
        className={`homepage-container ${className} ${enableInteractiveEffects ? 'interactive-effects-enabled' : ''}`}
        style={containerStyle}
        data-debug={debug || undefined}
      >
        {/* Show welcome section conditionally */}
        {showWelcomeSection && (
          <WelcomeSection userName={firstName} />
        )}

        {/* Main Content */}
        <div style={mainContentStyle}>
          {/* Applications - Show conditionally */}
          {showApplicationsSection && (
            <div style={leftColumnStyle}>
              <ApplicationsGrid
                menuItems={menuItems}
                loading={loading}
                onAppClick={handleAppClick}
                enableBounce={shouldEnableBounce}
              />
            </div>
          )}
          
          {/* Direct access column - Show conditionally */}
          {showDirectAccessSection && (
            <div style={rightColumnStyle}>
              <DirectAccessGrid
                loading={loading}
                onExternalLinkClick={openExternalLink}
                externalLinks={linksToUse} 
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;