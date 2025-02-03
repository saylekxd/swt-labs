import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BackgroundSVG from '../components/BackgroundSVG';

const Tech: React.FC = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative'
      }}
    >
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
          color: 'white'
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
          Technologia
        </h1>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '2.5rem' }}>
          Poznaj nasze nowoczesne rozwiązania technologiczne, które napędzają rozwój biznesu.
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
          onClick={() => window.location.href = '/'}
        >
          Umów spotkanie
        </button>
      </div>
    </div>
  );
};

export default Tech; 