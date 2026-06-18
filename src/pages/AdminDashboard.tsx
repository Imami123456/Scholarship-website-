import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Plus, Edit2, Trash2, Download, Upload, Star, Eye, Sparkles, AlertCircle, TrendingUp, DollarSign, Users, Award, BookOpen } from 'lucide-react';
import type { Scholarship, BlogPost, SiteStats } from '../types';
import { updateSEO } from '../utils/seo';

interface AdminDashboardProps {
  scholarships: Scholarship[];
  blogs: BlogPost[];
  onUpdateScholarships: (list: Scholarship[]) => void;
  onUpdateBlogs: (list: BlogPost[]) => void;
  stats: SiteStats;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  scholarships,
  blogs,
  onUpdateScholarships,
  onUpdateBlogs,
  stats
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'scholarships' | 'blogs'>('overview');
  
  // SEO title update
  useEffect(() => {
    updateSEO({
      title: 'Content Management CMS & Traffic Dashboard',
      description: 'Manage scholarship listings, write SEO articles, and monitor simulated earnings and visitor traffic analytics.',
      keywords: ['scholarship cms', 'admin dashboard', 'manage content']
    });
  }, []);

  // Form states - Scholarship
  const [isAddingScholarship, setIsAddingScholarship] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);
  
  const [sTitle, setSTitle] = useState('');
  const [sProvider, setSProvider] = useState('');
  const [sCountry, setSCountry] = useState('');
  const [sAmount, setSAmount] = useState(0);
  const [sAmountDisplay, setSAmountDisplay] = useState('');
  const [sLevel, setSLevel] = useState<'undergraduate' | 'postgraduate' | 'phd' | 'short_course'>('postgraduate');
  const [sFunding, setSFunding] = useState<'fully_funded' | 'partial_funded' | 'tuition_waiver'>('fully_funded');
  const [sFields, setSFields] = useState(''); // comma separated
  const [sDeadline, setSDeadline] = useState('');
  const [sDesc, setSDesc] = useState('');
  const [sEligibility, setSEligibility] = useState(''); // new lines
  const [sBenefits, setSBenefits] = useState(''); // new lines
  const [sProcess, setSProcess] = useState(''); // new lines
  const [sLink, setSLink] = useState('');
  const [sFeatured, setSFeatured] = useState(false);

  // Form states - Blog
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  const [bTitle, setBTitle] = useState('');
  const [bSlug, setBSlug] = useState('');
  const [bExcerpt, setBExcerpt] = useState('');
  const [bCategory, setBCategory] = useState('Application Guides');
  const [bAuthor, setBAuthor] = useState('');
  const [bReadTime, setBReadTime] = useState('5 min read');
  const [bGradient, setBGradient] = useState('linear-gradient(135deg, #6366f1 0%, #a855f7 100%)');
  const [bKeywords, setBKeywords] = useState(''); // comma separated
  const [bContent, setBContent] = useState('');

  // Notification feedback
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  // Populate scholarship form for editing
  const startEditScholarship = (s: Scholarship) => {
    setEditingScholarship(s);
    setSTitle(s.title);
    setSProvider(s.provider);
    setSCountry(s.country);
    setSAmount(s.amount);
    setSAmountDisplay(s.amountDisplay);
    setSLevel(s.degreeLevel);
    setSFunding(s.fundingType);
    setSFields(s.fieldOfStudy.join(', '));
    setSDeadline(s.deadline);
    setSDesc(s.description);
    setSEligibility(s.eligibility.join('\n'));
    setSBenefits(s.benefits.join('\n'));
    setSProcess(s.process.join('\n'));
    setSLink(s.officialLink);
    setSFeatured(s.isFeatured);
    setIsAddingScholarship(true); // opens panel
  };

  // Clear scholarship form
  const clearScholarshipForm = () => {
    setEditingScholarship(null);
    setSTitle('');
    setSProvider('');
    setSCountry('');
    setSAmount(0);
    setSAmountDisplay('');
    setSLevel('postgraduate');
    setSFunding('fully_funded');
    setSFields('');
    setSDeadline('');
    setSDesc('');
    setSEligibility('');
    setSBenefits('');
    setSProcess('');
    setSLink('');
    setSFeatured(false);
    setIsAddingScholarship(false);
  };

  // Save Scholarship (Add/Edit)
  const handleSaveScholarship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sTitle || !sProvider || !sCountry || !sDeadline || !sLink) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }

    const fieldsArray = sFields.split(',').map(f => f.trim()).filter(Boolean);
    const eligibilityArray = sEligibility.split('\n').map(l => l.trim()).filter(Boolean);
    const benefitsArray = sBenefits.split('\n').map(l => l.trim()).filter(Boolean);
    const processArray = sProcess.split('\n').map(l => l.trim()).filter(Boolean);

    if (editingScholarship) {
      // Edit
      const updated = scholarships.map(s => {
        if (s.id === editingScholarship.id) {
          return {
            ...s,
            title: sTitle,
            provider: sProvider,
            country: sCountry,
            amount: sAmount,
            amountDisplay: sAmountDisplay || (sFunding === 'fully_funded' ? 'Fully Funded' : 'Partial Tuition'),
            degreeLevel: sLevel,
            fundingType: sFunding,
            fieldOfStudy: fieldsArray.length > 0 ? fieldsArray : ['General'],
            deadline: sDeadline,
            description: sDesc,
            eligibility: eligibilityArray,
            benefits: benefitsArray,
            process: processArray,
            officialLink: sLink,
            isFeatured: sFeatured
          };
        }
        return s;
      });
      onUpdateScholarships(updated);
      showNotification('Scholarship listing updated successfully!');
    } else {
      // Add
      const newScholarship: Scholarship = {
        id: `custom_${Date.now()}`,
        title: sTitle,
        provider: sProvider,
        country: sCountry,
        amount: sAmount,
        amountDisplay: sAmountDisplay || (sFunding === 'fully_funded' ? 'Fully Funded' : 'Partial Tuition'),
        degreeLevel: sLevel,
        fundingType: sFunding,
        fieldOfStudy: fieldsArray.length > 0 ? fieldsArray : ['General'],
        deadline: sDeadline,
        description: sDesc,
        eligibility: eligibilityArray,
        benefits: benefitsArray,
        process: processArray,
        officialLink: sLink,
        isFeatured: sFeatured,
        views: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      onUpdateScholarships([newScholarship, ...scholarships]);
      showNotification('New scholarship added successfully!');
    }
    clearScholarshipForm();
  };

  // Delete Scholarship
  const handleDeleteScholarship = (id: string) => {
    if (window.confirm('Are you sure you want to delete this scholarship listing?')) {
      const filtered = scholarships.filter(s => s.id !== id);
      onUpdateScholarships(filtered);
      showNotification('Scholarship listing deleted.');
    }
  };

  // Populate Blog Form for editing
  const startEditBlog = (b: BlogPost) => {
    setEditingBlog(b);
    setBTitle(b.title);
    setBSlug(b.slug);
    setBExcerpt(b.excerpt);
    setBCategory(b.category);
    setBAuthor(b.author);
    setBReadTime(b.readTime);
    setBGradient(b.coverGradient);
    setBKeywords(b.seoKeywords.join(', '));
    setBContent(b.content);
    setIsAddingBlog(true); // opens panel
  };

  // Clear Blog Form
  const clearBlogForm = () => {
    setEditingBlog(null);
    setBTitle('');
    setBSlug('');
    setBExcerpt('');
    setBCategory('Application Guides');
    setBAuthor('');
    setBReadTime('5 min read');
    setBGradient('linear-gradient(135deg, #6366f1 0%, #a855f7 100%)');
    setBKeywords('');
    setBContent('');
    setIsAddingBlog(false);
  };

  // Save Blog (Add/Edit)
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bTitle || !bExcerpt || !bAuthor || !bContent) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }

    const keywordsArray = bKeywords.split(',').map(k => k.trim()).filter(Boolean);
    const finalSlug = bSlug.trim() || bTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (editingBlog) {
      // Edit
      const updated = blogs.map(b => {
        if (b.id === editingBlog.id) {
          return {
            ...b,
            title: bTitle,
            slug: finalSlug,
            excerpt: bExcerpt,
            category: bCategory,
            author: bAuthor,
            readTime: bReadTime,
            coverGradient: bGradient,
            seoKeywords: keywordsArray,
            content: bContent
          };
        }
        return b;
      });
      onUpdateBlogs(updated);
      showNotification('Article updated successfully!');
    } else {
      // Add
      const newPost: BlogPost = {
        id: `blog_${Date.now()}`,
        title: bTitle,
        slug: finalSlug,
        excerpt: bExcerpt,
        category: bCategory,
        author: bAuthor,
        publishedAt: new Date().toISOString().split('T')[0],
        readTime: bReadTime,
        coverGradient: bGradient,
        views: 0,
        seoKeywords: keywordsArray,
        content: bContent
      };
      onUpdateBlogs([newPost, ...blogs]);
      showNotification('New article published successfully!');
    }
    clearBlogForm();
  };

  // Delete Blog Post
  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const filtered = blogs.filter(b => b.id !== id);
      onUpdateBlogs(filtered);
      showNotification('Article deleted successfully.');
    }
  };

  // Export Data as JSON
  const handleExportData = () => {
    const backupData = {
      scholarships,
      blogs,
      exportedAt: new Date().toISOString()
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `scholarsphere_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Database backup JSON generated.');
  };

  // Import Data from JSON
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.scholarships && parsed.blogs) {
            onUpdateScholarships(parsed.scholarships);
            onUpdateBlogs(parsed.blogs);
            showNotification('Database restored successfully from backup!');
          } else {
            showNotification('Invalid file structure. Make sure you import a valid ScholarSphere backup.', 'error');
          }
        } catch (err) {
          showNotification('Error parsing JSON backup file.', 'error');
        }
      };
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 5rem', textAlign: 'left' }}>
      
      {/* Title */}
      <div 
        className="flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}
      >
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>🔐 CMS ADMIN AREA</span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 850 }}>Content & Earnings Studio</h1>
        </div>
        
        {/* Export/Import Buttons */}
        <div className="flex gap-2">
          <button onClick={handleExportData} className="btn btn-secondary btn-sm flex items-center gap-1.5">
            <Download size={14} /> Export Backup
          </button>
          
          <label className="btn btn-secondary btn-sm flex items-center gap-1.5" style={{ cursor: 'pointer' }}>
            <Upload size={14} /> Import Backup
            <input 
              type="file" 
              accept=".json" 
              onChange={handleImportData} 
              style={{ display: 'none' }} 
            />
          </label>
        </div>
      </div>

      {/* Notification Toast */}
      {message && (
        <div 
          className={`card animate-fade-in flex items-center gap-3`}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 100,
            borderColor: message.type === 'success' ? 'var(--success)' : 'var(--danger)',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'var(--shadow-lg)',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            maxWidth: '380px'
          }}
        >
          {message.type === 'success' ? (
            <Sparkles size={20} style={{ color: 'var(--success)' }} />
          ) : (
            <AlertCircle size={20} style={{ color: 'var(--danger)' }} />
          )}
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{message.text}</span>
        </div>
      )}

      {/* Admin Nav Sub-tabs */}
      <div className="flex gap-2" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <button 
          onClick={() => { setActiveSubTab('overview'); clearScholarshipForm(); clearBlogForm(); }}
          className={`btn btn-sm ${activeSubTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ border: 'none', boxShadow: 'none' }}
        >
          <LayoutDashboard size={15} /> Overview & Analytics
        </button>
        <button 
          onClick={() => { setActiveSubTab('scholarships'); clearScholarshipForm(); }}
          className={`btn btn-sm ${activeSubTab === 'scholarships' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ border: 'none', boxShadow: 'none' }}
        >
          <Award size={15} /> Manage Scholarships ({scholarships.length})
        </button>
        <button 
          onClick={() => { setActiveSubTab('blogs'); clearBlogForm(); }}
          className={`btn btn-sm ${activeSubTab === 'blogs' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ border: 'none', boxShadow: 'none' }}
        >
          <BookOpen size={15} /> Manage Articles ({blogs.length})
        </button>
      </div>

      {/* Overview Analytics Dashboard Sub-Tab */}
      {activeSubTab === 'overview' && (
        <section className="flex flex-col gap-6">
          <div className="card" style={{ background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--bg-card) 100%)', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={20} /> How Your Traffic Generates Revenue
            </h3>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', maxWidth: '800px', lineHeight: '1.6' }}>
              By creating SEO-optimized guides and updating high-intent scholarship listings, you attract search engine clicks. Once traffic builds, you earn passive income using Google AdSense banner placements, premium newsletter memberships, and partner affiliate programs. Below is a simulated live performance tracker representing your traffic monetization output:
            </p>
          </div>

          {/* Analytics Stats Cards Grid */}
          <div className="grid grid-4" style={{ gap: '1.5rem' }}>
            {/* Monthly Visitors */}
            <div className="card flex flex-col justify-between" style={{ padding: '1.5rem' }}>
              <div className="flex justify-between items-center" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>MONTHLY TRAFFIC</span>
                <Users size={18} style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.monthlyTraffic.toLocaleString()}</h2>
                <div className="flex items-center gap-1" style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: 'var(--success)' }}>
                  <span>&uarr; 14.2%</span>
                  <span style={{ color: 'var(--text-muted)' }}>vs last month</span>
                </div>
              </div>
            </div>

            {/* Simulated Ads Revenue */}
            <div className="card flex flex-col justify-between" style={{ padding: '1.5rem' }}>
              <div className="flex justify-between items-center" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>EST. ADS EARNINGS</span>
                <DollarSign size={18} style={{ color: 'var(--success)' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>${stats.monthlyRevenue.toFixed(2)}</h2>
                <div className="flex items-center gap-1" style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: 'var(--success)' }}>
                  <span>&uarr; 8.6%</span>
                  <span style={{ color: 'var(--text-muted)' }}>AdSense RPM: $9.20</span>
                </div>
              </div>
            </div>

            {/* Click-Through Rate */}
            <div className="card flex flex-col justify-between" style={{ padding: '1.5rem' }}>
              <div className="flex justify-between items-center" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>BANNER AD CTR</span>
                <TrendingUp size={18} style={{ color: 'var(--info)' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>2.45%</h2>
                <div className="flex items-center gap-1" style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: 'var(--info)' }}>
                  <span>Steady</span>
                  <span style={{ color: 'var(--text-muted)' }}>Industry avg: 1.8%</span>
                </div>
              </div>
            </div>

            {/* Content Value Index */}
            <div className="card flex flex-col justify-between" style={{ padding: '1.5rem' }}>
              <div className="flex justify-between items-center" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>CONTENT ASSETS</span>
                <Award size={18} style={{ color: 'var(--warning)' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>{scholarships.length + blogs.length}</h2>
                <div className="flex items-center gap-1" style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>{scholarships.length} scholarships</span>
                  <span>•</span>
                  <span>{blogs.length} articles</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Help on updates */}
          <div className="card" style={{ padding: '1.5rem', background: 'var(--bg-glass)' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Quick Tip: Maximizing SEO Rankings</h4>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Write long-form articles targeting secondary keywords (e.g. "Erasmus Mundus scholarship timeline").</li>
              <li>Always provide exact deadline dates to keep structural JSON-LD schemas valid for Google Search.</li>
              <li>Keep listings fresh; delete or replace expired deadlines with upcoming intake dates.</li>
            </ul>
          </div>
        </section>
      )}

      {/* Scholarship Management Sub-Tab */}
      {activeSubTab === 'scholarships' && (
        <section className="flex flex-col gap-6">
          {/* Add Form Wizard Toggle */}
          {!isAddingScholarship ? (
            <div className="flex justify-between items-center">
              <h3 style={{ fontSize: '1.25rem' }}>Active Scholarship Listings</h3>
              <button onClick={() => setIsAddingScholarship(true)} className="btn btn-primary btn-sm flex items-center gap-1">
                <Plus size={16} /> Add Scholarship
              </button>
            </div>
          ) : (
            <div className="card flex flex-col gap-6" style={{ background: 'var(--bg-glass)' }}>
              <h3 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                {editingScholarship ? `Edit Scholarship: ${editingScholarship.title}` : 'Add New Scholarship Listing'}
              </h3>
              
              <form onSubmit={handleSaveScholarship} className="grid grid-2" style={{ gap: '1.5rem' }} id="scholarship-form">
                
                {/* Title */}
                <div className="form-group">
                  <label className="label">Scholarship Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Fulbright Graduate Awards" 
                    required 
                    value={sTitle} 
                    onChange={(e) => setSTitle(e.target.value)} 
                    className="input" 
                  />
                </div>

                {/* Provider */}
                <div className="form-group">
                  <label className="label">Award Provider / University *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. US Department of State" 
                    required 
                    value={sProvider} 
                    onChange={(e) => setSProvider(e.target.value)} 
                    className="input" 
                  />
                </div>

                {/* Country */}
                <div className="form-group">
                  <label className="label">Destination Country *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. United States, Germany, Global" 
                    required 
                    value={sCountry} 
                    onChange={(e) => setSCountry(e.target.value)} 
                    className="input" 
                  />
                </div>

                {/* Deadline */}
                <div className="form-group">
                  <label className="label">Application Deadline Date *</label>
                  <input 
                    type="date" 
                    required 
                    value={sDeadline} 
                    onChange={(e) => setSDeadline(e.target.value)} 
                    className="input" 
                  />
                </div>

                {/* Level Select */}
                <div className="form-group">
                  <label className="label">Degree Level *</label>
                  <select value={sLevel} onChange={(e) => setSLevel(e.target.value as any)} className="select">
                    <option value="undergraduate">Undergraduate</option>
                    <option value="postgraduate">Postgraduate (Master\'s)</option>
                    <option value="phd">PhD / Doctorate</option>
                    <option value="short_course">Short Courses / Fellowships</option>
                  </select>
                </div>

                {/* Funding Type Select */}
                <div className="form-group">
                  <label className="label">Funding Coverage *</label>
                  <select value={sFunding} onChange={(e) => setSFunding(e.target.value as any)} className="select">
                    <option value="fully_funded">Fully Funded (Tuition + Stipend)</option>
                    <option value="partial_funded">Partial Funding</option>
                    <option value="tuition_waiver">Tuition Waiver Only</option>
                  </select>
                </div>

                {/* Amount Numeric */}
                <div className="form-group">
                  <label className="label">Est. Financial Value (USD equivalent for filters) *</label>
                  <input 
                    type="number" 
                    value={sAmount} 
                    onChange={(e) => setSAmount(parseInt(e.target.value) || 0)} 
                    className="input" 
                  />
                </div>

                {/* Amount Display */}
                <div className="form-group">
                  <label className="label">Amount Display Label (Text shown to visitors)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Fully Funded or $45,000 / Year" 
                    value={sAmountDisplay} 
                    onChange={(e) => setSAmountDisplay(e.target.value)} 
                    className="input" 
                  />
                </div>

                {/* Fields of study */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="label">Eligible Fields of Study (Comma separated)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. STEM, Humanities, Business, Medicine" 
                    value={sFields} 
                    onChange={(e) => setSFields(e.target.value)} 
                    className="input" 
                  />
                </div>

                {/* Link */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="label">Official Application Portal Link *</label>
                  <input 
                    type="url" 
                    placeholder="https://example.com/apply" 
                    required 
                    value={sLink} 
                    onChange={(e) => setSLink(e.target.value)} 
                    className="input" 
                  />
                </div>

                {/* Description */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="label">Description / Summary *</label>
                  <textarea 
                    rows={4} 
                    placeholder="Briefly describe the scholarship..." 
                    required 
                    value={sDesc} 
                    onChange={(e) => setSDesc(e.target.value)} 
                    className="textarea" 
                  />
                </div>

                {/* Eligibility */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="label">Eligibility Criteria (Enter one requirement per line)</label>
                  <textarea 
                    rows={4} 
                    placeholder="e.g. Must be citizen of an eligible country&#10;Completed Bachelor\'s degree" 
                    value={sEligibility} 
                    onChange={(e) => setSEligibility(e.target.value)} 
                    className="textarea" 
                  />
                </div>

                {/* Benefits */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="label">Scholarship Benefits (Enter one benefit per line)</label>
                  <textarea 
                    rows={4} 
                    placeholder="e.g. Full tuition coverage&#10;Monthly allowance stipend" 
                    value={sBenefits} 
                    onChange={(e) => setSBenefits(e.target.value)} 
                    className="textarea" 
                  />
                </div>

                {/* Process */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="label">Application Steps (Enter one step per line)</label>
                  <textarea 
                    rows={4} 
                    placeholder="e.g. Search for eligible programs&#10;Submit online application form" 
                    value={sProcess} 
                    onChange={(e) => setSProcess(e.target.value)} 
                    className="textarea" 
                  />
                </div>

                {/* Featured Checkbox */}
                <div className="checkbox-container" style={{ gridColumn: 'span 2' }}>
                  <input 
                    type="checkbox" 
                    id="isFeatured" 
                    checked={sFeatured} 
                    onChange={(e) => setSFeatured(e.target.checked)} 
                    className="checkbox" 
                  />
                  <label htmlFor="isFeatured" className="label" style={{ cursor: 'pointer' }}>
                    ⭐ Promote listing on homepage featured section
                  </label>
                </div>

                {/* Form Buttons */}
                <div className="flex gap-2" style={{ gridColumn: 'span 2', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                  <button type="button" onClick={clearScholarshipForm} className="btn btn-secondary btn-sm">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    {editingScholarship ? 'Update Listing' : 'Publish Listing'}
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* Scholarship List Table */}
          {!isAddingScholarship && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--border-color)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Title / Country</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Degree Level</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Funding Type</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Deadline</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: 600 }}>Views</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: 600 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships.map(s => (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ fontWeight: 600 }} className="flex items-center gap-1">
                          {s.isFeatured && <Star size={14} fill="var(--primary)" style={{ color: 'var(--primary)' }} />}
                          {s.title}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.provider} | {s.country}</span>
                      </td>
                      <td style={{ padding: '12px', textTransform: 'capitalize' }}>{s.degreeLevel.replace('_', ' ')}</td>
                      <td style={{ padding: '12px' }}>
                        <span className={`badge ${s.fundingType === 'fully_funded' ? 'badge-success' : 'badge-info'}`} style={{ fontSize: '0.7rem' }}>
                          {s.fundingType.replace('_', ' ')}
                        </span>
                      </td>
                      <td style={{ padding: '12px', fontWeight: 500 }}>{s.deadline}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}><span className="flex items-center justify-center gap-1"><Eye size={12} /> {s.views}</span></td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <div className="flex gap-2 justify-center">
                          <button onClick={() => startEditScholarship(s)} className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }} title="Edit">
                            <Edit2 size={12} />
                          </button>
                          <button onClick={() => handleDeleteScholarship(s.id)} className="btn btn-danger btn-sm" style={{ padding: '4px 8px' }} title="Delete">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Blogs Management Sub-Tab */}
      {activeSubTab === 'blogs' && (
        <section className="flex flex-col gap-6">
          
          {/* Add Blog Wizard Toggle */}
          {!isAddingBlog ? (
            <div className="flex justify-between items-center">
              <h3 style={{ fontSize: '1.25rem' }}>Published Guides & Articles</h3>
              <button onClick={() => setIsAddingBlog(true)} className="btn btn-primary btn-sm flex items-center gap-1">
                <Plus size={16} /> Write Article
              </button>
            </div>
          ) : (
            <div className="card flex flex-col gap-6" style={{ background: 'var(--bg-glass)' }}>
              <h3 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                {editingBlog ? `Edit Article: ${editingBlog.title}` : 'Write New SEO Scholarship Guide'}
              </h3>
              
              <form onSubmit={handleSaveBlog} className="grid grid-2" style={{ gap: '1.5rem' }} id="blog-form">
                
                {/* Title */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="label">Article Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. How to Get a Fully Funded Masters in Sweden" 
                    required 
                    value={bTitle} 
                    onChange={(e) => setBTitle(e.target.value)} 
                    className="input" 
                  />
                </div>

                {/* Slug */}
                <div className="form-group">
                  <label className="label">URL Slug (leave empty to auto-generate)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. study-sweden-fully-funded" 
                    value={bSlug} 
                    onChange={(e) => setBSlug(e.target.value)} 
                    className="input" 
                  />
                </div>

                {/* Category select */}
                <div className="form-group">
                  <label className="label">Category *</label>
                  <select value={bCategory} onChange={(e) => setBCategory(e.target.value)} className="select">
                    <option value="Application Guides">Application Guides</option>
                    <option value="Scholarship Lists">Scholarship Lists</option>
                    <option value="Interview Preparation">Interview Preparation</option>
                    <option value="General News">General News</option>
                  </select>
                </div>

                {/* Author */}
                <div className="form-group">
                  <label className="label">Author Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sarah Jenkins" 
                    required 
                    value={bAuthor} 
                    onChange={(e) => setBAuthor(e.target.value)} 
                    className="input" 
                  />
                </div>

                {/* Read Time */}
                <div className="form-group">
                  <label className="label">Estimated Read Time</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 5 min read" 
                    value={bReadTime} 
                    onChange={(e) => setBReadTime(e.target.value)} 
                    className="input" 
                  />
                </div>

                {/* Cover Gradient Selection */}
                <div className="form-group">
                  <label className="label">Card Cover Gradient Style</label>
                  <select value={bGradient} onChange={(e) => setBGradient(e.target.value)} className="select">
                    <option value="linear-gradient(135deg, #6366f1 0%, #a855f7 100%)">Indigo-Purple (Default)</option>
                    <option value="linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)">Pink-Rose (Highly Visible)</option>
                    <option value="linear-gradient(135deg, #10b981 0%, #3b82f6 100%)">Emerald-Blue (Technical)</option>
                    <option value="linear-gradient(135deg, #f59e0b 0%, #e11d48 100%)">Orange-Red (Attention)</option>
                  </select>
                </div>

                {/* SEO Keywords */}
                <div className="form-group">
                  <label className="label">SEO Keywords Target (Comma separated)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. scholarship tips, study for free, masters" 
                    value={bKeywords} 
                    onChange={(e) => setBKeywords(e.target.value)} 
                    className="input" 
                  />
                </div>

                {/* Excerpt */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="label">Excerpt / Short Summary * (Meta description text)</label>
                  <textarea 
                    rows={2} 
                    placeholder="Enter a brief, engaging summary to draw clicks from search engine snippets..." 
                    required 
                    value={bExcerpt} 
                    onChange={(e) => setBExcerpt(e.target.value)} 
                    className="textarea" 
                  />
                </div>

                {/* Content */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: '4px' }}>
                    <label className="label">Markdown Article Body *</label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Supports ## h2, ### h3, * lists, | tables, and **bold**</span>
                  </div>
                  <textarea 
                    rows={12} 
                    placeholder="## Introduction&#10;Write your body text here..." 
                    required 
                    value={bContent} 
                    onChange={(e) => setBContent(e.target.value)} 
                    className="textarea" 
                    style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
                  />
                </div>

                {/* Form Buttons */}
                <div className="flex gap-2" style={{ gridColumn: 'span 2', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                  <button type="button" onClick={clearBlogForm} className="btn btn-secondary btn-sm">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    {editingBlog ? 'Update Article' : 'Publish Article'}
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* Blogs list table */}
          {!isAddingBlog && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--border-color)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Article Title</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Category</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Author</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Published At</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: 600 }}>Views</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: 600 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map(b => (
                    <tr key={b.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ fontWeight: 600 }}>{b.title}</div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Slug: /{b.slug}</span>
                      </td>
                      <td style={{ padding: '12px' }}>{b.category}</td>
                      <td style={{ padding: '12px' }}>{b.author}</td>
                      <td style={{ padding: '12px' }}>{b.publishedAt}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}><span className="flex items-center justify-center gap-1"><Eye size={12} /> {b.views}</span></td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <div className="flex gap-2 justify-center">
                          <button onClick={() => startEditBlog(b)} className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }} title="Edit">
                            <Edit2 size={12} />
                          </button>
                          <button onClick={() => handleDeleteBlog(b.id)} className="btn btn-danger btn-sm" style={{ padding: '4px 8px' }} title="Delete">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Embedded CSS for responsive elements */}
      <style>{`
        @media (max-width: 600px) {
          #scholarship-form, #blog-form {
            grid-template-columns: 1fr !important;
          }
          #scholarship-form > div, #blog-form > div {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </div>
  );
};
export default AdminDashboard;
