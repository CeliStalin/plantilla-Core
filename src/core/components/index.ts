import React from 'react'; // Added import
export * from './Button';
export * from './Card';
export * from './Login';
export { Counter } from './Counter';
export * from './Loading'; 
export * from './Dashboard';
export * from './ErrorBoundary';
export * from './ErrorMessage';
export * from './Layout';
export * from './MainPage';
export * from './NavMenu';
export * from './UserLogin';
export { default as SecureLayout } from './SecureLayout/SecureLayout';
export { default as ProtectedRoute } from './ProtectedRoute';

// Lazy exports para componentes de página
export const LazyComponents = {
  Login: React.lazy(() => import('./Login/Login')),
  NotFound: React.lazy(() => import('./NotFound')),
  Unauthorized: React.lazy(() => import('./Unauthorized')),
  HomePage: React.lazy(() => import('./HomePage/HomePage')),
  MainPage: React.lazy(() => import('./MainPage')),
};