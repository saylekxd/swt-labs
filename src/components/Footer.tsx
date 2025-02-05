import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';

interface FooterProps {
  justifyContent?: React.CSSProperties['justifyContent'];
}

const Footer: React.FC<FooterProps> = ({ justifyContent = 'flex-end' }) => {
  return (
    <footer
      style={{
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: justifyContent,
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#666666', fontSize: '0.875rem' }}>
            © 2025 SWTLabs Int
          </span>
          <Link 
            to="/privacy-policy" 
            style={{ 
              marginLeft: '1rem',
              color: '#666666',
              fontSize: '0.875rem',
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
            gap: '1.5rem',
            marginLeft: '2rem'
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
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 