import React, { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { subscribeEmail } from '../config';

interface Props {
  heading?: string;
  subtext?: string;
  variant?: 'card' | 'plain';
  onDone?: () => void;
}

/**
 * Email capture ("get notified"). Saves the signup locally (visible in
 * Admin > Subscribers) and forwards to your email service if configured.
 */
export const EmailSubscribe: React.FC<Props> = ({
  heading = 'Get notified about new scholarships',
  subtext = 'Drop your email and we’ll alert you when a new opportunity is posted. No spam.',
  variant = 'card',
  onDone,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    const res = await subscribeEmail(email);
    if (res.ok) {
      setStatus('done');
      setEmail('');
      onDone?.();
    } else {
      setStatus('error');
    }
  };

  const inner = (
    <>
      {heading ? <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>{heading}</h3> : null}
      {subtext ? (
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{subtext}</p>
      ) : null}

      {status === 'done' ? (
        <div
          className="badge badge-success flex items-center gap-1"
          style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', width: '100%', justifyContent: 'center' }}
        >
          <Check size={16} /> You're subscribed! We'll be in touch.
        </div>
      ) : (
        <form onSubmit={submit} className="flex gap-2">
          <div style={{ position: 'relative', flex: 1 }}>
            <Mail
              size={16}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="email"
              required
              aria-label="Email address"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              style={{ paddingLeft: '2.25rem' }}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
            {status === 'loading' ? '…' : <>Notify me <ArrowRight size={16} /></>}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '0.5rem' }}>
          Please enter a valid email address.
        </p>
      )}
    </>
  );

  return variant === 'card'
    ? <div className="card" style={{ padding: '1.5rem' }}>{inner}</div>
    : <div>{inner}</div>;
};

export default EmailSubscribe;
