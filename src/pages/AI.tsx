import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BackgroundSVG from '../components/BackgroundSVG';
import { TimelineDemo } from '../components/ui/timeline.demo';
import { Connect } from '../components/ui/highlighter.demo';
import Footer from '../components/Footer';

const AI: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <BackgroundSVG />
      <Header />
      <TimelineDemo />
      <Footer />
    </div>
  );
};

export default AI; 