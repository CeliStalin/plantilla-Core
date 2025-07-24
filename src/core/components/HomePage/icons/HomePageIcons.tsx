import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const AppGridIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#04A59B',
  className = ''
}) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
  </svg>
);

export const DirectAccessIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#04A59B',
  className = ''
}) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
    <path d="M15 10L12 7M12 7L9 10M12 7V16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ 
  size = 16, 
  color = '#04A59B',
  className = ''
}) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M6 12L10 8L6 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ 
  size = 40, 
  color = 'white',
  className = ''
}) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" fill={color} />
    <path d="M12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill={color} />
  </svg>
);

export const AccesoDirectoIcon: React.FC<IconProps> = ({ size = 24, color = '#027373', className = '' }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="12" height="13" rx="2" stroke={color} strokeWidth="1.5" />
    <rect x="3" y="8" width="16" height="13" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M5.8252 5.48914C5.8222 5.48914 5.8202 5.49114 5.8202 5.49414C5.8202 5.49714 5.8222 5.49914 5.8252 5.49914C5.8282 5.49914 5.8302 5.49714 5.8302 5.49414C5.8302 5.49114 5.8282 5.48914 5.8252 5.48914" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.36816 5.48914C8.36516 5.48914 8.36316 5.49114 8.36316 5.49414C8.36316 5.49714 8.36616 5.49914 8.36816 5.49914C8.37116 5.49914 8.37316 5.49714 8.37316 5.49414C8.37316 5.49114 8.37116 5.48914 8.36816 5.48914" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.9072 5.48914C10.9042 5.48914 10.9022 5.49114 10.9022 5.49414C10.9022 5.49714 10.9042 5.49914 10.9072 5.49914C10.9102 5.49914 10.9122 5.49714 10.9122 5.49414C10.9122 5.49114 10.9102 5.48914 10.9072 5.48914" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);