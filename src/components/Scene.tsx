import React from 'react';
import { OrbitControls, Grid } from '@react-three/drei';
import AnimatedBox from './AnimatedBox';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import * as THREE from 'three';

const Scene: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const initialPositions: [number, number, number][] = [
    [-9, 0.5, -9],
    [-3, 0.5, -3],
    [0, 0.5, 0],
    [3, 0.5, 3],
    [9, 0.5, 9],
    [-6, 0.5, 6],
    [6, 0.5, -6],
    [-12, 0.5, 0],
    [12, 0.5, 0],
    [0, 0.5, 12],
  ];

  return (
    <>
      <OrbitControls 
        minDistance={isMobile ? 32 : 25} 
        maxDistance={isMobile ? 32 : 40} 
        zoomSpeed={0}
        enableZoom={!isMobile}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI / 2 - 0.8} 
        maxPolarAngle={Math.PI / 2 - 0.4}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Grid
        renderOrder={-1}
        position={[0, 0, 0]}
        infiniteGrid
        cellSize={1}
        cellThickness={0.5}
        sectionSize={3}
        sectionThickness={1}
        sectionColor={new THREE.Color(0.5, 0.5, 0.5)}
        fadeDistance={50}
      />
      {initialPositions.map((position, index) => {
        let label: string | undefined;
        if (index === 0) label = "AI Agents";
        else if (index === 3) label = "Pay-as-you-grow";
        else if (index === 6) label = "Affordable Excellence";
        else if (index === 9) label = "AI-Powered Solutions";
        
        let displayLabel: string | undefined;
        if (label === "AI Agents") displayLabel = "AI Agents";
        else if (label === "Pay-as-you-grow") displayLabel = "Pay-as-you-grow";
        else if (label === "Affordable Excellence") displayLabel = "Affordable Excellence";
        else if (label === "AI-Powered Solutions") displayLabel = "AI-Powered Solutions";
        
        return (
          <AnimatedBox 
            key={index} 
            initialPosition={position} 
            label={label}
            displayLabel={displayLabel}
          />
        );
      })}
    </>
  );
};

export default Scene; 