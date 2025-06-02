import { useMemo } from 'react';

export const useGridStyles = () => {
  return useMemo(() => ({
    sectionStyle: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    } as React.CSSProperties,

    gridStyle: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '20px',
      padding: '20px 0'
    } as React.CSSProperties,

    cardStyle: {
      padding: '20px',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid #e1e5e9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '120px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    } as React.CSSProperties
  }), []);
};
