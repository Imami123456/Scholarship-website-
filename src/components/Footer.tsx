import React, { useState } from 'react';
import { GraduationCap, ArrowRight, Heart } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleNav = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      style={{
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        padding: '5rem 0 2rem',
        marginTop: 'auto',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div className="container">
        <div 
          className="grid grid-4" 
          style={{ 
            gap: '3rem',
            marginBottom: '4rem',
            textAlign: 'left'
          }}
        >
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => handleNav('home')}>
              <div 
                className="flex items-center justify-center" 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: 'var(--radius-sm)',
                  background: 'linear-gradient(135deg, var(--primary) 0%, hsl(200, 95%, 45%) 100%)',
                  color: 'white'
                }}
              >
                <GraduationCap size={18} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem' }}>
                ScholarSphere
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Empowering students globally by providing aggregated scholarship directories, application guides, and professional advice completely free.
            </p>
            <div className="flex gap-3" style={{ marginTop: '0.5rem' }}>
              <a href="#" className="btn btn-secondary flex items-center justify-center" style={{ width: '36px', height: '36px', padding: 0, borderRadius: 'var(--radius-sm)' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="btn btn-secondary flex items-center justify-center" style={{ width: '36px', height: '36px', padding: 0, borderRadius: 'var(--radius-sm)' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
                </svg>
              </a>
              <a href="#" className="btn btn-secondary flex items-center justify-center" style={{ width: '36px', height: '36px', padding: 0, borderRadius: 'var(--radius-sm)' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-col gap-4">
            <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)' }}>
              Scholarships
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('home'); }} className="nav-link" style={{ padding: 0 }}>Fully Funded Masters</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('home'); }} className="nav-link" style={{ padding: 0 }}>PhD Fellowships</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('home'); }} className="nav-link" style={{ padding: 0 }}>Undergraduate Grants</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('home'); }} className="nav-link" style={{ padding: 0 }}>Study in USA / UK / Germany</a></li>
            </ul>
          </div>

          {/* Guides & Resources */}
          <div className="flex flex-col gap-4">
            <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)' }}>
              Application Resources
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('blog'); }} className="nav-link" style={{ padding: 0 }}>Motivation Letter Guides</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('blog'); }} className="nav-link" style={{ padding: 0 }}>Academic CV Formats</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('blog'); }} className="nav-link" style={{ padding: 0 }}>Recommendation Letter Tips</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('blog'); }} className="nav-link" style={{ padding: 0 }}>Interview Preparation Q&As</a></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="flex flex-col gap-4">
            <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)' }}>
              Earn Alerts
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Subscribe to get weekly notifications when top fully funded scholarships open for application.
            </p>
            {subscribed ? (
              <div 
                className="badge badge-success animate-fade-in" 
                style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', width: '100%', justifyContent: 'center' }}
              >
                Subscription Active! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2" style={{ position: 'relative' }}>
                <input
                  type="email"
                  placeholder="name@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  style={{ paddingRight: '45px', fontSize: '0.875rem' }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    position: 'absolute',
                    right: '4px',
                    top: '4px',
                    bottom: '4px',
                    padding: '0 0.75rem',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Legal and Made with Love */}
        <div 
          className="flex flex-col md-row items-center justify-between"
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '2rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            gap: '1rem'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} ScholarSphere. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Made with <Heart size={14} style={{ color: 'var(--danger)', fill: 'var(--danger)' }} /> for international student support.
          </div>
          <div className="flex gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'underline' }}>Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'underline' }}>Terms of Service</a>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'underline' }}>Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
