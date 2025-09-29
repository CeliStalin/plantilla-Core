import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingOverlay } from '../Loading/LoadingOverlay';
import { DatePicker } from '../DatePicker';
import { theme } from '../../styles/theme';
import './ComponentLibrary.styles.css';

interface ComponentSection {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  category: 'components' | 'animations' | 'typography' | 'effects';
}

const ComponentLibrary: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showLoadingDemo, setShowLoadingDemo] = useState<boolean>(false);
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'Todos', count: 0 },
    { id: 'components', name: 'Componentes', count: 0 },
    { id: 'animations', name: 'Animaciones', count: 0 },
    { id: 'typography', name: 'Tipografía', count: 0 },
    { id: 'effects', name: 'Efectos', count: 0 },
  ];

  const componentSections: ComponentSection[] = [
    // Componentes
    {
      id: 'buttons',
      title: 'Botones',
      description: 'Componentes de botones con diferentes variantes y efectos',
      category: 'components',
      component: (
        <div className="component-showcase">
          <div className="component-grid">
            <div className="component-item">
              <h4>Botón Primario</h4>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                border: 'none',
                padding: '12px 24px',
                fontSize: '1rem',
                backgroundColor: '#04A59B',
                color: 'white',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }} onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }} onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}>
                Botón Primario
              </button>
            </div>
            <div className="component-item">
              <h4>Botón Secundario</h4>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                border: '2px solid #04A59B',
                padding: '12px 24px',
                fontSize: '1rem',
                backgroundColor: 'transparent',
                color: '#04A59B'
              }} onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = '#04A59B';
                e.currentTarget.style.color = 'white';
              }} onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#04A59B';
              }}>
                Botón Secundario
              </button>
            </div>
            <div className="component-item">
              <h4>Botón Peligro</h4>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                border: 'none',
                padding: '12px 24px',
                fontSize: '1rem',
                backgroundColor: '#dc3545',
                color: 'white'
              }} onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(220, 53, 69, 0.3)';
              }} onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                Botón Peligro
              </button>
            </div>
            <div className="component-item">
              <h4>Botón Fantasma</h4>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                border: 'none',
                padding: '12px 24px',
                fontSize: '1rem',
                backgroundColor: 'transparent',
                color: '#666'
              }} onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }} onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}>
                Botón Fantasma
              </button>
            </div>
            <div className="component-item">
              <h4>Botón con Efectos</h4>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                border: 'none',
                padding: '12px 24px',
                fontSize: '1rem',
                backgroundColor: '#04A59B',
                color: 'white',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }} onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), 0 0 20px rgba(4, 165, 155, 0.5)';
              }} onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }} onClick={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
                setTimeout(() => {
                  e.currentTarget.style.transform = 'scale(1)';
                }, 150);
              }}>
                Con Efectos
              </button>
            </div>
            <div className="component-item">
              <h4>Botón Deshabilitado</h4>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease-in-out',
                cursor: 'not-allowed',
                border: 'none',
                padding: '12px 24px',
                fontSize: '1rem',
                backgroundColor: '#04A59B',
                color: 'white',
                opacity: 0.6
              }} disabled>
                Deshabilitado
              </button>
            </div>
            <div className="component-item">
              <h4>Botón Cargando</h4>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease-in-out',
                cursor: 'wait',
                border: 'none',
                padding: '12px 24px',
                fontSize: '1rem',
                backgroundColor: '#04A59B',
                color: 'white',
                gap: '8px'
              }} disabled>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Cargando...
              </button>
            </div>
            <div className="component-item">
              <h4>Botón con Icono</h4>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                border: 'none',
                padding: '12px 24px',
                fontSize: '1rem',
                backgroundColor: '#04A59B',
                color: 'white',
                gap: '8px'
              }} onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }} onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}>
                <span>🚀</span>
                Con Icono
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'datepicker',
      title: 'DatePicker',
      description: 'Componente para selección de fechas con calendario interactivo',
      category: 'components',
      component: (
        <div className="component-showcase">
          <div className="component-grid">
            <div className="component-item">
              <h4>DatePicker Básico</h4>
              <DatePicker 
                label="Label"
                placeholder="Seleccionar fecha"
                onChange={(date) => {}}
              />
            </div>
            <div className="component-item">
              <h4>DatePicker con Valor Inicial</h4>
              <DatePicker 
                label="Fecha de Nacimiento"
                placeholder="Seleccionar fecha de nacimiento"
                value={new Date('2022-03-12')}
                onChange={(date) => {}}
              />
            </div>
            <div className="component-item">
              <h4>DatePicker con Rango de Fechas</h4>
              <DatePicker 
                label="Fecha de Reserva"
                placeholder="Seleccionar fecha de reserva"
                minDate={new Date()}
                maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
                onChange={(date) => {}}
              />
            </div>
            <div className="component-item">
              <h4>DatePicker Deshabilitado</h4>
              <DatePicker 
                label="Fecha Deshabilitada"
                placeholder="Seleccionar fecha"
                disabled={true}
                value={new Date()}
                onChange={(date) => {}}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cards',
      title: 'Tarjetas',
      description: 'Componentes de tarjetas con diferentes estilos',
      category: 'components',
      component: (
        <div className="component-showcase">
          <div className="component-grid">
            <div className="component-item">
              <h4>Tarjeta Básica</h4>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                padding: '1rem',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Contenido de la Tarjeta</h3>
                <p style={{ margin: 0, color: '#666' }}>Esta es una tarjeta básica con contenido simple.</p>
              </div>
            </div>
            <div className="component-item">
              <h4>Tarjeta con Título</h4>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '1rem',
                  borderBottom: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc'
                }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Título de la Tarjeta</h3>
                </div>
                <div style={{ padding: '1rem' }}>
                  <p style={{ margin: 0, color: '#666' }}>Tarjeta con un título personalizado.</p>
                </div>
              </div>
            </div>
            <div className="component-item">
              <h4>Tarjeta con Footer</h4>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
              }}>
                <div style={{ padding: '1rem' }}>
                  <p style={{ margin: 0, color: '#666' }}>Tarjeta con un footer personalizado.</p>
                </div>
                <div style={{
                  padding: '1rem',
                  borderTop: '1px solid #e2e8f0',
                  backgroundColor: '#f9f9f9'
                }}>
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>Footer de la tarjeta</div>
                </div>
              </div>
            </div>
            <div className="component-item">
              <h4>Tarjeta Completa</h4>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '1rem',
                  borderBottom: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc'
                }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Tarjeta Completa</h3>
                </div>
                <div style={{ padding: '1rem' }}>
                  <p style={{ margin: 0, color: '#666' }}>Tarjeta con título, contenido y footer.</p>
                </div>
                <div style={{
                  padding: '1rem',
                  borderTop: '1px solid #e2e8f0',
                  backgroundColor: '#f9f9f9'
                }}>
                  <button style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#04A59B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}>Acción</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'typography',
      title: 'Tipografía',
      description: 'Sistema de tipografía y fuentes',
      category: 'typography',
      component: (
        <div className="component-showcase">
          <div className="typography-showcase">
            <div className="typography-item">
              <h1 style={{ 
                fontSize: '2.25rem', 
                fontWeight: 700, 
                margin: '0 0 0.5rem 0',
                fontFamily: 'Work Sans, sans-serif'
              }}>Título H1 - Work Sans Bold</h1>
              <p style={{ 
                fontSize: '0.75rem', 
                color: '#666', 
                margin: 0,
                fontStyle: 'italic'
              }}>Font: Work Sans, Weight: 700, Size: 2.25rem</p>
            </div>
            <div className="typography-item">
              <h2 style={{ 
                fontSize: '1.875rem', 
                fontWeight: 600, 
                margin: '0 0 0.5rem 0',
                fontFamily: 'Work Sans, sans-serif'
              }}>Título H2 - Work Sans Semibold</h2>
              <p style={{ 
                fontSize: '0.75rem', 
                color: '#666', 
                margin: 0,
                fontStyle: 'italic'
              }}>Font: Work Sans, Weight: 600, Size: 1.875rem</p>
            </div>
            <div className="typography-item">
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 600, 
                margin: '0 0 0.5rem 0',
                fontFamily: 'Work Sans, sans-serif'
              }}>Título H3 - Work Sans Semibold</h3>
              <p style={{ 
                fontSize: '0.75rem', 
                color: '#666', 
                margin: 0,
                fontStyle: 'italic'
              }}>Font: Work Sans, Weight: 600, Size: 1.5rem</p>
            </div>
            <div className="typography-item">
              <h4 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 500, 
                margin: '0 0 0.5rem 0',
                fontFamily: 'Work Sans, sans-serif'
              }}>Título H4 - Work Sans Medium</h4>
              <p style={{ 
                fontSize: '0.75rem', 
                color: '#666', 
                margin: 0,
                fontStyle: 'italic'
              }}>Font: Work Sans, Weight: 500, Size: 1.25rem</p>
            </div>
            <div className="typography-item">
              <h5 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 500, 
                margin: '0 0 0.5rem 0',
                fontFamily: 'Work Sans, sans-serif'
              }}>Título H5 - Work Sans Medium</h5>
              <p style={{ 
                fontSize: '0.75rem', 
                color: '#666', 
                margin: 0,
                fontStyle: 'italic'
              }}>Font: Work Sans, Weight: 500, Size: 1.125rem</p>
            </div>
            <div className="typography-item">
              <h6 style={{ 
                fontSize: '1rem', 
                fontWeight: 500, 
                margin: '0 0 0.5rem 0',
                fontFamily: 'Work Sans, sans-serif'
              }}>Título H6 - Work Sans Medium</h6>
              <p style={{ 
                fontSize: '0.75rem', 
                color: '#666', 
                margin: 0,
                fontStyle: 'italic'
              }}>Font: Work Sans, Weight: 500, Size: 1rem</p>
            </div>
            <div className="typography-item">
              <p style={{ 
                fontSize: '1rem', 
                fontWeight: 400, 
                margin: '0 0 0.5rem 0',
                fontFamily: 'Work Sans, sans-serif'
              }}>Texto de cuerpo - Work Sans Regular</p>
              <p style={{ 
                fontSize: '0.75rem', 
                color: '#666', 
                margin: 0,
                fontStyle: 'italic'
              }}>Font: Work Sans, Weight: 400, Size: 1rem</p>
            </div>
            <div className="typography-item">
              <p style={{ 
                fontSize: '1.125rem', 
                fontWeight: 400, 
                margin: '0 0 0.5rem 0',
                fontFamily: 'Work Sans, sans-serif'
              }}>Texto de cuerpo grande - Work Sans Regular</p>
              <p style={{ 
                fontSize: '0.75rem', 
                color: '#666', 
                margin: 0,
                fontStyle: 'italic'
              }}>Font: Work Sans, Weight: 400, Size: 1.125rem</p>
            </div>
            <div className="typography-item">
              <p style={{ 
                fontSize: '0.875rem', 
                fontWeight: 400, 
                margin: '0 0 0.5rem 0',
                fontFamily: 'Work Sans, sans-serif'
              }}>Texto de cuerpo pequeño - Work Sans Regular</p>
              <p style={{ 
                fontSize: '0.75rem', 
                color: '#666', 
                margin: 0,
                fontStyle: 'italic'
              }}>Font: Work Sans, Weight: 400, Size: 0.875rem</p>
            </div>
            <div className="typography-item">
              <p style={{ 
                fontSize: '0.75rem', 
                fontWeight: 400, 
                margin: '0 0 0.5rem 0',
                fontFamily: 'Work Sans, sans-serif'
              }}>Texto de caption - Work Sans Regular</p>
              <p style={{ 
                fontSize: '0.75rem', 
                color: '#666', 
                margin: 0,
                fontStyle: 'italic'
              }}>Font: Work Sans, Weight: 400, Size: 0.75rem</p>
            </div>
            <div className="typography-item">
              <p style={{ 
                fontSize: '1rem', 
                fontWeight: 500, 
                margin: '0 0 0.5rem 0',
                fontFamily: 'Work Sans, sans-serif'
              }}>Texto de botón - Work Sans Medium</p>
              <p style={{ 
                fontSize: '0.75rem', 
                color: '#666', 
                margin: 0,
                fontStyle: 'italic'
              }}>Font: Work Sans, Weight: 500, Size: 1rem</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'animations',
      title: 'Animaciones',
      description: 'Efectos de animación y transiciones',
      category: 'animations',
      component: (
        <div className="component-showcase">
          <div className="animation-showcase">
            <div className="animation-item">
              <h4>Bounce Effect</h4>
              <div className="animation-demo bounce-demo">
                <div className="bounce-element">Bounce</div>
              </div>
            </div>
            <div className="animation-item">
              <h4>Fade In Up</h4>
              <div className="animation-demo fade-demo">
                <div className="fade-element">Fade In Up</div>
              </div>
            </div>
            <div className="animation-item">
              <h4>Spin Animation</h4>
              <div className="animation-demo spin-demo">
                <div className="spin-element">⚡</div>
              </div>
            </div>
            <div className="animation-item">
              <h4>Ripple Effect</h4>
              <div className="animation-demo ripple-demo">
                <button className="ripple-button">Click para Ripple</button>
              </div>
            </div>
            <div className="animation-item">
              <h4>Card Bounce</h4>
              <div className="animation-demo card-bounce-demo">
                <div className="card-bounce-element">
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    padding: '1rem',
                    border: '1px solid #e2e8f0'
                  }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Tarjeta con Bounce</h3>
                    <p style={{ margin: 0, color: '#666' }}>Esta tarjeta tiene un efecto de bounce.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="animation-item">
              <h4>Scale Effect</h4>
              <div className="animation-demo scale-demo">
                <div className="scale-element">Scale</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'loading',
      title: 'Estados de Carga',
      description: 'Componentes para mostrar estados de carga',
      category: 'components',
      component: (
        <div className="component-showcase">
          <div className="component-grid">
            <div className="component-item">
              <h4>Loading Overlay</h4>
              <div style={{ position: 'relative', height: '200px', border: '1px solid #ddd' }}>
                <LoadingOverlay show={showLoadingDemo} message="Cargando datos..." />
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <p>Contenido de ejemplo</p>
                  <button 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '9999px',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease-in-out',
                      cursor: 'pointer',
                      border: 'none',
                      padding: '8px 16px',
                      fontSize: '0.875rem',
                      backgroundColor: '#04A59B',
                      color: 'white',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                    onClick={() => setShowLoadingDemo(!showLoadingDemo)}
                  >
                    {showLoadingDemo ? 'Ocultar' : 'Mostrar'} Loading
                  </button>
                </div>
              </div>
            </div>
            <div className="component-item">
              <h4>Loading Placeholder</h4>
              <div style={{ 
                width: '100%', 
                padding: '10px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                background: '#f8fafc'
              }}>
                <div style={{
                  height: '56px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'loading 1.5s infinite'
                }} />
                <div style={{
                  height: '56px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'loading 1.5s infinite',
                  animationDelay: '0.2s'
                }} />
                <div style={{
                  height: '56px',
                  borderRadius: '8px',
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'loading 1.5s infinite',
                  animationDelay: '0.4s'
                }} />
                <style>
                  {`
                    @keyframes loading {
                      0% { background-position: 200% 0; }
                      100% { background-position: -200% 0; }
                    }
                  `}
                </style>
              </div>
            </div>
            <div className="component-item">
              <h4>Spinner</h4>
              <div className="spinner-demo">
                <div className="loading-spinner"></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'errors',
      title: 'Manejo de Errores',
      description: 'Componentes para mostrar errores y mensajes',
      category: 'components',
      component: (
        <div className="component-showcase">
          <div className="component-grid">
            <div className="component-item">
              <h4>Error Message</h4>
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                marginTop: '16px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                color: '#dc3545',
                border: '1px solid #dc3545'
              }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>❌</span>
                <span>Este es un mensaje de error de ejemplo</span>
              </div>
            </div>
            <div className="component-item">
              <h4>Warning Message</h4>
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                marginTop: '16px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                color: '#ffc107',
                border: '1px solid #ffc107'
              }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>⚠️</span>
                <span>Este es un mensaje de advertencia</span>
              </div>
            </div>
            <div className="component-item">
              <h4>Info Message</h4>
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                marginTop: '16px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(23, 162, 184, 0.1)',
                color: '#17a2b8',
                border: '1px solid #17a2b8'
              }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>ℹ️</span>
                <span>Este es un mensaje informativo</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'navigation',
      title: 'Navegación',
      description: 'Componentes de navegación',
      category: 'components',
      component: (
        <div className="component-showcase">
          <div className="component-grid">
            <div className="component-item">
              <h4>Breadcrumb</h4>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem 0',
                fontSize: '0.875rem',
                color: '#6b7280',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
              }}>
                <nav style={{ display: 'flex', alignItems: 'center' }}>
                  <ol style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    margin: 0, 
                    padding: 0, 
                    listStyle: 'none',
                    gap: 0
                  }}>
                    <li style={{ display: 'flex', alignItems: 'center' }}>
                      <a href="#" style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: '#6b7280',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.375rem',
                        fontWeight: 400,
                        transition: 'all 0.2s ease-in-out'
                      }} onMouseOver={(e) => {
                        e.currentTarget.style.color = '#04A59B';
                        e.currentTarget.style.backgroundColor = '#f0fdfc';
                      }} onMouseOut={(e) => {
                        e.currentTarget.style.color = '#6b7280';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}>
                        Inicio
                      </a>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0 0.375rem',
                        color: '#d1d5db',
                        userSelect: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 400
                      }}>{'>'}</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center' }}>
                      <a href="#" style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: '#6b7280',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.375rem',
                        fontWeight: 400,
                        transition: 'all 0.2s ease-in-out'
                      }} onMouseOver={(e) => {
                        e.currentTarget.style.color = '#04A59B';
                        e.currentTarget.style.backgroundColor = '#f0fdfc';
                      }} onMouseOut={(e) => {
                        e.currentTarget.style.color = '#6b7280';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}>
                        Componentes
                      </a>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0 0.375rem',
                        color: '#d1d5db',
                        userSelect: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 400
                      }}>{'>'}</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#1f2937',
                        fontWeight: 500,
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.375rem'
                      }}>
                        Librería
                      </span>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="component-item">
              <h4>User Login (Demo)</h4>
              <div style={{ 
                position: 'relative',
                display: 'flex', 
                alignItems: 'center',
                gap: '15px',
                padding: '10px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                background: '#f8fafc'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '2px solid #667eea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#667eea',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  U
                </div>
                <div style={{ color: '#2d3748', fontSize: '0.9rem' }}>
                  <div>Usuario Demo</div>
                </div>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #e53e3e',
                    padding: '6px 12px',
                    color: '#e53e3e',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    borderRadius: '4px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#e53e3e';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#e53e3e';
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'utilities',
      title: 'Utilidades',
      description: 'Componentes utilitarios',
      category: 'components',
      component: (
        <div className="component-showcase">
          <div className="component-grid">
            <div className="component-item">
              <h4>Counter</h4>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ margin: '0 0 1rem 0', fontSize: '2rem', fontWeight: 'bold' }}>0</h2>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  <button 
                    className="button is-primary mr-1" 
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#04A59B',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    +1
                  </button>
                  <button 
                    className="button is-danger mgr-small mr-1"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    -1
                  </button>
                  <button 
                    className="button is-warning mgr-small"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#ffc107',
                      color: '#212529',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    reset
                  </button>
                </div>
              </div>
            </div>
            <div className="component-item">
              <h4>Page Transition</h4>
              <div style={{ 
                padding: '20px', 
                background: '#f5f5f5', 
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease'
              }} onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }} onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                Contenido con transición
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Contar componentes por categoría
  categories.forEach(cat => {
    if (cat.id === 'all') {
      cat.count = componentSections.length;
    } else {
      cat.count = componentSections.filter(comp => comp.category === cat.id).length;
    }
  });

  // Filtrar componentes
  const filteredComponents = componentSections.filter(component => {
    const matchesCategory = activeCategory === 'all' || component.category === activeCategory;
    const matchesSearch = component.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="component-library">
      <div className="library-header">
        <div className="library-header-top">
          <div className="library-title">
            <h1>🎨 Librería de Componentes Core</h1>
            <p>Explora todos los componentes, animaciones y efectos disponibles en el core</p>
          </div>
          <div className="library-actions">
            <button 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                border: '2px solid #04A59B',
                padding: '12px 24px',
                fontSize: '1rem',
                backgroundColor: 'transparent',
                color: '#04A59B',
                gap: '8px'
              }}
              onClick={handleBackToHome}
            >
              <span>🏠</span>
              Regresar al Home
            </button>
          </div>
        </div>
        <div className="library-search">
          <input
            type="text"
            placeholder="Buscar componentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="library-filters">
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
              <span className="category-count">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="library-content">
        {filteredComponents.length === 0 ? (
          <div className="no-results">
            <h3>No se encontraron componentes</h3>
            <p>Intenta con otros términos de búsqueda o cambia la categoría</p>
          </div>
        ) : (
          filteredComponents.map(section => (
            <div key={section.id} className="component-section">
              <div className="section-header">
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>
              {section.component}
            </div>
          ))
        )}
      </div>

      <div className="library-footer">
        <p>© 2024 Core Component Library - Versión 1.0.0</p>
      </div>
    </div>
  );
};

export default ComponentLibrary; 