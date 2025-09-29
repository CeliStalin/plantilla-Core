import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { AuthProvider } from '../services/auth/authProviderMsal';
import { getMe, getUsuarioAD, getRoles } from '../services/auth/authService';
import { AuthService } from '../services/auth/authService';
import useLocalStorage from './useLocalStorage';
import { IUser } from '../interfaces/IUserAz';
import { RolResponse } from '../interfaces/IRol';
import { UsuarioAd } from '../interfaces/IUsuarioAD';
import { useAuthContext } from '../context/AuthContext';
import { SecureStorageWrapper } from '../services/SecureStorageWrapper';

interface AuthState {
  isSignedIn: boolean;
  usuario: IUser | null;
  usuarioAD: UsuarioAd | null;
  roles: RolResponse[];
  loading: boolean;
  error: string | null;
  errorAD: string | null;
  errorRoles: string | null;
}

interface UseAuthReturn extends AuthState {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuthentication: () => Promise<boolean>;
  loadUserData: () => Promise<void>;
  hasRole: (roleName: string) => boolean;
  hasAnyRole: (allowedRoles: string[]) => boolean;
  isInitializing: boolean;
  isLoggingOut: boolean;
  authAttempts: number;
  maxAuthAttempts: number;
  // Agregar alias para compatibilidad con apps externas
  user: IUser | null; // Alias de usuario
}

let msalReadyPromise: Promise<void> | null = null;

export function ensureMsalInitialized(): Promise<void> {
  if (!msalReadyPromise) {
    msalReadyPromise = AuthProvider.initialize();
  }
  return msalReadyPromise;
}

