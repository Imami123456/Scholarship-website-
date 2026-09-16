import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import type { BlogPost } from '../types';
import { updateSEO } from '../utils/seo';
import AdBanner from '../components/AdBanner';

interface BlogProps {
  blogs: BlogPost[];
  onSelectBlog: (slug: string) => void;
}

export const Blog: React.FC<BlogProps> = ({ blogs, onSelectBlog }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // SEO Injection
  useEffect(() => {
    updateSEO({
      title: 'Scholarship Application Guides & Expert Blog',
      description: 'Master your international scholarship applications. Comprehensive advice on writing motivation letters, formatting academic CVs, and acing interviews.',
      keywords: [
        'scholarship application tips',
        'how to write motivation letter',
        'academic cv format',
        'scholarship interview questions',
        'study abroad guides'
      ]
    });
  }, []);

  // Unique categories extraction
  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))];

  // Filtering
  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = 
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Featured article (first one) — gets hero treatment
  const featuredArticle = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const restArticles = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 5rem', textAlign: 'left' }}>

      {/* Header */}
      <section style={{ maxWidth: '760px', marginBottom: '2.5rem' }}>
        <span
          className="badge"
          style={{
            marginBottom: '1rem',
            padding: '0.45rem 0.9rem',
            fontSize: '0.78rem',
            background: 'var(--gradient-brand)',
            color: 'var(--text-light)',
          }}
        >
          <Sparkles size={12} /> ScholarSphere Library
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '0.75rem', lineHeight: '1.15', letterSpacing: '-0.03em' }}>
          Scholarship Guides & Resources
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
          Actionable blueprints written by successful scholars and admissions advisors to help you win fully funded international opportunities.
        </p>
      </section>

      {/* Search & Category Filters */}
      <div
        className="flex items-center justify-between"
        style={{
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '1.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
        id="blog-controls"
      >
        {/* Search */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
          <input
            type="text"
            placeholder="Search guides (e.g. CV, SOP)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2" style={{ flexWrap: 'wrap', overflowX: 'auto' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid" style={{ gridTemplateColumns: '1fr 280px', gap: '2.5rem' }} id="blog-layout">

        {/* Blog Grid */}
        <main>
          {filteredBlogs.length === 0 ? (
            <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
              <h3>No Guides Found</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Try refining your keywords or selecting a different category.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Featured Hero Article */}
              {featuredArticle && (
                <article
                  className="card card-hover"
                  style={{ cursor: 'pointer', padding: 0, overflow: 'hidden' }}
                  onClick={() => onSelectBlog(featuredArticle.slug)}
                >
                  <div
                    className="blog-card-header"
                    style={{ background: featuredArticle.coverGradient, height: '200px' }}
                  >
                    <BookOpen size={56} opacity={0.15} style={{ zIndex: 1 }} />
                    <span
                      className="badge"
                      style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '20px',
                        zIndex: 1,
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-main)',
                        boxShadow: 'var(--shadow-sm)',
                        padding: '0.35rem 0.8rem',
                      }}
                    >
                      {featuredArticle.category}
                    </span>
                  </div>
                  <div style={{ padding: '1.75rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: '1.25' }}>
                      {featuredArticle.title}
                    </h2>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.65', marginBottom: '1.25rem' }}>
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><User size={13} /> {featuredArticle.author}</span>
                        <span className="flex items-center gap-1"><Calendar size={13} /> {featuredArticle.publishedAt}</span>
                      </div>
                      <span className="flex items-center gap-1" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                        Read guide <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              )}

              {/* Rest of the articles */}
              <div className="grid grid-2" style={{ gap: '1.5rem' }} id="blog-grid">
                {restArticles.map(post => (
                  <article
                    key={post.id}
                    className="card card-hover card-accent flex flex-col justify-between"
                    style={{ cursor: 'pointer', padding: 0, overflow: 'hidden' }}
                    onClick={() => onSelectBlog(post.slug)}
                  >
                    <div>
                      <div
                        className="blog-card-header"
                        style={{ background: post.coverGradient, height: '130px' }}
                      >
                        <BookOpen size={36} opacity={0.15} style={{ zIndex: 1 }} />
                        <span
                          className="badge"
                          style={{
                            position: 'absolute',
                            bottom: '12px',
                            left: '14px',
                            zIndex: 1,
                            backgroundColor: 'var(--bg-card)',
                            color: 'var(--text-main)',
                            boxShadow: 'var(--shadow-sm)',
                            fontSize: '0.7rem',
                          }}
                        >
                          {post.category}
                        </span>
                      </div>
                      <div style={{ padding: '1.25rem 1.25rem 0.75rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: '1.3' }}>
                          {post.title}
                        </h3>
                        <p style={{
                          fontSize: '0.85rem', color: 'var(--text-muted)',
                          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                          lineHeight: '1.55',
                        }}>
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex justify-between items-center"
                      style={{
                        padding: '0.75rem 1.25rem 1.25rem',
                        borderTop: '1px solid var(--border-color)',
                        marginTop: '0.5rem',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1"><User size={11} /> {post.author}</span>
                        <span className="flex items-center gap-1"><Calendar size={11} /> {post.publishedAt}</span>
                      </div>
                      <span className="flex items-center gap-1" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                        <Clock size={11} /> {post.readTime}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          <div
            className="card"
            style={{
              background: 'var(--primary-light)',
              borderColor: 'var(--primary)',
              borderWidth: '1.5px',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: 700 }}>
              Free templates
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
              Get copy-paste blueprints for email pitches, reference request templates, and SOP checklists.
            </p>
            <button className="btn btn-primary btn-sm w-full flex items-center justify-center gap-1">
              Download Toolkits <ArrowRight size={14} />
            </button>
          </div>

          <AdBanner format="sidebar" />
        </aside>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #blog-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          #blog-grid { grid-template-columns: 1fr !important; }
          #blog-controls { flex-direction: column !important; align-items: stretch !important; }
        }
      `}</style>
    </div>
  );
};
export default Blog;
