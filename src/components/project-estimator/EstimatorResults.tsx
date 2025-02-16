import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedGradient } from './AnimatedGradient';

interface EstimatorResultsProps {
  price: string;
}

export const EstimatorResults: React.FC<EstimatorResultsProps> = ({ price }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="mt-6 backdrop-blur-sm border border-neutral-800 rounded-lg p-6 relative overflow-hidden bg-[#333333]"
  >
    <AnimatedGradient />
    <div className="relative z-10">
      <h3 className="text-xl font-semibold mb-2">Gotowy na transformację?</h3>
      <p className="text-neutral-400 mb-4">
        Based on your project details, here's our estimation:
      </p>
      <p className="text-3xl font-bold text-center bg-gradient-to-r from-[#FFD700] to-[#FF69B4] bg-clip-text text-transparent">
        {price}
      </p>
      <p className="text-sm text-center text-neutral-400 mt-2">
        This is a preliminary estimate and may vary based on detailed requirements
      </p>
      <div className="mt-4 p-3 bg-white/5 rounded-md backdrop-blur-sm">
        <p className="text-sm text-neutral-300">
          💡 "W ciągu 3 miesięcy od uruchomienia klient z branży e-commerce odnotował 150% wzrost konwersji" - podobny projekt wyceniliśmy na $18,000
        </p>
      </div>
    </div>
  </motion.div>
); 