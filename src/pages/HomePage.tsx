import React from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from '../components/Scene';
import Header from '../components/Header';
import BackgroundSVG from '../components/BackgroundSVG';
import PartnerLogoCarousel from '../components/PartnerLogoCarousel';
import { AnimatedModalDemoWrapper } from '../components/ui/demo';
import { Heading } from "@/components/ui/typewriter.demo";
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Helmet } from 'react-helmet-async';
import FeatureInfoModalPortal from '../components/FeatureInfoModalPortal';

const HomePage: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="w-full h-[100dvh] relative overflow-hidden">
      <Helmet>
        <title>SWT Labs - AI-Powered Solutions</title>
        <meta name="description" content="Kreatywna agencja technologiczna specjalizująca się w AI, automatyzacji oraz rozwoju aplikacji mobilnych iwebowych. Obniżamy koszty technologii nawet o 70%." />
        <meta property="og:title" content="SWT Labs - Nowoczesne rozwiązania technologiczne" />
        <meta property="og:description" content="Specjalizujemy się w implementacji sztucznej inteligencji i tworzeniu wydajnych aplikacji mobilnych/webowych." />
        <meta property="og:image" content="https://swtlabs.pl/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preload" href="/logo-swtlabs.png" as="image" />
      </Helmet>
      <BackgroundSVG />
      <Header />
      <div
        className={`absolute left-1/2 -translate-x-1/2 text-center z-10 text-white
          ${isMobile ? 'top-[18%] px-5' : 'top-[15%]'} 
          ${isMobile ? 'w-full' : 'w-auto'}`}
      >
        <h2 className="text-base md:text-lg mt-4">
          Aplikacje <strong>szyte na miarę</strong>{" "}
          <span className="md:hidden"><br /></span>‑ web i mobile <strong>za ułamek</strong> ceny!
        </h2>
        <div className={`min-h-[80px] ${isMobile ? 'mt-4' : 'mt-8'}`}>
          <Heading />
        </div>
      </div>
      
      {/* Separate fixed button container */}
      <div className={`absolute left-1/2 -translate-x-1/2 text-center z-10 w-full
        ${isMobile ? 'top-[40%]' : 'top-[40%]'}`}>
        <AnimatedModalDemoWrapper />
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
      
      {/* Feature Info Modal Portal - outside of Canvas */}
      <FeatureInfoModalPortal />
    </div>
  );
};

export default HomePage;