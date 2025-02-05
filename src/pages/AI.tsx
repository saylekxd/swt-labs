import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BackgroundSVG from '../components/BackgroundSVG';
import { Timeline } from '../components/ui/timeline';
import { Connect } from '../components/ui/highlighter.demo';
import Footer from '../components/Footer';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const AI: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const timelineData = [
    {
      title: "AI Solutions",
      content: (
        <div className="space-y-4 sm:space-y-8">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            Innowacyjne rozwiązania sztucznej inteligencji dla biznesu
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-white text-base sm:text-lg mb-2">Machine Learning</h4>
              <p className="text-neutral-400 text-xs sm:text-sm">Zaawansowane algorytmy uczenia maszynowego</p>
            </div>
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-white text-base sm:text-lg mb-2">Deep Learning</h4>
              <p className="text-neutral-400 text-xs sm:text-sm">Sieci neuronowe i przetwarzanie danych</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Data Science",
      content: (
        <div className="space-y-4 sm:space-y-8">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            Analiza danych i modelowanie predykcyjne
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <div className="flex flex-col gap-2">
                <div className="flex items-center text-neutral-300 text-xs sm:text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Big Data Analytics
                </div>
                <div className="flex items-center text-neutral-300 text-xs sm:text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Predictive Modeling
                </div>
                <div className="flex items-center text-neutral-300 text-xs sm:text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Data Visualization
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "AI Integration",
      content: (
        <div className="space-y-4 sm:space-y-8">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            Integracja AI z istniejącymi systemami
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-white text-base sm:text-lg mb-2">API Integration</h4>
              <p className="text-neutral-400 text-xs sm:text-sm">Łączenie systemów AI z infrastrukturą</p>
            </div>
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-white text-base sm:text-lg mb-2">Automation</h4>
              <p className="text-neutral-400 text-xs sm:text-sm">Automatyzacja procesów biznesowych</p>
            </div>
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

export default AI; 