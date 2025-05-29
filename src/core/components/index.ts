import React from 'react';
export * from './Button';
export * from './Card';
export * from './Login';
export { default as Login } from './Login/Login';
export { Counter } from './Counter';
export * from './Loading'; 
export { LoadingOverlay } from './Loading/LoadingOverlay';
export * from './Dashboard';
export { ErrorBoundary } from './ErrorBoundary';
export * from './ErrorMessage';
export * from './Layout';
export * from './MainPage';
export * from './NavMenu';
export * from './UserLogin';
export * from './Footer'; 
export { default as SecureLayout } from './SecureLayout/SecureLayout';
export { default as ProtectedRoute } from './ProtectedRoute';
export { default as NotFound } from './NotFound';
export { default as Unauthorized } from './Unauthorized';
export { default as HomePage } from './HomePage/HomePage';
export { default as Footer } from './Footer'; 
export { default as Dashboard } from './Dashboard';
export * from './Typography';

// Lazy exports para componentes de página
export const LazyComponents = {
  Login: React.lazy(() => import('./Login/Login')),
  NotFound: React.lazy(() => import('./NotFound')),
  Unauthorized: React.lazy(() => import('./Unauthorized')),
  HomePage: React.lazy(() => import('./HomePage/HomePage')),
  MainPage: React.lazy(() => import('./MainPage')),
  Dashboard: React.lazy(() => import('./Dashboard')),
};