import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BreadcrumbProps, BreadcrumbItem } from './types';

const defaultSeparator = <span>/</span>;
const defaultHomeIcon = <span>🏠</span>;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = defaultSeparator,
  maxItems,
  showHome = true,
  homeIcon = defaultHomeIcon,
  className = '',
  itemClassName = '',
  activeClassName = '',
  separatorClassName = '',
  onItemClick
}) => {
  const navigate = useNavigate();

  const handleItemClick = (item: BreadcrumbItem, index: number, event: React.MouseEvent) => {
    if (onItemClick) {
      event.preventDefault();
      onItemClick(item, index);
    } else if (item.path && !item.isActive) {
      navigate(item.path);
    }
  };

  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const itemClasses = [
      'breadcrumb-item',
      itemClassName,
      item.isActive || isLast ? `breadcrumb-item-active ${activeClassName}` : '',
    ].filter(Boolean).join(' ');

    const content = (
      <span className="breadcrumb-content">
        <span className="breadcrumb-label">{item.label}</span>
      </span>
    );

    if (item.path && !item.isActive && !isLast) {
      return (
        <Link
          key={index}
          to={item.path}
          className={itemClasses}
          onClick={(e) => handleItemClick(item, index, e)}
        >
          {content}
        </Link>
      );
    }

    return (
      <span key={index} className={itemClasses}>
        {content}
      </span>
    );
  };

  const renderSeparator = (index: number) => (
    <span key={`sep-${index}`} className={`breadcrumb-separator ${separatorClassName}`}>
      {separator}
    </span>
  );

  // Procesar items con límite máximo
  let processedItems = [...items];
  
  if (maxItems && items.length > maxItems) {
    const start = items.slice(0, 1);
    const end = items.slice(-(maxItems - 2));
    const ellipsis: BreadcrumbItem = { label: '...', isActive: false };
    processedItems = [...start, ellipsis, ...end];
  }

  // Agregar home si es necesario
  if (showHome && (!processedItems.length || processedItems[0].path !== '/')) {
    const homeItem: BreadcrumbItem = {
      label: 'Inicio',
      path: '/',
      icon: homeIcon
    };
    processedItems.unshift(homeItem);
  }

  const breadcrumbClasses = [
    'breadcrumb',
    className
  ].filter(Boolean).join(' ');

  return (
    <nav className={breadcrumbClasses} aria-label="breadcrumb">
      <ol className="breadcrumb-list">
        {processedItems.map((item, index) => {
          const isLast = index === processedItems.length - 1;
          return (
            <li key={index} className="breadcrumb-list-item">
              {renderItem(item, index, isLast)}
              {!isLast && renderSeparator(index)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
