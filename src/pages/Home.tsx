import React, { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Calendar, Star, SlidersHorizontal, RefreshCw } from 'lucide-react';
import type { Scholarship, SiteStats } from '../types';
import { updateSEO } from '../utils/seo';
import AdBanner from '../components/AdBanner';

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
  });

  // Calculate days left helper
  const getDaysLeft = (deadlineStr: string) => {
    const deadline = new Date(deadlineStr);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* Premium Hero Section */}
      <section className="hero-bg">
        <div className="container hero-content">
          <span 
            className="badge badge-primary animate-float" 
            style={{ marginBottom: '1rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            🎓 The Largest Verified Scholarship Database
          </span>
          <h1 className="hero-title">
            Unlock Funding For Your <br />Global Education
          </h1>
          <p 
            style={{ 
              maxWidth: '680px', 
              margin: '0 auto 2.5rem', 
              fontSize: '1.15rem', 
              color: 'var(--text-muted)' 
            }}
          >
            Find fully funded undergraduate, masters, and PhD scholarships around the world. Up-to-date deadlines, direct official application links, and expert guides.
          </p>

          {/* Quick Stats Grid */}
          <div 
            className="grid grid-4" 
            style={{ 
              maxWidth: '960px', 
              margin: '0 auto', 
              backgroundColor: 'var(--bg-glass)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div style={{ textAlign: 'center', borderRight: '1px solid var(--border-color)' }} className="stat-col">
              <h3 style={{ fontSize: '2rem', color: 'var(--primary)' }}>{stats.totalScholarships}+</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Listings</p>
            </div>
            <div style={{ textAlign: 'center', borderRight: '1px solid var(--border-color)' }} className="stat-col">
              <h3 style={{ fontSize: '2rem', color: 'var(--primary)' }}>{stats.totalFundsDisbursed}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Est. Total Value</p>
            </div>
            <div style={{ textAlign: 'center', borderRight: '1px solid var(--border-color)' }} className="stat-col">
              <h3 style={{ fontSize: '2rem', color: 'var(--primary)' }}>{stats.countriesRepresented}+</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Countries Available</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: 'var(--primary)' }}>{stats.monthlyTraffic.toLocaleString()}+</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Monthly Readers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container" style={{ marginTop: '3rem' }}>
        
        {/* Banner Ad Spot 1 */}
        <AdBanner format="leaderboard" />

        <div className="grid" style={{ gridTemplateColumns: '300px 1fr', gap: '2rem', marginTop: '2rem' }} id="main-layout">
          {/* Filters Sidebar */}
          <aside className="card flex flex-col gap-6" style={{ height: 'fit-content', position: 'sticky', top: '90px' }}>
            <div className="flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <h3 className="flex items-center gap-2" style={{ fontSize: '1.2rem' }}>
                <SlidersHorizontal size={18} />
                Filters
              </h3>
              <button 
                onClick={handleResetFilters} 
                className="btn btn-secondary btn-sm flex items-center gap-1"
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: 'var(--radius-sm)' }}
              >
                <RefreshCw size={12} /> Reset
              </button>
            </div>

            {/* Keyword Search */}
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
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
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
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
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
                <option value="postgraduate">Master\'s / Postgraduate</option>
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
                <option value="partial_funded">Partial Tuition Coverage</option>
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

            {/* Featured Only Toggle */}
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="featured"
                checked={showOnlyFeatured}
                onChange={(e) => setShowOnlyFeatured(e.target.checked)}
                className="checkbox"
              />
              <label htmlFor="featured" className="label" style={{ cursor: 'pointer' }}>
                ⭐ Featured Scholarships
              </label>
            </div>

            {/* Sidebar Ad Placement */}
            <AdBanner format="sidebar" customText="Get Premium SOP Review!" link="#" />
          </aside>

          {/* Listings Container */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
                Showing <strong style={{ color: 'var(--text-main)' }}>{filteredScholarships.length}</strong> scholarships
              </p>
              <span className="badge badge-primary">
                Sorted by: Upcoming Deadlines
              </span>
            </div>

            {filteredScholarships.length === 0 ? (
              <div className="card text-center" style={{ padding: '4rem 2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>No Scholarships Found</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                  We couldn\'t find any scholarships matching your search criteria. Try adjusting the filters or resetting.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid flex-col gap-4">
                {filteredScholarships.map((s) => {
                  const daysLeft = getDaysLeft(s.deadline);
                  const isClosingSoon = daysLeft > 0 && daysLeft <= 60;
                  
                  return (
                    <article 
                      key={s.id} 
                      className={`card card-hover flex flex-col gap-4`} 
                      style={{ 
                        cursor: 'pointer',
                        borderColor: s.isFeatured ? 'var(--primary)' : 'var(--border-color)',
                        borderWidth: s.isFeatured ? '2px' : '1px'
                      }}
                      onClick={() => onSelectScholarship(s.id)}
                    >
                      {/* Featured Star Badge */}
                      {s.isFeatured && (
                        <div style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--primary)' }} title="Featured Listing">
                          <Star size={20} fill="var(--primary)" />
                        </div>
                      )}

                      <div className="flex flex-col gap-2" style={{ textAlign: 'left', paddingRight: '2rem' }}>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="badge badge-primary flex items-center gap-1">
                            <MapPin size={12} /> {s.country}
                          </span>
                          <span className={`badge ${s.fundingType === 'fully_funded' ? 'badge-success' : 'badge-info'}`}>
                            {s.fundingType.replace('_', ' ')}
                          </span>
                          <span className="badge badge-warning">
                            {s.degreeLevel}
                          </span>
                        </div>
                        
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '0.25rem' }}>
                          {s.title}
                        </h2>
                        
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                          Provided by: <strong style={{ color: 'var(--text-main)' }}>{s.provider}</strong>
                        </p>
                      </div>

                      <p style={{ textAlign: 'left', fontSize: '0.925rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {s.description}
                      </p>

                      <div 
                        className="flex items-center justify-between" 
                        style={{ 
                          borderTop: '1px solid var(--border-color)', 
                          paddingTop: '1rem',
                          marginTop: '0.5rem',
                          flexWrap: 'wrap',
                          gap: '1rem'
                        }}
                      >
                        <div className="flex items-center gap-1" style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.95rem' }}>
                          <DollarSign size={16} />
                          <span>{s.amountDisplay}</span>
                        </div>

                        <div className="flex items-center gap-1.5" style={{ fontSize: '0.85rem' }}>
                          <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                          <span style={{ color: 'var(--text-muted)' }}>Deadline:</span>
                          <span 
                            style={{ 
                              fontWeight: 600,
                              color: isClosingSoon ? 'var(--danger)' : 'var(--text-main)'
                            }}
                          >
                            {s.deadline} {daysLeft > 0 ? `(${daysLeft} days left)` : '(Expired)'}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* SEO Keyword Dense Segment */}
        <section 
          className="card" 
          style={{ 
            marginTop: '5rem', 
            textAlign: 'left',
            background: 'linear-gradient(180deg, var(--bg-card) 0%, var(--bg-main) 100%)',
            border: '1px solid var(--border-color)'
          }}
        >
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
            International Scholarships Guide: Study Abroad for Free
          </h2>
          
          <div className="grid grid-3" style={{ gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                How do I get a fully funded scholarship?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Fully funded opportunities like the **Fulbright**, **DAAD**, and **Chevening** require strong academic standing, demonstrated leadership qualities, and a highly customized motivation letter that fits the sponsor\'s agenda. Ensure you prepare application documents such as CVs, certificates, and language transcripts (IELTS/TOEFL) months in advance.
              </p>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                Can I study in Europe without tuition?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Yes, countries like Germany, Norway, and Austria offer tuition-free public universities for international students. In addition, the European Commission\'s **Erasmus Mundus** program funds outstanding candidates to study in multiple countries across Europe, including master\'s degrees and doctoral fellowships covering full living costs.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                What fields of study are funded?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Funding is available across all disciplines, but STEM (Science, Technology, Engineering, Math), Global Development, Public Policy, Humanities, and Medicine receive the highest volume of governmental and philanthropic financing. Use our filters to search categories by field of study and degree levels.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Responsive adjustments CSS */}
      <style>{`
        @media (max-width: 900px) {
          #main-layout {
            grid-template-columns: 1fr !important;
          }
          .stat-col {
            border-right: none !important;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 1rem;
            margin-bottom: 1rem;
          }
          .hero-bg::before, .hero-bg::after {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
export default Home;
