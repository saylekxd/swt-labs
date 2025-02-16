import React, { useState } from 'react'
import Header from '../components/Header'
import { motion } from 'framer-motion'
import { Info } from 'lucide-react'

const AnimatedGradient = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-500 -300 1000 1400" className="w-full h-full opacity-30">
      <defs>
        <linearGradient id="estimatorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#FFD700", stopOpacity: 0.5 }}>
            <animate attributeName="stop-opacity" values="0.5;0.3;0.5" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" style={{ stopColor: "#FF69B4", stopOpacity: 0.4 }}>
            <animate attributeName="stop-opacity" values="0.4;0.2;0.4" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
        
        <filter id="estimatorBlur">
          <feGaussianBlur stdDeviation="20">
            <animate attributeName="stdDeviation" values="20;25;20" dur="4s" repeatCount="indefinite" />
          </feGaussianBlur>
        </filter>
      </defs>
      
      <g filter="url(#estimatorBlur)" transform="translate(200,200)">
        <path fill="url(#estimatorGradient)">
          <animate 
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="M-300,300 C-100,400 100,300 300,100 C500,-100 400,-300 200,-300 C0,-300 -200,-100 -300,100 C-400,300 -400,200 -300,300;
                   M-200,400 C0,500 200,400 400,200 C600,0 500,-200 300,-200 C100,-200 -100,0 -200,200 C-300,400 -300,300 -200,400;
                   M-300,300 C-100,400 100,300 300,100 C500,-100 400,-300 200,-300 C0,-300 -200,-100 -300,100 C-400,300 -400,200 -300,300"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
          />
        </path>
      </g>
    </svg>
  </div>
);

const InfoTooltip = ({ text }: { text: string }) => (
  <div className="group relative inline-block ml-2">
    <Info className="w-4 h-4 text-neutral-500 hover:text-neutral-300 transition-colors" />
    <div className="pointer-events-none absolute -top-2 left-6 w-48 transform -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <div className="bg-neutral-800 text-neutral-200 text-xs rounded-md p-2 shadow-lg">
        {text}
      </div>
    </div>
  </div>
);

export default function ProjectEstimator() {
  const [estimatedPrice, setEstimatedPrice] = useState<string | null>(null);
  const [projectType, setProjectType] = useState<string>('');
  const [complexity, setComplexity] = useState<number>(50);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    timeline: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setEstimatedPrice("$15,000 - $20,000");
    setIsLoading(false);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden" style={{ backgroundColor: '#222222' }}>
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
        `}
      </style>
      
      <Header />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-10 px-4 relative z-10"
      >
        <h1 className="text-4xl font-bold text-center mb-4">Project Cost Estimator</h1>
        <p className="text-neutral-400 text-center mb-8 max-w-xl mx-auto">
          Get an instant AI-powered estimate for your project. Fill in the details below, and we'll analyze your requirements to provide a cost range.
        </p>
        
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="backdrop-blur-sm border border-neutral-800 rounded-lg p-6 relative overflow-hidden"
            whileHover={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedGradient />
            
            <div className="relative z-10">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Project Details</h2>
                <p className="text-neutral-400">
                  The more details you provide, the more accurate our estimate will be
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div 
                  className="space-y-2"
                  variants={fadeIn}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center">
                    <label htmlFor="projectName" className="block text-sm font-medium text-neutral-200">
                      Project Name
                    </label>
                    <InfoTooltip text="Give your project a clear, descriptive name that reflects its purpose" />
                  </div>
                  <input
                    id="projectName"
                    type="text"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    placeholder="Enter project name"
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all duration-200 hover:border-neutral-600"
                  />
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  variants={fadeIn}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center">
                    <label htmlFor="projectType" className="block text-sm font-medium text-neutral-200">
                      Project Type
                    </label>
                    <InfoTooltip text="Select the category that best matches your project's primary platform or technology" />
                  </div>
                  <select
                    id="projectType"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-neutral-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all duration-200 hover:border-neutral-600"
                  >
                    <option value="" disabled>Select project type</option>
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile App</option>
                    <option value="desktop">Desktop Software</option>
                    <option value="ai">AI/ML Solution</option>
                  </select>
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  variants={fadeIn}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center">
                    <label htmlFor="description" className="block text-sm font-medium text-neutral-200">
                      Project Description
                    </label>
                    <InfoTooltip text="Provide detailed information about features, functionality, and any specific requirements" />
                  </div>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your project requirements..."
                    className="w-full h-32 px-3 py-2 bg-[#2a2a2a] border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all duration-200 hover:border-neutral-600 resize-none"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Tip: Include key features, technical requirements, and any specific constraints
                  </p>
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  variants={fadeIn}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center">
                    <label className="block text-sm font-medium text-neutral-200">
                      Project Complexity
                    </label>
                    <InfoTooltip text="Rate how complex your project is based on features, integrations, and technical requirements" />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={complexity}
                    onChange={(e) => setComplexity(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-neutral-400">
                    <span>Simple</span>
                    <span>Moderate</span>
                    <span>Complex</span>
                  </div>
                  <div className="text-center text-sm text-neutral-400 mt-1">
                    Complexity: {complexity}%
                  </div>
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  variants={fadeIn}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center">
                    <label htmlFor="timeline" className="block text-sm font-medium text-neutral-200">
                      Expected Timeline (months)
                    </label>
                    <InfoTooltip text="Estimate how many months you expect the project to take from start to finish" />
                  </div>
                  <input
                    id="timeline"
                    type="number"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="Enter expected timeline"
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all duration-200 hover:border-neutral-600"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#FFD700] to-[#FF69B4] text-white font-medium rounded-md transition-all duration-200 relative overflow-hidden group disabled:opacity-50 hover:from-[#FFE55C] hover:to-[#FF85C2]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="ml-2">Analyzing Project...</span>
                    </div>
                  ) : (
                    <>
                      Generate Estimate
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </>
                  )}
                </motion.button>

                {estimatedPrice && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 backdrop-blur-sm border border-neutral-800 rounded-lg p-6 relative overflow-hidden bg-[#333333]"
                  >
                    <AnimatedGradient />
                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold mb-2">Estimated Cost Range</h3>
                      <p className="text-neutral-400 mb-4">
                        Based on your project details, here's our estimation:
                      </p>
                      <p className="text-3xl font-bold text-center bg-gradient-to-r from-[#FFD700] to-[#FF69B4] bg-clip-text text-transparent">
                        {estimatedPrice}
                      </p>
                      <p className="text-sm text-center text-neutral-400 mt-2">
                        This is a preliminary estimate and may vary based on detailed requirements
                      </p>
                      <div className="mt-4 p-3 bg-white/5 rounded-md backdrop-blur-sm">
                        <p className="text-sm text-neutral-300">
                          💡 Want a more detailed estimate? Schedule a free consultation with our team to discuss your project in depth.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 
