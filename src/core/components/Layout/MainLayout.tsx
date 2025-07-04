import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Content } from './Content';
import { useLayout } from './hooks/useLayout';

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  pageTitle?: string;
  logoSrc: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  sidebar,
  pageTitle,
  logoSrc,
}) => {
  const { isCollapsed, toggleSidebar } = useLayout();

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
    },
    body: {
      display: 'flex',
      flex: 1,
      paddingTop: '64px', // Header height
    },
  };

  return (
    <div style={styles.container}>
      <Header 
        logoUrl={logoSrc}
        altText="Consalud Logo"
        pageTitle={pageTitle}
      />
      
      <div style={styles.body}>
        {sidebar && (
          <Sidebar
            isCollapsed={isCollapsed}
            onToggle={toggleSidebar}
          >
            {sidebar}
          </Sidebar>
        )}
        
        <Content collapsed={!sidebar ? false : isCollapsed}>
          {children}
        </Content>
      </div>
    </div>
  );
};