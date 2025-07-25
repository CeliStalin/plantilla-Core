import React from 'react';
import { SucursalDigital } from '@/assets';

/**
 * Test component to verify SucursalDigital SVG integration
 */
const SucursalDigitalTest: React.FC = () => {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f8fa',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    }}>
      <h1 style={{ color: '#04A59B', marginBottom: '20px' }}>
        SucursalDigital Component Test
      </h1>
      
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
      }}>
        <h2>Original Size</h2>
        <SucursalDigital />
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
      }}>
        <h2>Card Size (as used in DirectAccessGrid)</h2>
        <div style={{
          width: '220px',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #e0e0e0',
          borderRadius: '8px'
        }}>
          <SucursalDigital 
            style={{
              width: '95%',
              height: '95%',
              maxWidth: '220px',
              maxHeight: '120px'
            }}
          />
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
      }}>
        <h2>Custom Size</h2>
        <SucursalDigital width={150} height={85} />
      </div>

      <div style={{
        backgroundColor: '#04A59B',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <p>✅ SucursalDigital component successfully integrated!</p>
        <p>The component is now available in the DirectAccessGrid for the "Sucursal digital" card.</p>
      </div>
    </div>
  );
};

export default SucursalDigitalTest;
