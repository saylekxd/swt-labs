import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import AI from './pages/AI';
import Tech from './pages/Tech';
import Portfolio from './pages/Portfolio';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { StructuredData } from '@/components/SEO/StructuredData';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <StructuredData />
      </BrowserRouter>
    </HelmetProvider>
  );
}