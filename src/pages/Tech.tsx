import React from 'react';
import Header from '../components/Header';
import BackgroundSVG from '../components/BackgroundSVG';
import { Timeline } from '../components/ui/timeline';


const Tech: React.FC = () => {
  const timelineData = [
    {
      title: "AI & ML",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Zaawansowane rozwiązania sztucznej inteligencji i uczenia maszynowego
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-neutral-800/50 p-6 rounded-lg">
              <h4 className="text-white text-lg mb-2">Natural Language Processing</h4>
              <p className="text-neutral-400 text-sm">Analiza tekstu i przetwarzanie języka naturalnego</p>
            </div>
            <div className="bg-neutral-800/50 p-6 rounded-lg">
              <h4 className="text-white text-lg mb-2">Computer Vision</h4>
              <p className="text-neutral-400 text-sm">Rozpoznawanie obrazów i analiza wideo</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://picsum.photos/800/600?random=11"
              alt="AI Project 1"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://picsum.photos/800/600?random=12"
              alt="AI Project 2"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Cloud",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Kompleksowe rozwiązania chmurowe dla biznesu
          </p>
          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="bg-neutral-800/50 p-6 rounded-lg">
              <div className="flex flex-col gap-2">
                <div className="flex items-center text-neutral-300">
                  <span className="text-green-500 mr-2">✓</span>
                  AWS, Azure, Google Cloud Platform
                </div>
                <div className="flex items-center text-neutral-300">
                  <span className="text-green-500 mr-2">✓</span>
                  Serverless Architecture
                </div>
                <div className="flex items-center text-neutral-300">
                  <span className="text-green-500 mr-2">✓</span>
                  Microservices & Containers
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://picsum.photos/800/600?random=13"
              alt="Cloud Project 1"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://picsum.photos/800/600?random=14"
              alt="Cloud Project 2"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Security",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Zaawansowane rozwiązania bezpieczeństwa
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-neutral-800/50 p-6 rounded-lg">
              <h4 className="text-white text-lg mb-2">Cybersecurity</h4>
              <p className="text-neutral-400 text-sm">Ochrona przed zagrożeniami i monitorowanie</p>
            </div>
            <div className="bg-neutral-800/50 p-6 rounded-lg">
              <h4 className="text-white text-lg mb-2">Compliance</h4>
              <p className="text-neutral-400 text-sm">GDPR, ISO, HIPAA compliance</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://picsum.photos/800/600?random=15"
              alt="Security Project 1"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://picsum.photos/800/600?random=16"
              alt="Security Project 2"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <BackgroundSVG />
      <Header />
      <Timeline data={timelineData} />
      
    </div>
  );
};

export default Tech; 