import React from "react";
import Layout from './Layout/Layout';

const Mainpage: React.FC = () => {
  return (
    <Layout pageTitle="Main Page" logoSrc="/Logo.png" footerImageSrc="/Footer.svg">
      <div>
        <h1>Main Page</h1>
        <p>This is the main page content.</p>
      </div>
    </Layout>
  );
};

export default Mainpage;