import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ScholarshipDetails from './pages/ScholarshipDetails';
import Blog from './pages/Blog';
import BlogPostDetails from './pages/BlogPostDetails';
import AdminDashboard from './pages/AdminDashboard';
import type { Scholarship, BlogPost, SiteStats } from './types';
import { initialScholarships } from './data/initialScholarships';
import { initialBlogs } from './data/initialBlogs';

function App() {
  // 1. Data States (load from localStorage or seed fallback)
  const [scholarships, setScholarships] = useState<Scholarship[]>(() => {
    const saved = localStorage.getItem('scholarships');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialScholarships;
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('blogs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialBlogs;
  });

  // 2. Routing States
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedId, setSelectedId] = useState<string>('');

  // Synchronize scholarships to localStorage
  useEffect(() => {
    localStorage.setItem('scholarships', JSON.stringify(scholarships));
  }, [scholarships]);

  // Synchronize blogs to localStorage
  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  // Hash Router implementation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#/' || hash === '#home') {
        setCurrentPage('home');
        setSelectedId('');
      } else if (hash.startsWith('#scholarship/')) {
        setCurrentPage('details');
        setSelectedId(hash.replace('#scholarship/', ''));
      } else if (hash === '#blog') {
        setCurrentPage('blog');
        setSelectedId('');
      } else if (hash.startsWith('#blog/')) {
        setCurrentPage('blog-details');
        setSelectedId(hash.replace('#blog/', ''));
      } else if (hash === '#admin') {
        setCurrentPage('admin');
        setSelectedId('');
      } else {
        setCurrentPage('home');
        setSelectedId('');
      }
    };

    // Initial check
    handleHashChange();

    // Event listener
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Set page trigger via hash
  const navigateTo = (pageId: string) => {
    if (pageId === 'home') {
      window.location.hash = '#/';
    } else if (pageId === 'blog') {
      window.location.hash = '#blog';
    } else if (pageId === 'admin') {
      window.location.hash = '#admin';
    } else {
      window.location.hash = `#/${pageId}`;
    }
  };

  const handleSelectScholarship = (id: string) => {
    window.location.hash = `#scholarship/${id}`;
  };

  const handleSelectBlog = (slug: string) => {
    window.location.hash = `#blog/${slug}`;
  };

  // View count trackers
  const incrementScholarshipViews = (id: string) => {
    setScholarships(prev => 
      prev.map(s => s.id === id ? { ...s, views: s.views + 1 } : s)
    );
  };

  const incrementBlogViews = (slug: string) => {
    setBlogs(prev => 
      prev.map(b => b.slug === slug ? { ...b, views: b.views + 1 } : b)
    );
  };

  // Calculate Dynamic Stats
  const getStats = (): SiteStats => {
    const totalListed = scholarships.length;
    const countries = Array.from(new Set(scholarships.map(s => s.country))).length;
    
    // Sum amount values
    const totalAmount = scholarships.reduce((sum, curr) => sum + curr.amount, 0);
    const totalFundsFormatted = totalAmount > 0 
      ? `$${(totalAmount / 1000).toLocaleString()}K`
      : '$15.2M';

    // Calculate simulated traffic & revenue from item views
    const totalScholarshipViews = scholarships.reduce((sum, curr) => sum + curr.views, 0);
    const totalBlogViews = blogs.reduce((sum, curr) => sum + curr.views, 0);
    const totalViews = totalScholarshipViews + totalBlogViews;

    const monthlyTraffic = 45800 + totalViews;
    const monthlyRevenue = (monthlyTraffic * 0.0092) + (totalViews * 0.05); // Simulated AdSense + click CPM

    return {
      totalScholarships: totalListed,
      totalFundsDisbursed: totalFundsFormatted,
      countriesRepresented: countries,
      monthlyTraffic,
      monthlyRevenue
    };
  };

  const stats = getStats();

  // Render active page component
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            scholarships={scholarships} 
            onSelectScholarship={handleSelectScholarship} 
            stats={stats}
          />
        );
      case 'details':
        return (
          <ScholarshipDetails 
            scholarshipId={selectedId} 
            scholarships={scholarships} 
            onSelectScholarship={handleSelectScholarship} 
            onBack={() => navigateTo('home')}
            onIncrementViews={incrementScholarshipViews}
          />
        );
      case 'blog':
        return (
          <Blog 
            blogs={blogs} 
            onSelectBlog={handleSelectBlog} 
          />
        );
      case 'blog-details':
        return (
          <BlogPostDetails 
            slug={selectedId} 
            blogs={blogs} 
            onBack={() => navigateTo('blog')}
            onSelectBlog={handleSelectBlog}
            onIncrementViews={incrementBlogViews}
          />
        );
      case 'admin':
        return (
          <AdminDashboard 
            scholarships={scholarships} 
            blogs={blogs} 
            onUpdateScholarships={setScholarships}
            onUpdateBlogs={setBlogs}
            stats={stats}
          />
        );
      default:
        return (
          <Home 
            scholarships={scholarships} 
            onSelectScholarship={handleSelectScholarship} 
            stats={stats}
          />
        );
    }
  };

  return (
    <>
      <Header currentPage={currentPage} setCurrentPage={navigateTo} />
      <div style={{ flex: 1 }}>
        {renderContent()}
      </div>
      <Footer setCurrentPage={navigateTo} />
    </>
  );
}

export default App;
