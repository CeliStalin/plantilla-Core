import React from 'react';
import { footerStyles } from '../Footer/styles/Footer.styles';
import FooterLogo from '../../../assets/FooterLogo';

interface FooterProps {
  className?: string;
  showOnMobile?: boolean;
  customStyles?: React.CSSProperties;
  footerImageSrc?: string; // Mantener la prop para compatibilidad, pero no usarla por defecto
  children?: React.ReactNode;
  backgroundColor?: string;
}

/**
 * Footer principal del sistema.
 * Compatible con Bulma y personalizable.
 */
export const Footer: React.FC<FooterProps> = ({
  className = '',
  showOnMobile = true,
  customStyles = {},
  // footerImageSrc,
  children,
  backgroundColor = '#F8F8FA',
}) => {
  const combinedStyles = {
    ...footerStyles.container,
    ...customStyles,
    position: 'relative' as const,
    width: '100%',
    backgroundColor: backgroundColor,
    borderTop: '1px solid #e5e5e5',
    boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)',
    zIndex: 50,
    padding: '12px 0',
    minHeight: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <footer
      className={`footer app-footer ${className} ${!showOnMobile ? 'hide-on-mobile' : ''}`}
      style={combinedStyles}
      data-testid="app-footer"
    >
      <FooterLogo
        style={{
          height: '60px',
          width: 'auto',
          maxWidth: '300px',
          display: 'block',
          objectFit: 'contain',
        }}
        aria-label="Consalud Footer"
      />
      {children}
    </footer>
  );
};

export default Footer;