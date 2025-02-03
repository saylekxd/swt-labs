import React from 'react';
import { Link } from 'react-router-dom';
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
            <canvas style={{ width: '80px', height: '80px' }} />
          </div>
          
          <img
            src="/public/logo-swtlabs.png"
            alt="Logo"
            style={{ width: '40px', marginLeft: '0.5rem' }}
          />
          <Link to="/">
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
          </Link>  
        </div>
        
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
          <li>
            <Link to="/ai" style={{ color: 'white', textDecoration: 'none' }}>
              Sztuczna inteligencja
            </Link>
          </li>
          <li>
            <Link to="/tech" style={{ color: 'white', textDecoration: 'none' }}>
              Technologia
            </Link>
          </li>
          <li>
            <Link to="/portfolio" style={{ color: 'white', textDecoration: 'none' }}>
              Portfolio
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;