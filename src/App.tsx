import React from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import Header from './components/Header';
import BackgroundSVG from './components/BackgroundSVG';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <BackgroundSVG />
      <Header />
      <div
        style={{
          position: 'absolute',
          top: '33%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 10,
          color: 'white',
        }}
      >
        <h1
          style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          Z nami transformacja cyfrowa jest prosta.
        </h1>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '2.5rem' }}>
          Dostarczamy skuteczne i przystępne cenowo rozwiązania technologiczne szyte na
          miarę Twoich potrzeb.
        </h2>
        <button
          style={{
            background: 'white',
            color: 'black',
            fontWeight: 'bold',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
        >
          Umów spotkanie
        </button>
      </div>
      <Canvas
        shadows
        camera={{ position: [20, 20, 20], fov: 50 }}
        gl={{ alpha: true }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
