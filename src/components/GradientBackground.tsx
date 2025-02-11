// import ReactDOM from 'react-dom';

const GradientBackground = () => {
  return (
    <div className="relative w-full h-[400px] overflow-hidden pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-500 -300 1000 1400" className="w-full h-full opacity-99">
        <defs>
          <linearGradient id="goldPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#FFD700", stopOpacity: 0.9 }}>
              <animate attributeName="stop-opacity" values="0.9;0.7;0.9" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" style={{ stopColor: "#FF69B4", stopOpacity: 0.8 }}>
              <animate attributeName="stop-opacity" values="0.8;0.6;0.8" dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          <filter id="blur">
            <feGaussianBlur stdDeviation="25">
              <animate attributeName="stdDeviation" values="25;30;25" dur="4s" repeatCount="indefinite" />
            </feGaussianBlur>
          </filter>
        </defs>
        
        <rect x="-900" y="-500" width="1400" height="1400" fill="transparent" />
        
        <g filter="url(#blur)" transform="translate(200,200)">
          <path fill="url(#goldPink)">
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
          
          <path fill="url(#goldPink)" opacity="0.7">
            <animate 
              attributeName="d"
              dur="15s"
              repeatCount="indefinite"
              values="M-200,200 C0,300 200,200 400,0 C600,-200 500,-400 300,-400 C100,-400 -100,-200 -200,0 C-300,200 -300,100 -200,200;
                     M-100,300 C100,400 300,300 500,100 C700,-100 600,-300 400,-300 C200,-300 0,-100 -100,100 C-200,300 -200,200 -100,300;
                     M-200,200 C0,300 200,200 400,0 C600,-200 500,-400 300,-400 C100,-400 -100,-200 -200,0 C-300,200 -300,100 -200,200"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </path>
          
          <path fill="url(#goldPink)" opacity="0.6">
            <animate 
              attributeName="d"
              dur="18s"
              repeatCount="indefinite"
              values="M-100,100 C100,200 300,100 500,-100 C700,-300 600,-500 400,-500 C200,-500 0,-300 -100,-100 C-200,100 -200,0 -100,100;
                     M0,200 C200,300 400,200 600,0 C800,-200 700,-400 500,-400 C300,-400 100,-200 0,0 C-100,200 -100,100 0,200;
                     M-100,100 C100,200 300,100 500,-100 C700,-300 600,-500 400,-500 C200,-500 0,-300 -100,-100 C-200,100 -200,0 -100,100"
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </path>
        </g>
      </svg>
    </div>
  );
};

export default GradientBackground; 