import type { Scholarship, BlogPost } from '../types';

interface SEOParams {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  type?: 'website' | 'scholarship' | 'article';
  schemaData?: Scholarship | BlogPost;
}

export function updateSEO({
  title,
  description,
  keywords = [],
  canonicalUrl = window.location.href,
  type = 'website',
  schemaData
}: SEOParams) {
  // 1. Update Title
  const formattedTitle = title.includes('ScholarSphere') ? title : `${title} | ScholarSphere`;
  document.title = formattedTitle;

  // Helper function to update meta tag content
  const updateMetaTag = (_nameAttr: string, nameValue: string, content: string, isProperty = false) => {
    const selector = isProperty ? `meta[property="${nameValue}"]` : `meta[name="${nameValue}"]`;
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      if (isProperty) {
        element.setAttribute('property', nameValue);
      } else {
        element.setAttribute('name', nameValue);
      }
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 2. Update Standard Meta Tags
  updateMetaTag('name', 'description', description);
  if (keywords.length > 0) {
    updateMetaTag('name', 'keywords', keywords.join(', '));
  }

  // 3. Open Graph (Facebook/LinkedIn) Meta Tags
  updateMetaTag('property', 'og:title', formattedTitle, true);
  updateMetaTag('property', 'og:description', description, true);
  updateMetaTag('property', 'og:type', type === 'article' ? 'article' : 'website', true);
  updateMetaTag('property', 'og:url', canonicalUrl, true);

  // 4. Twitter Cards
  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', formattedTitle);
  updateMetaTag('name', 'twitter:description', description);

  // 5. Canonical Link
  let canonicalLink = document.head.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // 6. Schema.org JSON-LD structured data injection
  let ldJsonScript = document.getElementById('jsonld-seo') as HTMLScriptElement | null;
  if (!ldJsonScript) {
    ldJsonScript = document.createElement('script');
    ldJsonScript.type = 'application/ld+json';
    ldJsonScript.id = 'jsonld-seo';
    document.head.appendChild(ldJsonScript);
  }

  let schemaJson: any = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'ScholarSphere',
    'url': window.location.origin,
    'description': 'Search and manage fully funded international scholarships and study guides.'
  };

  if (type === 'scholarship' && schemaData) {
    const s = schemaData as Scholarship;
    schemaJson = {
      '@context': 'https://schema.org',
      '@type': 'Scholarship',
      'name': s.title,
      'description': s.description,
      'provider': {
        '@type': 'Organization',
        'name': s.provider
      },
      'award': {
        '@type': 'MonetaryAmount',
        'value': s.amount > 0 ? s.amount.toString() : 'Fully Funded',
        'currency': 'USD'
      },
      'sponsor': {
        '@type': 'Organization',
        'name': s.provider
      },
      'validThrough': s.deadline,
      'educationalLevel': s.degreeLevel
    };
  } else if (type === 'article' && schemaData) {
    const b = schemaData as BlogPost;
    schemaJson = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': b.title,
      'description': b.excerpt,
      'articleBody': b.content.replace(/[#*`_-]/g, ''), // Strip md chars for schema body
      'author': {
        '@type': 'Person',
        'name': b.author
      },
      'datePublished': b.publishedAt,
      'publisher': {
        '@type': 'Organization',
        'name': 'ScholarSphere'
      }
    };
  }

  ldJsonScript.innerHTML = JSON.stringify(schemaJson, null, 2);
}
