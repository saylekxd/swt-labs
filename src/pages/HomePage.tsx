import React from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from '../components/Scene';
import Header from '../components/Header';
import BackgroundSVG from '../components/BackgroundSVG';
import PartnerLogoCarousel from '../components/PartnerLogoCarousel';
import { AnimatedModalDemo } from '../components/ui/demo';
import { Heading } from "@/components/ui/typewriter.demo";

const HomePage: React.FC = () => {
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
        
        

        <h2 style={{ fontSize: 'clamp(1rem, 1.25vw, 1rem)', marginTop: '1rem' }}>
          Najlepsza jakość i <strong>atrakcyjna cena</strong> rozwiązań technologicznych.
        </h2>
        <Heading />
        <AnimatedModalDemo />
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
      <PartnerLogoCarousel />
    </div>
  );
};

export default HomePage;