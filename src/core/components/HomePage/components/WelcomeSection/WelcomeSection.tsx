import React from 'react';
import { WelcomeSectionProps } from '../../types';
import { UserIcon } from '../../icons/HomePageIcons';
import { welcomeSectionStyles, responsiveWelcomeStyles } from './WelcomeSection.styles';
import { useResponsive } from '../../hooks';

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ 
  userName = 'Usuario', 
  className = '' 
}) => {
  const { isMobile } = useResponsive();

  const containerStyle = {
    ...welcomeSectionStyles.container,
    ...(isMobile ? responsiveWelcomeStyles.mobile.container : {})
  };

  const iconContainerStyle = {
    ...welcomeSectionStyles.iconContainer,
    ...(isMobile ? responsiveWelcomeStyles.mobile.iconContainer : {})
  };

  return (
    <div 
      className={`welcome-section ${className}`} 
      style={containerStyle}
    >
      <div style={iconContainerStyle}>
        <UserIcon />
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