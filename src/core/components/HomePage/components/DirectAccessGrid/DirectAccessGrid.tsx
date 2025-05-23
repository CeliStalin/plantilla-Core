import React from 'react';
import { DirectAccessGridProps } from '../../types';
import { AccessCard } from './AccessCard';
import { DirectAccessIcon } from '../../icons/HomePageIcons';
import { LoadingCard } from '@/core/components/LoadingPlaceholder';
import { directAccessGridStyles } from './DirectAccessGrid.styles';
import { EXTERNAL_LINKS, ANIMATION_DELAYS } from '../../constants';

export const DirectAccessGrid: React.FC<DirectAccessGridProps> = ({ 
  loading, 
  onExternalLinkClick,
  className = '',
  externalLinks = EXTERNAL_LINKS // Usar valor por defecto si no se proporciona
}) => {
  return (
    <div className={`direct-access-section ${className}`} style={directAccessGridStyles.container}>
      <div style={directAccessGridStyles.sectionHeader}>
        <DirectAccessIcon />
        <h2 style={directAccessGridStyles.sectionTitle}>
          Accesos directos
        </h2>
      </div>
      
      <div style={directAccessGridStyles.grid}>
        {loading ? (
          <>
            <LoadingCard height="120px" />
            <LoadingCard height="120px" />
            <LoadingCard height="120px" />
          </>
        ) : (
          externalLinks.map((link, index) => (
            <AccessCard
              key={link.id}
              title={link.title}
              logoSrc={link.logoSrc}
              url={link.url}
              onClick={onExternalLinkClick}
              delay={ANIMATION_DELAYS.ACCESS_CARD_BASE_DELAY + (index * 0.1)}
            />
          ))
        )}
      </div>
    </div>
  );
};