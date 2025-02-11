import React from 'react';
import Header from '../components/Header';
import BackgroundSVG from '../components/BackgroundSVG';
import { Timeline } from '../components/ui/timeline';
import { Connect } from '../components/ui/highlighter.demo';
import Footer from '../components/Footer';

const Tech: React.FC = () => {
  // const isMobile = useMediaQuery('(max-width: 768px)');
  
  const timelineData = [
    {
      title: "Web & App Development",
      content: (
        <div className="space-y-4 sm:space-y-8">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            Tworzymy nowoczesne, <strong>skalowalne i kosztowo efektywne</strong> aplikacje internetowe i mobilne, integrując najnowsze technologie AI.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-white text-base sm:text-lg mb-2">Tania technologia, wysoka jakość</h4>
              <p className="text-neutral-400 text-xs sm:text-sm">
                <span className="relative inline-block group">
                  <span className="relative z-10">
                    Połączenie doświadczonych programistów i AI pozwala nam budować zaawansowane rozwiązania w najniższych cenach na rynku, bez kompromisów w jakości.
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#da7786] to-[#c85f6c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </p>
            </div>
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-white text-base sm:text-lg mb-2">Dedykowane rozwiązania</h4>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Tworzymy aplikacje webowe i mobilne idealnie dopasowane do Twojego biznesu – od MVP po pełne platformy.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img
              src="/images/imageInfo4.webp"
              alt="Cloud Project 1"
              className="rounded-lg object-cover h-40 sm:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="/images/imageInfo6.webp"
              alt="Cloud Project 2"
              className="rounded-lg object-cover h-40 sm:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "AI-Powered Development",
      content: (
        <div className="space-y-4 sm:space-y-8">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            Wdrażamy nowoczesne rozwiązania AI, aby przyspieszyć i <strong>obniżyć koszty</strong> produkcji oprogramowania.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <div className="flex flex-col gap-2">
                <div className="flex items-center text-neutral-300 text-xs sm:text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Współpraca doświadczonych developerów z AI w procesie kodowania
                </div>
                <div className="flex items-center text-neutral-300 text-xs sm:text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Generowanie i optymalizacja kodu przy użyciu AI
                </div>
                <div className="flex items-center text-neutral-300 text-xs sm:text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Przyśpieszone generowanie UX/UI z wykorzystaniem najnowszych technologii
                </div>
                <div className="flex items-center text-neutral-300 text-xs sm:text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Automatyczne testowanie i wdrażanie rozwiązań
                </div>
                <div className="flex items-center text-neutral-300 text-xs sm:text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  <strong>Najniższe koszty przy najwyższej jakości oprogramowania</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img
              src="/images/imageInfo1.webp"
              alt="Cloud Project 1"
              className="rounded-lg object-cover h-40 sm:h-44 lg:h-60 w-full shadow-lg"
            />
            <div className="relative rounded-lg overflow-hidden h-40 sm:h-44 lg:h-60 w-full shadow-lg">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-lg"
              >
                <source src="/videos/movieInfo2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Kontakt",
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