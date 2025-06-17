import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Dynamic imports for routes
const HomePage = lazy(() => import('./pages/HomePage'));
// Temporarily hidden AI page
// const AI = lazy(() => import('./pages/AI'));
const ProjectEstimator = lazy(() => import('./pages/ProjectEstimator'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const AdminBlog = lazy(() => import('./pages/AdminBlog'));

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Temporarily hidden AI page */}
      {/* <Route path="/ai" element={<AI />} /> */}
      <Route path="/estimate" element={<ProjectEstimator />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/admin/blog" element={<AdminBlog />} />
    </Routes>
  );
}

export default AppRouter; 