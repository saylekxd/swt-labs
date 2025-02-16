import { motion } from 'framer-motion'
import { EstimatorForm } from '../components/project-estimator/EstimatorForm'
import Header from '@/components/Header'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ProjectEstimator() {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[#222222]">
      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 20px;
            height: 20px;
            background: #222222;
            border: 2px solid #737373;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            transform: scale(1);
          }
          
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 0 8px rgba(255, 105, 180, 0.3);
          }
          
          input[type="range"]::-webkit-slider-thumb:active {
            transform: scale(0.95);
          }
          
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #222222;
            border: 2px solid #737373;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            transform: scale(1);
          }
          
          input[type="range"]::-moz-range-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 0 8px rgba(255, 105, 180, 0.3);
          }
          
          input[type="range"]::-moz-range-thumb:active {
            transform: scale(0.95);
          }

          @media (max-width: 640px) {
            input[type="range"]::-webkit-slider-thumb {
              width: 16px;
              height: 16px;
            }
            
            input[type="range"]::-moz-range-thumb {
              width: 16px;
              height: 16px;
            }
          }
        `}
      </style>
      
      <Header />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-6 sm:py-10 px-4 relative z-10"
      >
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-3 sm:mb-4">
          Ile będzie kosztował Twój wymarzony projekt?
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base text-center mb-6 sm:mb-8 max-w-xl mx-auto">
          Dzięki naszej inteligentnej wycenie dowiesz się w 2 minuty, jak zamienić pomysł w rzeczywistość - bez ukrytych kosztów i technicznego żargonu.
        </p>
        
        <div className="max-w-2xl mx-auto">
          <EstimatorForm />
        </div>
      </motion.div>
    </div>
  );
} 
