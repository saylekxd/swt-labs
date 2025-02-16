import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InfoTooltip } from './InfoTooltip';
import { AnimatedGradient } from './AnimatedGradient';
import { EstimatorResults } from './EstimatorResults';
import confetti from 'canvas-confetti';

interface FormData {
  projectName: string;
  description: string;
  timeline: string;
  selectedFeatures: string[];
}

const timelineOptions = [
  { value: '1-2', label: '1-2 miesiące', description: 'Mały projekt' },
  { value: '3-4', label: '3-4 miesiące', description: 'Średni projekt' },
  { value: '5-6', label: '5-6 miesięcy', description: 'Duży projekt' },
  { value: '6+', label: '6+ miesięcy', description: 'Projekt złożony' },
];

const projectTypeFeatures = {
  web: [
    { id: 'responsive', label: 'Responsywny design' },
    { id: 'auth', label: 'Autoryzacja użytkowników' },
    { id: 'payments', label: 'Integracja z płatnościami' },
    { id: 'analytics', label: 'Analityka i raporty' },
    { id: 'seo', label: 'Optymalizacja SEO' },
    { id: 'cms', label: 'System CMS' },
    { id: 'email', label: 'Powiadomienia email' },
    { id: 'api', label: 'Integracja API' },
  ],
  mobile: [
    { id: 'push', label: 'Powiadomienia push' },
    { id: 'offline', label: 'Tryb offline' },
    { id: 'geolocation', label: 'Geolokalizacja' },
    { id: 'biometric', label: 'Autoryzacja biometryczna' },
    { id: 'camera', label: 'Integracja z kamerą' },
    { id: 'payments', label: 'Płatności mobilne' },
    { id: 'analytics', label: 'Analityka mobilna' },
    { id: 'sync', label: 'Synchronizacja danych' },
  ],
  agents: [
    { id: 'llm', label: 'Integracja z LLM' },
    { id: 'memory', label: 'Pamięć kontekstowa' },
    { id: 'tools', label: 'Dostęp do narzędzi' },
    { id: 'api', label: 'Integracje API' },
    { id: 'monitoring', label: 'Monitoring agentów' },
    { id: 'analytics', label: 'Analityka zachowań' },
    { id: 'safety', label: 'Zabezpieczenia AI' },
    { id: 'custom', label: 'Własne narzędzia' },
  ],
  ai: [
    { id: 'ml', label: 'Modele ML' },
    { id: 'data', label: 'Przetwarzanie danych' },
    { id: 'training', label: 'System trenowania' },
    { id: 'inference', label: 'Optymalizacja inferencji' },
    { id: 'monitoring', label: 'Monitoring modeli' },
    { id: 'api', label: 'API dla modeli' },
    { id: 'visualization', label: 'Wizualizacja wyników' },
    { id: 'export', label: 'Eksport modeli' },
  ],
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const fireConfetti = () => {
  // Create multiple confetti bursts
  const count = 200;
  const defaults = {
    origin: { y: 0.3 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Pink confetti
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#FF69B4'],
    shapes: ['circle', 'square'],
  });

  // Gold confetti
  fire(0.2, {
    spread: 60,
    startVelocity: 55,
    colors: ['#FFD700'],
    shapes: ['circle', 'square'],
  });

  // White confetti
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#ffffff'],
    shapes: ['circle', 'square'],
  });

  // Mixed colors confetti
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#FF69B4', '#FFD700', '#ffffff'],
    shapes: ['circle', 'square'],
  });
};

