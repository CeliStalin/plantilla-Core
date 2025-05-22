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
  
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px'
  },
  
  card: {
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '20px',
    cursor: 'pointer',
    backgroundColor: 'white',
    transition: 'all 0.2s ease',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit'
  },
  
  cardTitle: {
    fontWeight: 500,
    color: '#505050',
    margin: 0,
    fontSize: '0.95rem'
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