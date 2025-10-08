import React from 'react';

/**
 * Icono de Logout
 * Componente SVG optimizado para React con TypeScript
 * Compatible con aplicaciones externas que consumen el core como tgz
 */
const LogoutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="25" 
    viewBox="0 0 24 25" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
    role="img"
    aria-label="Icono de cerrar sesión"
  >
    <path 
      d="M16 12.6992H4" 
      stroke="white" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M10.998 7.69922L15.999 12.7002L10.998 17.7002" 
      stroke="white" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M16 4.69922H18C19.105 4.69922 20 5.59422 20 6.69922V18.6992C20 19.8042 19.105 20.6992 18 20.6992H16" 
      stroke="white" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default LogoutIcon;
