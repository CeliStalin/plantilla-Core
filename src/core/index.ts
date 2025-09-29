// ================================================
// CORE COMPONENTS EXPORTS
// ================================================

// Importar estilos CSS
import './styles/index.css';

// Exportaciones principales de componentes
export * from './components/Breadcrumb';
export * from './components/Button';
export * from './components/Card';
export * from './components/Dashboard';
export * from './components/DatePicker';
export * from './components/ErrorBoundary';
export * from './components/ErrorMessage';
export * from './components/Footer';
export * from './components/HomePage';
export * from './components/Layout';
export * from './components/Loading';
export * from './components/Login';
export * from './components/MainPage';
export * from './components/NavMenu';
export * from './components/PageTransition';
export * from './components/SecureLayout';
export * from './components/Typography';
export * from './components/UserLogin';
export * from './components/Counter';
export * from './components/LoadingPlaceholder';
export * from './components/NotFound';
export * from './components/ProtectedRoute';
export * from './components/Unauthorized';

// Exportaciones de hooks
export * from './hooks/useAuth';
export * from './hooks/useCoreDevelopment';

// Exportaciones de contextos
export * from './context/AuthContext';
export * from './context/menu';

// Exportaciones de tipos
export * from './types';

// Exportaciones de interfaces
export * from './interfaces';

// Exportaciones de servicios
export * from './services/auth';

// Exportaciones de utilidades
export * from './utils';

// Exportaciones de configuración
export * from './config/development.config';
export * from './config/build.config';

// ================================================
// VERSION INFO
// ================================================

export const CORE_VERSION = '1.0.0';
export const CORE_NAME = '@consalud/core';

// ================================================
// DEVELOPMENT ONLY EXPORTS
// ================================================

// Solo exportar componentes de desarrollo si estamos en desarrollo
if (import.meta.env.DEV || (typeof window !== 'undefined' && window.location.hostname === 'localhost')) {
  // Importación dinámica para componentes de desarrollo
  import('./components/ComponentLibrary').then(module => {
    // Los componentes se cargan dinámicamente en desarrollo
  }).catch(error => {
    // Silenciar error si los componentes no existen
  });
}

// ================================================
// CORE OBJECT (Named export instead of default)
// ================================================

// Exportación nombrada con información del core
export const Core = {
  version: CORE_VERSION,
  name: CORE_NAME,
  isDevelopment: import.meta.env.DEV || (typeof window !== 'undefined' && window.location.hostname === 'localhost'),
  components: {
    // Lista de componentes disponibles
    Button: 'Button component with effects and variants',
    Card: 'Card component with header, content and footer',
    DatePicker: 'DatePicker component with calendar navigation and year selection',
    Typography: 'Typography system with Work Sans font',
    Loading: 'Loading components and overlays',
    ErrorBoundary: 'Error boundary for React components',
    Navigation: 'Navigation components (Breadcrumb, NavMenu)',
    Layout: 'Layout components and structures',
    Auth: 'Authentication components and hooks',
    // ... otros componentes
  }
};
