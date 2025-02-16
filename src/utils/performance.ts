export const reportWebVitals = (metric) => {
  if (metric.label === 'web-vital') {
    console.log(metric);
    // Send to analytics
  }
};

// In main.tsx
import { reportWebVitals } from './utils/performance';
reportWebVitals(); 