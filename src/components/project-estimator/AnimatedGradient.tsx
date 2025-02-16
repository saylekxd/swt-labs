export const AnimatedGradient = () => (
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