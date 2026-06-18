import React, { useEffect } from 'react';
import { ArrowLeft, User, Calendar, Clock, BookOpen, Share2, Eye } from 'lucide-react';
import type { BlogPost } from '../types';
import { updateSEO } from '../utils/seo';
import AdBanner from '../components/AdBanner';

interface BlogPostDetailsProps {
  slug: string;
  blogs: BlogPost[];
  onBack: () => void;
  onSelectBlog: (slug: string) => void;
  onIncrementViews: (slug: string) => void;
}

export const BlogPostDetails: React.FC<BlogPostDetailsProps> = ({
  slug,
  blogs,
  onBack,
  onSelectBlog,
  onIncrementViews
}) => {
  const post = blogs.find(b => b.slug === slug);

  // Increment view count simulation
  useEffect(() => {
    if (post) {
      onIncrementViews(post.slug);
    }
  }, [slug]);

  // SEO Injection
  useEffect(() => {
    if (post) {
      updateSEO({
        title: post.title,
        description: post.excerpt,
        keywords: post.seoKeywords,
        type: 'article',
        schemaData: post
      });
    }
  }, [post]);

  if (!post) {
    return (
      <div className="container text-center" style={{ padding: '6rem 2rem' }}>
        <h2>Article Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The article you are trying to read does not exist or has been removed.</p>
        <button onClick={onBack} className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Blog
        </button>
      </div>
    );
  }

  // Next and Previous articles
  const currentIndex = blogs.findIndex(b => b.id === post.id);
  const prevPost = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextPost = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  // Custom Markdown Parser for high-fidelity rendering
  const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let tableRows: string[][] = [];
    let isCodeBlock = false;
    let codeContent: string[] = [];

    const flushList = (key: string) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={key} style={{ marginLeft: '1.5rem', marginBottom: '1.5rem', listStyleType: 'disc' }}>
            {listItems.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }} dangerouslySetInnerHTML={{ __html: inlineStyle(item) }} />
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const flushTable = (key: string) => {
      if (tableRows.length > 0) {
        // Table parsing
        const headers = tableRows[0];
        const bodyRows = tableRows.slice(2); // row 1 is separator |---|---|
        elements.push(
          <div key={key} style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--primary-light)' }}>
                  {headers.map((h, i) => (
                    <th key={i} style={{ padding: '10px 15px', border: '1px solid var(--border-color)', fontWeight: 700, color: 'var(--primary)', textAlign: 'left' }}>
                      {h.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ padding: '10px 15px', border: '1px solid var(--border-color)', color: 'var(--text-main)' }} dangerouslySetInnerHTML={{ __html: inlineStyle(cell.trim()) }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
      }
    };

    const flushCodeBlock = (key: string) => {
      if (codeContent.length > 0) {
        elements.push(
          <pre key={key} style={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', overflowX: 'auto', marginBottom: '1.5rem', fontFamily: 'Courier, monospace', fontSize: '0.875rem', color: 'var(--text-main)' }}>
            <code>{codeContent.join('\n')}</code>
          </pre>
        );
        codeContent = [];
      }
    };

    const inlineStyle = (str: string): string => {
      return str
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code style="background-color: var(--border-color); padding: 2px 6px; border-radius: 4px; font-size: 0.9em; font-family: monospace;">$1</code>');
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const rawLine = lines[i];

      // Code Block
      if (line.startsWith('```')) {
        if (isCodeBlock) {
          isCodeBlock = false;
          flushCodeBlock(`code-${i}`);
        } else {
          flushList(`list-pre-code-${i}`);
          flushTable(`table-pre-code-${i}`);
          isCodeBlock = true;
        }
        continue;
      }

      if (isCodeBlock) {
        codeContent.push(rawLine);
        continue;
      }

      // Headers
      if (line.startsWith('## ')) {
        flushList(`list-h2-${i}`);
        flushTable(`table-h2-${i}`);
        elements.push(<h2 key={`h2-${i}`} style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{line.slice(3)}</h2>);
      } else if (line.startsWith('### ')) {
        flushList(`list-h3-${i}`);
        flushTable(`table-h3-${i}`);
        elements.push(<h3 key={`h3-${i}`} style={{ fontSize: '1.35rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>{line.slice(4)}</h3>);
      } else if (line.startsWith('#### ')) {
        flushList(`list-h4-${i}`);
        flushTable(`table-h4-${i}`);
        elements.push(<h4 key={`h4-${i}`} style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{line.slice(5)}</h4>);
      } 
      // Blockquotes
      else if (line.startsWith('> ')) {
        flushList(`list-quote-${i}`);
        flushTable(`table-quote-${i}`);
        elements.push(
          <blockquote 
            key={`quote-${i}`} 
            style={{ 
              borderLeft: '4px solid var(--primary)', 
              padding: '1rem 1.5rem', 
              background: 'var(--primary-light)', 
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              fontStyle: 'italic',
              marginBottom: '1.5rem',
              color: 'var(--text-main)',
              fontSize: '1rem'
            }}
            dangerouslySetInnerHTML={{ __html: inlineStyle(line.slice(2)) }}
          />
        );
      }
      // Table rows
      else if (line.startsWith('|')) {
        flushList(`list-table-${i}`);
        const cells = line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        tableRows.push(cells);
      }
      // Bullet points
      else if (line.startsWith('* ') || line.startsWith('- ')) {
        flushTable(`table-list-${i}`);
        listItems.push(line.slice(2));
      }
      // Empty lines
      else if (line === '') {
        flushList(`list-empty-${i}`);
        flushTable(`table-empty-${i}`);
      }
      // Regular Paragraphs
      else {
        flushList(`list-para-${i}`);
        flushTable(`table-para-${i}`);
        elements.push(
          <p 
            key={`p-${i}`} 
            style={{ 
              marginBottom: '1.25rem', 
              fontSize: '1.05rem', 
              color: 'var(--text-muted)', 
              lineHeight: '1.75' 
            }}
            dangerouslySetInnerHTML={{ __html: inlineStyle(line) }}
          />
        );
      }
    }

    // Final flushes
    flushList('list-final');
    flushTable('table-final');
    flushCodeBlock('code-final');

    return elements;
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem 5rem', textAlign: 'left' }}>
      
      {/* Back Button */}
      <button 
        onClick={onBack} 
        className="btn btn-secondary btn-sm flex items-center gap-1.5"
        style={{ marginBottom: '2rem', border: 'none', background: 'transparent', padding: 0 }}
      >
        <ArrowLeft size={16} /> Back to Library
      </button>

      {/* Main Layout Grid */}
      <div className="grid" style={{ gridTemplateColumns: '1fr 340px', gap: '2.5rem' }} id="article-layout">
        
        {/* Article content */}
        <main className="card" style={{ padding: '2.5rem' }}>
          {/* Metadata Top */}
          <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
            <span className="badge badge-primary">{post.category}</span>
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: 850, lineHeight: '1.2', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
            {post.title}
          </h1>

          <div 
            className="flex items-center justify-between"
            style={{
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '1.5rem',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.9rem',
              color: 'var(--text-muted)'
            }}
          >
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5"><User size={16} /> By <strong>{post.author}</strong></span>
              <span className="flex items-center gap-1.5"><Calendar size={16} /> {post.publishedAt}</span>
              <span className="flex items-center gap-1.5"><Clock size={16} /> {post.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>{post.views} views</span>
            </div>
          </div>

          {/* Article Banner Ad */}
          <AdBanner format="inline" />

          {/* Dynamic Article Body */}
          <div className="prose" style={{ marginTop: '2rem' }}>
            {parseMarkdown(post.content)}
          </div>

          {/* Share Block */}
          <div 
            className="flex items-center justify-between"
            style={{ 
              borderTop: '1px solid var(--border-color)', 
              paddingTop: '2rem', 
              marginTop: '3rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <h4 style={{ fontSize: '1rem' }} className="flex items-center gap-2">
              <Share2 size={16} /> Share this Guide
            </h4>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm flex items-center gap-1">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
                Facebook
              </button>
              <button className="btn btn-secondary btn-sm flex items-center gap-1">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Twitter
              </button>
              <button className="btn btn-secondary btn-sm flex items-center gap-1">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </button>
            </div>
          </div>

          {/* Next/Prev Navigation */}
          <div 
            className="flex justify-between items-center"
            style={{ 
              borderTop: '1px solid var(--border-color)', 
              paddingTop: '2rem', 
              marginTop: '2.5rem',
              gap: '2rem',
              flexWrap: 'wrap'
            }}
          >
            {prevPost ? (
              <button 
                onClick={() => onSelectBlog(prevPost.slug)}
                className="btn btn-secondary flex flex-col items-start gap-1"
                style={{ textAlign: 'left', maxWidth: '45%', alignItems: 'flex-start', padding: '1rem' }}
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>&larr; PREVIOUS GUIDE</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, whiteSpace: 'normal', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{prevPost.title}</span>
              </button>
            ) : <div />}

            {nextPost ? (
              <button 
                onClick={() => onSelectBlog(nextPost.slug)}
                className="btn btn-secondary flex flex-col items-end gap-1"
                style={{ textAlign: 'right', maxWidth: '45%', alignItems: 'flex-end', padding: '1rem', marginLeft: 'auto' }}
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NEXT GUIDE &rarr;</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, whiteSpace: 'normal', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{nextPost.title}</span>
              </button>
            ) : <div />}
          </div>

        </main>

        {/* Sidebar Ads and Signup */}
        <aside className="flex flex-col gap-6">
          
          <div className="card text-center flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, hsl(200, 95%, 45%) 100%)', color: 'white' }}>
            <BookOpen size={48} style={{ margin: '0 auto', opacity: 0.8 }} />
            <h3 style={{ fontSize: '1.25rem', color: 'white' }}>Subscribe to Alerts</h3>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)' }}>
              Never miss a fully funded deadline again. We send direct portal links weekly.
            </p>
            <button className="btn btn-secondary btn-sm w-full" style={{ background: 'white', color: 'var(--primary)', border: 'none' }}>
              Subscribe Free
            </button>
          </div>

          <AdBanner format="sidebar" />
          <AdBanner format="sidebar" customText="Write essays with AI helper!" link="#" />

        </aside>

      </div>

      <style>{`
        @media (max-width: 900px) {
          #article-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
export default BlogPostDetails;
