import React from 'react';
import { RouteConfig } from './types';

export const routes: RouteConfig[] = [
  {
    path: "/login",
    component: React.lazy(() => import('../components/Login/LoginPage')),
    public: true,
    title: "Iniciar Sesión",
    breadcrumbLabel: "Login",
    hideBreadcrumb: true
  },
  {
    path: "/",
    component: React.lazy(() => import('../components/HomePage/HomePage')),
    title: "Inicio",
    breadcrumbLabel: "Inicio"
  },
  {
    path: "/home",
    component: React.lazy(() => import('../components/HomePage/HomePage')),
    title: "Inicio",
    breadcrumbLabel: "Inicio"
  },
  {
    path: "/dashboard",
    component: React.lazy(() => import('../components/Dashboard/DashboardPage')),
    title: "Dashboard",
    breadcrumbLabel: "Panel de Control"
  },
  {
    path: "/unauthorized",
    component: React.lazy(() => import('../components/Unauthorized').then(module => ({ default: module.Unauthorized }))),
    public: true,
    title: "No Autorizado",
    breadcrumbLabel: "Sin Acceso",
    hideBreadcrumb: true
  },
  // Ruta de la librería de componentes (solo visible en desarrollo)
  {
    path: "/library",
    component: React.lazy(() => import('../components/ComponentLibrary/ComponentLibraryWrapper')),
    public: true,
    title: "Librería de Componentes",
    breadcrumbLabel: "Componentes",
    hideBreadcrumb: false
  }
];