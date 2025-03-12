import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
// Temporarily hidden AI page
// import AI from './pages/AI';
import Tech from './pages/Tech';
import Portfolio from './pages/Portfolio';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProjectEstimator from './pages/ProjectEstimator';
import ErrorPage from './pages/ErrorPage';
import { StructuredData } from '@/components/SEO/StructuredData';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to handle page load completion
    const handleLoadComplete = () => {
      // Add a small delay to ensure all resources are properly loaded
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    // Check if document is already loaded
    if (document.readyState === 'complete') {
      handleLoadComplete();
    } else {
      // Wait for the page to load completely
      window.addEventListener('load', handleLoadComplete);
      
      // Fallback in case load event doesn't fire properly
      const fallbackTimer = setTimeout(() => {
        setIsLoading(false);
      }, 5000);

      // Clean up
      return () => {
        window.removeEventListener('load', handleLoadComplete);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  return (
    <HelmetProvider>
      {isLoading && <LoadingScreen />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Temporarily hidden AI page */}
          {/* <Route path="/ai" element={<AI />} /> */}
          <Route path="/tech" element={<Tech />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/estimate" element={<ProjectEstimator />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <StructuredData />
      </BrowserRouter>
    </HelmetProvider>
  );
}