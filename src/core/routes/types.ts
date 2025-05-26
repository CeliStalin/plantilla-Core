import { LazyExoticComponent, ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  component: LazyExoticComponent<ComponentType<any>>; // Asegúrate de que 'component' sea de este tipo
  public?: boolean;
  roles?: string[];
  // Puedes añadir otras propiedades que uses, como 'exact', 'title', etc.
}