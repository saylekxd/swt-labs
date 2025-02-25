import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
// Temporarily hidden AI page
// import AI from './pages/AI';
import Tech from './pages/Tech';
import Portfolio from './pages/Portfolio';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProjectEstimator from './pages/ProjectEstimator';
import ErrorPage from './pages/ErrorPage';
import { StructuredData } from '@/components/SEO/StructuredData';

export default function App() {
  return (
    <HelmetProvider>
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