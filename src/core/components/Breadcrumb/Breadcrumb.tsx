import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BreadcrumbProps, BreadcrumbItem } from './types';
import './Breadcrumb.styles.css';

const defaultSeparator = <span>{'>'}</span>;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = defaultSeparator,
  maxItems,
  showHome = true,
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
    } else if (item.path && !item.isActive) {      navigate(item.path);
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
          aria-current={isLast ? 'page' : undefined}
        >
          {content}
        </Link>
      );
    }

    return (
      <span 
        key={index} 
        className={itemClasses}
        aria-current={isLast ? 'page' : undefined}
      >
        {content}
      </span>    );
  };

  const renderSeparator = (index: number) => (
    <span key={`sep-${index}`} className={`breadcrumb-separator ${separatorClassName}`} aria-hidden="true">
      {separator}
    </span>
  );

  // Limpieza defensiva: eliminar cualquier slash inicial en los labels
  let processedItems = [...items].map(item => ({
    ...item,
    label: typeof item.label === 'string' ? item.label.replace(/^\/+/, '') : item.label
  }));

  // Verificar si ya existe un ítem "Inicio" o "Home" en la lista
  const hasHomeItem = processedItems.some(item => 
    item.label.toLowerCase().includes('inicio') || 
    item.label.toLowerCase().includes('home') ||
    item.path === '/' ||
    item.path === '/home'
  );

  // Aplicar límite máximo si está especificado
  if (maxItems && processedItems.length > maxItems) {
    const start = processedItems.slice(0, 1);
    const end = processedItems.slice(-(maxItems - 2));
    const ellipsis: BreadcrumbItem = { 
      label: '...', 
      isActive: false 
    };
    processedItems = [...start, ellipsis, ...end];
  }

  // Agregar home solo si es necesario y no existe ya
  if (showHome && !hasHomeItem) {
    const homeItem: BreadcrumbItem = {
      label: 'Inicio',
      path: '/home'
    };
    processedItems.unshift(homeItem);
  }

  // Marcar el último ítem como activo si no está especificado
  if (processedItems.length > 0) {
    const lastItem = processedItems[processedItems.length - 1];
    if (lastItem.isActive === undefined) {
      lastItem.isActive = true;
    }
  }
  const breadcrumbClasses = [
    'breadcrumb',
    className
  ].filter(Boolean).join(' ');

  if (processedItems.length === 0) {
    return null;
  }

  return (
    <nav className={breadcrumbClasses} aria-label="Navegación de migas de pan">
      <ol className="breadcrumb-list">
        {processedItems.map((item, index) => {
          const isLast = index === processedItems.length - 1;
          return (
            <li key={`breadcrumb-${index}`} className="breadcrumb-list-item">
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
