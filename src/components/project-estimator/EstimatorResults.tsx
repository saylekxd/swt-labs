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
      Na podstawie podanych informacji, przygotowaliśmy wstępną wycenę projektu:
      </p>
      <p className="text-3xl font-bold text-center bg-gradient-to-r from-[#FFD700] to-[#FF69B4] bg-clip-text text-transparent">
        {price}
      </p>
      <p className="text-sm text-center text-neutral-400 mt-2">
      To szacunkowa wycena, która może ulec zmianie po ustaleniu szczegółowych wymagań.
      </p>
      <div className="mt-4 p-3 bg-white/5 rounded-md backdrop-blur-sm">
        <p className="text-sm text-neutral-300">
        🚀 Tworzymy nowoczesne i przystępne cenowo aplikacje webowe oraz mobilne, które wyróżniają się szybkością działania, intuicyjnym designem oraz elastycznością dostosowaną do potrzeb Twojego biznesu. Dzięki AI-Powered Development stworzymy Twoje MVP w tygodniach, a nie miesiącach!
        </p>
      </div>
    </div>
  </motion.div>
); 