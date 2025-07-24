import React, { useCallback, useState } from 'react';
import { ElementMenu } from '@/core/interfaces/IMenusElementos';
import { ApplicationsGridProps } from '../types/homepage.types';
import { applicationsGridStyles } from './ApplicationsGrid/ApplicationsGrid.styles';
import './ApplicationsGrid.css';
import { AppGridIcon } from '@/core/components/HomePage/icons/HomePageIcons';
import { AplicacionesIcon } from '@/core/components/HomePage/icons/AplicacionesIcon';

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
  console.log('ApplicationsGrid - enableBounce:', enableBounce);
  console.log('ApplicationsGrid - menuItems:', menuItems);

  const { triggerBounce, isCardClicked } = useBounceEffect();

  const handleAppClick = useCallback((app: ElementMenu) => {
    if (!app || !app.Id) {
      console.warn('ApplicationsGrid: Invalid app object or missing Id', app);
      return;
    }
    
    triggerBounce(app.Id.toString());
    onAppClick?.(app);
  }, [onAppClick, triggerBounce]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, app: ElementMenu) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      handleAppClick(app);
    }
  }, [handleAppClick]);

  const getCardClassName = useCallback((app: ElementMenu) => {
    const baseClasses = ['app-card', 'animate-fade-in-up'];
    if (enableBounce) baseClasses.push('bounce-enabled');
    if (app?.Id && isCardClicked(app.Id.toString())) {
      baseClasses.push('clicked');
    }
    console.log('ApplicationsGrid - card classes:', baseClasses.join(' '));
    return baseClasses.join(' ');
  }, [isCardClicked, enableBounce]);

  const getCardKey = useCallback((app: ElementMenu, index: number) => {
    return app?.Id?.toString() || `app-card-${index}`;
  }, []);

  const getAppLabel = useCallback((app: ElementMenu) => {
    return app?.Descripcion || app?.Nombre || 'Sin nombre';
  }, []);

  return (
    <div className={`applications-section ${className}`} style={applicationsGridStyles.container}>
      <div style={applicationsGridStyles.sectionHeader}>
        <span style={{ marginRight: 8 }}>
          <AplicacionesIcon width={28} height={28} />
        </span>
        <h2 style={applicationsGridStyles.sectionTitle}>Aplicaciones</h2>
      </div>
      <div style={applicationsGridStyles.grid}>
        {loading ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
            Cargando aplicaciones...
          </div>
        ) : (
          menuItems.map((app, index) => (
            <div
              key={getCardKey(app, index)}
              className={getCardClassName(app)}
              style={{
                ...applicationsGridStyles.card,
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => handleAppClick(app)}
              onKeyDown={(e) => handleKeyDown(e, app)}
              tabIndex={0}
              role="button"
              aria-label={`Abrir aplicación ${getAppLabel(app)}`}
            >
              <span style={applicationsGridStyles.cardTitle}>{getAppLabel(app)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};