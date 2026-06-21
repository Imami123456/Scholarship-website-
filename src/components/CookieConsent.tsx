import React, { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';

const KEY = 'cookie_consent';

/**
 * Cookie consent banner. Remembers the choice in localStorage so it only shows
 * once. Sits above other content (z-index 200) so it's never blocked.
 */
export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* ignore */
    }
  }, []);

  const decide = (choice: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="glass-panel animate-slide-up"
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '1rem',
        right: '1rem',
        zIndex: 200,
        maxWidth: '720px',
        margin: '0 auto',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-color)',
      }}
    >
      <div className="flex items-center gap-4" style={{ flexWrap: 'wrap' }}>
        <div className="flex items-center gap-3" style={{ flex: 1, minWidth: '240px' }}>
          <Cookie size={26} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
            We use cookies to remember your theme and understand how visitors use the site. See our{' '}
            <a href="#" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Privacy Policy</a>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => decide('declined')} className="btn btn-secondary btn-sm">Decline</button>
          <button onClick={() => decide('accepted')} className="btn btn-primary btn-sm">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
