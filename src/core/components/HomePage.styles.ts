import { theme } from '../styles/theme';

export const homePageStyles = {
  container: {
    padding: '40px 60px',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh'
  },
  
  welcomeSection: {
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
  
  title: {
    color: '#424242',
    marginBottom: '0.5rem'
  },
  
  subtitle: {
    color: '#757575',
    fontSize: '0.95rem',
    lineHeight: '1.4'
  },
  
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  },
  
  sectionTitle: {
    color: '#424242',
    marginLeft: '8px',
    fontSize: '1.25rem',
    fontWeight: 500
  },
  
  applicationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px'
  },
  
  appCard: {
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '20px',
    cursor: 'pointer',
    backgroundColor: 'white',
    transition: 'all 0.2s ease',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  
  appCardHover: {
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transform: 'translateY(-2px)'
  },
  
  appCardTitle: {
    fontWeight: 500,
    color: '#505050'
  },
  
  directAccessGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px'
  },
  
  accessCard: {
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '30px',
    cursor: 'pointer',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    minHeight: '120px'
  },
  
  accessCardHover: {
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  
  accessCardImage: {
    maxHeight: '50px',
    maxWidth: '100%'
  }
};

export const responsiveStyles = {
  mobile: {
    container: {
      padding: '20px'
    },
    
    welcomeSection: {
      flexDirection: 'column' as const,
      textAlign: 'center' as const
    },
    
    iconContainer: {
      marginRight: 0,
      marginBottom: '16px'
    },
    
    applicationsGrid: {
      gridTemplateColumns: '1fr'
    }
  },
  
  tablet: {
    container: {
      padding: '30px'
    }
  }
};