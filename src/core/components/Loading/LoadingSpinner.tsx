import React from 'react';
import { theme } from '../../styles/theme';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  color = theme.colors.primary,
  className = '',
  style = {}
}) => {
  const sizeMap = {
    small: '20px',
    medium: '32px',
    large: '48px'
  };

  const strokeWidthMap = {
    small: '2',
    medium: '3',
    large: '4'
  };

  const spinnerSize = sizeMap[size];
  const strokeWidth = strokeWidthMap[size];

  const spinnerStyle: React.CSSProperties = {
    width: spinnerSize,
    height: spinnerSize,
    animation: 'spin 1s linear infinite',
    ...style
  };

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={containerStyle} className={className}>
        <svg
          style={spinnerStyle}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray="31.416"
            strokeDashoffset="31.416"
            style={{
              animation: 'spin-dash 1.5s ease-in-out infinite',
            }}
          />
        </svg>
      </div>
      <style>
        {`
          @keyframes spin-dash {
            0% {
              stroke-dasharray: 1, 150;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 90, 150;
              stroke-dashoffset: -35;
            }
            100% {
              stroke-dasharray: 90, 150;
              stroke-dashoffset: -124;
            }
          }
        `}
      </style>
    </>
  );
};
