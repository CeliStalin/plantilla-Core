import React from 'react';

const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Consalud Logo - Simplified version */}
    <g>
      {/* Background circle/container */}
      <circle cx="20" cy="20" r="18" fill="#04A59B" stroke="#027373" strokeWidth="2"/>
      
      {/* Letter C */}
      <path d="M12 15C12 12.2386 14.2386 10 17 10H23C25.7614 10 28 12.2386 28 15V25C28 27.7614 25.7614 30 23 30H17C14.2386 30 12 27.7614 12 25V15Z" fill="white"/>
      <path d="M17 12C15.3431 12 14 13.3431 14 15V25C14 26.6569 15.3431 28 17 28H23C24.6569 28 26 26.6569 26 25V15C26 13.3431 24.6569 12 23 12H17Z" fill="#04A59B"/>
      
      {/* Text "Consalud" */}
      <text x="45" y="25" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#04A59B">
        Consalud
      </text>
    </g>
  </svg>
);

export default Logo; 