export const useAuth = (): UseAuthReturn => {
  const { isLoggingOut, setIsLoggingOut } = useAuthContext();
  
  // CAMBIO SEGURO: Usar SecureStorageWrapper para la inicialización
  // pero manteniendo useLocalStorage para compatibilidad con código existente
  const [isSignedIn, setIsSignedIn] = useLocalStorage<boolean>('isLogin', SecureStorageWrapper.isAuthenticated());
  const [usuario, setUsuario] = useLocalStorage<IUser | null>('usuario', null);
  const [usuarioAD, setUsuarioAD] = useLocalStorage<UsuarioAd | null>('usuarioAD', null);
  const [roles, setRoles] = useLocalStorage<RolResponse[]>('roles', []);
  
  // Estado local sin persistencia
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorAD, setErrorAD] = useState<string | null>(null);
  const [errorRoles, setErrorRoles] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [authAttempts, setAuthAttempts] = useState<number>(0);
  const maxAuthAttempts = 3; // Máximo número de intentos
  const cache = useRef(new Map());

  // Inicialización y verificación de estado de autenticación
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Esperar a que MSAL esté inicializado
        await ensureMsalInitialized();
        
        if (!mounted) return;

        // Verificar si hay redirección pendiente
        const redirectResponse = await AuthProvider.handleRedirectPromise();
        
        if (redirectResponse && redirectResponse.account) {
          
          // Actualizar SecureStorageWrapper
          SecureStorageWrapper.setAuthenticationState(true);
          
          setIsSignedIn(true);
          
          //  Guardar información básica no sensible
          if (redirectResponse.account) {
            SecureStorageWrapper.saveUserBasicInfo({
              id: redirectResponse.account.homeAccountId,
              displayName: redirectResponse.account.name || ''
            });
          }
        } else {
          // Verificar estado de autenticación usando método mejorado
          const signedIn = await AuthProvider.isAuthenticated();
          
          if (signedIn !== isSignedIn) {
            // Actualizar SecureStorageWrapper
            SecureStorageWrapper.setAuthenticationState(signedIn);
            
            setIsSignedIn(signedIn);
          }
        }
      } catch (error) {
      } finally {
        if (mounted && !isLoggingOut) {
          setIsInitializing(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const loadUserData = useCallback(async () => {
    if (!isSignedIn) {
      setUsuario(null);
      setUsuarioAD(null);
      setRoles([]);
      setError(null);
      setErrorAD(null);
      setErrorRoles(null);
      return;
    }
    
    // Si ya tenemos todos los datos, no volvemos a cargarlos
    if (usuario && usuarioAD && roles.length > 0 && !loading) {
      // PERO verificar si falta la foto y obtenerla si es necesario
      if (usuario && !usuario.photo) {
        try {
          const photoUrl = await AuthService.getUserPhoto();
          if (photoUrl) {
            const updatedUsuario = { ...usuario, photo: photoUrl };
            setUsuario(updatedUsuario);
            
            // También actualizar localStorage
            try {
              const storedUser = localStorage.getItem('usuario');
              if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                const updatedStoredUser = { ...parsedUser, photo: photoUrl };
                localStorage.setItem('usuario', JSON.stringify(updatedStoredUser));
              }
            } catch (e) {
            }
          }
        } catch (error) {
        }
      }
      return;
    }

    // Verificar que realmente tengamos una sesión válida antes de cargar datos
    try {
      const isValidSession = await AuthProvider.isAuthenticated();
      if (!isValidSession) {
        SecureStorageWrapper.setAuthenticationState(false);
        setIsSignedIn(false);
        return;
      }
    } catch (error) {
      setError("Error al verificar la sesión");
      return;
    }

    // Solo mostrar loading si realmente vamos a hacer llamadas
    if (!usuario || !usuarioAD || roles.length === 0) {
      setLoading(true);
      // Limpiar errores previos al iniciar nueva carga
      setError(null);
      setErrorAD(null);
      setErrorRoles(null);
    }

    try {
      // Obtener datos del usuario con mejor manejo de errores
      const userData = await getMe();
      
      if (typeof userData === 'string') {
        try {
          const parsedError = JSON.parse(userData);
          if (parsedError.Error) {
            setError(parsedError.Error);
            setUsuario(null);
            return; // Salir si hay error
          }
        } catch (e) {
          setError('Error al procesar la respuesta del usuario');
          setUsuario(null);
          return; // Salir si hay error
        }
      } else {
        
        // Obtener la foto del usuario si no está presente
        if (!userData.photo) {
          try {
            const photoUrl = await AuthService.getUserPhoto();
            if (photoUrl) {
              userData.photo = photoUrl;
            } else {
            }
          } catch (error) {
          }
        } else {
        }
        
        setUsuario(userData);
        cache.current.set(userData.id, userData);
        
        // Guardar solo datos básicos no sensibles
        SecureStorageWrapper.saveUserBasicInfo({
          id: userData.id,
          displayName: userData.displayName
        });
        
        const email = userData.mail || userData.userPrincipalName;
        if (email) {

          //Ejecutar llamadas en paralelo para mejorar rendimiento
          const [adDataResult, rolesDataResult] = await Promise.allSettled([
            getUsuarioAD(email),
            getRoles(email)
          ]);

          // Procesar resultado de AD
          if (adDataResult.status === 'fulfilled') {
            setUsuarioAD(adDataResult.value);
            setErrorAD(null);
          } else {
            setErrorAD(adDataResult.reason instanceof Error ? adDataResult.reason.message : String(adDataResult.reason));
          }

          // Procesar resultado de roles
          if (rolesDataResult.status === 'fulfilled') {
            setRoles(rolesDataResult.value);
            setErrorRoles(null);
            
            //Guardar nombres de rol (no sensibles)
            if (rolesDataResult.value && rolesDataResult.value.length > 0) {
              const roleNames = rolesDataResult.value.map(role => role.Rol);
              SecureStorageWrapper.saveUserBasicInfo({
                roles: roleNames
              });
            }
          } else {
            setErrorRoles(rolesDataResult.reason instanceof Error ? rolesDataResult.reason.message : String(rolesDataResult.reason));
          }
        } else {
          setErrorAD("No se pudo obtener email del usuario");
          setErrorRoles("No se pudo obtener email del usuario");
        }
      }
    } catch (err) {
      
      // Distinguir entre diferentes tipos de errores
      const errorMessage = err instanceof Error ? err.message : String(err);
      
      if (errorMessage.includes('No hay una sesión activa')) {
        SecureStorageWrapper.setAuthenticationState(false);
        setIsSignedIn(false);
        setError("La sesión ha expirado. Por favor, inicia sesión nuevamente.");
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        setError("Error de conexión. Verifica tu conexión a internet.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [isSignedIn, usuario, usuarioAD, roles.length, loading, setIsSignedIn]);

  // Asegurarnos de que loadUserData se llame cuando el usuario inicie sesión
  useEffect(() => {
    if (isSignedIn && !loading) {
      loadUserData();
    }
  }, [isSignedIn, loadUserData]);

  const checkAuthentication = useCallback(async () => {
    try {
      //Usar tiempo de espera para evitar bloqueos
      const authPromise = AuthProvider.isAuthenticated();
      const timeoutPromise = new Promise<boolean>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout verificando autenticación')), 5000)
      );
      
      const authenticated = await Promise.race([authPromise, timeoutPromise]);
      
      if (authenticated !== isSignedIn) {
        //Actualizar SecureStorageWrapper
        SecureStorageWrapper.setAuthenticationState(authenticated);
        
        setIsSignedIn(authenticated);
        
        // Si cambió a no autenticado, limpiar datos
        if (!authenticated) {
          setUsuario(null);
          setUsuarioAD(null);
          setRoles([]);
          cache.current.clear();
        }
      }
      
      // Incrementar contador de intentos si no está autenticado
      if (!authenticated) {
        setAuthAttempts(prevAttempts => prevAttempts + 1);
      } else {
        // Resetear contador si está autenticado
        setAuthAttempts(0);
      }
      
      return authenticated;
    } catch (error) {
      return false;
    }
  }, [isSignedIn, setIsSignedIn]);

  const login = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Asegurarse de que MSAL esté inicializado
      await AuthProvider.initialize();
      // Iniciar sesión
      await AuthProvider.login();
      
      //Actualizar SecureStorageWrapper
      SecureStorageWrapper.setAuthenticationState(true);
      
      setIsSignedIn(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setIsSignedIn]);

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    
    try {
      setLoading(true);
      
      //Limpiar datos de SecureStorageWrapper
      SecureStorageWrapper.clearAuthData();
      
      // Limpiar estado local ANTES del logout de MSAL
      localStorage.removeItem('isLogin');
      localStorage.removeItem('usuario');
      localStorage.removeItem('usuarioAD');
      localStorage.removeItem('roles');
      sessionStorage.removeItem('authMethod');
      
      // Determinar si estamos usando el flujo de redirección
      const isRedirectFlow = AuthProvider.isUsingRedirectFlow();
      
      if (isRedirectFlow) {
        // Logout con redirección
        await AuthProvider.logoutRedirect();
        // No continuamos la ejecución aquí, ya que la redirección nos llevará a otra página
        return;
      } else {
        // Logout normal
        await AuthProvider.logout();
      }
      
      // Limpiar estados (solo se ejecuta para logout normal, no redirect)
      setUsuario(null);
      setUsuarioAD(null);
      setRoles([]);
      setIsSignedIn(false);
      cache.current.clear();
      
      // Redirección manual al login después del logout
      window.location.href = '/login';
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      
      // Limpieza manual en caso de error
      try {
        sessionStorage.clear();
        localStorage.removeItem('isLogin');
        localStorage.removeItem('usuario');
        localStorage.removeItem('usuarioAD');
        localStorage.removeItem('roles');
        
        //Limpiar wrapper seguro
        SecureStorageWrapper.clearAuthData();
        
        setIsSignedIn(false);
        
        // Redirección al login en caso de error
        window.location.href = '/login';
      } catch (e) {
      }
      
      throw err;
    } finally {
      setLoading(false);
      // Dar tiempo para que la redirección se complete o para mostrar mensaje de carga
      setTimeout(() => {
        setIsLoggingOut(false);
      }, 2000);
    }
  }, [setIsLoggingOut]);

  const hasRole = useCallback((roleName: string): boolean => {
    if (!roles || roles.length === 0) {
      return false;
    }
    
    // Verificar caso exacto
    const exactMatch = roles.some(role => 
      role && typeof role === 'object' && 'Rol' in role && role.Rol === roleName
    );
    
    // Verificar ignorando mayúsculas/minúsculas
    const caseInsensitiveMatch = roles.some(role => 
      role && typeof role === 'object' && 'Rol' in role && 
      role.Rol.toLowerCase() === roleName.toLowerCase()
    );
    
    // Devolver coincidencia exacta o insensible a mayúsculas según necesidades
    return exactMatch || caseInsensitiveMatch;
  }, [roles]);

  const hasAnyRole = useCallback((allowedRoles: string[]): boolean => {
    // Si no se requieren roles, permitir acceso
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }
    
    // Si no hay roles asignados, denegar acceso
    if (!roles || roles.length === 0) {
      return false;
    }
    
    // Crear arrays normalizados para comparación case-insensitive
    const normalizedAllowedRoles = allowedRoles.map(role => 
      typeof role === 'string' ? role.toLowerCase() : ''
    );
    
    const normalizedUserRoles = roles.map(role => 
      role && typeof role === 'object' && 'Rol' in role && typeof role.Rol === 'string' 
        ? role.Rol.toLowerCase() 
        : ''
    );
    
    // Verificar si tiene alguno de los roles permitidos
    const hasPermission = normalizedAllowedRoles.some(role => 
      normalizedUserRoles.includes(role)
    );
    
    if (!hasPermission) {
      // Usuario sin permisos
    }
    
    return hasPermission;
  }, [roles]);

  return useMemo(() => ({
    isSignedIn,
    usuario,
    usuarioAD,
    roles,
    loading,
    error,
    errorAD,
    errorRoles,
    login,
    logout,
    checkAuthentication,
    loadUserData,
    hasRole,
    hasAnyRole,
    isInitializing,
    isLoggingOut,
    authAttempts,
    maxAuthAttempts,
    // Agregar alias para compatibilidad externa
    user: usuario // Alias que apunta a usuario
  }), [
    isSignedIn,
    usuario,
    usuarioAD,
    roles,
    loading,
    error,
    errorAD,
    errorRoles,
    login,
    logout,
    checkAuthentication,
    loadUserData,
    hasRole,
    hasAnyRole,
    isInitializing,
    isLoggingOut,
    authAttempts
  ]);
};

export default useAuth;