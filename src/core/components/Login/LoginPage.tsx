import React from 'react';
import { Login } from './Login';

export const LoginPage: React.FC = () => {
  return (
    <Login 
      logoSrc="/Logo.png"
      appName="Consalud"
    />
  );
};

export default LoginPage; 