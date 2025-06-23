import React from 'react';
import { Login } from './Login';
import Logo from '../../../assets/Logo.png';

export const LoginPage: React.FC = () => {
  return (
    <Login 
      logoSrc={Logo}
      appName="Consalud"
    />
  );
};

export default LoginPage; 