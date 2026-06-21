import React from 'react';
import { Bell } from 'lucide-react';
import { siteConfig } from '../config';

// Brand icons (inline so they stay crisp & themeable)
const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.973-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const YouTubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
  </svg>
);

interface CommunityCTAProps {
  /** Optional override heading/subtext */
  heading?: string;
  subtext?: string;
}

/**
 * "Join our community" block — converts one-time visitors into followers you
 * can reach again for free. Buttons only appear for links set in src/config.ts.
 */
export const CommunityCTA: React.FC<CommunityCTAProps> = ({
  heading = 'Never miss a scholarship deadline',
  subtext = 'Join our channels for instant alerts when new fully funded scholarships open — plus step-by-step application videos.',
}) => {
  const { whatsappChannel, youtube, facebook } = siteConfig.social;
  const hasAnyLink = Boolean(whatsappChannel || youtube || facebook);

  return (
    <section
      className="card"
      style={{
        textAlign: 'center',
        padding: '2.5rem 1.5rem',
        background: 'var(--gradient-brand)',
        border: 'none',
        color: '#fff',
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)',
          margin: '0 auto 1rem',
        }}
      >
        <Bell size={26} color="#fff" />
      </div>

      <h2 style={{ color: '#fff', fontSize: '1.6rem', marginBottom: '0.5rem' }}>{heading}</h2>
      <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '560px', margin: '0 auto 1.5rem' }}>
        {subtext}
      </p>

      {hasAnyLink ? (
        <div className="flex items-center justify-center gap-3" style={{ flexWrap: 'wrap' }}>
          {whatsappChannel && (
            <a
              href={whatsappChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="btn flex items-center gap-2"
              style={{ background: '#fff', color: '#128C7E', border: 'none', fontWeight: 700 }}
            >
              <WhatsAppIcon /> Join WhatsApp Channel
            </a>
          )}
          {youtube && (
            <a
              href={youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="btn flex items-center gap-2"
              style={{ background: 'rgba(0,0,0,0.25)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', fontWeight: 700 }}
            >
              <YouTubeIcon /> Subscribe on YouTube
            </a>
          )}
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="btn flex items-center gap-2"
              style={{ background: 'rgba(0,0,0,0.25)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', fontWeight: 700 }}
            >
              <FacebookIcon /> Follow on Facebook
            </a>
          )}
        </div>
      ) : (
        <p
          style={{
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.85)',
            background: 'rgba(0,0,0,0.2)',
            display: 'inline-block',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
          }}
        >
          ⚙️ Add your WhatsApp / YouTube / Facebook links in <strong>src/config.ts</strong> to activate these buttons.
        </p>
      )}
    </section>
  );
};

export default CommunityCTA;
