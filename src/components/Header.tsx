import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppleStyleDock } from './ui/dock.demo';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Header: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      className={`w-full ${isMobile ? 'px-5 py-4' : 'p-4'} z-50 transition-opacity duration-300 ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: 'transparent' }}
    >
      <nav
        className={`flex justify-between items-center max-w-[1200px] mx-auto ${isMobile ? 'pt-2' : 'pt-14'}`}
      >
        <div className="flex items-center">
          <img
            src="/webfavicon.png"
            alt="Logo"
            className={`${isMobile ? 'w-8' : 'w-10'}`}
          />
          <Link to="/">
            <span
              className={`font-bold text-white ml-2 ${isMobile ? 'text-xl' : 'text-2xl'}`}
            >
              swtlabs
            </span>
          </Link>  
        </div>
        
        <div className="flex items-center gap-8">
          <div className={`${isMobile ? 'h-8' : 'h-10'}`}>
            <AppleStyleDock />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;