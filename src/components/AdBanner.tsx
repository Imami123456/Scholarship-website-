import React from 'react';
import { DollarSign, ExternalLink } from 'lucide-react';

interface AdBannerProps {
  format: 'leaderboard' | 'sidebar' | 'inline';
  customText?: string;
  link?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  format,
  customText,
  link = 'https://www.google.com/adsense/start/'
}) => {
  const getFormatClasses = () => {
    switch (format) {
      case 'leaderboard':
        return 'ad-leaderboard';
      case 'sidebar':
        return 'ad-sidebar';
      case 'inline':
        return 'ad-inline';
      default:
        return 'ad-inline';
    }
  };

  const isAffiliate = !!customText;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`ad-slot ${getFormatClasses()} flex flex-col justify-center items-center card card-hover`}
      style={{
        textDecoration: 'none',
        background: isAffiliate
          ? 'linear-gradient(135deg, hsl(262, 80%, 97%) 0%, hsl(200, 95%, 97%) 100%)'
          : 'var(--bg-card)',
        borderColor: isAffiliate ? 'var(--primary)' : 'var(--border-color)',
        borderStyle: isAffiliate ? 'solid' : 'dashed',
        padding: '1.25rem'
      }}
    >
      <div className="flex items-center gap-2" style={{ zIndex: 1 }}>
        {isAffiliate ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <span
              className="badge badge-primary animate-pulse-subtle"
              style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}
            >
              Partner Promotion
            </span>
            <h4 style={{ margin: '4px 0', fontSize: '1rem', color: 'var(--text-main)' }}>
              {customText}
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }} className="flex items-center gap-1">
              Top recommended service for scholarship applicants <ExternalLink size={12} />
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="flex items-center gap-1 text-muted" style={{ color: 'var(--text-muted)' }}>
              <DollarSign size={16} style={{ color: 'var(--success)' }} />
              <span style={{ fontWeight: 600 }}>Simulated Monetization Spot</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '300px' }}>
              Connect Google AdSense to generate revenue on page views and clicks.
            </p>
          </div>
        )}
      </div>
    </a>
  );
};
export default AdBanner;
