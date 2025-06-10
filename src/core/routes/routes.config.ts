import React from 'react';
import { RouteConfig } from './types';

export const routes: RouteConfig[] = [
  {
    path: "/login",
    component: React.lazy(() => import('../components/Login/Login')),
    public: true,
    title: "Iniciar Sesión",
    breadcrumbLabel: "Login",
    hideBreadcrumb: true
  },
  {
    path: "/",
    component: React.lazy(() => import('../components/HomePage/HomePage')),
    roles: ['Developers'],
    title: "Inicio",
    breadcrumbLabel: "Inicio"
  },
  {
    path: "/home",
    component: React.lazy(() => import('../components/HomePage/HomePage')),
    roles: ['Developers'],
    title: "Inicio",
    breadcrumbLabel: "Inicio"
  },
  {
    path: "/dashboard",
    component: React.lazy(() => import('../components/Dashboard/DashboardPage')),
    roles: ['Developers'],
    title: "Dashboard",
    breadcrumbLabel: "Panel de Control"
  },
  {
    path: "/unauthorized",
    component: React.lazy(() => import('../components/Unauthorized')),
    public: true,
    title: "No Autorizado",
    breadcrumbLabel: "Sin Acceso",
    hideBreadcrumb: true
  }
];