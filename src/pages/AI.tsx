import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BackgroundSVG from '../components/BackgroundSVG';

const AI: React.FC = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        background: 'linear-gradient(135deg, #1e1e1e, #333)',
      }}
    >
      <BackgroundSVG />
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          color: 'white',
          padding: '2rem',
        }}
      >
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          Artificial Intelligence
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
          Discover our cutting-edge AI technologies and initiatives crafted to revolutionize your business.
        </p>
        <Link
          to="/"
          style={{
            background: 'white',
            color: 'black',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AI; 