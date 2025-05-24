import LogoImage from './Logo.png';
import LogoutIcon from './Group.png';
import DocumentsFileCheckmarkSvg from './documents-file-checkmark.svg';
import MapsSvg from './Maps.svg';
import appSvg from './app.svg';
import RowSvg from './Row.svg';
import logoMiintranet from './logo-miintranet.png';
// Agregar las nuevas imágenes
import logoPortalConsalud from './Logo.png';
import logoConsaludCDC from './Logo.png';

// Exportar individualmente para mantener compatibilidad
export {
  LogoImage,
  LogoutIcon,
  DocumentsFileCheckmarkSvg,
  MapsSvg,
  appSvg,
  RowSvg,
  logoMiintranet,
  logoPortalConsalud,
  logoConsaludCDC,
};

// Exportar por categorías para mejor organización
export const Images = {
  Logo: LogoImage,
  PortalConsalud: logoPortalConsalud,
  ConsaludCDC: logoConsaludCDC,
};

export const Icons = {
  Logout: LogoutIcon,
  DocumentsFileCheckmark: DocumentsFileCheckmarkSvg,
  MapsIcon: MapsSvg,
  AppIcon: appSvg,
  RrowIcon: RowSvg,
  logoIntranet: logoMiintranet
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