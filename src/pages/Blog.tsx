import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react';
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

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 5rem', textAlign: 'left' }}>
      
      {/* Header and description */}
      <section style={{ maxWidth: '800px', marginBottom: '3rem' }}>
        <span 
          className="badge badge-primary" 
          style={{ marginBottom: '1rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
        >
          📚 ScholarSphere Library
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Scholarship Guides & Resources
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
          Get detailed insights and actionable blueprints written by successful scholars and admissions advisors to help you win fully funded international opportunities.
        </p>
      </section>

      {/* Search and Category filters */}
      <div 
        className="flex flex-col md-row items-center justify-between gap-4"
        style={{
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '2rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}
        id="blog-controls"
      >
        {/* Search */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
          <input
            type="text"
            placeholder="Search guides (e.g. CV, SOP)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn btn-sm"
              style={{
                background: selectedCategory === cat ? 'var(--primary)' : 'var(--bg-card)',
                color: selectedCategory === cat ? 'var(--text-light)' : 'var(--text-muted)',
                borderColor: selectedCategory === cat ? 'var(--primary)' : 'var(--border-color)',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 300px', gap: '2.5rem' }} id="blog-layout">
        
        {/* Blog Posts Grid */}
        <main>
          {filteredBlogs.length === 0 ? (
            <div className="card text-center" style={{ padding: '4rem 2rem' }}>
              <h3>No Guides Found</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Try refining your keywords or selecting a different category.</p>
            </div>
          ) : (
            <div className="grid grid-2" style={{ gap: '2rem' }} id="blog-grid">
              {filteredBlogs.map(post => (
                <article 
                  key={post.id}
                  className="card card-hover flex flex-col justify-between"
                  style={{ cursor: 'pointer', padding: 0, overflow: 'hidden' }}
                  onClick={() => onSelectBlog(post.slug)}
                >
                  <div>
                    {/* Header Image Gradient */}
                    <div 
                      style={{ 
                        height: '140px', 
                        background: post.coverGradient, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'white',
                        position: 'relative'
                      }}
                    >
                      <BookOpen size={40} opacity={0.3} />
                      <span 
                        className="badge badge-success"
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          left: '16px',
                          backgroundColor: 'var(--bg-card)',
                          color: 'var(--text-main)',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.5rem 1.5rem 1rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: '1.3' }}>
                        {post.title}
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Metadata bottom footer */}
                  <div 
                    className="flex justify-between items-center"
                    style={{
                      padding: '1rem 1.5rem 1.5rem',
                      borderTop: '1px solid var(--border-color)',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {post.publishedAt}</span>
                    </div>
                    <div className="flex items-center gap-1" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                      <Clock size={12} /> {post.readTime}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>

        {/* Sidebar Ads & Call to Action */}
        <aside className="flex flex-col gap-6">
          
          <div className="card" style={{ background: 'var(--primary-light)', borderColor: 'var(--primary)' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Want free templates?</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
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
          #blog-layout {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #blog-grid {
            grid-template-columns: 1fr !important;
          }
          #blog-controls {
            flex-direction: column !important;
            align-items: stretch !important;
          }
        }
      `}</style>
    </div>
  );
};
export default Blog;
