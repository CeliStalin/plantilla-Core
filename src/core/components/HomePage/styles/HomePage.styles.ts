import { theme } from '@/core/styles/theme';

export const homePageStyles = {
  container: {
    padding: '40px 60px',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh'
  },
  
  mainContent: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start'
  },
  
  leftColumn: {
    flex: '0 0 58.333333%', // is-7 equivalent
    minWidth: 0
  },
  
  rightColumn: {
    flex: '0 0 41.666667%', // is-5 equivalent
    minWidth: 0
  }
};

export const responsiveHomePageStyles = {
  mobile: {
    container: {
      padding: '20px'
    },
    
    mainContent: {
      flexDirection: 'column' as const,
      gap: '1.5rem'
    },
    
    leftColumn: {
      flex: '1 1 100%'
    },
    
    rightColumn: {
      flex: '1 1 100%'
    }
  }
};
