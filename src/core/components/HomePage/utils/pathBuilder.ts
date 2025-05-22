export const buildAppPath = (controlador: string, accion: string): string => {
    const formattedControlador = controlador.toLowerCase();
    const formattedAccion = accion.toLowerCase();
    return `/${formattedControlador}/${formattedAccion}`;
  };
  
  export const getFirstName = (displayName?: string): string => {
    if (!displayName) return 'Usuario';
    return displayName.split(' ')[0];
  };
  