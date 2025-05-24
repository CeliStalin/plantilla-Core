export * from './core/components';
export { AuthProvider } from './core/context/AuthContext';
export { AuthProvider as MsalAuthProvider } from './core/services/auth/authProviderMsal';
export * from './core/hooks';
export * from './core/interfaces';
export * from './core/services';
export * from './core/utils';
export * from './core/routes';
export * from './core/context';
export * from './assets';
export { default as Assets } from './assets';

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


/* Asegurar que el layout-body use todo el ancho disponible */
.layout-body {
  width: 100%;
  max-width: 100%;
}

.layout-body main {
  width: 100%;
  max-width: 100%;
}

/* Asegurar que el contenedor del HomePage no tenga restricciones */
.homepage-container {
  width: 100%;
  max-width: 100%;
}

/* Responsive adjustments */
@media (min-width: 1400px) {
  .homepage-container {
    padding-left: 60px !important;
    padding-right: 60px !important;
  }
}

@media (min-width: 1600px) {
  .homepage-container {
    padding-left: 80px !important;
    padding-right: 80px !important;
  }
}

/* Animación spin si no la has agregado aún */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}