export const EstimatorForm = () => {
  const [estimatedPrice, setEstimatedPrice] = useState<string | null>(null);
  const [projectType, setProjectType] = useState<string>('');
  const [complexity, setComplexity] = useState<number>(50);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    description: '',
    timeline: '',
    selectedFeatures: []
  });
  const [showEmailStep, setShowEmailStep] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFeatureToggle = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(featureId)
        ? prev.selectedFeatures.filter(id => id !== featureId)
        : [...prev.selectedFeatures, featureId]
    }));
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowEmailStep(true);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError('Proszę podać poprawny adres email');
      return;
    }
    
    setEmailError('');
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setEstimatedPrice("$15,000 - $20,000");
    setIsLoading(false);
    fireConfetti();
  };

  return (
    <motion.div 
      className="backdrop-blur-sm border bg-[#212121] border-neutral-800 rounded-lg p-6 relative overflow-hidden"
      whileHover={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <AnimatedGradient />
      
      <div className="relative z-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Szczegóły</h2>
          <p className="text-neutral-400">
            Im więcej szczegółów podasz, tym dokładniejsza będzie nasza wycena
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <motion.div 
            className="space-y-2"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center">
              <label htmlFor="projectName" className="block text-sm font-medium text-neutral-200">
                Nazwa
              </label>
              <InfoTooltip text="Nadaj projektowi jasną, opisową nazwę odzwierciedlającą jego cel" />
            </div>
            <input
              id="projectName"
              type="text"
              value={formData.projectName}
              onChange={handleInputChange}
              placeholder="Nazwij swój projekt np. 'Platforma dla miłośników wina'"
              className="w-full px-3 py-2 bg-[#2a2a2a] border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all duration-200 hover:border-neutral-600"
            />
          </motion.div>

          {/* Project Type */}
          <motion.div 
            className="space-y-2"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center">
              <label htmlFor="projectType" className="block text-sm font-medium text-neutral-200">
                Typ
              </label>
              <InfoTooltip text="Wybierz kategorię która najlepiej pasuje do głównej platformy lub technologii Twojego projektu" />
            </div>
            <select
              id="projectType"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-3 py-2 bg-[#2a2a2a] border border-neutral-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all duration-200 hover:border-neutral-600"
            >
              <option value="" disabled>Wybierz typ projektu</option>
              <option value="web">Strona/aplikacja internetowa</option>
              <option value="mobile">Aplikacja mobilna</option>
              <option value="agents">AI Agents</option>
              <option value="ai">Rozwiązanie AI/ML</option>
            </select>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="space-y-2"
            variants={fadeIn}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center">
              <label className="block text-sm font-medium text-neutral-200">
                Funkcjonalności
              </label>
              <InfoTooltip text="Wybierz funkcjonalności specyficzne dla Twojego typu projektu" />
            </div>
            <div className="flex flex-wrap gap-2">
              {projectType && projectTypeFeatures[projectType as keyof typeof projectTypeFeatures].map((feature) => (
                <motion.button
                  key={feature.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFeatureToggle(feature.id);
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    formData.selectedFeatures.includes(feature.id)
                      ? 'bg-gradient-to-r from-[#303030] to-[#242424] text-pink-400 shadow-lg scale-105'
                      : 'bg-[#2a2a2a] text-neutral-300 border border-neutral-700 hover:border-neutral-600'
                  }`}
                >
                  {feature.label}
                </motion.button>
              ))}
              {!projectType && (
                <p className="text-neutral-500 text-sm italic">Wybierz typ projektu, aby zobaczyć dostępne funkcjonalności</p>
              )}
            </div>
          </motion.div>

          {/* Description */}
          <motion.div 
            className="space-y-2"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center">
              <label htmlFor="description" className="block text-sm font-medium text-neutral-200">
                Opis
              </label>
              <InfoTooltip text="Podaj szczegółowe informacje o funkcjach, funkcjonalnościach i specyficznych wymaganiach" />
            </div>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Opisz wymagania swojego projektu..."
              className="w-full h-32 px-3 py-2 bg-[#2a2a2a] border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all duration-200 hover:border-neutral-600 resize-none"
            />
          </motion.div>

          {/* Complexity */}
          <motion.div 
            className="space-y-2"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center">
              <label className="block text-sm font-medium text-neutral-200">
                Złożoność
              </label>
              <InfoTooltip text="Oceń złożoność projektu na podstawie funkcji, integracji i wymagań technicznych" />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={complexity}
              onChange={(e) => setComplexity(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-neutral-400">
              <span>Prosty landing page</span>
              <span>System z integracjami</span>
              <span>Kompleksowe rozwiązanie AI</span>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div 
            className="space-y-2"
            variants={fadeIn}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center">
              <label htmlFor="timeline" className="block text-sm font-medium text-neutral-200">
                Oczekiwany czas realizacji
              </label>
              <InfoTooltip text="Wybierz szacowany czas realizacji projektu" />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {timelineOptions.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, timeline: option.value }))}
                  className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                    formData.timeline === option.value
                      ? 'border-[#FFD700] bg-[#2a2a2a]/50 shadow-[0_0_10px_rgba(255,215,0,0.1)]'
                      : 'border-neutral-700 bg-[#2a2a2a] hover:border-neutral-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="font-medium text-white">{option.label}</div>
                  <div className="text-sm text-neutral-400 mt-1">{option.description}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Submit Buttons */}
          {!showEmailStep ? (
            <motion.button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#FFD700] to-[#FF69B4] text-white font-medium rounded-md transition-all duration-200 relative overflow-hidden group hover:from-[#FFE55C] hover:to-[#FF85C2]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Poznaj swój zakres inwestycji →
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center">
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-200">
                    E-mail
                  </label>
                  <InfoTooltip text="Wyślemy szczegółową wycenę na ten adres email" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Podaj swój adres email"
                  className="w-full px-3 py-2 bg-[#2a2a2a] border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all duration-200 hover:border-neutral-600"
                />
                {emailError && (
                  <p className="text-red-400 text-sm mt-1">{emailError}</p>
                )}
              </div>

              <div className="flex gap-3">
                <motion.button
                  type="button"
                  onClick={() => setShowEmailStep(false)}
                  className="flex-1 py-3 px-4 bg-[#2a2a2a] text-white font-medium rounded-md transition-all duration-200 border border-neutral-700 hover:border-neutral-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {estimatedPrice ? 'Powrót' : '← Wróć'}
                </motion.button>
                {!estimatedPrice && (
                  <motion.button
                    onClick={handleFinalSubmit}
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-[#FFD700] to-[#FF69B4] text-white font-medium rounded-md transition-all duration-200 relative overflow-hidden group disabled:opacity-50 hover:from-[#FFE55C] hover:to-[#FF85C2]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Obliczamy...
                      </span>
                    ) : (
                      <>
                        Otrzymaj wycenę →
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </form>

        {estimatedPrice && <EstimatorResults price={estimatedPrice} />}
      </div>
    </motion.div>
  );
}; 