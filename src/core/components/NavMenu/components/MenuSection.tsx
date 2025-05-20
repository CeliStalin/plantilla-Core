import React, { useState } from 'react';
import { navMenuStyles } from '../styles/navMenu.styles';
import { theme } from '../../../styles/theme';
import { RowSvg } from '../../../../assets';

interface MenuSectionProps {
  title?: string | React.ReactNode; 
  children: React.ReactNode;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  if (!title) {
    return <>{children}</>;
  }

  return (
    <>
      <p 
        className="menu-label mt-3" 
        style={{
          ...navMenuStyles.sectionTitle,
          backgroundColor: isHovered ? '#f0f0f0' : 'transparent',
          padding: '8px 12px',
          borderRadius: '4px',
        }}
        onClick={toggleSection}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span>{title}</span>
        <span style={{
          transition: 'transform 0.3s ease',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          color: theme.colors.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: isExpanded ? 'rgba(4, 165, 155, 0.1)' : 'transparent',
        }}>
          <img 
            src={RowSvg} 
            alt="Expand/Collapse"
            style={{
              width: '10px',
              height: '10px',
              transition: 'transform 0.3s ease',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }} 
          />
        </span>
      </p>
      <div style={navMenuStyles.sectionContent(isExpanded)}>
        {children}
      </div>
    </>
  );
};