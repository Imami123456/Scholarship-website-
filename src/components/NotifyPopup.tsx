import React, { useEffect, useState } from 'react';
import { X, Bell } from 'lucide-react';
import EmailSubscribe from './EmailSubscribe';

const KEY = 'notify_dismissed';

/**
 * Polite, timed "get notified" popup. Appears bottom-right after a delay, only
 * once (remembers dismissal), and only after the cookie banner is dealt with.
 */
export const NotifyPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = !!localStorage.getItem(KEY);
    } catch {
      /* ignore */
    }
    if (dismissed) return;

    // Show after 12s — but only once the cookie banner has been dealt with.
    const t = setTimeout(() => {
      let cookieDecided = false;
      try {
        cookieDecided = !!localStorage.getItem('cookie_consent');
      } catch {
        /* ignore */
      }
      if (cookieDecided) setVisible(true);
    }, 12000);

    return () => clearTimeout(t);
  }, []);

  const close = () => {
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div
        className="card animate-slide-up notify-popup"
        role="dialog"
        aria-label="Subscribe for updates"
        style={{
          position: 'fixed',
          bottom: '1.25rem',
          right: '1.25rem',
          zIndex: 190,
          width: 'min(360px, calc(100vw - 2rem))',
          boxShadow: 'var(--shadow-lg)',
          padding: '1.5rem',
        }}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="flex items-center justify-center"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: 'none',
            background: 'var(--bg-main)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
          <span
            className="flex items-center justify-center"
            style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)' }}
          >
            <Bell size={20} />
          </span>
          <h4 style={{ fontSize: '1.05rem', margin: 0 }}>New scholarships weekly</h4>
        </div>

        <EmailSubscribe
          variant="plain"
          heading=""
          subtext="Get an email the moment we post a new fully funded scholarship."
          onDone={() => setTimeout(close, 1800)}
        />
      </div>

      {/* On mobile, sit above the sticky social bar so they don't overlap */}
      <style>{`
        @media (max-width: 768px) {
          .notify-popup { bottom: 5.5rem !important; }
        }
      `}</style>
    </>
  );
};

export default NotifyPopup;
