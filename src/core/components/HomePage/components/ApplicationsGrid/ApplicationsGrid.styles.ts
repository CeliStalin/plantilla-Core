import { theme } from '@/core/styles/theme';

export const applicationsGridStyles = {
  container: {
    marginBottom: '2rem'
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
    fontWeight: 500,
    margin: 0
  },
    divider: {
    width: '100%',
    height: '2px',
    backgroundColor: '#D1D5DB',
    marginTop: '8px',
    marginBottom: '24px',
    borderRadius: '1px',
    opacity: 0.8
  },
  
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(250px, 1fr))',
    gap: '16px',
    width: '100%'
  },
  
  card: {
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '20px 24px',
    cursor: 'pointer',
    backgroundColor: 'white',
    transition: 'all 0.2s ease',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
    minHeight: '60px'
  },
  
  cardTitle: {
    fontWeight: 500,
    color: '#666666',
    margin: 0,
    fontSize: '15px',
    letterSpacing: '-0.01em'
  },
  
  emptyCard: {
    opacity: 0.7
  }
};

export const responsiveApplicationsStyles = {
  mobile: {
    grid: {
      gridTemplateColumns: '1fr'
    }
  }
};