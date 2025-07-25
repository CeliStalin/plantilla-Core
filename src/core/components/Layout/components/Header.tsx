import React from 'react';
import { UserLoginApp } from '../../UserLogin/UserLoginApp';
import { headerStyles } from '../styles/header.styles';
import Logo from '../../../../assets/Logo'; // Updated import to use SVG component

interface HeaderProps {
  logoUrl: string; // This prop is now effectively ignored for the main logo
  altText: string;
  pageTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ logoUrl, altText, pageTitle }) => {
  return (
    <header style={headerStyles.container}>
      <div style={headerStyles.logoContainer}>
        <Logo // Using the SVG component directly
          style={headerStyles.logo}
          aria-label={altText}
        />
        {pageTitle && (
          <>
            <span style={headerStyles.separator}>|</span>
            <span style={headerStyles.pageTitle}>
              {pageTitle}
            </span>
          </>
        )}
      </div>
      <UserLoginApp logoutIconSrc="/logout.svg" />
    </header>
  );
};