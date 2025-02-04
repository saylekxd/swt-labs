import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Header from '../components/Header';
import BackgroundSVG from '../components/BackgroundSVG';
import PortfolioScene from '../components/PortfolioScene';
import { LinkPreviewDemo } from '../components/ui/link-preview.demo';
import { AccordionDemo } from '../components/ui/accordion.demo';
import AnimatedBox from '../components/AnimatedBox';
import GradientBackground from '@/components/GradientBackground';
import { AnimatedModalDemo } from '../components/ui/demo';

const projects = [
  {
    title: "AI Analytics Platform",
    description: "Advanced analytics platform powered by machine learning algorithms. Our solution helps businesses make data-driven decisions through real-time analytics and predictive modeling.",
    technologies: ["Python", "TensorFlow", "React"],
    details: [
      "Real-time data processing",
      "Predictive analytics",
      "Custom dashboards",
      "API integration"
    ]
  },
  {
    title: "Cloud Security Suite",
    description: "Enterprise-grade security monitoring system that provides comprehensive protection for cloud infrastructure. Features include threat detection, compliance monitoring, and automated response.",
    technologies: ["AWS", "Node.js", "GraphQL"],
    details: [
      "Threat detection",
      "Compliance monitoring",
      "Automated response",
      "Security analytics"
    ]
  },
  {
    title: "Cost Optimization Tool",
    description: "Smart resource management and cost tracking platform that helps organizations optimize their cloud spending and resource utilization across multiple providers.",
    technologies: ["React", "TypeScript", "AWS"],
    details: [
      "Cost analysis",
      "Resource optimization",
      "Budget forecasting",
      "Usage analytics"
    ]
  },
  {
    title: "Mobile App Suite",
    description: "Cross-platform mobile application development framework that enables rapid development of high-performance mobile applications with native capabilities.",
    technologies: ["React Native", "Firebase", "Node.js"],
    details: [
      "Cross-platform support",
      "Native performance",
      "Offline capabilities",
      "Push notifications"
    ]
  }
];

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleProjectSelect = (title: string) => {
    const projectIndex = projects.findIndex(p => p.title === title);
    if (projectIndex !== -1) {
      setSelectedProject(projects[projectIndex]);
      setCurrentIndex(projectIndex);
    }
  };

  const handlePrevProject = () => {
    const newIndex = (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(newIndex);
    setSelectedProject(projects[newIndex]);
  };

  const handleNextProject = () => {
    const newIndex = (currentIndex + 1) % projects.length;
    setCurrentIndex(newIndex);
    setSelectedProject(projects[newIndex]);
  };

  return (
    <div className="w-screen min-h-screen relative overflow-hidden bg-black">
      <BackgroundSVG />
      <Header />
      
      <div className="container mx-auto px-4 pt-20">
        
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* 3D Scene */}
          <div className="bg-black/20 rounded-xl overflow-hidden relative group h-[600px]">
            {/* Interactive Hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 transition-all duration-500 bg-neutral-800/90 px-4 py-2 rounded-full flex items-center gap-2 pointer-events-none group-hover:opacity-0 opacity-100 group-hover:translate-y-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-5 h-5 text-white animate-bounce"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
              <span className="text-sm font-medium text-white">Wybierz kwadrat</span>
            </div>
            <div className="absolute inset-0">
              <Canvas
                shadows
                camera={{ position: [20, 20, 20], fov: 50 }}
                gl={{ alpha: true }}
              >
                <PortfolioScene onProjectSelect={handleProjectSelect} />
              </Canvas>
            </div>
          </div>

          {/* Project Information with Navigation */}
          <div className="space-y-8 p-8 bg-black/20 rounded-xl relative h-[600px]">
            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 flex justify-between w-[calc(100%+2rem)]">
              <button
                onClick={handlePrevProject}
                className="w-8 h-8 bg-neutral-800/80 hover:bg-neutral-700/80 rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous project"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                onClick={handleNextProject}
                className="w-8 h-8 bg-neutral-800/80 hover:bg-neutral-700/80 rounded-full flex items-center justify-center transition-colors"
                aria-label="Next project"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>

            {/* Project Counter */}
            <div className="absolute top-4 right-8 text-sm text-neutral-400">
              <span className="text-white">{currentIndex + 1}</span>
              <span className="mx-1">/</span>
              <span>{projects.length}</span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">
              {selectedProject.title}
            </h2>

            {/* Description Section */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-neutral-800/50 p-6 rounded-lg">
                <h4 className="text-white text-lg mb-2">Overview</h4>
                <p className="text-neutral-400 text-sm">{selectedProject.description}</p>
              </div>
              <div className="bg-neutral-800/50 p-6 rounded-lg">
                <h4 className="text-white text-lg mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-neutral-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedProject.details.map((detail, index) => (
                  <div key={index} className="bg-neutral-800/50 p-6 rounded-lg">
                    <h4 className="text-white text-lg mb-2">Feature {index + 1}</h4>
                    <p className="text-neutral-400 text-sm">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <div className="space-y-8 bg-black/20 rounded-xl relative h-[600px] overflow-y-auto">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
                <p className="text-neutral-400 text-sm">Find answers to common questions about our projects and services.</p>
              </div>
              <div className="w-full [&>div]:bg-neutral-800/50 [&>div]:rounded-lg [&>div_.accordion-content]:text-neutral-400 [&>div_.accordion-trigger]:text-white">
                <AccordionDemo />
              </div>
            </div>
            <div className="space-y-8 px-8 bg-black/20 rounded-xl relative h-[600px]">
              <h3 className="text-2xl font-bold text-white mb-6">Project Previews</h3>
              <LinkPreviewDemo />
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="relative mt-5 mb-16">
          {/* 3D Canvas Background */}
          <div className="absolute inset-0 h-[400px]">
            <Canvas
              camera={{ position: [0, 5, 15], fov: 40 }}
              gl={{ alpha: true }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <AnimatedBox initialPosition={[-4, 0.5, -2]} />
              <AnimatedBox initialPosition={[4, 0.5, -3]} />
              <AnimatedBox initialPosition={[0, 0.5, -4]} />
              <AnimatedBox initialPosition={[-3, 1, -5]} />
              <AnimatedBox initialPosition={[3, 1, -5]} />
              <AnimatedBox initialPosition={[-1, 0.5, -6]} />
              <AnimatedBox initialPosition={[1, 0.5, -6]} />
            </Canvas>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center h-[400px] bg-gradient-to-t from-black via-black/80 to-transparent">
          
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-xl text-neutral-400 mb-8 max-w-2xl text-center">
              Let's collaborate and create something extraordinary together.
            </p>
            <>
              <AnimatedModalDemo />
              <GradientBackground />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;