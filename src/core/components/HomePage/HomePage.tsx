import { useEffect } from 'react';
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
import { useMenuConfig } from '@/core/hooks';
import { useMenuCollapse } from '../../context/MenuCollapseContext';
import { MenuCollapseProvider } from '@/core/context/MenuCollapseContext';

export interface HomePageWithLayoutProps extends HomePageProps {
  /**
   * Si es true (por defecto), envuelve el contenido en el Layout del core.
   * Si es false, renderiza solo el contenido interno (requiere envolver en MenuCollapseProvider y layout externo).
   */
  withLayout?: boolean;
  /**
   * Si se define, fuerza el estado del menú izquierdo (NavMenu) a colapsado o expandido.
   * true = colapsado, false = expandido. Si no se define, el control es interno.
   */
  menuCollapsed?: boolean;
}

// Componente interno que contiene toda la lógica y hooks
const HomePageInner: React.FC<HomePageWithLayoutProps> = ({ 
  className = '',
  externalLinks,
  enableBounce = true,
  bounceEnabled,
  enableInteractiveEffects = false,
  debug = false,
  onMounted,
  onCardClick,
  showWelcomeSection = true,
  showApplicationsSection = true,
  showDirectAccessSection = true,
  bounceIntensity = 'medium',
  animationDuration = 300,
  menuCollapsed,
  ...rest
}) => {
  // Hooks
  const { usuario } = useAuth();
  const { menuItems, loading } = useMenuItems();
  const { isMobile, isTablet } = useResponsive();
  const { navigateToApp, openExternalLink } = useNavigation();

  const firstName = getFirstName(usuario?.displayName);
  const linksToUse = externalLinks || defaultExternalLinks;

  // Styles - combinar estilos base con responsive
  const containerStyle = {
    ...homePageStyles.container,
    ...(isMobile ? responsiveHomePageStyles.mobile.container : {}),
    ...(isTablet && !isMobile ? responsiveHomePageStyles.tablet.container : {}),
    backgroundColor: '#F8F8FA',
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
    if (debug && import.meta.env.DEV) {
      console.log('🏠 HomePage Debug Mode Enabled');
      console.log('Props:', {
        enableBounce: shouldEnableBounce,
        bounceIntensity,
        animationDuration,
        enableInteractiveEffects
      });
    }
    if (onMounted && typeof onMounted === 'function') {
      onMounted();
    }
  }, [debug, shouldEnableBounce, bounceIntensity, animationDuration, enableInteractiveEffects, onMounted]);

  // Usar el hook profesional para controlar el menú
  const { expandMenu, collapseMenu, isMenuCollapsed } = useMenuCollapse();

  // Sincronizar el estado del menú con el prop externo si está definido
  useEffect(() => {
    if (typeof menuCollapsed === 'boolean') {
      if (menuCollapsed && !isMenuCollapsed) {
        collapseMenu();
      } else if (!menuCollapsed && isMenuCollapsed) {
        expandMenu();
      }
    }
  }, [menuCollapsed, isMenuCollapsed, collapseMenu, expandMenu]);

  // Enhanced navigation handler with card click callback
  const handleAppClick = (item: any) => {
    if (debug && import.meta.env.DEV) {
      console.log('🎯 App card clicked:', item);
    }
    collapseMenu();
    if (onCardClick && typeof onCardClick === 'function') {
      onCardClick(item);
    }
    navigateToApp(item);
  };

  // El contenido principal de la página
  return (
    <div 
      className={`homepage-container ${className} ${enableInteractiveEffects ? 'interactive-effects-enabled' : ''}`}
      style={containerStyle}
      data-debug={debug || undefined}
    >
      {showWelcomeSection && (
        <WelcomeSection userName={firstName} />
      )}
      <div style={mainContentStyle}>
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
  );
};

/**
 * HomePage principal.
 * - Por defecto, SIEMPRE usa Layout, menú y footer (withLayout = true).
 * - Para compatibilidad con apps externas, se puede pasar withLayout={false} para renderizar solo el contenido interno.
 * - NO pasar withLayout={false} en la app principal.
 */
export const HomePage: React.FC<HomePageWithLayoutProps> = (props) => {
  // Valor por defecto explícito para withLayout
  const withLayout = props.withLayout !== undefined ? props.withLayout : true;

  if (withLayout) {
    return (
      <Layout pageTitle="Inicio" logoSrc="/Logo.png" footerImageSrc="">
        <HomePageInner {...props} />
      </Layout>
    );
  }
  return (
    <MenuCollapseProvider>
      <HomePageInner {...props} />
    </MenuCollapseProvider>
  );
};

export default HomePage;