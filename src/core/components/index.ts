import React from 'react';

// Component exports
export * from './Button';
export * from './Card';
export * from './Login';
export { default as Login } from './Login/Login';
export { Counter } from './Counter';
export * from './Loading'; 
export { LoadingOverlay } from './Loading/LoadingOverlay';
export { LoadingSpinner } from './Loading/LoadingSpinner';
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
export { HomePage } from './HomePage/HomePage'; 
export { default as DashboardPage } from './Dashboard/DashboardPage';
export { Dashboard } from './Dashboard/';

// Typography exports - Asegurar exportación completa
export { Typography, default as TypographyDefault } from './Typography';
export type { TypographyProps, TypographyVariant, TypographyColor } from './Typography';

// PageTransition exports - Asegurar exportación completa
export { PageTransition } from './PageTransition';
export { usePageTransition } from './PageTransition';
export type { PageTransitionProps } from './PageTransition';

// Breadcrumb exports - Nuevo componente
export { Breadcrumb, default as BreadcrumbDefault } from './Breadcrumb';
export { useBreadcrumb } from './Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem, UseBreadcrumbOptions } from './Breadcrumb';

// Lazy exports para componentes de página
export const LazyComponents = {
  Login: React.lazy(() => import('./Login/Login')),
  NotFound: React.lazy(() => import('./NotFound')),
  Unauthorized: React.lazy(() => import('./Unauthorized')),
  HomePage: React.lazy(() => import('./HomePage/HomePage')),
  MainPage: React.lazy(() => import('./MainPage')),
  Dashboard: React.lazy(() => import('./Dashboard/DashboardPage')),
  Breadcrumb: React.lazy(() => import('./Breadcrumb/Breadcrumb')),
};