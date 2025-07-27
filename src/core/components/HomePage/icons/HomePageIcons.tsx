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

export const IconLog: React.FC<IconProps> = ({ 
  size = 60, 
  color = '#00CBBF',
  className = ''
}) => (
  <svg 
    className={className}
    width={size} 
    height={size} 
    viewBox="0 0 60 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="30" cy="30" r="30" fill={color}/>
    <path d="M15.334 42.0011V42.0011C15.334 39.3358 17.494 37.1758 20.1593 37.1758H24.9847C27.65 37.1758 29.81 39.3358 29.81 42.0011V42.0011" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M25.5581 26.3462C27.2072 27.9952 27.2072 30.6689 25.5581 32.3179C23.9091 33.967 21.2355 33.967 19.5864 32.3179C17.9373 30.6689 17.9373 27.9952 19.5864 26.3462C21.2355 24.6971 23.9091 24.6971 25.5581 26.3462" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M38.1266 32.4094C41.7372 32.4094 44.6652 29.4814 44.6652 25.8707C44.6652 22.26 41.7386 19.332 38.1266 19.332C34.5146 19.332 31.5879 22.26 31.5879 25.8707" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M38.1348 32.4164C37.1508 32.4164 36.2188 32.1991 35.3814 31.8111L31.3574 32.6658L32.1988 28.6338C31.8081 27.7938 31.5894 26.8578 31.5894 25.8711" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M35.0829 25.9516C35.109 25.9776 35.109 26.0198 35.0829 26.0458C35.0569 26.0719 35.0147 26.0719 34.9887 26.0458C34.9626 26.0198 34.9626 25.9776 34.9887 25.9516C35.0147 25.9255 35.0569 25.9255 35.0829 25.9516" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M38.0829 25.9516C38.109 25.9776 38.109 26.0198 38.0829 26.0458C38.0569 26.0719 38.0147 26.0719 37.9887 26.0458C37.9626 26.0198 37.9626 25.9776 37.9887 25.9516C38.0147 25.9255 38.0569 25.9255 38.0829 25.9516" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M41.0829 25.9516C41.109 25.9776 41.109 26.0198 41.0829 26.0458C41.0569 26.0719 41.0147 26.0719 40.9887 26.0458C40.9626 26.0198 40.9626 25.9776 40.9887 25.9516C41.0147 25.9255 41.0569 25.9255 41.0829 25.9516" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);