import React, { useCallback } from 'react';
import { WelcomeSectionProps } from '../../types';
import { IconLog } from '../../icons/HomePageIcons';
import { welcomeSectionStyles, responsiveWelcomeStyles } from './WelcomeSection.styles';
import { useResponsive } from '../../hooks';

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ 
  userName = 'Usuario', 
  className = '' 
}) => {
  const { isMobile, isTablet } = useResponsive();

  // Manejo de interacciones del avatar
  const handleAvatarClick = useCallback(() => {
  }, []);

  const handleAvatarKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAvatarClick();
    }
  }, [handleAvatarClick]);

  // Combinación de estilos responsivos
  const containerStyle = {
    ...welcomeSectionStyles.container,
    ...(isMobile ? responsiveWelcomeStyles.mobile.container : {}),
    ...(isTablet && !isMobile ? responsiveWelcomeStyles.tablet.container : {})
  };

  const iconContainerStyle = {
    ...welcomeSectionStyles.iconContainer,
    ...(isMobile ? responsiveWelcomeStyles.mobile.iconContainer : {}),
    ...(isTablet && !isMobile ? responsiveWelcomeStyles.tablet.iconContainer : {})
  };

  return (
    <div 
      className={`welcome-section ${className}`} 
      style={containerStyle}
    >
      <div 
        className="icon-container"
        style={iconContainerStyle}
        onClick={handleAvatarClick}
        onKeyDown={handleAvatarKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Avatar de ${userName}. Click para opciones de perfil`}
        title={`Perfil de ${userName}`}
      >
        <IconLog />
      </div>
      <div style={welcomeSectionStyles.content}>
        <h1 style={welcomeSectionStyles.title}>
          Hola, {userName}
        </h1>
        <p style={welcomeSectionStyles.subtitle}>
          Acompañar, entender y cuidar a nuestros afiliados también comienza aquí.
        </p>
      </div>
    </div>
  );
};