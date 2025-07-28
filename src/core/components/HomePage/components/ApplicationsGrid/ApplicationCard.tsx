import React from 'react';
import { ApplicationCardProps } from '../../types';
import { ChevronRightIcon } from '../../icons'; 
import { LibraryIcon } from '../../icons/LibraryIcon';
import { applicationsGridStyles } from './ApplicationsGrid.styles';

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ 
  item, 
  onClick,
  delay = 0 
}) => {
  const handleClick = () => onClick(item);
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    target.style.transform = 'translateY(-2px)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    target.style.boxShadow = 'none';
    target.style.transform = 'translateY(0)';
  };

  // Verificar si es la librería de componentes
  const isLibrary = item.Controlador === 'library';
  
  // Estilos especiales para la librería
  const cardStyle = isLibrary ? {
    ...applicationsGridStyles.card,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: '2px solid #ff6b6b'
  } : applicationsGridStyles.card;

  const titleStyle = isLibrary ? {
    ...applicationsGridStyles.cardTitle,
    color: 'white',
    fontWeight: 600
  } : applicationsGridStyles.cardTitle;

  return (
    <div 
      className="app-card animate-fade-in-up" 
      style={{
        ...cardStyle,
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
      aria-label={`Abrir aplicación ${item.Descripcion || item.Nombre}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
        {isLibrary && (
          <LibraryIcon width={20} height={20} />
        )}
        <span style={titleStyle}>
          {item.Descripcion || item.Nombre}
        </span>
      </div>
      <ChevronRightIcon />
    </div>
  );
};