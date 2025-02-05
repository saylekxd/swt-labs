import React from 'react';
import Header from '../components/Header';
import BackgroundSVG from '../components/BackgroundSVG';
import { Timeline } from '../components/ui/timeline';
import { Connect } from '../components/ui/highlighter.demo';
import Footer from '../components/Footer';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Tech: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const timelineData = [
    {
      title: "AI & ML",
      content: (
        <div className="space-y-4 sm:space-y-8">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            Zaawansowane rozwiązania sztucznej inteligencji i uczenia maszynowego
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-white text-base sm:text-lg mb-2">Natural Language Processing</h4>
              <p className="text-neutral-400 text-xs sm:text-sm">Analiza tekstu i przetwarzanie języka naturalnego</p>
            </div>
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-white text-base sm:text-lg mb-2">Computer Vision</h4>
              <p className="text-neutral-400 text-xs sm:text-sm">Rozpoznawanie obrazów i analiza wideo</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img
              src="https://picsum.photos/800/600?random=11"
              alt="AI Project 1"
              className="rounded-lg object-cover h-40 sm:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://picsum.photos/800/600?random=12"
              alt="AI Project 2"
              className="rounded-lg object-cover h-40 sm:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Cloud",
      content: (
        <div className="space-y-4 sm:space-y-8">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            Kompleksowe rozwiązania chmurowe dla biznesu
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <div className="flex flex-col gap-2">
                <div className="flex items-center text-neutral-300 text-xs sm:text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  AWS, Azure, Google Cloud Platform
                </div>
                <div className="flex items-center text-neutral-300 text-xs sm:text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Serverless Architecture
                </div>
                <div className="flex items-center text-neutral-300 text-xs sm:text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Microservices & Containers
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img
              src="https://picsum.photos/800/600?random=13"
              alt="Cloud Project 1"
              className="rounded-lg object-cover h-40 sm:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://picsum.photos/800/600?random=14"
              alt="Cloud Project 2"
              className="rounded-lg object-cover h-40 sm:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Security",
      content: (
        <div className="space-y-4 sm:space-y-8">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            Zaawansowane rozwiązania bezpieczeństwa
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-white text-base sm:text-lg mb-2">Cybersecurity</h4>
              <p className="text-neutral-400 text-xs sm:text-sm">Ochrona przed zagrożeniami i monitorowanie</p>
            </div>
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-white text-base sm:text-lg mb-2">Compliance</h4>
              <p className="text-neutral-400 text-xs sm:text-sm">GDPR, ISO, HIPAA compliance</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img
              src="https://picsum.photos/800/600?random=15"
              alt="Security Project 1"
              className="rounded-lg object-cover h-40 sm:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://picsum.photos/800/600?random=16"
              alt="Security Project 2"
              className="rounded-lg object-cover h-40 sm:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Contact",
      content: (
        <div className="w-full">
          <Connect />
        </div>
      ),
    },
  ];

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden">
      <BackgroundSVG />
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Timeline data={timelineData} />
      </main>
      <Footer />
    </div>
  );
};

export default Tech; 