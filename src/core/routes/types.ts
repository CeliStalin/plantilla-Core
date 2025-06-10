import { LazyExoticComponent, ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  component: LazyExoticComponent<ComponentType<any>>; // Asegúrate de que 'component' sea de este tipo
  public?: boolean;
  roles?: string[];
  // propiedades para breadcrumb
  title?: string;
  breadcrumbLabel?: string;
  hideBreadcrumb?: boolean;
  // Puedes añadir otras propiedades que uses, como 'exact', 'title', etc.
}