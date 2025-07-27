import React from 'react';
import { DirectAccessGridProps } from '../../types';
import { AccessCard } from './AccessCard';
import { LoadingCard } from '@/core/components/LoadingPlaceholder';
import { directAccessGridStyles } from './DirectAccessGrid.styles';
import { EXTERNAL_LINKS, EXTERNAL_LINKS_DELAYS } from '../../constants';
import { AccesoDirectoIcon } from '@/core/components/HomePage/icons/AccesoDirectoIcon';
import '../../styles/animations.css';
import './DirectAccessGrid.css';

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
      
      {/* Línea divisoria */}
      <div 
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#E5E7EB',
          marginTop: '8px',
          marginBottom: '20px',
          borderRadius: '0px',
          opacity: 0.8,
          border: 'none',
          display: 'block',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
        }}
      ></div>
      
      <div style={directAccessGridStyles.grid}>
        {loading ? (
          <>
            <LoadingCard height="120px" />
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