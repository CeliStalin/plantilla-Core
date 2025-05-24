import { theme } from '@/core/styles/theme';

export const homePageStyles = {
  container: {
    padding: '0', 
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    width: '100%' 
  },
  
  mainContent: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
    padding: '0 20px' 
  },
  
  leftColumn: {
    flex: '0 0 58.333333%', 
    minWidth: 0
  },
  
  rightColumn: {
    flex: '0 0 41.666667%', 
    minWidth: 0
  }
};

export const responsiveHomePageStyles = {
  mobile: {
    container: {
      padding: '0', 
      backgroundColor: '#ffffff'
    },
    
    mainContent: {
      flexDirection: 'column' as const,
      gap: '1.5rem',
      padding: '0 10px' 
    },
    
    leftColumn: {
      flex: '1 1 100%'
    },
    
    rightColumn: {
      flex: '1 1 100%'
    }
  }
};
