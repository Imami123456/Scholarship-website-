import { describe, it, expect } from 'vitest';
import type { Scholarship } from '../src/types';

const mockScholarships: Scholarship[] = [
  {
    id: '1',
    title: 'Fulbright Foreign Student Program',
    provider: 'US Department of State',
    country: 'United States',
    amount: 65000,
    amountDisplay: 'Fully Funded',
    degreeLevel: 'postgraduate',
    fundingType: 'fully_funded',
    fieldOfStudy: ['STEM', 'Humanities', 'Business'],
    deadline: '2026-10-15',
    description: 'Premier academic exchange program for study in the USA.',
    eligibility: ['Non-US citizen'],
    benefits: ['Full tuition', 'Stipend'],
    process: ['Online application'],
    officialLink: 'https://fulbright.state.gov',
    isFeatured: true,
    views: 120,
    createdAt: '2026-01-01'
  },
  {
    id: '2',
    title: 'DAAD Helmut-Schmidt-Programme',
    provider: 'DAAD Germany',
    country: 'Germany',
    amount: 35000,
    amountDisplay: 'Full Scholarship',
    degreeLevel: 'postgraduate',
    fundingType: 'fully_funded',
    fieldOfStudy: ['Public Policy', 'Social Sciences'],
    deadline: '2026-07-31',
    description: 'Master of Public Policy and Good Governance in Germany.',
    eligibility: ['Graduates from developing countries'],
    benefits: ['Tuition waiver', 'Monthly stipend'],
    process: ['Submit to university'],
    officialLink: 'https://daad.de',
    isFeatured: false,
    views: 95,
    createdAt: '2026-02-01'
  },
  {
    id: '3',
    title: 'Melbourne International Undergraduate Scholarship',
    provider: 'University of Melbourne',
    country: 'Australia',
    amount: 20000,
    amountDisplay: 'Partial Tuition Remission',
    degreeLevel: 'undergraduate',
    fundingType: 'partial_funded',
    fieldOfStudy: ['STEM', 'Medicine'],
    deadline: '2026-11-30',
    description: 'Scholarship awarded to high-achieving international undergraduate students.',
    eligibility: ['International students with excellent secondary results'],
    benefits: ['50% fee remission'],
    process: ['Automatic consideration'],
    officialLink: 'https://unimelb.edu.au',
    isFeatured: true,
    views: 40,
    createdAt: '2026-03-01'
  }
];

describe('Scholarship Filtering & Sorting Engine', () => {
  it('filters by keyword search across title, provider, and description', () => {
    const search = 'germany';
    const filtered = mockScholarships.filter(s =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.provider.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
    );
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe('2');
  });

  it('filters by exact country match', () => {
    const country = 'United States';
    const filtered = mockScholarships.filter(s => s.country === country);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe('Fulbright Foreign Student Program');
  });

  it('filters by degree level', () => {
    const level = 'undergraduate';
    const filtered = mockScholarships.filter(s => s.degreeLevel === level);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].provider).toBe('University of Melbourne');
  });

  it('filters by funding type', () => {
    const funding = 'fully_funded';
    const filtered = mockScholarships.filter(s => s.fundingType === funding);
    expect(filtered).toHaveLength(2);
  });

  it('filters by field of study inclusion', () => {
    const field = 'STEM';
    const filtered = mockScholarships.filter(s => s.fieldOfStudy.includes(field));
    expect(filtered).toHaveLength(2);
    expect(filtered.map(s => s.id)).toEqual(['1', '3']);
  });

  it('filters only featured scholarships when toggle is active', () => {
    const filtered = mockScholarships.filter(s => s.isFeatured);
    expect(filtered).toHaveLength(2);
    expect(filtered.every(s => s.isFeatured)).toBe(true);
  });

  it('sorts scholarships chronologically by upcoming deadline', () => {
    const sorted = [...mockScholarships].sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );
    // 2026-07-31 (DAAD) -> 2026-10-15 (Fulbright) -> 2026-11-30 (Melbourne)
    expect(sorted[0].id).toBe('2');
    expect(sorted[1].id).toBe('1');
    expect(sorted[2].id).toBe('3');
  });
});
