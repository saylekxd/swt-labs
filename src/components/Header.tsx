import React from 'react';
import { Link } from 'react-router-dom';
import { AppleStyleDock } from './ui/dock.demo';

const Header: React.FC = () => {
  return (
    <header
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
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
          paddingTop: '3.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          
          
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
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          
          <div style={{ height: '40px' }}>
            <AppleStyleDock />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;