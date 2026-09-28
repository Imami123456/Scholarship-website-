import React, { useEffect } from 'react';
import { ArrowLeft, MapPin, DollarSign, Landmark, CheckCircle, ExternalLink, HelpCircle, GraduationCap, Share2, Clock, Star, Sparkles } from 'lucide-react';
import type { Scholarship } from '../types';
import { updateSEO } from '../utils/seo';
import AdBanner from '../components/AdBanner';
import VideoEmbed from '../components/VideoEmbed';
import ShareButtons from '../components/ShareButtons';
import { siteConfig } from '../config';

interface ScholarshipDetailsProps {
  scholarshipId: string;
  scholarships: Scholarship[];
  onSelectScholarship: (id: string) => void;
  onBack: () => void;
  onIncrementViews: (id: string) => void;
}

export const ScholarshipDetails: React.FC<ScholarshipDetailsProps> = ({
  scholarshipId,
  scholarships,
  onSelectScholarship,
  onBack,
  onIncrementViews
}) => {
  const scholarship = scholarships.find(s => s.id === scholarshipId);

  // Increment view count simulation
  useEffect(() => {
    if (scholarship) {
      onIncrementViews(scholarship.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scholarshipId]);

  // SEO Injection
  useEffect(() => {
    if (scholarship) {
      updateSEO({
        title: `${scholarship.title} 2026/2027`,
        description: `Apply for ${scholarship.title} offered by ${scholarship.provider}. Fully detailed eligibility, benefits, and step-by-step instructions.`,
        keywords: [scholarship.title, scholarship.provider, `${scholarship.country} scholarship`, 'fully funded scholarship details'],
        type: 'scholarship',
        schemaData: scholarship
      });
    }
  }, [scholarship]);

  if (!scholarship) {
    return (
      <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
        <h2 style={{ marginBottom: '0.75rem' }}>Scholarship Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The listing you are trying to view does not exist or has been removed.</p>
        <button onClick={onBack} className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Search
        </button>
      </div>
    );
  }

  // Calculate days left
  const getDaysLeft = (deadlineStr: string) => {
    const deadline = new Date(deadlineStr);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  const daysLeft = getDaysLeft(scholarship.deadline);
  const isExpired = daysLeft <= 0;

  // Countdown ring progress (max 365 days)
  const progressPercent = isExpired ? 0 : Math.min(daysLeft / 365, 1) * 100;
  const circumference = 2 * Math.PI * 44;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // Filter 3 related scholarships
  const related = scholarships
    .filter(s => s.id !== scholarship.id && (s.degreeLevel === scholarship.degreeLevel || s.country === scholarship.country))
    .slice(0, 3);

  // Country flag helper
  const getCountryFlag = (country: string): string => {
    const flags: Record<string, string> = {
      'United States': '🇺🇸', 'United Kingdom': '🇬🇧', 'Germany': '🇩🇪',
      'Netherlands': '🇳🇱', 'Australia': '🇦🇺', 'Canada': '🇨🇦',
      'Japan': '🇯🇵', 'South Korea': '🇰🇷', 'France': '🇫🇷',
      'Sweden': '🇸🇪', 'Switzerland': '🇨🇭', 'Norway': '🇳🇴',
      'China': '🇨🇳', 'Singapore': '🇸🇬', 'Multiple': '🌍',
      'Europe (Multiple)': '🇪🇺',
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem 5rem', textAlign: 'left' }}>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="btn btn-ghost flex items-center gap-2"
        style={{ marginBottom: '2rem', padding: '0.5rem 0', color: 'var(--text-muted)' }}
      >
        <ArrowLeft size={16} /> Back to Listings
      </button>

      {/* Grid Layout */}
      <div className="grid" style={{ gridTemplateColumns: '1fr 360px', gap: '2.5rem' }} id="detail-layout">

        {/* ─── MAIN BODY ─── */}
        <section className="flex flex-col gap-6">
          <div className="card" style={{ padding: '2.5rem' }}>

            {/* Badges */}
            <div className="flex items-center gap-2" style={{ flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <span className="badge badge-primary flex items-center gap-1">
                {getCountryFlag(scholarship.country)} {scholarship.country}
              </span>
              <span className={`badge ${scholarship.fundingType === 'fully_funded' ? 'badge-success' : 'badge-info'}`}>
                {scholarship.fundingType.replace(/_/g, ' ')}
              </span>
              <span className="badge badge-warning">
                {scholarship.degreeLevel.replace(/_/g, ' ')}
              </span>
              {scholarship.isFeatured && (
                <span className="badge badge-gold flex items-center gap-1">
                  <Star size={11} /> Featured
                </span>
              )}
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', lineHeight: '1.2' }}>
              {scholarship.title}
            </h1>

            <div
              className="flex items-center gap-3"
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '1.5rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              <span className="flex items-center gap-1"><Landmark size={16} /> Provider: <strong style={{ color: 'var(--text-main)' }}>{scholarship.provider}</strong></span>
              <span style={{ color: 'var(--border-color)' }}>•</span>
              <span>{scholarship.views.toLocaleString()} views</span>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3" style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} style={{ color: 'var(--accent)' }} />
                About the Scholarship
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.75', fontSize: '0.95rem' }}>
                {scholarship.description}
              </p>
            </div>

            {/* Eligibility */}
            <div className="flex flex-col gap-3" style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                Eligibility Criteria
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '0.25rem' }}>
                {scholarship.eligibility.length > 0 ? (
                  scholarship.eligibility.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start" style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                        background: 'var(--success-light)', color: 'var(--success)', fontSize: '0.7rem', fontWeight: 700, marginTop: '2px'
                      }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li style={{ color: 'var(--text-muted)' }}>Please refer to the official application website for detailed eligibility criteria.</li>
                )}
              </ul>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-3" style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DollarSign size={18} style={{ color: 'var(--success)' }} />
                Scholarship Benefits
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '0.25rem' }}>
                {scholarship.benefits.length > 0 ? (
                  scholarship.benefits.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start" style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                        background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '0.65rem', fontWeight: 700, marginTop: '2px'
                      }}>✦</span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li style={{ color: 'var(--text-muted)' }}>Refer to the official provider details.</li>
                )}
              </ul>
            </div>

            {/* Application Process — Step connector */}
            <div className="flex flex-col gap-3" style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={18} style={{ color: 'var(--primary)' }} />
                Step-by-Step Application Guide
              </h3>
              <div className="step-list" style={{ marginTop: '0.5rem' }}>
                {scholarship.process.length > 0 ? (
                  scholarship.process.map((item, idx) => (
                    <div key={idx} className="step-item" style={{ paddingBottom: idx < scholarship.process.length - 1 ? '1.5rem' : '0' }}>
                      <div className="step-number">{idx + 1}</div>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        {item}
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                    Click the official portal button to submit your application directly on the sponsor's website.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Video Walkthrough */}
          {scholarship.videoId && (
            <div className="card flex flex-col gap-4" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="22" height="22" fill="#FF0000" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch: How to Apply
              </h3>
              <VideoEmbed video={scholarship.videoId} title={`How to apply for ${scholarship.title}`} />
            </div>
          )}

          <AdBanner format="inline" />

          {/* Help Block */}
          <div
            className="card"
            style={{
              padding: '1.5rem',
              borderLeft: '4px solid var(--primary)',
              background: 'var(--bg-glass)',
            }}
          >
            <div className="flex items-center gap-3">
              <HelpCircle size={28} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Need help writing essays?</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Read our free guides on drafting winning motivation letters, resume guidelines and preparing for scholarship interviews.{' '}
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onBack(); }}
                    style={{ color: 'var(--primary)', fontWeight: 600 }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    Explore Guides →
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── STICKY SIDEBAR ─── */}
        <aside className="flex flex-col gap-6" style={{ height: 'fit-content', position: 'sticky', top: '90px' }}>

          {/* Action Box */}
          <div
            className="card flex flex-col gap-5"
            style={{
              background: 'linear-gradient(180deg, var(--bg-card) 0%, var(--bg-elevated) 100%)',
              padding: '2rem 1.5rem',
            }}
          >
            <h3 style={{ fontSize: '1.15rem', textAlign: 'center', fontWeight: 700 }}>Application Info</h3>

            {/* Circular countdown */}
            <div style={{ textAlign: 'center' }}>
              <div className="countdown-ring" style={{ position: 'relative' }}>
                <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="50" cy="50" r="44" fill="none" stroke="var(--border-color)" strokeWidth="5" />
                  <circle
                    cx="50" cy="50" r="44"
                    fill="none"
                    stroke={isExpired ? 'var(--danger)' : 'url(#grad)'}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="100%" stopColor="var(--accent)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: isExpired ? 'var(--danger)' : 'var(--text-main)' }}>
                    {isExpired ? '0' : daysLeft}
                  </span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    days left
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Deadline: <strong style={{ color: 'var(--text-main)' }}>{scholarship.deadline}</strong>
              </p>
            </div>

            {/* Quick Specs */}
            <div className="flex flex-col gap-3" style={{ fontSize: '0.85rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1rem 0' }}>
              <div className="flex justify-between">
                <span className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                  <MapPin size={14} /> Country
                </span>
                <strong>{getCountryFlag(scholarship.country)} {scholarship.country}</strong>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                  <GraduationCap size={14} /> Level
                </span>
                <strong style={{ textTransform: 'capitalize' }}>{scholarship.degreeLevel.replace(/_/g, ' ')}</strong>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                  <DollarSign size={14} /> Value
                </span>
                <strong style={{ color: 'var(--success)' }}>
                  {scholarship.amountDisplay.includes('Fully Funded') ? 'Fully Funded' : scholarship.amountDisplay}
                </strong>
              </div>
            </div>

            {/* Apply CTA */}
            <a
              href={scholarship.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              style={{ padding: '0.9rem', fontSize: '0.95rem' }}
            >
              Apply via Official Portal
              <ExternalLink size={16} />
            </a>

            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.5' }}>
              Verify details on the official university website. ScholarSphere is not responsible for application process variations.
            </p>

            {/* Share */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
              <p className="flex items-center gap-2 justify-center" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                <Share2 size={13} /> Share with a friend
              </p>
              <div className="flex justify-center">
                <ShareButtons title={`${scholarship.title} — ${scholarship.amountDisplay} (${scholarship.country})`} />
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          {siteConfig.social.whatsappChannel && (
            <a
              href={siteConfig.social.whatsappChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover flex items-center gap-3"
              style={{ padding: '1rem 1.25rem', borderLeft: '4px solid #25D366', textDecoration: 'none' }}
            >
              <div className="flex items-center justify-center" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#25D366', color: '#fff', flexShrink: 0 }}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.973-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </div>
              <div>
                <strong style={{ fontSize: '0.85rem' }}>Get deadline reminders</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Join our WhatsApp channel</p>
              </div>
            </a>
          )}

          <AdBanner format="sidebar" />
        </aside>
      </div>

      {/* Related Scholarships */}
      {related.length > 0 && (
        <section style={{ marginTop: '5rem', borderTop: '1px solid var(--border-color)', paddingTop: '3rem' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '2rem', fontWeight: 800 }}>Related Scholarships</h2>
          <div className="grid grid-3">
            {related.map(r => {
              const rDays = getDaysLeft(r.deadline);
              return (
                <div
                  key={r.id}
                  className="card card-hover card-accent flex flex-col justify-between gap-4"
                  style={{ cursor: 'pointer', textAlign: 'left' }}
                  onClick={() => onSelectScholarship(r.id)}
                >
                  <div>
                    <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
                      <span className="badge badge-primary">{getCountryFlag(r.country)} {r.country}</span>
                      <span className={`badge ${r.fundingType === 'fully_funded' ? 'badge-success' : 'badge-info'}`} style={{ fontSize: '0.7rem' }}>
                        {r.fundingType.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.5rem 0 0.25rem', lineHeight: '1.3' }}>{r.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.provider}</p>
                  </div>

                  <div
                    className="flex justify-between items-center"
                    style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}
                  >
                    <span style={{ fontWeight: 600, color: 'var(--success)' }}>
                      {r.amountDisplay.includes('Fully Funded') ? 'Fully Funded' : r.amountDisplay}
                    </span>
                    <span style={{ color: rDays <= 60 ? 'var(--danger)' : 'var(--text-muted)', fontWeight: rDays <= 60 ? 600 : 400 }}>
                      {r.deadline}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          #detail-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
export default ScholarshipDetails;
