import React from 'react';
import Header from '../components/Header';
import BackgroundSVG from '../components/BackgroundSVG';

const Portfolio: React.FC = () => {
  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(135deg, #1e1e1e, #333)',
        overflowX: 'hidden'
      }}
    >
      <BackgroundSVG />
      <Header />
    </div>
  );
};

export default Portfolio;