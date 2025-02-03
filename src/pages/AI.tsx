import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BackgroundSVG from '../components/BackgroundSVG';
import { TimelineDemo } from '../components/ui/timeline.demo';

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
      <TimelineDemo />
    </div>
  );
};

export default AI; 