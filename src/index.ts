// Este es el único punto de entrada de tu librería.
// Desde aquí se exporta todo lo que la aplicación consumidora necesita.

// 1. Exporta todo desde el 'core' que ya tiene las exportaciones explícitas.
export * from './core';

// 2. Exporta los tipos principales que necesita la aplicación.
export type {
  Theme,
  TextColors,
  ThemeColors,
  TypographyProps,
  TypographyVariant,
  TypographyColor,
  PageTransitionProps,
  UsePageTransitionOptions,
  UsePageTransitionReturn,
  IUser,
  IUsuarioAD,
  IRol,
  RolResponse,
  IUserExterno,
  IExternalAuthState
} from './core';