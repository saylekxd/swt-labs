import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Dynamic imports for routes
const HomePage = lazy(() => import('./pages/HomePage'));
const AI = lazy(() => import('./pages/AI'));

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ai" element={<AI />} />
    </Routes>
  );
}

export default AppRouter; 