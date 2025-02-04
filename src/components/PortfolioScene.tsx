import React from 'react';
import { OrbitControls, Grid } from '@react-three/drei';
import AnimatedBox from './AnimatedBox';

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
    title: "AI Analytics Platform",
    description: "Advanced analytics platform powered by machine learning",
    technologies: ["Python", "TensorFlow", "React"],
    position: [-9, 0.5, -9],
  },
  {
    title: "Cloud Security Suite",
    description: "Enterprise-grade security monitoring system",
    technologies: ["AWS", "Node.js", "GraphQL"],
    position: [9, 0.5, -9],
  },
  {
    title: "Cost Optimization Tool",
    description: "Smart resource management and cost tracking",
    technologies: ["React", "TypeScript", "AWS"],
    position: [-9, 0.5, 9],
  },
  {
    title: "Mobile App Suite",
    description: "Cross-platform mobile application development",
    technologies: ["React Native", "Firebase", "Node.js"],
    position: [9, 0.5, 9],
  },
];

const PortfolioScene: React.FC<PortfolioSceneProps> = ({ onProjectSelect }) => {
  return (
    <>
      <OrbitControls 
        minDistance={15} 
        maxDistance={40} 
        zoomSpeed={0.5}
        minPolarAngle={Math.PI / 2 - 0.8} 
        maxPolarAngle={Math.PI / 2 - 0.1}
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
        fadeDistance={50}
      />
      {projects.map((project, index) => (
        <AnimatedBox 
          key={index} 
          initialPosition={project.position}
          label={project.title}
          onClick={() => onProjectSelect(project.title)}
        />
      ))}
    </>
  );
};

export default PortfolioScene; 