import { describe, it, expect, beforeEach } from 'vitest';
import { updateSEO } from '../src/utils/seo';
import type { Scholarship, BlogPost } from '../src/types';

describe('Programmatic SEO Engine', () => {
  beforeEach(() => {
    document.title = '';
    document.head.innerHTML = '';
  });

  it('updates document.title and appends brand name if missing', () => {
    updateSEO({
      title: 'Top Scholarships 2026',
      description: 'Find study abroad opportunities.'
    });

    expect(document.title).toBe('Top Scholarships 2026 | ScholarSphere');
  });

  it('does not duplicate brand name if already in title', () => {
    updateSEO({
      title: 'ScholarSphere - Official Directory',
      description: 'Browse all listings.'
    });

    expect(document.title).toBe('ScholarSphere - Official Directory');
  });

  it('updates standard meta description, keywords, and canonical link', () => {
    updateSEO({
      title: 'DAAD Scholarship Germany',
      description: 'Full tuition and living stipend in Germany.',
      keywords: ['daad', 'germany', 'masters'],
      canonicalUrl: 'https://scholarsphere.com/#scholarship/daad'
    });

    const descMeta = document.head.querySelector('meta[name="description"]');
    expect(descMeta?.getAttribute('content')).toBe('Full tuition and living stipend in Germany.');

    const keywordsMeta = document.head.querySelector('meta[name="keywords"]');
    expect(keywordsMeta?.getAttribute('content')).toBe('daad, germany, masters');

    const canonicalLink = document.head.querySelector('link[rel="canonical"]');
    expect(canonicalLink?.getAttribute('href')).toBe('https://scholarsphere.com/#scholarship/daad');
  });

  it('generates Schema.org WebSite JSON-LD by default', () => {
    updateSEO({
      title: 'Home Page',
      description: 'Directory home.'
    });

    const script = document.getElementById('jsonld-seo') as HTMLScriptElement;
    expect(script).not.toBeNull();
    const schema = JSON.parse(script.innerHTML);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('WebSite');
    expect(schema['name']).toBe('ScholarSphere');
  });

  it('generates Schema.org Scholarship JSON-LD for scholarship pages', () => {
    const mockScholarship: Scholarship = {
      id: 'fulbright-1',
      title: 'Fulbright Foreign Student Program',
      provider: 'US Department of State',
      country: 'United States',
      amount: 65000,
      amountDisplay: 'Fully Funded',
      degreeLevel: 'postgraduate',
      fundingType: 'fully_funded',
      fieldOfStudy: ['STEM', 'Humanities'],
      deadline: '2026-10-15',
      description: 'Prestigious fellowship for international graduate students.',
      eligibility: ['Non-US citizen', 'Bachelor degree'],
      benefits: ['Full tuition', 'Monthly stipend'],
      process: ['Apply online'],
      officialLink: 'https://fulbright.state.gov',
      isFeatured: true,
      views: 120,
      createdAt: '2026-01-01'
    };

    updateSEO({
      title: mockScholarship.title,
      description: mockScholarship.description,
      type: 'scholarship',
      schemaData: mockScholarship
    });

    const script = document.getElementById('jsonld-seo') as HTMLScriptElement;
    const schema = JSON.parse(script.innerHTML);
    expect(schema['@type']).toBe('Scholarship');
    expect(schema['name']).toBe('Fulbright Foreign Student Program');
    expect(schema['award']['value']).toBe('65000');
    expect(schema['validThrough']).toBe('2026-10-15');
    expect(schema['educationalLevel']).toBe('postgraduate');
  });

  it('generates Schema.org BlogPosting JSON-LD for article pages', () => {
    const mockBlog: BlogPost = {
      id: 'b1',
      title: 'How to Write a Winning Motivation Letter',
      slug: 'write-winning-motivation-letter',
      excerpt: 'Comprehensive step-by-step guide.',
      content: '## Header\nWrite a compelling opening paragraph without fluff.',
      category: 'Guides',
      author: 'Dr. Jane Smith',
      publishedAt: '2026-05-01',
      readTime: '5 min read',
      coverGradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
      views: 450,
      seoKeywords: ['motivation letter', 'scholarship']
    };

    updateSEO({
      title: mockBlog.title,
      description: mockBlog.excerpt,
      type: 'article',
      schemaData: mockBlog
    });

    const script = document.getElementById('jsonld-seo') as HTMLScriptElement;
    const schema = JSON.parse(script.innerHTML);
    expect(schema['@type']).toBe('BlogPosting');
    expect(schema['headline']).toBe('How to Write a Winning Motivation Letter');
    expect(schema['author']['name']).toBe('Dr. Jane Smith');
    expect(schema['datePublished']).toBe('2026-05-01');
  });
});
