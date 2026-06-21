import React, { useState } from 'react';
import { GraduationCap, ArrowRight, Heart } from 'lucide-react';
import { siteConfig, subscribeEmail } from '../config';

// Footer social links, driven by src/config.ts (only set ones render)
const FOOTER_SOCIALS: { key: string; href: string; label: string; path: string }[] = [
  { key: 'whatsappChannel', href: siteConfig.social.whatsappChannel, label: 'WhatsApp Channel', path: 'M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.973-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z' },
  { key: 'youtube', href: siteConfig.social.youtube, label: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
  { key: 'facebook', href: siteConfig.social.facebook, label: 'Facebook', path: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z' },
  { key: 'telegram', href: siteConfig.social.telegram, label: 'Telegram', path: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' },
  { key: 'instagram', href: siteConfig.social.instagram, label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' },
  { key: 'twitter', href: siteConfig.social.twitter, label: 'Twitter / X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
];

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const res = await subscribeEmail(email);
    if (res.ok) {
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
              {FOOTER_SOCIALS.filter(s => s.href).map(s => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="btn btn-secondary flex items-center justify-center"
                  style={{ width: '36px', height: '36px', padding: 0, borderRadius: 'var(--radius-sm)' }}
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
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
