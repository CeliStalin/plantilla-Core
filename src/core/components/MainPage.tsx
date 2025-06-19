import React from "react";
import { Layout } from "./Layout/Layout";
import { Logo } from '@/assets';

const MainPage: React.FC = () => {
  return (
    <Layout pageTitle="Inicio" logoSrc={Logo} footerImageSrc="">
      <div className="content-container" style={{ minHeight: '400px', backgroundColor: '#ffffff' }}>
        {/* Página de inicio completamente vacía, solo con fondo blanco */}
      </div>
    </Layout>
  );
};

export default MainPage;