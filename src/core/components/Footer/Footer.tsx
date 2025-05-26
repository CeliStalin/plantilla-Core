import React from 'react';
import { footerStyles } from '../Footer/styles/Footer.styles';
import { FooterDesktop } from '../../../assets';

interface FooterProps {
  className?: string;
  showOnMobile?: boolean;
  customStyles?: React.CSSProperties;
}

export const Footer: React.FC<FooterProps> = ({ 
  className = '',
  showOnMobile = true,
  customStyles = {}
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
        src={FooterDesktop}
        alt="Consalud Footer"
        style={footerStyles.image}
        loading="lazy"
      />
    </footer>
  );
};

export default Footer;