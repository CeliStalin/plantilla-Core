import LogoImage from './Logo.png';
import LogoutIcon from './Group.png';
import DocumentsFileCheckmarkSvg from './documents-file-checkmark.svg';
import MapsSvg from './Maps.svg';
import appSvg from './app.svg';
import RowSvg from './Row.svg';
import logoMiintranet from './logo-miintranet.png';
import logoPortalConsalud from './Logo.png';
import logoConsaludCDC from './Logo.png';
import FooterDesktop from './FooterDesktop.png'; 

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
  FooterDesktop, 
};

// Exportar por categorías para mejor organización
export const Images = {
  Logo: LogoImage,
  PortalConsalud: logoPortalConsalud,
  ConsaludCDC: logoConsaludCDC,
  Footer: FooterDesktop, 
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
  FooterDesktop, 
  Images,
  Icons,
};

export default Assets;