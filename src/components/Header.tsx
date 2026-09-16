import React, { useState, useEffect } from 'react';
import { GraduationCap, Sun, Moon, LayoutDashboard, Search, BookOpen, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Track scroll for header shrink/shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navItems = [
    { id: 'home', label: 'Scholarships', icon: Search },
    { id: 'blog', label: 'Guides', icon: BookOpen },
    { id: 'admin', label: 'Admin', icon: LayoutDashboard },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (id: string) => {
    if (id === 'home' && (currentPage === 'home' || currentPage === 'details')) return true;
    if (id === 'blog' && (currentPage === 'blog' || currentPage === 'blog-details')) return true;
    return currentPage === id;
  };

  return (
    <header
      className="glass-panel"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--border-color)',
        transition: 'all var(--transition-normal)',
        ...(scrolled ? { boxShadow: 'var(--shadow-md)' } : {})
      }}
    >
      <div className="container flex items-center justify-between" style={{ height: '68px' }}>
        {/* Logo */}
        <div
          className="flex items-center gap-3"
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--gradient-brand)',
              color: 'white',
              boxShadow: 'var(--shadow-sm), var(--shadow-glow)',
              transition: 'transform var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08) rotate(-3deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
          >
            <GraduationCap size={24} />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.35rem',
              letterSpacing: '-0.02em',
              background: 'var(--gradient-brand)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ScholarSphere
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-4" style={{ display: 'none' }} id="desktop-nav">
          <ul className="flex items-center gap-1" style={{ listStyle: 'none' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.id);

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`nav-link flex items-center gap-2 btn btn-sm ${active ? 'active' : ''}`}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                      color: active ? 'var(--primary)' : 'var(--text-muted)',
                      fontWeight: active ? 600 : 500,
                    }}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-color)' }} />

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="btn btn-secondary btn-sm flex items-center justify-center"
            style={{
              width: '38px',
              height: '38px',
              padding: 0,
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
            }}
            title="Toggle theme"
            id="theme-toggle"
          >
            <div
              style={{
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: darkMode ? 'rotate(180deg)' : 'rotate(0deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {darkMode
                ? <Sun size={18} style={{ color: 'var(--warning)' }} />
                : <Moon size={18} style={{ color: 'var(--primary)' }} />
              }
            </div>
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2" id="mobile-controls" style={{ display: 'none' }}>
          <button
            onClick={toggleDarkMode}
            className="btn btn-secondary btn-sm flex items-center justify-center"
            style={{ width: '38px', height: '38px', padding: 0, borderRadius: 'var(--radius-sm)' }}
            title="Toggle theme"
          >
            {darkMode
              ? <Sun size={18} style={{ color: 'var(--warning)' }} />
              : <Moon size={18} style={{ color: 'var(--primary)' }} />
            }
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary btn-sm flex items-center justify-center"
            style={{ width: '38px', height: '38px', padding: 0, borderRadius: 'var(--radius-sm)' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu */}
      {mobileMenuOpen && (
        <div
          className="animate-fade-in"
          style={{
            position: 'fixed',
            top: '69px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--bg-glass-strong)',
            backdropFilter: 'blur(24px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
            zIndex: 49,
            padding: '2rem 1.5rem',
          }}
        >
          <ul className="flex flex-col gap-2" style={{ listStyle: 'none' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.id);
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="flex items-center gap-4 w-full"
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: active ? '1.5px solid var(--primary)' : '1.5px solid var(--border-color)',
                      background: active ? 'var(--primary-light)' : 'var(--bg-card)',
                      color: active ? 'var(--primary)' : 'var(--text-main)',
                      fontWeight: active ? 700 : 500,
                      fontSize: '1.1rem',
                      fontFamily: 'var(--font-sans)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <Icon size={22} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Responsive CSS */}
      <style>{`
        @media (min-width: 769px) {
          #desktop-nav { display: flex !important; }
        }
        @media (max-width: 768px) {
          #mobile-controls { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
export default Header;
