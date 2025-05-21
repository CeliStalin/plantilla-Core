import React from 'react';

interface LoadingPlaceholderProps {
  rows?: number;
  style?: React.CSSProperties;
}

export const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = ({ 
  rows = 6,
  style = {}
}) => {
  return (
    <div className="loading-placeholder-container" style={{ width: '100%', ...style }}>
      {Array(rows).fill(0).map((_, index) => (
        <div 
          key={`placeholder-${index}`}
          className="loading-placeholder"
          style={{
            height: '56px',
            borderRadius: '8px',
            marginBottom: '16px',
            opacity: 1 - (index * 0.1)
          }}
        />
      ))}
    </div>
  );
};

interface LoadingCardProps {
  height?: string | number;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({ height = '120px' }) => {
  return (
    <div 
      className="loading-placeholder"
      style={{
        height,
        borderRadius: '8px',
        marginBottom: '16px'
      }}
    />
  );
};

export default LoadingPlaceholder;