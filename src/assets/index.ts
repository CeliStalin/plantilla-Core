// Importar archivos específicos
import LogoImage from './Logo.png';
import LogoutIcon from './Group.png';
import DocumentsFileCheckmarkSvg from './documents-file-checkmark.svg';
import MapsSvg from './Maps.svg';
import appSvg from './app.svg';
import RowSvg from './Row.svg';

// Exportar individualmente para mantener compatibilidad
export {
  LogoImage,
  LogoutIcon,
  DocumentsFileCheckmarkSvg,
  MapsSvg,
  appSvg,
  RowSvg,
  
};

// Exportar por categorías para mejor organización
export const Images = {
  Logo: LogoImage,
  // Agregar más imágenes aquí
};

export const Icons = {
  Logout: LogoutIcon,
  DocumentsFileCheckmark: DocumentsFileCheckmarkSvg,
  MapsIcon :MapsSvg,
  AppIcon :appSvg,
  RrowIcon: RowSvg
  // Agregar más iconos aquí
};

// Objeto consolidado
const Assets = {
  LogoImage,
  LogoutIcon,
  DocumentsFileCheckmarkSvg,
  Images,
  Icons,
};

export default Assets;