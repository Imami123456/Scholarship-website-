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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navItems = [
    { id: 'home', label: 'Find Scholarships', icon: Search },
    { id: 'blog', label: 'Guides & Articles', icon: BookOpen },
    { id: 'admin', label: 'Admin Panel', icon: LayoutDashboard },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className="glass-panel"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--border-color)',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div className="container flex items-center justify-between" style={{ height: '70px' }}>
        {/* Logo */}
        <div 
          className="flex items-center gap-2" 
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <div 
            className="flex items-center justify-center" 
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--primary) 0%, hsl(200, 95%, 45%) 100%)',
              color: 'white'
            }}
          >
            <GraduationCap size={24} />
          </div>
          <div>
            <span 
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontWeight: 800, 
                fontSize: '1.35rem', 
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, var(--text-main) 60%, var(--primary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              ScholarSphere
            </span>
            <span 
              className="badge badge-success" 
              style={{ 
                fontSize: '0.65rem', 
                padding: '1px 6px', 
                marginLeft: '8px', 
                verticalAlign: 'middle'
              }}
            >
              v1.2
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-6" style={{ display: 'none' }} id="desktop-nav">
          <ul className="flex items-center gap-2" style={{ listStyle: 'none' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id || 
                (item.id === 'home' && currentPage === 'details') ||
                (item.id === 'blog' && currentPage === 'blog-details');
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`nav-link flex items-center gap-1.5 btn btn-sm`}
                    style={{
                      background: isActive ? 'var(--primary-light)' : 'transparent',
                      color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                      border: 'none',
                      boxShadow: 'none',
                      fontWeight: isActive ? 600 : 500
                    }}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-color)' }}></div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="btn btn-secondary btn-sm flex items-center justify-center"
            style={{ width: '36px', height: '36px', padding: 0 }}
            title="Toggle theme"
            id="theme-toggle"
          >
            {darkMode ? <Sun size={18} style={{ color: 'var(--warning)' }} /> : <Moon size={18} style={{ color: 'var(--primary)' }} />}
          </button>
        </nav>

        {/* Mobile menu triggers */}
        <div className="flex items-center gap-3" id="mobile-controls" style={{ display: 'none' }}>
          <button 
            onClick={toggleDarkMode}
            className="btn btn-secondary btn-sm flex items-center justify-center"
            style={{ width: '36px', height: '36px', padding: 0 }}
            title="Toggle theme"
          >
            {darkMode ? <Sun size={18} style={{ color: 'var(--warning)' }} /> : <Moon size={18} style={{ color: 'var(--primary)' }} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary btn-sm flex items-center justify-center"
            style={{ width: '36px', height: '36px', padding: 0 }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div 
          className="glass-panel animate-fade-in"
          style={{
            position: 'absolute',
            top: '71px',
            left: 0,
            width: '100%',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <ul className="flex flex-col gap-3" style={{ listStyle: 'none' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id || 
                (item.id === 'home' && currentPage === 'details') ||
                (item.id === 'blog' && currentPage === 'blog-details');
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="flex items-center gap-3"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: 'none',
                      background: isActive ? 'var(--primary-light)' : 'transparent',
                      color: isActive ? 'var(--primary)' : 'var(--text-main)',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '1rem',
                      textAlign: 'left'
                    }}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Embedded CSS for responsive navbar navigation */}
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
