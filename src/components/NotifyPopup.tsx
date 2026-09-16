import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';

export const NotifyPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after 8 seconds if not dismissed
    const dismissed = sessionStorage.getItem('notifyDismissed');
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('notifyDismissed', 'true');
  };

  if (!visible) return null;

  return (
    <div
      className="animate-slide-up"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 65,
        maxWidth: '340px',
        width: '100%',
        background: 'var(--bg-glass-strong)',
        backdropFilter: 'blur(24px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem',
        boxShadow: 'var(--shadow-xl)',
      }}
    >
      <button
        onClick={dismiss}
        className="btn btn-ghost"
        style={{ position: 'absolute', top: '8px', right: '8px', padding: '0.25rem' }}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>

      <div className="flex items-center gap-3" style={{ marginBottom: '0.75rem' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'var(--gradient-brand)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Bell size={18} color="white" />
        </div>
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Stay Updated</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>New scholarships added weekly</p>
        </div>
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: '1.5' }}>
        Enable notifications so you never miss a new fully funded scholarship listing.
      </p>

      <div className="flex gap-2">
        <button
          onClick={dismiss}
          className="btn btn-primary btn-sm w-full"
          style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.78rem' }}
        >
          Enable Alerts
        </button>
        <button
          onClick={dismiss}
          className="btn btn-ghost btn-sm"
          style={{ fontSize: '0.78rem', whiteSpace: 'nowrap' }}
        >
          Not now
        </button>
      </div>
    </div>
  );
};

export default NotifyPopup;
