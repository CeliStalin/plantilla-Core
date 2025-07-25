import React from 'react';
import { headerStyles } from '../styles/header.styles';
import Logo from '../../../../assets/Logo'; // Updated import to use SVG component

interface HeaderProps {
  logoUrl: string; // This prop is now effectively ignored for the main logo
  altText: string;
}

export const Header: React.FC<HeaderProps> = ({ logoUrl, altText }) => {
  return (
    <header style={headerStyles}>
      <Logo // Using the SVG component directly
        style={{ height: '40px', width: 'auto' }}
        aria-label={altText}
      />
    </header>
  );
};