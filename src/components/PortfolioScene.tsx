import React from 'react';
import { OrbitControls, Grid } from '@react-three/drei';
import AnimatedBox from './AnimatedBox';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  position: [number, number, number];
}

interface PortfolioSceneProps {
  onProjectSelect: (title: string) => void;
}

const projects: Project[] = [
  {
    title: "Webowa aplikacja doradcza",
    description: "Aplikacja webowa tworzona na potrzeby naszego klienta",
    technologies: ["Webflow", "JavaScript", "AI Voice Agent"],
    position: [-9, 0.5, -9],
  },
  {
    title: "Inteligentna platforma muzyczna",
    description: "Platforma streamingowa wykorzystująca algorytmy rekomendacyjne",
    technologies: ["React", "Node.js", "Blockchain"],
    position: [9, 0.5, -9],
  },
  {
    title: "AI Agents z systemem RAG",
    description: "Inteligentna platforma do zarządzania zasobami",
    technologies: ["React", "TypeScript", "AWS"],
    position: [-9, 0.5, 9],
  },
  {
    title: "AI Marketing & Lead Generation",
    description: "Framework do tworzenia aplikacji mobilnych",
    technologies: ["React Native", "Firebase", "Node.js"],
    position: [9, 0.5, 9],
  },
];

const PortfolioScene: React.FC<PortfolioSceneProps> = ({ onProjectSelect }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <OrbitControls 
        minDistance={isMobile ? 12 : 15} 
        maxDistance={isMobile ? 30 : 40} 
        zoomSpeed={0.5}
        minPolarAngle={Math.PI / 2 - (isMobile ? 0.6 : 0.8)} 
        maxPolarAngle={Math.PI / 2 - (isMobile ? 0.2 : 0.1)}
        enableDamping
        dampingFactor={0.05}
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
        sectionColor="#808080"
        fadeDistance={isMobile ? 30 : 50}
      />
      {projects.map((project, index) => (
        <AnimatedBox 
          key={index} 
          initialPosition={project.position}
          label={project.title}
          onClickHandler={() => onProjectSelect(project.title)}
        />
      ))}
    </>
  );
};

export default PortfolioScene; 