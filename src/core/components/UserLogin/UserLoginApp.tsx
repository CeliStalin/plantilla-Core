import React, { useState, useEffect, useRef } from 'react';
import { IUser } from '../../interfaces/IUserAz';
import useAuth from '../../hooks/useAuth';
import { AuthProvider } from '../../services/auth/authProviderMsal';
import { LoadingDots } from '../Login/components/LoadingDots';

interface UserLoginAppProps {
  logoutIconSrc: string;
  msalReady?: boolean;
}

const UserLoginApp: React.FC<UserLoginAppProps> = ({ msalReady = true, logoutIconSrc }) => {
  if (!msalReady) {
    return <div>Cargando autenticación...</div>;
  }
  const auth = useAuth();
  const [localUserData, setLocalUserData] = useState<IUser | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const { logout, usuario, user, isLoggingOut, loadUserData } = auth; // Incluir 'user' como alias
  const menuRef = useRef<HTMLDivElement>(null);
  const [isProcessingLogout, setIsProcessingLogout] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    // Priorizar 'usuario' pero usar 'user' como fallback para compatibilidad
    const effectiveUser = usuario || user;
    if (effectiveUser) {
      console.log("Usuario encontrado en contexto:", effectiveUser.displayName);
      setLocalUserData(effectiveUser);
      return;
    }
    
    try {
      const userString = localStorage.getItem('usuario');
      if (userString) {
        const parsedUser = JSON.parse(userString);
        console.log("Usuario encontrado en localStorage:", parsedUser.displayName);
        setLocalUserData(parsedUser);
      } else {
        console.log("No se encontró información de usuario en localStorage");
        // Si no hay datos en localStorage pero debería haberlos, intentar cargarlos
        if (loadUserData) {
          setDataLoading(true);
          loadUserData().finally(() => setDataLoading(false));
        }
      }
    } catch (e) {
      console.error('Error al parsear los datos del usuario:', e);
    }
  }, [usuario, user, loadUserData]); // Incluir 'user' en dependencias

  // Función para verificar que los datos están completos
  const verifyUserData = React.useCallback(() => {
    const effectiveUserData = usuario || localUserData;
    if (!effectiveUserData || !effectiveUserData.displayName) {
      console.log("Datos de usuario incompletos, intentando cargar...");
      setDataLoading(true);
      // Intentar cargar los datos de nuevo
      loadUserData && loadUserData().finally(() => setDataLoading(false));
    }
  }, [usuario, localUserData, loadUserData]);

  // Llamar a verificar datos cuando cambia el usuario
  useEffect(() => {
    verifyUserData();
  }, [usuario, localUserData, verifyUserData]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowInfo(false);
      }
    }

    if (showInfo) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showInfo]);

  // Log de estado de logout
  useEffect(() => {
    if (!isLoggingOut) {
      setIsProcessingLogout(false);
    }
  }, [isLoggingOut]);

  const handleToggleMenu = () => {
    setShowInfo(prevState => !prevState);
  };

  const effectiveUserData = usuario || user || localUserData; // Usar cualquiera que esté disponible
  const avatarSrc = effectiveUserData?.photo || 'https://www.gravatar.com/avatar?d=mp';
  
  const handleLogout = async () => {
    // Evitar múltiples clicks
    if (isProcessingLogout || isLoggingOut) {
      return;
    }
    
    setIsProcessingLogout(true);
    setLocalUserData(null);
    setShowInfo(false);
    
    // Limpiar localStorage/sessionStorage primero
    localStorage.removeItem('isLogin');
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioAD');
    localStorage.removeItem('roles');
    sessionStorage.removeItem('authMethod');
    
    try {
      // Verificar método de autenticación usado
      const authMethod = sessionStorage.getItem('authMethod');
      
      if (authMethod === 'redirect') {
        // Si usamos redirección para login, usar redirección para logout
        await AuthProvider.logoutRedirect();
      } else {
        // Si no, usar el método normal
        await logout();
      }
      
      // Redirección manual en caso de que el método de MSAL no funcione
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    } catch (error) {
      console.error('Error durante logout:', error);
      // Redirección al login en caso de error
      window.location.href = '/login';
      setIsProcessingLogout(false);
    }
  };
  
  return (
    <div
      className="identify"
      style={{ 
        position: 'relative',
        display: 'flex', 
        alignItems: 'center',
        gap: '15px'
      }}
      ref={menuRef}
    >
      {dataLoading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LoadingDots size="small" color="white" />
          <span style={{ color: 'white', fontSize: '0.9rem' }}>Cargando...</span>
        </div>
      ) : (
        <div 
          onClick={handleToggleMenu}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: showInfo ? 'rgba(0, 0, 0, 0.1)' : 'transparent' 
          }}
        >
          <img
            src={avatarSrc}
            alt="Usuario"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '2px solid #ffffff',
              boxShadow: '0 0 6px rgba(0, 0, 0, 0.1)',
              marginRight: '10px',
            }}
          />
          
          {effectiveUserData && effectiveUserData.displayName && (
            <div style={{ color: '#ffffff', fontSize: '0.9rem' }}>
              <div>{getNameAndSurname()}</div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleLogout}
        disabled={isProcessingLogout || isLoggingOut}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          padding: '6px 12px',
          color: 'white',
          fontSize: '0.9rem',
          cursor: (isProcessingLogout || isLoggingOut) ? 'wait' : 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: (isProcessingLogout || isLoggingOut) ? 0.7 : 1
        }}
        onMouseOver={(e) => {
          if (!isProcessingLogout && !isLoggingOut) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <img 
          src={logoutIconSrc}
          alt="logout icon"
          style={{
            width: '30px',
            height: '30px',
          }}
        />
        {isProcessingLogout || isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
      </button>

      {showInfo && effectiveUserData && (
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: 0,
            backgroundColor: '#1e2a38',
            color: '#ffffff',
            padding: '12px',
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            zIndex: 10,
            width: '230px',
            fontSize: '0.85rem',
            lineHeight: '1.4',
          }}
        >
          <p>{effectiveUserData.displayName}</p>
          <p>{effectiveUserData.mail || effectiveUserData.userPrincipalName}</p>
        </div>
      )}
    </div>
  );

  // Obtener nombre y apellido de displayName
  function getNameAndSurname() {
    if (effectiveUserData?.displayName) {
      const parts = effectiveUserData.displayName.split(' ');
      if (parts.length >= 3) {
        // Si tiene 3 o más partes, tomamos el primer nombre y el tercer elemento (primer apellido)
        return `${parts[0]} ${parts[2]}`;
      } else if (parts.length >= 2) {
        // Si tiene exactamente 2 partes, las mostramos tal cual
        return `${parts[0]} ${parts[1]}`;
      }
      return effectiveUserData.displayName;
    }
    return '';
  }
};

export default UserLoginApp;