import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface FooterProps {
  justifyContent?: React.CSSProperties['justifyContent'];
}

const Footer: React.FC<FooterProps> = ({ justifyContent = 'flex-end' }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <footer
      style={{
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: isMobile ? '0.5rem' : '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: justifyContent,
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingBottom: isMobile ? '0.75rem' : '1.5rem',
          gap: isMobile ? '0.5rem' : 0,
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '0.25rem' : 0,
        }}>
          <span style={{ 
            color: '#666666', 
            fontSize: isMobile ? '0.75rem' : '0.875rem' 
          }}>
            © 2025
          </span>
          <Link 
            to="/privacy-policy" 
            style={{ 
              marginLeft: isMobile ? 0 : '1rem',
              color: '#666666',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseOut={(e) => e.currentTarget.style.color = '#666666'}
          >
            Privacy Policy
          </Link>
        </div>
        
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: isMobile ? '1rem' : '1.5rem',
            marginLeft: isMobile ? 0 : '2rem',
            marginTop: isMobile ? '0.25rem' : 0,
          }}
        >
          {[
            { icon: Facebook, link: 'https://facebook.com' },
            { icon: Twitter, link: 'https://twitter.com' },
            { icon: Youtube, link: 'https://youtube.com' },
            { icon: Linkedin, link: 'https://linkedin.com' }
          ].map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: '#666666',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseOut={(e) => e.currentTarget.style.color = '#666666'}
              >
                <Icon size={isMobile ? 14 : 16} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 