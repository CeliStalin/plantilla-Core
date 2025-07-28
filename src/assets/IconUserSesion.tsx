import React from 'react';

/**
 * Icono de usuario para sesión
 * Componente SVG optimizado para React con TypeScript
 * Compatible con aplicaciones externas que consumen el core como tgz
 */
const IconUserSesion: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="25" 
    viewBox="0 0 24 25" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
    role="img"
    aria-label="Icono de usuario de sesión"
  >
    <path d="M12 6.5C13.6569 6.5 15 7.84315 15 9.5C15 11.1569 13.6569 12.5 12 12.5C10.3431 12.5 9 11.1569 9 9.5C9 7.84315 10.3431 6.5 12 6.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M18 19.5C15.2386 22.2614 8.76142 22.2614 6 19.5C6.5 18.5 7.5 17.5 9 17H15C16.5 17 17.5 18 18 19.5Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

export default IconUserSesion; 