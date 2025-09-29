import React, { useCallback, useState } from 'react';
import { ElementMenu } from '@/core/interfaces/IMenusElementos';
import { ApplicationsGridProps } from '../../types/homepage.types';
import { applicationsGridStyles } from './ApplicationsGrid.styles';
import './ApplicationsGrid.css';
import { AppGridIcon } from '@/core/components/HomePage/icons/HomePageIcons';
import { AplicacionesIcon } from '@/core/components/HomePage/icons/AplicacionesIcon';
import { ApplicationCard } from './ApplicationCard';

// Hook for managing bounce effects
const useBounceEffect = () => {
  const [clickedCards, setClickedCards] = useState<Set<string>>(new Set());

  const triggerBounce = useCallback((cardId: string) => {
    if (!cardId) return;
    
    setClickedCards(prev => new Set(prev).add(cardId));
    
    setTimeout(() => {
      setClickedCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(cardId);
        return newSet;
      });
    }, 300);
  }, []);

  const isCardClicked = useCallback((cardId: string) => {
    return cardId ? clickedCards.has(cardId) : false;
  }, [clickedCards]);

  return { triggerBounce, isCardClicked };
};

export const ApplicationsGrid: React.FC<ApplicationsGridProps> = ({
  menuItems = [],
  loading,
  onAppClick,
  className = '',
  enableBounce = false
}) => {

  const { triggerBounce, isCardClicked } = useBounceEffect();

  const handleAppClick = useCallback((app: ElementMenu) => {
    if (!app || !app.Id) {
      return;
    }
    
    triggerBounce(app.Id.toString());
    onAppClick?.(app);
  }, [onAppClick, triggerBounce]);

  return (
    <div className={`applications-section ${className}`} style={applicationsGridStyles.container}>
      <div style={applicationsGridStyles.sectionHeader}>
        <span style={{ marginRight: 8 }}>
          <AplicacionesIcon width={28} height={28} />
        </span>
        <h2 style={applicationsGridStyles.sectionTitle}>Aplicaciones</h2>
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
      
      <div style={applicationsGridStyles.grid}>
        {loading ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
            Cargando aplicaciones...
          </div>
        ) : (
          menuItems.map((app, index) => (
            <ApplicationCard
              key={app?.Id?.toString() || `app-card-${index}`}
              item={app}
              onClick={handleAppClick}
              delay={index * 0.1}
            />
          ))
        )}
      </div>
    </div>
  );
};