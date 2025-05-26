import React from 'react';
import { ApplicationsGridProps } from '../../types';
import { ApplicationCard } from './ApplicationCard';
import { AppGridIcon } from '../../icons'; 
import { LoadingPlaceholder } from '@/core/components/LoadingPlaceholder';
import { applicationsGridStyles, responsiveApplicationsStyles } from './ApplicationsGrid.styles';
import { useResponsive } from '../../hooks';
import { ANIMATION_DELAYS } from '../../constants';

export const ApplicationsGrid: React.FC<ApplicationsGridProps> = ({ 
  menuItems, 
  loading, 
  onAppClick,
  className = ''
}) => {
  const { isMobile } = useResponsive();

  const gridStyle = {
    ...applicationsGridStyles.grid,
    ...(isMobile ? responsiveApplicationsStyles.mobile.grid : {})
  };

  return (
    <div className={`applications-section ${className}`} style={applicationsGridStyles.container}>
      <div style={applicationsGridStyles.sectionHeader}>
        <AppGridIcon />
        <h2 style={applicationsGridStyles.sectionTitle}>
          Aplicaciones
        </h2>
      </div>
      
      <div style={gridStyle}>
        {loading ? (
          <LoadingPlaceholder rows={menuItems.length > 0 ? Math.min(menuItems.length, 6) : 2} style={{ gridColumn: '1 / span 2' }} />
        ) : (
          <>
            {menuItems.map((item, index) => (
              <ApplicationCard
                key={item.Id}
                item={item}
                onClick={onAppClick}
                delay={ANIMATION_DELAYS.CARD_BASE_DELAY * (index + 1)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};