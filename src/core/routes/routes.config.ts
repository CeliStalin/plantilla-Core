import React from 'react';
import { RouteConfig } from './types';

export const routes: RouteConfig[] = [
  {
    path: "/login",
    component: React.lazy(() => import('../components/Login/Login')),
    public: true
  },
  {
    path: "/",
    component: React.lazy(() => import('../components/HomePage/HomePage')),
    roles: ['Developers']
  },
  {
    path: "/home",
    component: React.lazy(() => import('../components/HomePage/HomePage')),
    roles: ['Developers']
  },
  {
    path: "/dashboard",
    component: React.lazy(() => import('../components/Dashboard/DashboardPage')),
    roles: ['Developers']
  },
  {
    path: "/unauthorized",
    component: React.lazy(() => import('../components/Unauthorized')),
    public: true
  }
];