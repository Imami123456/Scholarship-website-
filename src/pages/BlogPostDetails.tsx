import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, User, Calendar, Clock, BookOpen, Share2, Eye } from 'lucide-react';
import type { BlogPost } from '../types';
import { updateSEO } from '../utils/seo';
import AdBanner from '../components/AdBanner';
import VideoEmbed from '../components/VideoEmbed';
import ShareButtons from '../components/ShareButtons';
import { siteConfig } from '../config';

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
  const [readingProgress, setReadingProgress] = useState(0);

  // Increment view count
  useEffect(() => {
    if (post) {
      onIncrementViews(post.slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Reading progress bar
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setReadingProgress(Math.min(progress, 100));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (!post) {
    return (
      <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📖</div>
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

  // Custom Markdown Parser
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
              <li key={idx} style={{ marginBottom: '0.5rem', color: 'var(--text-main)', lineHeight: '1.7' }} dangerouslySetInnerHTML={{ __html: inlineStyle(item) }} />
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const flushTable = (key: string) => {
      if (tableRows.length > 0) {
        const headers = tableRows[0];
        const bodyRows = tableRows.slice(2);
        elements.push(
          <div key={key} style={{ overflowX: 'auto', marginBottom: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--primary-light)' }}>
                  {headers.map((h, i) => (
                    <th key={i} style={{ padding: '10px 15px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--primary)', textAlign: 'left' }}>
                      {h.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ padding: '10px 15px', color: 'var(--text-main)' }} dangerouslySetInnerHTML={{ __html: inlineStyle(cell.trim()) }} />
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
          <pre key={key} style={{
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.25rem',
            overflowX: 'auto',
            marginBottom: '1.5rem',
            fontFamily: "'JetBrains Mono', Courier, monospace",
            fontSize: '0.85rem',
            color: 'var(--text-main)',
            lineHeight: '1.6',
          }}>
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
        .replace(/`(.*?)`/g, '<code style="background-color: var(--primary-light); padding: 2px 7px; border-radius: 5px; font-size: 0.88em; font-family: monospace; color: var(--primary);">$1</code>');
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const rawLine = lines[i];

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

      if (isCodeBlock) { codeContent.push(rawLine); continue; }

      if (line.startsWith('## ')) {
        flushList(`list-h2-${i}`); flushTable(`table-h2-${i}`);
        elements.push(<h2 key={`h2-${i}`} style={{ fontSize: '1.65rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem' }}>{line.slice(3)}</h2>);
      } else if (line.startsWith('### ')) {
        flushList(`list-h3-${i}`); flushTable(`table-h3-${i}`);
        elements.push(<h3 key={`h3-${i}`} style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.75rem' }}>{line.slice(4)}</h3>);
      } else if (line.startsWith('#### ')) {
        flushList(`list-h4-${i}`); flushTable(`table-h4-${i}`);
        elements.push(<h4 key={`h4-${i}`} style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.5rem' }}>{line.slice(5)}</h4>);
      } else if (line.startsWith('> ')) {
        flushList(`list-quote-${i}`); flushTable(`table-quote-${i}`);
        elements.push(
          <blockquote
            key={`quote-${i}`}
            style={{
              borderLeft: '4px solid var(--primary)',
              padding: '1rem 1.5rem',
              background: 'var(--primary-light)',
              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              fontStyle: 'italic',
              marginBottom: '1.5rem',
              color: 'var(--text-main)',
              fontSize: '1rem',
              lineHeight: '1.7',
            }}
            dangerouslySetInnerHTML={{ __html: inlineStyle(line.slice(2)) }}
          />
        );
      } else if (line.startsWith('|')) {
        flushList(`list-table-${i}`);
        const cells = line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        tableRows.push(cells);
      } else if (line.startsWith('* ') || line.startsWith('- ')) {
        flushTable(`table-list-${i}`);
        listItems.push(line.slice(2));
      } else if (line === '') {
        flushList(`list-empty-${i}`); flushTable(`table-empty-${i}`);
      } else {
        flushList(`list-para-${i}`); flushTable(`table-para-${i}`);
        elements.push(
          <p key={`p-${i}`} style={{ marginBottom: '1.25rem', fontSize: '1.02rem', color: 'var(--text-muted)', lineHeight: '1.8' }}
            dangerouslySetInnerHTML={{ __html: inlineStyle(line) }}
          />
        );
      }
    }

    flushList('list-final'); flushTable('table-final'); flushCodeBlock('code-final');
    return elements;
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="reading-progress" style={{ width: `${readingProgress}%` }} />

      <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem 5rem', textAlign: 'left' }}>

        {/* Back */}
        <button
          onClick={onBack}
          className="btn btn-ghost flex items-center gap-2"
          style={{ marginBottom: '2rem', padding: '0.5rem 0', color: 'var(--text-muted)' }}
        >
          <ArrowLeft size={16} /> Back to Library
        </button>

        {/* Main Layout */}
        <div className="grid" style={{ gridTemplateColumns: '1fr 320px', gap: '2.5rem' }} id="article-layout">

          {/* Article */}
          <main className="card" style={{ padding: '2.5rem' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
              <span
                className="badge"
                style={{
                  background: 'var(--gradient-brand)',
                  color: 'var(--text-light)',
                  padding: '0.35rem 0.8rem',
                }}
              >
                {post.category}
              </span>
            </div>

            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: '1.2', marginBottom: '1.5rem', letterSpacing: '-0.025em' }}>
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
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
              }}
            >
              <div className="flex items-center gap-4" style={{ flexWrap: 'wrap' }}>
                <span className="flex items-center gap-1"><User size={15} /> By <strong>{post.author}</strong></span>
                <span className="flex items-center gap-1"><Calendar size={15} /> {post.publishedAt}</span>
                <span className="flex items-center gap-1"><Clock size={15} /> {post.readTime}</span>
              </div>
              <span className="flex items-center gap-1">
                <Eye size={15} /> {post.views.toLocaleString()} views
              </span>
            </div>

            <AdBanner format="inline" />

            {post.videoId && (
              <div style={{ marginTop: '2rem' }}>
                <VideoEmbed video={post.videoId} title={post.title} />
              </div>
            )}

            {/* Article Body */}
            <div className="prose" style={{ marginTop: '2rem' }}>
              {parseMarkdown(post.content)}
            </div>

            {/* Share */}
            <div
              className="flex items-center justify-between"
              style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '2rem',
                marginTop: '3rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <h4 style={{ fontSize: '0.95rem' }} className="flex items-center gap-2">
                <Share2 size={15} /> Share this Guide
              </h4>
              <ShareButtons title={post.title} />
            </div>

            {/* Prev/Next */}
            <div
              className="flex justify-between items-center"
              style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '2rem',
                marginTop: '2rem',
                gap: '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              {prevPost ? (
                <button
                  onClick={() => onSelectBlog(prevPost.slug)}
                  className="btn btn-secondary flex flex-col items-start gap-1"
                  style={{ textAlign: 'left', maxWidth: '45%', alignItems: 'flex-start', padding: '1rem', borderRadius: 'var(--radius-sm)' }}
                >
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>← Previous</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'normal', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{prevPost.title}</span>
                </button>
              ) : <div />}

              {nextPost ? (
                <button
                  onClick={() => onSelectBlog(nextPost.slug)}
                  className="btn btn-secondary flex flex-col items-end gap-1"
                  style={{ textAlign: 'right', maxWidth: '45%', alignItems: 'flex-end', padding: '1rem', marginLeft: 'auto', borderRadius: 'var(--radius-sm)' }}
                >
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next →</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'normal', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{nextPost.title}</span>
                </button>
              ) : <div />}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            <div
              className="card flex flex-col gap-4"
              style={{
                background: 'var(--gradient-brand)',
                color: 'white',
                textAlign: 'center',
                padding: '2rem 1.5rem',
              }}
            >
              <BookOpen size={44} style={{ margin: '0 auto', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.15rem', color: 'white', fontWeight: 700 }}>Never Miss a Deadline</h3>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6' }}>
                Get direct portal links sent straight to your phone when scholarships open.
              </p>
              {siteConfig.social.whatsappChannel ? (
                <a
                  href={siteConfig.social.whatsappChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm w-full"
                  style={{ background: 'white', color: '#128C7E', border: 'none', fontWeight: 700, borderRadius: 'var(--radius-sm)' }}
                >
                  Join WhatsApp Channel
                </a>
              ) : (
                <button className="btn btn-sm w-full" style={{ background: 'white', color: 'var(--primary)', border: 'none', fontWeight: 700, borderRadius: 'var(--radius-sm)' }}>
                  Subscribe Free
                </button>
              )}
            </div>

            <AdBanner format="sidebar" />
            <AdBanner format="sidebar" customText="Write essays with AI helper!" link="#" />
          </aside>
        </div>

        <style>{`
          @media (max-width: 900px) {
            #article-layout { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </>
  );
};
export default BlogPostDetails;
