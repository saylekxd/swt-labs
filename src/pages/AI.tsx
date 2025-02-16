import React from 'react';
import Header from '../components/Header';
import BackgroundSVG from '../components/BackgroundSVG';
import { Timeline } from '../components/ui/timeline';
import { Connect } from '../components/ui/highlighter.demo';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const AI: React.FC = () => {
  const timelineData = [
    {
      title: "AI Agents",
      content: (
        <div className="space-y-4 sm:space-y-8">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            Zwiększ efektywność operacyjną i obniż koszty, dzięki automatyzacji powtarzalnych zadań oraz wprowadzeniu najnowszych <strong>rozwiązań AI</strong> do swojego biznesu.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-white text-base sm:text-lg mb-2">Automatyzacja rutynowych zadań</h4>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Wdrażanie systemów AI do automatyzacji powtarzalnych czynności operacyjnych, marketingowych czy administracyjnych, które w inteligetny sposób podejmują swoje decyzje.
              </p>
            </div>
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-white text-base sm:text-lg mb-2">Pozyskiwanie leadów</h4>
              <p className="text-neutral-400 text-xs sm:text-sm">
              Wykorzystanie agentów AI do identyfikacji i kwalifikacji potencjalnych klientów, co pozwala na efektywne pozyskiwanie leadów. Agenci AI działają 24/7, odpowiadając na zapytania i zbierając informacje, co zapewnia ciągłość procesu sprzedaży.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <div className="flex flex-col gap-2">
                <div className="flex items-center text-neutral-300 text-xs sm:text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Redukcja kosztów operacyjnych do 40% poprzez automatyzację
                </div>
                <div className="flex items-center text-neutral-300 text-xs sm:text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Zaawansowane rozwiązania oparte na sztucznej inteligencji (AI)
                </div>
                <div className="flex items-center text-neutral-300 text-xs sm:text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Inteligetna firma z przewagą kosztową oraz operacyjną nad konkurencją
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative rounded-lg overflow-hidden h-40 sm:h-44 lg:h-60 w-full shadow-lg">
          <video 
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
      style={{ objectPosition: 'center' }}
    >
      <source src="/videos/movieInfo1.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    </div>
            <img
              src="/images/imageInfo7.webp"
              alt="Cloud Project 2"
              className="rounded-lg object-cover h-40 sm:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Analiza danych",
      content: (
        <div className="space-y-4 sm:space-y-8">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            Personalizuj doświadczenia klientów dzięki inteligentnej analizie danych.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-white text-base sm:text-lg mb-2">Personalizacja marketingu</h4>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Analiza danych klientów za pomocą AI w celu tworzenia spersonalizowanych kampanii marketingowych.
              </p>
            </div>
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-white text-base sm:text-lg mb-2">Systemy rekomendacyjne</h4>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Wdrażanie mechanizmów rekomendacji produktów lub usług na podstawie analizy preferencji klientów, przeprowadzonej w godziny, a nie tygodnie.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Obsługa klienta",
      content: (
        <div className="space-y-4 sm:space-y-8">
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            Popraw jakość obsługi klienta dzięki nowoczesnym technologiom AI.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-white text-base sm:text-lg mb-2">Chatboty i wirtualni asystenci</h4>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Implementacja inteligentnych asystentów do obsługi klienta, dostępnych 24/7.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img
              src="/images/imageInfo3.webp"
              alt="Cloud Project 1"
              className="rounded-lg object-cover h-40 sm:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="/images/imageInfo5.webp"
              alt="Cloud Project 2"
              className="rounded-lg object-cover h-40 sm:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
          <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
  <h4 className="text-white text-base sm:text-lg mb-2">Voice Agent AI</h4>
  <p className="text-neutral-400 text-xs sm:text-sm">
    Inteligentni agenci głosowi wspierani przez AI, którzy automatyzują obsługę klienta przez telefon, rozpoznają intencje użytkowników i dostarczają spersonalizowane odpowiedzi w czasie rzeczywistym. Umożliwiają prowadzenie płynnych rozmów, rezerwacji oraz wsparcia technicznego bez konieczności angażowania pracowników, działając 24/7 i integrując się z systemami CRM.
  </p>
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
    <>
      <Helmet>
        <link rel="canonical" href="https://swtlabs.pl/ai" />
        <title>Rozwiązania AI - Automatyzacja i optymalizacja procesów</title>
        <meta name="description" content="Wdrożenia sztucznej inteligencji w biznesie - chatboty, analiza danych, automatyzacja procesów. Redukcja kosztów do 40%." />
      </Helmet>
      <div className="relative min-h-[100dvh] w-full overflow-x-hidden">
        <BackgroundSVG />
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Timeline data={timelineData} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AI; 