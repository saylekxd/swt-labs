import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Dynamic imports for routes
const HomePage = lazy(() => import('./pages/HomePage'));
// Temporarily hidden AI page
// const AI = lazy(() => import('./pages/AI'));
const ProjectEstimator = lazy(() => import('./pages/ProjectEstimator'));

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Temporarily hidden AI page */}
      {/* <Route path="/ai" element={<AI />} /> */}
      <Route path="/estimate" element={<ProjectEstimator />} />
    </Routes>
  );
}

export default AppRouter; 