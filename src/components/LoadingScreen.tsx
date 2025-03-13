import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Track loading progress
    const updateProgress = () => {
      // Calculate load progress based on document readiness
      if (document.readyState === 'loading') {
        setProgress(30);
      } else if (document.readyState === 'interactive') {
        setProgress(70);
      } else if (document.readyState === 'complete') {
        setProgress(100);
      }
    };

    // Initial check
    updateProgress();

    // Set up event listeners
    document.addEventListener('readystatechange', updateProgress);

    // Clean up
    return () => {
      document.removeEventListener('readystatechange', updateProgress);
    };
  }, []);

  return (
    <>
      <Helmet>
        <meta name="theme-color" content="#000000" />
        <title>Wczytywanie - SWT Labs</title>
        <meta name="description" content="Wczytywanie zawartości. Proszę czekać..." />
        <meta property="og:image" content="https://swtlabs.pl/og-image.jpg" />
        <meta property="og:image" content="https://swtlabs.pl/@social-share-image.png" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <img 
            src="/logo-swtlabs.webp" 
            alt="SWT Labs Logo" 
            className="w-28 h-28 mb-4 animate-pulse"
          />
          <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen; 