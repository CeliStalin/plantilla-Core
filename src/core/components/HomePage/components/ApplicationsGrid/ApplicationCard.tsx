import React from 'react';
import { ApplicationCardProps } from '../../types';
import { ChevronRightIcon } from '../../icons'; 
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

  return (
    <div 
      className="app-card" 
      style={{
        ...applicationsGridStyles.card,
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
      aria-label={`Abrir aplicación ${item.Nombre}`}
    >
      <span style={applicationsGridStyles.cardTitle}>
        {item.Nombre}
      </span>
      <ChevronRightIcon />
    </div>
  );
};