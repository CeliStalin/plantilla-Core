import React from 'react';
import { DirectAccessGridProps } from '../../types';
import { AccessCard } from './AccessCard';
import { LoadingCard } from '@/core/components/LoadingPlaceholder';
import { directAccessGridStyles } from './DirectAccessGrid.styles';
import { EXTERNAL_LINKS, EXTERNAL_LINKS_DELAYS } from '../../constants';
import { AccesoDirectoIcon } from '@/core/components/HomePage/icons/AccesoDirectoIcon';

export const DirectAccessGrid: React.FC<DirectAccessGridProps> = ({ 
  loading, 
  onExternalLinkClick,
  className = '',
  externalLinks = EXTERNAL_LINKS // Usar valor por defecto si no se proporciona
}) => {
  return (
    <div className={`direct-access-section ${className}`} style={directAccessGridStyles.container}>
      <div style={directAccessGridStyles.sectionHeader}>
        <span style={{ marginRight: 8 }}>
          <AccesoDirectoIcon width={28} height={28} />
        </span>
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
              delay={EXTERNAL_LINKS_DELAYS.ACCESS_CARD_BASE_DELAY + (index * 0.1)}
            />
          ))
        )}
      </div>
    </div>
  );
};