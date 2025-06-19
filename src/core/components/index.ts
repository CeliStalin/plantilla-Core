import React from 'react';

/**
 * Core Components
 * @public
 */
export { Button } from './Button';
export { Card } from './Card';
export { ErrorBoundary } from './ErrorBoundary/ErrorBoundary';
export { ErrorMessage } from './ErrorMessage';
export { Footer } from './Footer/Footer';
export { HomePage } from './HomePage/HomePage';
export { Layout } from './Layout/Layout';
export { Content } from './Layout/Content';
export { Header } from './Layout/Header';
export { Sidebar } from './Layout/Sidebar';
export { default as Login } from './Login/Login';
export { default as MainPage } from './MainPage';
export { NavMenuApp } from './NavMenu';
export { PageTransition } from './PageTransition';
export { default as ProtectedRoute } from './ProtectedRoute';
export { default as SecureLayout } from './SecureLayout/SecureLayout';
export { Typography } from './Typography';

/**
 * Loading Components
 * @public
 */
export { 
  LoadingDots,
  LoadingOverlay,
  LoadingSpinner 
} from './Loading';

/**
 * Navigation Components
 * @public
 */
export { 
  Breadcrumb,
  useBreadcrumb,
  type BreadcrumbProps,
  type BreadcrumbItem,
  type UseBreadcrumbOptions 
} from './Breadcrumb';

/**
 * Page Components
 * @public
 */
export { default as Dashboard } from './Dashboard/DashboardPage';

/**
 * Typography Types
 * @public
 */
export type { 
  TypographyProps,
  TypographyVariant,
  TypographyColor,
  TypographyWeight,
  TypographyAlign 
} from './Typography';

/**
 * Page Transition Types & Hooks
 * @public
 */
export { usePageTransition } from './PageTransition/hooks/usePageTransition';
export type { 
  PageTransitionProps 
} from './PageTransition/PageTransition.types';

/**
 * Lazy-loaded Components
 * @public
 */
export const LazyComponents = {
  Login: React.lazy(() => import('./Login/Login')),
  NotFound: React.lazy(() => import('./NotFound')),
  Unauthorized: React.lazy(() => import('./Unauthorized')),
  HomePage: React.lazy(() => import('./HomePage/HomePage')),
  MainPage: React.lazy(() => import('./MainPage')),
  Dashboard: React.lazy(() => import('./Dashboard/DashboardPage')),
  Breadcrumb: React.lazy(() => import('./Breadcrumb/Breadcrumb')),
};

/**
 * Menu Components
 * @public
 */
export { useMenuCollapse, MenuCollapseProvider } from '../context/menu';
