import React, { useState, useEffect } from 'react';
import { AccessCardProps } from '../../types';
import { directAccessGridStyles } from './DirectAccessGrid.styles';
import { MiIntranet, PortalConsalud, AccesConsalud, SucursalDigital } from '@/assets';

export const AccessCard: React.FC<AccessCardProps> = ({ 
  title, 
  logoSrc, 
  url, 
  onClick,
  delay = 0 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Resetear estados cuando cambie logoSrc
  useEffect(() => {
    setImageError(false);
    setIsLoading(true);
  }, [logoSrc, title]);

  const handleClick = () => onClick(url);
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.12)';
    e.currentTarget.style.transform = 'translateY(-2px)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setImageError(false);
    setIsLoading(false);
  };

  const getFallbackContent = () => {
    // Para otros, mostrar el logo de Consalud si está disponible
    if (title.includes('Consalud')) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px'
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#04A59B"/>
            <text x="20" y="26" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">C</text>
          </svg>
          <span style={{ color: '#04A59B', fontWeight: 600, fontSize: '16px' }}>consalud</span>
        </div>
      );
    }
    
    // Fallback genérico
    return (
      <div style={{
        color: '#666',
        fontSize: '14px',
        textAlign: 'center',
        padding: '8px'
      }}>
        {title}
      </div>
    );
  };

  // Renderizar el componente MiIntranet si el título es "Mi Intranet"
  if (title === 'Mi Intranet') {
    return (
      <div 
        className="access-card" 
        style={{
          ...directAccessGridStyles.card,
          animationDelay: `${delay}s`,
          position: 'relative'
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
        <MiIntranet 
          style={{
            width: '140px',
            height: '50px'
          }}
        />
      </div>
    );
  }

  // Renderizar el componente PortalConsalud si el título es "Portal Consalud"
  if (title === 'Portal Consalud') {
    return (
      <div 
        className="access-card" 
        style={{
          ...directAccessGridStyles.card,
          animationDelay: `${delay}s`,
          position: 'relative',
          backgroundColor: '#B1EAEA'
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
        <PortalConsalud 
          style={{
            width: '160px',
            height: '80px'
          }}
        />
      </div>
    );
  }
  // Renderizar el componente AccesConsalud si el título es "Consalud Somos CDC"
  if (title === 'Consalud Somos CDC') {
    return (
      <div 
        className="access-card" 
        style={{
          ...directAccessGridStyles.card,
          animationDelay: `${delay}s`,
          position: 'relative',
          backgroundColor: '#04A59B'
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
        <AccesConsalud 
          style={{
            width: '160px',
            height: '90px'
          }}
        />
      </div>
    );
  }

  // Renderizar el componente SucursalDigital si el título es "Sucursal digital"
  if (title === 'Sucursal digital') {
    return (
      <div 
        className="access-card" 
        style={{
          ...directAccessGridStyles.card,
          animationDelay: `${delay}s`,
          position: 'relative',
          backgroundColor: 'white'
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
        <SucursalDigital 
          style={{
            width: '160px',
            height: '90px'
          }}
        />
      </div>
    );
  }

  return (
    <div 
      className="access-card" 
      style={{
        ...directAccessGridStyles.card,
        animationDelay: `${delay}s`,
        position: 'relative'
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
      {isLoading && !imageError && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            border: '2px solid #f3f3f3',
            borderTop: '2px solid #04A59B',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      )}
      
      {!imageError ? (
        <img 
          src={logoSrc}
          alt={title}
          style={{
            ...directAccessGridStyles.cardImage,
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      ) : (
        getFallbackContent()
      )}
    </div>
  );
};