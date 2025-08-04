import React from 'react';

interface CalendarIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const CalendarIcon: React.FC<CalendarIconProps> = ({ 
  width = 24, 
  height = 24, 
  className = '' 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Rectángulo principal del calendario */}
      <rect 
        x="3" 
        y="4" 
        width="18" 
        height="18" 
        rx="2" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none"
      />
      
      {/* Anillos de enlace en la parte superior */}
      <rect 
        x="7" 
        y="2" 
        width="2" 
        height="4" 
        rx="1" 
        fill="currentColor"
      />
      <rect 
        x="15" 
        y="2" 
        width="2" 
        height="4" 
        rx="1" 
        fill="currentColor"
      />
      
      {/* Línea horizontal para separar el header */}
      <line 
        x1="3" 
        y1="9" 
        x2="21" 
        y2="9" 
        stroke="currentColor" 
        strokeWidth="2"
      />
      
      {/* Grid de días (cruces simples) */}
      <line x1="7" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="8" y1="11" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5"/>
      
      <line x1="12" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="13" y1="11" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5"/>
      
      <line x1="17" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="18" y1="11" x2="18" y2="13" stroke="currentColor" strokeWidth="1.5"/>
      
      <line x1="7" y1="16" x2="9" y2="16" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="8" y1="15" x2="8" y2="17" stroke="currentColor" strokeWidth="1.5"/>
      
      <line x1="12" y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="13" y1="15" x2="13" y2="17" stroke="currentColor" strokeWidth="1.5"/>
      
      <line x1="17" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="18" y1="15" x2="18" y2="17" stroke="currentColor" strokeWidth="1.5"/>
      
      <line x1="7" y1="20" x2="9" y2="20" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="8" y1="19" x2="8" y2="21" stroke="currentColor" strokeWidth="1.5"/>
      
      <line x1="12" y1="20" x2="14" y2="20" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="13" y1="19" x2="13" y2="21" stroke="currentColor" strokeWidth="1.5"/>
      
      <line x1="17" y1="20" x2="19" y2="20" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="18" y1="19" x2="18" y2="21" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
};

export default CalendarIcon; 