import React from 'react';
import { theme } from '@/core/styles/theme';

interface ContentProps {
  children: React.ReactNode;
  collapsed: boolean;
  backgroundColor?: string; 
}

export const Content: React.FC<ContentProps> = ({
  children,
  collapsed,
  backgroundColor = '#ffffff' // Valor por defecto
}) => {
  const styles = {
    content: {
      marginLeft: collapsed ? '60px' : theme.layout.sidebarWidth,
      padding: '20px',
      width: `calc(100% - ${collapsed ? '60px' : theme.layout.sidebarWidth})`,
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: backgroundColor,
      transition: theme.transitions.default,
    },
    container: {
      maxWidth: theme.layout.containerMaxWidth,
      margin: '0 auto',
    },
  };

  return (
    <main style={styles.content }>
      <div style={styles.container}>
        {children}
      </div>
    </main>
  );
};