import { theme } from '@/core/styles/theme';

export const welcomeSectionStyles = {
  container: {
    marginBottom: '40px',
    display: 'flex',
    alignItems: 'center'
  },
  
  iconContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '20px'
  },
  
  content: {
    flex: 1
  },
  
  title: {
    color: '#424242',
    marginBottom: '0.5rem',
    fontSize: '2rem',
    fontWeight: 600
  },
  
  subtitle: {
    color: '#757575',
    fontSize: '0.95rem',
    lineHeight: '1.4',
    margin: 0
  }
};

export const responsiveWelcomeStyles = {
  mobile: {
    container: {
      flexDirection: 'column' as const,
      textAlign: 'center' as const
    },
    
    iconContainer: {
      marginRight: 0,
      marginBottom: '16px'
    }
  }
};