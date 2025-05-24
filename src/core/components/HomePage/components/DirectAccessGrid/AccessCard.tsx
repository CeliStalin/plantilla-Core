import React, { useState, useEffect } from 'react';
import { AccessCardProps } from '../../types';
import { directAccessGridStyles } from './DirectAccessGrid.styles';

export const AccessCard: React.FC<AccessCardProps> = ({ 
  title, 
  logoSrc, 
  url, 
  onClick,
  delay = 0 
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Resetear imageError cuando cambie logoSrc
  useEffect(() => {
    setImageError(false);
  }, [logoSrc, title]);


  const handleClick = () => onClick(url);
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = 'none';
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  const getFallbackSrc = () => {
    return `https://via.placeholder.com/150x50?text=${encodeURIComponent(title)}`;
  };

  return (
    <div 
      className="access-card" 
      style={{
        ...directAccessGridStyles.card,
        animationDelay: `${delay}s`
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Abrir ${title} en nueva ventana`}
    >
      <img 
        src={imageError ? getFallbackSrc() : logoSrc}
        alt={title}
        style={directAccessGridStyles.cardImage}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </div>
  );
};