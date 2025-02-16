import React, { useEffect, useState } from 'react';
import browarLogo from '../assets/logos/browarrybnik.svg?url';
import miastorybnikLogo from '../assets/logos/miastorybnik.svg?url';
import akademiaSwt from '../assets/logos/akademiaswt.svg';
import orlenfundacjaLogo from '../assets/logos/orlenfundacja.svg?url';
import swtLogo from '../assets/logos/swt.svg?url';



interface Partner {
  name: string;
  logo: string;
}

const partners: Partner[] = [
  { name: 'Browar', logo: browarLogo },
  { name: 'Miastorybnik', logo: miastorybnikLogo },
  { name: 'Akademia', logo: akademiaSwt },
  { name: 'Orlen Fundacja', logo: orlenfundacjaLogo },
  { name: 'SWT', logo: swtLogo }
];

const PartnerLogoCarousel: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const animation = () => {
      setScrollPosition((prev) => (prev - 1) % (partners.length * 200));
    };

    const intervalId = setInterval(animation, 30);
    return () => clearInterval(intervalId);
  }, []);

  // Double the array to create seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(8px)',
        padding: '2rem 0',
        zIndex: 20,
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
          <h3
            style={{
              color: '#e47889',
              fontSize: '1.125rem',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              letterSpacing: '0.02em',
            }}
          >
            Zaufali nam
          </h3>
          <div
            style={{
              display: 'flex',
              gap: '4rem',
              overflow: 'hidden',
              position: 'relative',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '3rem',
                transform: `translateX(${scrollPosition}px)`,
                transition: 'transform 0.1s linear',
                whiteSpace: 'nowrap',
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  style={{
                    minWidth: isMobile 
                      ? (partner.name === 'Browar' || partner.name === 'SWT' ? '50px' : '90px')
                      : '120px',
                    opacity: 0.8,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src={partner.logo}
                    alt={`Logo ${partner.name} - partner SWT Labs`}
                    loading="lazy"
                    decoding="async"
                    width={isMobile ? '100px' : '200px'}
                    height={isMobile ? '50px' : '100px'}
                    style={{
                      width: isMobile ? '100px' : '200px',
                      height: isMobile ? '50px' : '100px',
                      aspectRatio: '2/1',
                      objectFit: 'contain',
                      marginTop: partner.name === 'Browar' ? (isMobile ? '-5px' : '-5px') : '0px',
                      display: 'block'
                    }}
                    onError={(e) => {
                      console.error(`Error loading logo for ${partner.name}:`, e);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogoCarousel; 
