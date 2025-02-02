import React from 'react';

const BackgroundSVG: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '600px',
        height: '600px',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-500 -500 1400 1400">
        <defs>
          <linearGradient id="goldPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 0.9 }}>
              <animate attributeName="stop-opacity" values="0.9;0.7;0.9" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" style={{ stopColor: '#FF69B4', stopOpacity: 0.8 }}>
              <animate attributeName="stop-opacity" values="0.8;0.6;0.8" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="25">
              <animate attributeName="stdDeviation" values="25;30;25" dur="5s" repeatCount="indefinite" />
            </feGaussianBlur>
          </filter>
        </defs>
        <g filter="url(#blur)" transform="translate(200,200)">
          <path fill="url(#goldPink)">
            <animate
              attributeName="d"
              dur="15s"
              repeatCount="indefinite"
              values="
                M-400,0 C-300,-200 -100,-200 0,-100 C100,0 200,200 100,300 C0,400 -200,300 -300,200 C-400,100 -500,200 -400,0;
                M-300,-100 C-100,-300 100,-200 200,-100 C300,0 200,200 100,300 C0,400 -200,300 -300,200 C-400,100 -500,0 -300,-100;
                M-200,0 C-100,-200 100,-100 200,0 C300,100 200,300 0,300 C-200,300 -300,200 -400,100 C-500,0 -300,200 -200,0;
                M-400,0 C-300,-200 -100,-200 0,-100 C100,0 200,200 100,300 C0,400 -200,300 -300,200 C-400,100 -500,200 -400,0
              "
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </path>
          <path fill="url(#goldPink)" opacity="0.7">
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="
                M-350,50 C-250,-150 -50,-150 50,-50 C150,50 250,250 150,350 C50,450 -150,350 -250,250 C-350,150 -450,250 -350,50;
                M-250,-50 C-50,-250 150,-150 250,-50 C350,50 250,250 150,350 C50,450 -150,350 -250,250 C-350,150 -450,50 -250,-50;
                M-150,50 C-50,-150 150,-50 250,50 C350,150 250,350 50,350 C-150,350 -250,250 -350,150 C-450,50 -250,250 -150,50;
                M-350,50 C-250,-150 -50,-150 50,-50 C150,50 250,250 150,350 C50,450 -150,350 -250,250 C-350,150 -450,250 -350,50
              "
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </path>
          <path fill="url(#goldPink)" opacity="0.6">
            <animate
              attributeName="d"
              dur="18s"
              repeatCount="indefinite"
              values="
                M-450,-50 C-350,-250 -150,-250 -50,-150 C50,-50 150,150 50,250 C-50,350 -250,250 -350,150 C-450,50 -550,150 -450,-50;
                M-350,-150 C-150,-350 50,-250 150,-150 C250,-50 150,150 50,250 C-50,350 -250,250 -350,150 C-450,50 -550,-50 -350,-150;
                M-250,-50 C-150,-250 50,-150 150,-50 C250,50 150,250 -50,250 C-250,250 -350,150 -450,50 C-550,-50 -350,150 -250,-50;
                M-450,-50 C-350,-250 -150,-250 -50,-150 C50,-50 150,150 50,250 C-50,350 -250,250 -350,150 C-450,50 -550,150 -450,-50
              "
              calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
            />
          </path>
        </g>
      </svg>
    </div>
  );
};

export default BackgroundSVG; 