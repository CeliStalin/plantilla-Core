import { keyframes } from '../styles/navMenu.styles';

let isStylesInjected = false;

export const injectMenuStyles = (): void => {
  // Evitar inyectar estilos múltiples veces
  if (isStylesInjected || typeof document === 'undefined') {
    return;
  }

  // Verificar si ya existe un style tag con nuestros estilos
  const existingStyle = document.getElementById('nav-menu-animations');
  if (existingStyle) {
    isStylesInjected = true;
    return;
  }

  // Crear el elemento style
  const styleElement = document.createElement('style');
  styleElement.id = 'nav-menu-animations';
  styleElement.textContent = `
    /* NavMenu CSS Variables */
    :root {
      --menu-icon-size: 24px;
      --menu-svg-size: 28px;
      --menu-text-size: 16px;
      --menu-button-padding: 12px 15px;
      --menu-text-spacing: 12px;
      --menu-font-weight: 500;
      --menu-letter-spacing: 0.5px;
      --menu-rotation-duration: 0.7s;
      --menu-rotation-easing: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    /* Keyframes para animaciones */
    ${keyframes}

    /* Clases para las animaciones */
    .menu-rotate-cw {
      animation: rotateCW var(--menu-rotation-duration) var(--menu-rotation-easing);
      transform-origin: center;
      perspective: 1000px;
      backface-visibility: hidden;
      -webkit-font-smoothing: subpixel-antialiased;
    }

    .menu-rotate-ccw {
      animation: rotateCCW var(--menu-rotation-duration) var(--menu-rotation-easing);
      transform-origin: center;
      perspective: 1000px;
      backface-visibility: hidden;
      -webkit-font-smoothing: subpixel-antialiased;
    }

    .menu-pulse {
      animation: pulse 0.3s ease-in-out;
    }

    /* Eliminar outlines en buttons */
    button::-moz-focus-inner {
      border: 0;
      padding: 0;
    }

    .menu-toggle-button::-moz-focus-inner {
      border: 0;
      padding: 0;
    }

    /* Forzar que el texto del menú no se transforme a mayúsculas */
    .menu-label {
      text-transform: none !important;
    }
  `;

  // Inyectar en el head
  document.head.appendChild(styleElement);
  isStylesInjected = true;
};

export const removeMenuStyles = (): void => {
  if (typeof document === 'undefined') return;
  
  const existingStyle = document.getElementById('nav-menu-animations');
  if (existingStyle) {
    existingStyle.remove();
    isStylesInjected = false;
  }
};
