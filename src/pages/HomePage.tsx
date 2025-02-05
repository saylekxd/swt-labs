import React from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from '../components/Scene';
import Header from '../components/Header';
import BackgroundSVG from '../components/BackgroundSVG';
import PartnerLogoCarousel from '../components/PartnerLogoCarousel';
import { AnimatedModalDemo } from '../components/ui/demo';
import { Heading } from "@/components/ui/typewriter.demo";
import { useMediaQuery } from '@/hooks/useMediaQuery';

const HomePage: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="w-full h-[100dvh] relative overflow-hidden">
      <BackgroundSVG />
      <Header />
      <div
        className={`absolute left-1/2 -translate-x-1/2 text-center z-10 text-white
          ${isMobile ? 'top-[18%] px-5' : 'top-[15%]'} 
          ${isMobile ? 'w-full' : 'w-auto'}`}
      >
        <h2 className="text-base md:text-lg mt-4">
          Najlepsza jakość i <strong>atrakcyjna cena</strong> rozwiązań technologicznych.
        </h2>
        <div className={`min-h-[80px] ${isMobile ? 'mt-4' : 'mt-8'}`}>
          <Heading />
        </div>
      </div>
      
      {/* Separate fixed button container */}
      <div className={`absolute left-1/2 -translate-x-1/2 text-center z-10 w-full
        ${isMobile ? 'top-[40%]' : 'top-[40%]'}`}>
        <AnimatedModalDemo />
      </div>

      <Canvas
        shadows
        camera={{ 
          position: isMobile ? [15, 15, 15] : [20, 20, 20], 
          fov: isMobile ? 60 : 50 
        }}
        gl={{ alpha: true }}
        className="absolute top-0 left-0 w-full h-full z-1"
      >
        <Scene />
      </Canvas>
      <div className={`absolute bottom-0 left-0 right-0 z-10 ${isMobile ? 'mb-4' : ''}`}>
        <PartnerLogoCarousel />
      </div>
    </div>
  );
};

export default HomePage;