import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HomePage from './pages/HomePage';
// Temporarily hidden AI page
// import AI from './pages/AI';
import Tech from './pages/Tech';
import Portfolio from './pages/Portfolio';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProjectEstimator from './pages/ProjectEstimator';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminBlog from './pages/AdminBlog';
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
      {/* Default theme color and baseline meta tags for all pages */}
      <Helmet defaultTitle="SWT Labs - AI-Powered Solution Development">
        <meta name="theme-color" content="#242424" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="Polish" />
        <meta name="author" content="SWT Labs" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SWT Labs" />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:url" content="https://swtlabs.pl" />
        <meta property="og:title" content="SWT Labs - AI-Powered Solution Development" />
        <meta property="og:description" content="Custom AI-powered solutions for your business. Web development, mobile apps, and custom software." />
        <meta property="og:image" content="https://swtlabs.pl/social-share-image2.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="SWT Labs - AI-Powered Solution Development" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@swtlabs" />
        <meta name="twitter:creator" content="@swtlabs" />
        <meta name="twitter:title" content="SWT Labs - AI-Powered Solution Development" />
        <meta name="twitter:description" content="Custom AI-powered solutions for your business. Web development, mobile apps, and custom software." />
        <meta name="twitter:image" content="https://swtlabs.pl/social-share-image2.png" />
        
        <link rel="icon" href="/webfavicon.png" />
      </Helmet>
      
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
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <StructuredData />
      </BrowserRouter>
    </HelmetProvider>
  );
}