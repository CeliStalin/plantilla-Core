import React, { useState } from 'react';
import './NetworkWarning.css';

interface NetworkWarningProps {
  message?: string;
  title?: string;
}

export const NetworkWarning: React.FC<NetworkWarningProps> = ({ 
  message = "Para acceder, debes estar conectado a la red de Consalud o usar VPN.",
  title = "Sin acceso a la red corporativa"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`network-warning ${isHovered ? 'shake-animation' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="warning-header">
        <span className="warning-icon">⚠️</span>
        <strong className="warning-title">{title}</strong>
      </div>
      <p className="warning-message">{message}</p>
    </div>
  );
};