import { theme } from '@/core/styles/theme';

export const directAccessGridStyles = {
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
    gridTemplateColumns: '1fr',
    gap: '20px'
  },
  
  card: {
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '30px',
    cursor: 'pointer',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    minHeight: '120px',
    textDecoration: 'none',
    color: 'inherit'
  },
  
  cardImage: {
    maxHeight: '50px',
    maxWidth: '100%',
    objectFit: 'contain' as const
  }
};