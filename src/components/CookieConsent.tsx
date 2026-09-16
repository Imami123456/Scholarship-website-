import React, { useState } from 'react';
import { Shield, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(() => {
    return !localStorage.getItem('cookieConsent');
  });

  const accept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div
        className="animate-slide-up"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 70,
          maxWidth: '520px',
          width: 'calc(100% - 2rem)',
          background: 'var(--bg-glass-strong)',
          backdropFilter: 'blur(24px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Shield size={22} style={{ color: 'var(--primary)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: '1.5', fontWeight: 500 }}>
            We use cookies to improve your experience.
          </p>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            By continuing to use this site, you agree to our cookie policy.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={accept}
            className="btn btn-primary btn-sm"
            style={{ borderRadius: 'var(--radius-sm)', padding: '0.4rem 1rem', fontSize: '0.78rem' }}
          >
            Accept
          </button>
          <button
            onClick={() => setVisible(false)}
            className="btn btn-ghost btn-sm"
            style={{ padding: '0.35rem' }}
            aria-label="Dismiss cookie notice"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
