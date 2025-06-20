import React from 'react';

/**
 * Este archivo es el punto de entrada para todos los componentes del core.
 * Exporta cada componente para que puedan ser importados desde '@consalud/core/components' o '@consalud/core'.
 * @public
 */

// --- Exportaciones Nombradas ---
export { Button } from './Button';
export { Card } from './Card';
export { Counter } from './Counter';
export { DashboardFallback } from './Dashboard';
export { ErrorBoundary } from './ErrorBoundary/ErrorBoundary';
export { ErrorMessage } from './ErrorMessage';
export { Footer } from './Footer/Footer';
export { HomePage } from './HomePage/HomePage';
export { Layout } from './Layout/Layout';
export { NavMenuApp } from './NavMenu';
export { PageTransition } from './PageTransition';
export { Typography } from './Typography';
export { UserLoginApp } from './UserLogin';
export { Breadcrumb, useBreadcrumb } from './Breadcrumb';
export { LoadingDots, LoadingOverlay, LoadingSpinner } from './Loading';

// --- Exportaciones por Defecto (renombradas) ---
export { default as DashboardPage } from './Dashboard/DashboardPage';
export { default as Login } from './Login/Login';
export { default as MainPage } from './MainPage';
export { default as NotFound } from './NotFound';
export { default as ProtectedRoute } from './ProtectedRoute';
export { default as SecureLayout } from './SecureLayout/SecureLayout';
export { default as Unauthorized } from './Unauthorized';

// --- Exportación de Tipos de Componentes ---
export type { BreadcrumbProps, BreadcrumbItem, UseBreadcrumbOptions } from './Breadcrumb';
export type { TypographyProps, TypographyVariant, TypographyColor, TypographyWeight, TypographyAlign } from './Typography';
export type { PageTransitionProps } from './PageTransition/PageTransition.types';
