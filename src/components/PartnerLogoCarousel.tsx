import React, { useEffect, useState } from 'react';

interface Partner {
  name: string;
  logo: string;
}

const partners: Partner[] = [
  { name: 'Evernote', logo: '/logos/evernote.svg' },
  { name: 'Loom', logo: '/logos/loom.svg' },
  { name: 'Hotjar', logo: '/logos/hotjar.svg' },
  { name: 'Lattice', logo: '/logos/lattice.svg' },
];

const PartnerLogoCarousel: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

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
              color: '#FF4F00',
              fontSize: '1.125rem',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              letterSpacing: '0.02em',
            }}
          >
            Trusted by
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
                gap: '4rem',
                transform: `translateX(${scrollPosition}px)`,
                transition: 'transform 0.1s linear',
                whiteSpace: 'nowrap',
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  style={{
                    minWidth: '120px',
                    opacity: 0.65,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    style={{
                      height: '28px',
                      objectFit: 'contain',
                      filter: 'brightness(0)',
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
