import React, { useState } from 'react';
import { Link2, Check } from 'lucide-react';
import { whatsappShareUrl, facebookShareUrl, siteConfig } from '../config';

interface ShareButtonsProps {
  title: string;        // text to share (e.g. scholarship/article title)
  compact?: boolean;    // icon-only buttons when true
}

// Inline brand SVGs so icons stay crisp and on-brand.
const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.973-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
  </svg>
);

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, compact = false }) => {
  const [copied, setCopied] = useState(false);

  // Current page URL (falls back to configured siteUrl, then empty).
  const pageUrl =
    typeof window !== 'undefined' ? window.location.href : siteConfig.siteUrl;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — no-op
    }
  };

  const labelStyle = compact ? { padding: '0.5rem', width: '36px', height: '36px' } : {};

  return (
    <div className="flex gap-2 flex-wrap">
      <a
        href={whatsappShareUrl(title, pageUrl)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm flex items-center gap-1"
        style={{ background: '#25D366', color: '#fff', border: 'none', ...labelStyle }}
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <WhatsAppIcon size={16} />
        {!compact && 'WhatsApp'}
      </a>

      <a
        href={facebookShareUrl(pageUrl)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary btn-sm flex items-center gap-1"
        style={labelStyle}
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <FacebookIcon size={16} />
        {!compact && 'Facebook'}
      </a>

      <button
        onClick={handleCopy}
        className="btn btn-secondary btn-sm flex items-center gap-1"
        style={labelStyle}
        title="Copy link"
        aria-label="Copy link"
      >
        {copied ? <Check size={16} style={{ color: 'var(--success)' }} /> : <Link2 size={16} />}
        {!compact && (copied ? 'Copied!' : 'Copy link')}
      </button>
    </div>
  );
};

export default ShareButtons;
