import React from 'react';

const Header: React.FC = () => {
  return (
    <header
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        padding: '1rem',
      }}
    >
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px' }}>
            {/* You can replace this with a Three.js Canvas if desired */}
            <canvas style={{ width: '80px', height: '80px' }} />
          </div>
          <img
            src="/public/logo-swtlabs.png"
            alt="Logo"
            style={{ width: '40px', marginLeft: '0.5rem' }}
          />
          <span
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginLeft: '0.5rem',
            }}
          >
            swtlabs
          </span>
        </div>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
          <li>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
              Sztuczna inteligencja
            </a>
          </li>
          <li>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
              Technologia
            </a>
          </li>
          <li>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>
              Portfolio
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 