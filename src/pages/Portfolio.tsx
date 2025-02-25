import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Header from '../components/Header';
import BackgroundSVG from '../components/BackgroundSVG';
import PortfolioScene from '../components/PortfolioScene';
import { LinkPreviewDemo } from '../components/ui/link-preview.demo';
import { AccordionDemo } from '../components/ui/accordion.demo';
import AnimatedBox from '../components/AnimatedBox';
import GradientBackground from '@/components/GradientBackground';
import { AnimatedModalDemoWrapper } from '../components/ui/demo';
import Footer from '../components/Footer';

interface SpinnerVariantProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const Ring = ({ size = 24, ...props }: SpinnerVariantProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 44 44"
    stroke="currentColor"
    {...props}
  >
    <title>Ładowanie...</title>
    <g fill="none" fillRule="evenodd" strokeWidth="2">
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="0s"
          dur="1.8s"
          values="1; 20"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="-0.9s"
          dur="1.8s"
          values="1; 20"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="-0.9s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);

const projects = [
  {
    title: "Webowa aplikacja doradcza",
    description: "Aplikacja webowa tworzona na potrzeby naszego klienta, wdraża innowacje społeczne w postaci interaktywnego mikro - poradnictwa w postaci asynchronicznej online. Użytkownicy mają dostęp do konsultacji online z ekspertami oraz mogą śledzić swoje postępy edukacyjne.",
    technologies: ["Webflow", "JavaScript", "AI Voice Agent"],
    details: [
      { 
        name: "Asystenci głosowi AI",
        description: "Zintegrowany system asystentów głosowych opartych o rozwiązania API ElevenLabs" 
      },
      { 
        name: "Personalizacja ścieżek",
        description: "Automatyczne dostosowywanie materiałów edukacyjnych do postępów użytkownika" 
      },
      { 
        name: "Interfejs użytkownika",
        description: "Nowoczesny i intuicyjny design zoptymalizowany pod kątem UX/UI" 
      },
      { 
        name: "System autoryzacji i autentykacji",
        description: "Implementacja OAuth 2.0 zapewniająca bezpieczny dostęp do platformy i zarządzanie tożsamością użytkowników." 
      }
    ]
  },
  {
    title: "Inteligentna platforma muzyczna",
    description: "Platforma streamingowa wykorzystująca algorytmy rekomendacyjne oraz planowaną integrację z technologią blockchain i AI. Jej celem jest wspieranie artystów poprzez innowacyjne rozwiązania analityczne oraz zaawansowane systemy rozliczania tantiem. Dzięki AI-powered development, byliśmy w stanie zrealizować wszystkie funkcje w fazie MVP.",
    technologies: ["React", "Node.js", "Blockchain (2 faza)"],
    details: [
      { 
        name: "Integracja z bazą danych",
        description: "Wykorzystuje Supabase jako wydajną, skalowalną bazę danych dla zapewnienia błyskawicznego dostępu do treści i zarządzania użytkownikami."
      },
      { 
        name: "AI-powered development",
        description: "Zastosowanie sztucznej inteligencji do automatyzacji procesu developmentu, co pozwala na redukcję kosztów operacyjnych i szybsze wdrażanie nowych funkcjonalności."
      },
      { 
        name: "Moduł AI oparty na zewnętrznym API",
        description: "Integracja z API od 11Labs umożliwiająca automatyczną analizę i syntezę dźwięku, w tym generowanie głosu w czasie rzeczywistym."
      },
      { 
         name: "Integracja blockchain",
        description: "Planowane wdrożenie rozproszonych rejestrów do zarządzania prawami autorskimi i monetyzacji utworów w sposób transparentny i zdecentralizowany."
      }
    ]
  },
  {
    title: "AI Agents z systemem RAG",
    description: "Kompleksowe wdrożenie systemu sztucznej inteligencji dla przedsiębiorstwa z branży usługowej. Rozwiązanie zintegrowało automatyczną obsługę głosową klienta z istniejącymi systemami firmy, wykorzystując technologię RAG do inteligentnego przetwarzania wiedzy firmowej. ",
    technologies: ["Streamlit", "Python", "OpenAI", "CrawlAI", "N8N"],
    details: [
      { 
        name: "Integracja asystenta głosowego",
        description: "Zaawansowany system rozpoznawania i syntezy mowy, dostosowany do specyfiki branży i standardów komunikacyjnych firmy. System został zintegrowany z centralą telefoniczną i systemem CRM." 
      },
      { 
        name: "System RAG",
        description: "Wdrożenie systemu Retrieval Augmented Generation umożliwiającego AI agentom dostęp do spersonalizowanej bazy wiedzy, wykorzystując wektorową bazę danych do efektywnego wyszukiwania kontekstowego." 
      },
      { 
        name: "Wsparcie wdrożeniowe",
        description: "Szkolenia dla pracowników i 3-miesięczne wsparcie techniczne, co pozwoliło na płynne przejście do nowego systemu bez zakłóceń operacyjnych" 
      },
      { 
        name: "Baza wiedzy",
        description: "System zarządzania bazą wiedzy pozwalający na łatwe dodawanie i aktualizowanie informacji dostępnych dla AI agentów." 
      }
    ]
  },
  {
    title: "AI Marketing & Lead Generation",
    description: "Wdrożenie kompleksowego systemu automatyzacji marketingu i pozyskiwania leadów opartego na sztucznej inteligencji. System zintegrował wszystkie kanały komunikacji marketingowej i zautomatyzował proces kwalifikacji leadów, zwiększając efektywność o 30%.",
    technologies: ["Python", "OpenAI", "Meta API", "Google API", "LinkedIn API", "N8N"],
    details: [
      { 
        name: "Automatyczna obsługa leadów",
        description: "Zautomatyzowana komunikacja przez chatboty i maile, z powiadomieniami dla sprzedaży. Skrócenie czasu reakcji o 90%." 
      },
      { 
        name: "AI Lead Qualification",
        description: "System AI automatycznie identyfikuje i kwalifikuje potencjalnych klientów poprzez inteligentne algorytmy scoringowe, analizując potencjał zakupowy i przypisując priorytety kontaktu."
      },
      { 
        name: "AI Follow-up Asystent",
        description: "Inteligentny system głosowy prowadzi aktywną komunikację z klientami, wykonując przypomnienia o spotkaniach, przeprowadzając wstępne rozmowy oraz zbierając kluczowe informacje przed kontaktem z konsultantem." 
      },
      { 
        name: "Analiza & raportowanie",
        description: "Zaawansowany system powiadomień push z obsługą personalizacji i segmentacji użytkowników." 
      }
    ]
  }
];

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    // Simulate loading time and content preparation
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 300); // Wait for fade out animation to complete
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const containerClasses = `w-screen min-h-screen relative overflow-hidden bg-black transition-opacity duration-300 ${
    isTransitioning ? 'opacity-70' : 'opacity-100'
  }`;

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

  if (isLoading) {
    return (
      <div className={containerClasses}>
        <BackgroundSVG />
        <Header />
        <div className="container mx-auto px-4 pt-20">
          <div className="w-full h-[calc(100vh-5rem)] flex items-center justify-center transition-all duration-300">
            <Ring size={48} className="text-white transition-colors duration-300" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <BackgroundSVG />
      <Header />
      
      <div className="container mx-auto px-4 pt-16 sm:pt-20 min-h-screen pb-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
          Portfolio projektowe
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-start">
          {/* 3D Scene */}
          <div className="bg-black/20 rounded-xl overflow-hidden relative group h-[400px] sm:h-[500px] lg:h-[600px] sticky top-20">
            {/* Interactive Hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 transition-all duration-500 bg-neutral-800/90 px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 pointer-events-none group-hover:opacity-0 opacity-100 group-hover:translate-y-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-bounce"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
              <span className="text-xs sm:text-sm font-medium text-white">Wybierz kwadrat</span>
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
          <div className="space-y-6 sm:space-y-8 p-4 sm:p-8 bg-black/20 rounded-xl relative min-h-[800px] transition-all duration-300 ease-in-out">
            {/* Navigation Arrows */}
            <div className="sticky top-0 left-0 right-0 flex justify-between items-center mb-6 z-20">
              <button
                onClick={handlePrevProject}
                className="w-10 h-10 bg-neutral-800/90 hover:bg-neutral-700/90 rounded-full flex items-center justify-center transition-colors shadow-lg backdrop-blur-sm"
                aria-label="Poprzedni projekt"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              {/* Project Counter */}
              <div className="text-xs sm:text-sm text-neutral-400">
                <span className="text-white">{currentIndex + 1}</span>
                <span className="mx-1">/</span>
                <span>{projects.length}</span>
              </div>

              <button
                onClick={handleNextProject}
                className="w-10 h-10 bg-neutral-800/90 hover:bg-neutral-700/90 rounded-full flex items-center justify-center transition-colors shadow-lg backdrop-blur-sm"
                aria-label="Następny projekt"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>

            <div className="transition-all duration-300 ease-in-out">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                {selectedProject.title}
              </h2>

              {/* Description Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 min-h-[200px]">
                <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
                  <h4 className="text-white text-base sm:text-lg mb-2">Przegląd</h4>
                  <p className="text-neutral-400 text-xs sm:text-sm w-full">
                    {selectedProject.description}
                  </p>
                </div>
                <div className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
                  <h4 className="text-white text-base sm:text-lg mb-2">Technologie</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/10 rounded-full text-xs sm:text-sm text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="min-h-[400px]">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Kluczowe funkcje</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {selectedProject.details.map((detail, index) => (
                    <div key={index} className="bg-neutral-800/50 p-4 sm:p-6 rounded-lg">
                      <p className="text-white text-base sm:text-lg mb-2">{detail.name}</p>
                      <p className="text-neutral-400 text-xs sm:text-sm w-full">
                        {detail.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ and Project Previews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mt-8 sm:mt-12 transition-all duration-300 ease-in-out">
          <div className="space-y-6 sm:space-y-8 bg-black/20 rounded-xl relative min-h-[500px] h-fit overflow-y-auto p-4 sm:p-6">
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Często zadawane pytania</h3>
              <p className="text-neutral-400 text-xs sm:text-sm">Znajdź odpowiedzi na najczęstsze pytania dotyczące naszych projektów i usług.</p>
            </div>
            <div className="w-full [&>div]:bg-neutral-800/50 [&>div_.accordion-content]:text-neutral-400 [&>div_.accordion-trigger]:text-white">
              <AccordionDemo />
            </div>
          </div>
          <div className="space-y-6 sm:space-y-8 p-6 sm:p-6 bg-black/20 rounded-xl relative min-h-[500px] h-fit overflow-y-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 px-6">Podgląd projektów</h3>
            <div className="px-6">
              <LinkPreviewDemo />
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="relative mt-4 sm:mt-5 mb-8 sm:mb-16 min-h-[500px]">
          {/* 3D Canvas Background */}
          <div className="absolute inset-0 h-[500px]">
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
          <div className="relative z-10 flex flex-col items-center justify-center h-[400px] h-[500px] bg-gradient-to-t from-black via-black/80 to-transparent px-4">
            <h2 className="text-2xl pt-20 sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 text-center">
              Gotowy, aby ożywić swoją wizję?
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 mb-6 sm:mb-8 max-w-2xl text-center">
              Współpracujmy i stwórzmy coś wyjątkowego razem.
            </p>
            <>
              <AnimatedModalDemoWrapper />
              <GradientBackground />
            </>
          </div>
        </div>
      </div>
      <Footer justifyContent="space-between" />
    </div>
  );
};

export default Portfolio;