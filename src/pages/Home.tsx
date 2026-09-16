import React, { useState, useEffect } from 'react';
import { Search, DollarSign, Calendar, Star, SlidersHorizontal, RefreshCw, ArrowRight, Clock, Sparkles, Globe, Award, Users } from 'lucide-react';
import type { Scholarship, SiteStats } from '../types';
import { updateSEO } from '../utils/seo';
import AdBanner from '../components/AdBanner';
import CommunityCTA from '../components/CommunityCTA';
import EmailSubscribe from '../components/EmailSubscribe';

interface HomeProps {
  scholarships: Scholarship[];
  onSelectScholarship: (id: string) => void;
  stats: SiteStats;
}

export const Home: React.FC<HomeProps> = ({
  scholarships,
  onSelectScholarship,
  stats
}) => {
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedFunding, setSelectedFunding] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);

  // SEO Update on Mount
  useEffect(() => {
    updateSEO({
      title: 'Find Fully Funded International Scholarships 2026/2027',
      description: 'Search and apply for top international scholarships including Fulbright, Chevening, DAAD, and Erasmus Mundus. Fully funded master\'s, PhD, and undergraduate grants.',
      keywords: [
        'fully funded scholarships',
        'international student scholarships',
        'study abroad grants',
        'master scholarship europe',
        'daad scholarship germany',
        'chevening scholarship uk',
        'fulbright scholarship us'
      ]
    });
  }, []);

  // Extract unique countries and fields for filter options
  const countries = Array.from(new Set(scholarships.map(s => s.country))).sort();
  const allFields = Array.from(new Set(scholarships.flatMap(s => s.fieldOfStudy))).sort();

  // Count active filters
  const activeFilterCount = [selectedCountry, selectedLevel, selectedFunding, selectedField]
    .filter(Boolean).length + (showOnlyFeatured ? 1 : 0);

  // Handle resets
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCountry('');
    setSelectedLevel('');
    setSelectedFunding('');
    setSelectedField('');
    setShowOnlyFeatured(false);
  };

  // Filter logic
  const filteredScholarships = scholarships.filter(s => {
    const matchesSearch = 
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = selectedCountry === '' || s.country === selectedCountry;
    const matchesLevel = selectedLevel === '' || s.degreeLevel === selectedLevel;
    const matchesFunding = selectedFunding === '' || s.fundingType === selectedFunding;
    const matchesField = selectedField === '' || s.fieldOfStudy.includes(selectedField);
    const matchesFeatured = !showOnlyFeatured || s.isFeatured;

    return matchesSearch && matchesCountry && matchesLevel && matchesFunding && matchesField && matchesFeatured;
  }).sort((a, b) => {
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  // Calculate days left helper
  const getDaysLeft = (deadlineStr: string) => {
    const deadline = new Date(deadlineStr);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Country flag emoji helper
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

  const statItems = [
    { icon: Award, label: 'Active Listings', value: `${stats.totalScholarships}+` },
    { icon: DollarSign, label: 'Est. Total Value', value: stats.totalFundsDisbursed },
    { icon: Globe, label: 'Countries', value: `${stats.countriesRepresented}+` },
    { icon: Users, label: 'Monthly Readers', value: stats.monthlyTraffic.toLocaleString() + '+' },
  ];

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* ━━━ HERO SECTION ━━━ */}
      <section className="hero-bg">
        {/* Extra orbs for richer mesh */}
        <div className="hero-noise" />
        <div className="hero-orb-3" />

        <div className="container hero-content">
          <span
            className="badge animate-float"
            style={{
              marginBottom: '1.25rem',
              padding: '0.55rem 1.1rem',
              fontSize: '0.82rem',
              background: 'var(--gradient-brand)',
              color: 'var(--text-light)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Sparkles size={14} /> Verified Scholarship Database
          </span>

          <h1 className="hero-title">
            Unlock Funding For Your<br />Global Education
          </h1>

          <p style={{
            maxWidth: '640px',
            margin: '0 auto 2.5rem',
            fontSize: '1.12rem',
            color: 'var(--text-muted)',
            lineHeight: '1.7',
          }}>
            Find fully funded undergraduate, masters, and PhD scholarships worldwide. 
            Real deadlines, official links, and expert application guides.
          </p>

          {/* Hero Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hero-search"
          >
            <Search size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <input
              type="text"
              aria-label="Search scholarships"
              placeholder="Search by name, country, or field — e.g. Fulbright, Germany, STEM"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ borderRadius: 'var(--radius-full)', padding: '0.65rem 1.5rem' }}
            >
              Search
            </button>
          </form>

          {/* Popular Tags */}
          <div className="flex items-center justify-center gap-2" style={{ flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Popular:</span>
            {['Fully Funded', 'Germany', 'PhD', 'STEM', 'UK'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchTerm(tag);
                  document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="category-pill"
                style={{ padding: '0.35rem 0.85rem', fontSize: '0.76rem' }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="stat-grid grid grid-4">
            {statItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="stat-col"
                  style={{
                    textAlign: 'center',
                    ...(i < statItems.length - 1 ? { borderRight: '1px solid var(--border-color)' } : {})
                  }}
                >
                  <Icon size={18} style={{ color: 'var(--primary-muted)', marginBottom: '0.4rem' }} />
                  <h3 className="stat-num tabular-nums">{item.value}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.2rem' }}>
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ MAIN CONTENT ━━━ */}
      <main className="container" style={{ marginTop: '3rem' }}>
        <AdBanner format="leaderboard" />

        <div
          className="grid"
          style={{ gridTemplateColumns: '280px 1fr', gap: '2rem', marginTop: '2rem' }}
          id="main-layout"
        >
          {/* ─── FILTER SIDEBAR ─── */}
          <aside className="filter-sidebar flex flex-col gap-6">
            <div className="flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <h3 className="flex items-center gap-2" style={{ fontSize: '1.1rem' }}>
                <SlidersHorizontal size={18} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="filter-count">{activeFilterCount}</span>
                )}
              </h3>
              <button
                onClick={handleResetFilters}
                className="btn btn-ghost btn-sm flex items-center gap-1"
                style={{ fontSize: '0.75rem' }}
              >
                <RefreshCw size={12} /> Reset
              </button>
            </div>

            {/* Search Keywords */}
            <div className="form-group">
              <label className="label">Search Keywords</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="e.g. Fulbright, UK, STEM"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            {/* Country Filter */}
            <div className="form-group">
              <label className="label">Destination Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="select"
              >
                <option value="">All Countries</option>
                {countries.map(c => <option key={c} value={c}>{getCountryFlag(c)} {c}</option>)}
              </select>
            </div>

            {/* Degree Level Filter */}
            <div className="form-group">
              <label className="label">Degree Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="select"
              >
                <option value="">All Levels</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Master's / Postgraduate</option>
                <option value="phd">PhD / Doctorate</option>
                <option value="short_course">Short Courses / Fellowships</option>
              </select>
            </div>

            {/* Funding Type Filter */}
            <div className="form-group">
              <label className="label">Funding Type</label>
              <select
                value={selectedFunding}
                onChange={(e) => setSelectedFunding(e.target.value)}
                className="select"
              >
                <option value="">All Funding</option>
                <option value="fully_funded">Fully Funded</option>
                <option value="partial_funded">Partial Coverage</option>
                <option value="tuition_waiver">Tuition Waiver Only</option>
              </select>
            </div>

            {/* Field of Study Filter */}
            <div className="form-group">
              <label className="label">Field of Study</label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="select"
              >
                <option value="">All Fields</option>
                {allFields.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            {/* Featured Toggle */}
            <label
              className="checkbox-container"
              style={{
                padding: '0.75rem 1rem',
                background: showOnlyFeatured ? 'var(--gold-light)' : 'var(--bg-elevated)',
                borderRadius: 'var(--radius-sm)',
                border: `1.5px solid ${showOnlyFeatured ? 'var(--gold)' : 'var(--border-color)'}`,
                transition: 'all var(--transition-fast)',
              }}
            >
              <input
                type="checkbox"
                id="featured"
                checked={showOnlyFeatured}
                onChange={(e) => setShowOnlyFeatured(e.target.checked)}
                className="checkbox"
              />
              <span className="label" style={{ cursor: 'pointer', color: showOnlyFeatured ? 'var(--gold)' : 'var(--text-main)' }}>
                ⭐ Featured Only
              </span>
            </label>

            {/* Sidebar Ad */}
            <AdBanner format="sidebar" customText="Get Premium SOP Review!" link="#" />
          </aside>

          {/* ─── LISTINGS ─── */}
          <section className="flex flex-col gap-6" id="listings" style={{ scrollMarginTop: '90px' }}>
            <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
              <p style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem' }}>
                Showing <strong style={{ color: 'var(--text-main)' }}>{filteredScholarships.length}</strong> scholarships
              </p>
              <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                <Clock size={11} /> Sorted by: Upcoming Deadlines
              </span>
            </div>

            {filteredScholarships.length === 0 ? (
              <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <h3 style={{ marginBottom: '0.75rem' }}>No Scholarships Found</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                  We couldn't find any scholarships matching your criteria. Try adjusting the filters or clearing them.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredScholarships.map((s) => {
                  const daysLeft = getDaysLeft(s.deadline);
                  const isClosingSoon = daysLeft > 0 && daysLeft <= 60;
                  const isExpired = daysLeft <= 0;

                  return (
                    <article
                      key={s.id}
                      className={`card card-hover card-accent scholarship-card stagger-item flex flex-col gap-4 ${s.isFeatured ? 'card-featured' : ''}`}
                      onClick={() => onSelectScholarship(s.id)}
                      style={{ paddingLeft: '1.75rem' }}
                    >
                      {/* Left accent strip */}
                      <div className="country-strip" />

                      {/* Featured Ribbon */}
                      {s.isFeatured && (
                        <div className="featured-ribbon">
                          <Star size={10} style={{ verticalAlign: 'middle', marginRight: '2px' }} />
                          Featured
                        </div>
                      )}

                      {/* Top: Badges */}
                      <div className="flex items-center gap-2" style={{ flexWrap: 'wrap', paddingRight: s.isFeatured ? '5rem' : '0' }}>
                        <span className="badge badge-primary flex items-center gap-1">
                          {getCountryFlag(s.country)} {s.country}
                        </span>
                        <span className={`badge ${s.fundingType === 'fully_funded' ? 'badge-success' : 'badge-info'}`}>
                          {s.fundingType.replace(/_/g, ' ')}
                        </span>
                        <span className="badge badge-warning">
                          {s.degreeLevel.replace(/_/g, ' ')}
                        </span>
                        {isClosingSoon && !isExpired && (
                          <span className="badge badge-danger flex items-center gap-1" style={{ animation: 'pulse-subtle 2s infinite' }}>
                            <Clock size={11} /> Closing soon
                          </span>
                        )}
                      </div>

                      {/* Title & Provider */}
                      <div>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.3rem', lineHeight: '1.3' }}>
                          {s.title}
                        </h2>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          By <strong style={{ color: 'var(--text-main)' }}>{s.provider}</strong>
                        </p>
                      </div>

                      {/* Description snippet */}
                      <p style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-muted)',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: '1.6',
                      }}>
                        {s.description}
                      </p>

                      {/* Footer: Amount, Deadline, CTA */}
                      <div
                        className="flex items-center justify-between"
                        style={{
                          borderTop: '1px solid var(--border-color)',
                          paddingTop: '1rem',
                          marginTop: '0.25rem',
                          flexWrap: 'wrap',
                          gap: '1rem',
                        }}
                      >
                        <div className="flex items-center gap-1" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.25rem 0.6rem',
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--success-light)',
                            color: 'var(--success)',
                            fontSize: '0.82rem',
                          }}>
                            <DollarSign size={14} />
                            {s.amountDisplay}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 tabular-nums" style={{ fontSize: '0.82rem' }}>
                          <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                          <span style={{ color: 'var(--text-muted)' }}>Deadline:</span>
                          <span
                            style={{
                              fontWeight: 600,
                              color: isExpired ? 'var(--danger)' : isClosingSoon ? 'var(--danger)' : 'var(--text-main)',
                            }}
                          >
                            {s.deadline} {daysLeft > 0 ? `(${daysLeft}d)` : '(Expired)'}
                          </span>
                        </div>

                        <span
                          className="flex items-center gap-1 card-cta"
                          style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.82rem' }}
                        >
                          View details <ArrowRight size={15} />
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Community CTA */}
        <div style={{ marginTop: '4rem' }}>
          <CommunityCTA />
        </div>

        {/* Email capture */}
        <div style={{ marginTop: '1.5rem', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
          <EmailSubscribe />
        </div>

        {/* SEO Content */}
        <section
          className="card"
          style={{
            marginTop: '4rem',
            textAlign: 'left',
            background: 'linear-gradient(180deg, var(--bg-card) 0%, var(--bg-main) 100%)',
            border: '1px solid var(--border-color)',
            padding: '2.5rem',
          }}
        >
          <h2 style={{ fontSize: '1.65rem', marginBottom: '1.5rem', fontWeight: 800 }}>
            International Scholarships Guide: Study Abroad for Free
          </h2>

          <div className="grid grid-3" style={{ gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                How do I get a fully funded scholarship?
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Fully funded opportunities like the <strong>Fulbright</strong>, <strong>DAAD</strong>, and <strong>Chevening</strong> require strong academic standing, demonstrated leadership qualities, and a highly customized motivation letter that fits the sponsor's agenda. Prepare documents months in advance.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                Can I study in Europe without tuition?
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Yes, countries like Germany, Norway, and Austria offer tuition-free public universities. The EU's <strong>Erasmus Mundus</strong> program funds outstanding candidates to study across multiple European countries with full living costs covered.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                What fields of study are funded?
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Funding spans all disciplines — STEM, Public Policy, Humanities, Medicine, and Business receive the most. Use our filters to narrow by field and degree level.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 900px) {
          #main-layout {
            grid-template-columns: 1fr !important;
          }
          .stat-col {
            border-right: none !important;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 1rem;
            margin-bottom: 0.5rem;
          }
          .stat-col:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
        }
      `}</style>
    </div>
  );
};
export default Home;
