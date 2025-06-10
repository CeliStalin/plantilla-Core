export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  showHome?: boolean;
  homeIcon?: React.ReactNode;
  className?: string;
  itemClassName?: string;
  activeClassName?: string;
  separatorClassName?: string;
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
}

export interface UseBreadcrumbOptions {
  showHome?: boolean;
  homeLabel?: string;
  homePath?: string;
  routeTitleMap?: Record<string, string>;
}
