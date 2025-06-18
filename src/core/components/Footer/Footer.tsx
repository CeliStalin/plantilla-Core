import React from 'react';
import { footerStyles } from '../Footer/styles/Footer.styles';

interface FooterProps {
  className?: string;
  showOnMobile?: boolean;
  customStyles?: React.CSSProperties;
  footerImageSrc: string;
}

export const Footer: React.FC<FooterProps> = ({ 
  className = '',
  showOnMobile = true,
  customStyles = {},
  footerImageSrc
}) => {
  const combinedStyles = {
    ...footerStyles.container,
    ...customStyles
  };

  return (
    <footer 
      className={`app-footer ${className} ${!showOnMobile ? 'hide-on-mobile' : ''}`}
      style={combinedStyles}
    >
      <img 
        src={footerImageSrc}
        alt="Consalud Footer"
        style={footerStyles.image}
        loading="lazy"
      />
    </footer>
  );
};

export default Footer;