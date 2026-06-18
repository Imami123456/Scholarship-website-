export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  country: string;
  amount: number; // For filtering, e.g. 50000 (0 if fully funded/varies)
  amountDisplay: string; // e.g. "$50,000 / Year" or "Full Tuition + Stipend"
  degreeLevel: 'undergraduate' | 'postgraduate' | 'phd' | 'short_course';
  fundingType: 'fully_funded' | 'partial_funded' | 'tuition_waiver';
  fieldOfStudy: string[]; // e.g. ["STEM", "Humanities", "Business", "Medicine"]
  deadline: string; // YYYY-MM-DD
  description: string;
  eligibility: string[];
  benefits: string[];
  process: string[];
  officialLink: string;
  isFeatured: boolean;
  views: number;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown supported content
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  coverGradient: string; // CSS gradient string for beautiful aesthetic cards
  views: number;
  seoKeywords: string[];
}

export interface FilterState {
  search: string;
  country: string;
  degreeLevel: string;
  fundingType: string;
  fieldOfStudy: string;
  onlyFeatured: boolean;
}

export interface SiteStats {
  totalScholarships: number;
  totalFundsDisbursed: string;
  countriesRepresented: number;
  monthlyTraffic: number;
  monthlyRevenue: number;
}
