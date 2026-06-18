import type { Scholarship } from '../types';

export const initialScholarships: Scholarship[] = [
  {
    id: '1',
    title: 'Fulbright Foreign Student Program',
    provider: 'United States Government (Department of State)',
    country: 'United States',
    amount: 65000,
    amountDisplay: 'Fully Funded (Tuition, Airfare, Stipend, Health Insurance)',
    degreeLevel: 'postgraduate',
    fundingType: 'fully_funded',
    fieldOfStudy: ['STEM', 'Humanities', 'Business', 'Arts', 'Social Sciences'],
    deadline: '2026-09-15',
    description: 'The Fulbright Foreign Student Program enables graduate students, young professionals, and artists from abroad to research and study in the United States. It operates in more than 160 countries worldwide and supports approximately 4,000 foreign students each year.',
    eligibility: [
      'Must be a non-US citizen with a completed bachelor\'s degree.',
      'Must meet language proficiency requirements (TOEFL or IELTS).',
      'Strong academic record and leadership potential.',
      'Clear study objective and project proposal.'
    ],
    benefits: [
      'Full tuition coverage at selected US university.',
      'Monthly living stipend covering accommodation and meals.',
      'Round-trip international airfare.',
      'Accident and sickness health benefits plan.',
      'Pre-academic and enrichment programs.'
    ],
    process: [
      'Check country-specific deadlines and requirements on the official website.',
      'Submit the online application before the regional deadline.',
      'Provide academic transcripts, letters of recommendation, and TOEFL/IELTS scores.',
      'Participate in the interview round if shortlisted.',
      'Await final selection and university placement notifications.'
    ],
    officialLink: 'https://foreign.fulbrightonline.org/',
    isFeatured: true,
    views: 1420,
    createdAt: '2026-06-01'
  },
  {
    id: '2',
    title: 'Chevening Postgraduate Scholarships',
    provider: 'Foreign, Commonwealth & Development Office (FCDO)',
    country: 'United Kingdom',
    amount: 55000,
    amountDisplay: 'Fully Funded (Tuition, Stipend, Flights + Allowances)',
    degreeLevel: 'postgraduate',
    fundingType: 'fully_funded',
    fieldOfStudy: ['STEM', 'Humanities', 'Business', 'Medicine', 'Law', 'Politics'],
    deadline: '2026-11-05',
    description: 'Chevening is the UK government\'s international awards programme aimed at developing global leaders. Funded by the Foreign, Commonwealth & Development Office and partner organisations, it offers full scholarships to study for a one-year master\'s degree at any UK university.',
    eligibility: [
      'Be a citizen of a Chevening-eligible country or territory.',
      'Return to your country of citizenship for a minimum of two years after your award has ended.',
      'Have an undergraduate degree that will enable you to gain entry onto a postgraduate course at a UK university.',
      'Have at least two years (equivalent to 2,800 hours) of work experience.'
    ],
    benefits: [
      'Full university tuition fees coverage.',
      'A monthly living allowance (stipend).',
      'Travel costs to and from the UK (flights).',
      'An arrival allowance and a homeward departure allowance.',
      'The cost of one visa application and a travel grant to attend Chevening events.'
    ],
    process: [
      'Select three eligible UK Master\'s courses.',
      'Complete and submit the online application form before early November.',
      'Upload two reference letters and academic transcripts.',
      'If shortlisted, attend a face-to-face interview at the British Embassy or High Commission.',
      'Secure an unconditional offer from at least one of your chosen courses by the specified deadline.'
    ],
    officialLink: 'https://www.chevening.org/',
    isFeatured: true,
    views: 1250,
    createdAt: '2026-06-02'
  },
  {
    id: '3',
    title: 'DAAD Development-Related Postgraduate Courses (EPOS)',
    provider: 'German Academic Exchange Service (DAAD)',
    country: 'Germany',
    amount: 32000,
    amountDisplay: 'Fully Funded (€934 - €1,300/Month + Travel & Health)',
    degreeLevel: 'postgraduate',
    fundingType: 'fully_funded',
    fieldOfStudy: ['STEM', 'Business', 'Agriculture', 'Environmental Studies', 'Social Sciences'],
    deadline: '2026-10-31',
    description: 'DAAD scholarships support foreign graduates from development and newly industrialized countries to complete a postgraduate or Master\'s degree at a state-recognized German university. The program funds courses designed to train leaders in sustainable development.',
    eligibility: [
      'Candidates must have a Bachelor\'s degree (normally four years) in a related subject.',
      'Must have at least two years of professional experience after graduation.',
      'Academic degrees should normally not be older than six years.',
      'Language proof: TOEFL/IELTS (English courses) or TestDaF/DSH (German courses).'
    ],
    benefits: [
      'Monthly stipend of €934 for Master\'s or €1,300 for Doctoral students.',
      'Full coverage of health, accident, and personal liability insurance.',
      'Travel allowance (flights to and from Germany).',
      'One-off study allowance and subsidy for study materials.',
      'Free preparatory German language course (up to 6 months).'
    ],
    process: [
      'Choose an eligible EPOS degree course in Germany.',
      'Apply directly to the university or the DAAD portal (depending on the course).',
      'Submit a completed DAAD application form, Europass CV, and a hand-signed motivation letter.',
      'Provide proof of employment and reference letters on official letterhead.',
      'The university selection committee, together with DAAD, evaluates and contacts selected scholars.'
    ],
    officialLink: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
    isFeatured: true,
    views: 980,
    createdAt: '2026-06-03'
  },
  {
    id: '4',
    title: 'Erasmus Mundus Joint Master Degrees (EMJM)',
    provider: 'European Commission (European Union)',
    country: 'Europe',
    amount: 49000,
    amountDisplay: 'Fully Funded (€1,000 - €1,400/Month + Tuition & Travel)',
    degreeLevel: 'postgraduate',
    fundingType: 'fully_funded',
    fieldOfStudy: ['STEM', 'Humanities', 'Business', 'Medicine', 'Law', 'Arts'],
    deadline: '2026-02-15',
    description: 'The Erasmus Mundus Joint Master Degrees (EMJM) are prestigious, integrated, international study programs, jointly delivered by an international consortium of higher education institutions. The scholarship covers participation costs, travel, and a monthly living stipend while studying in at least two European countries.',
    eligibility: [
      'Open to students from all over the world who hold a first higher education degree.',
      'Must not have received an Erasmus Mundus scholarship previously.',
      'Must satisfy language requirements set by the specific consortium.'
    ],
    benefits: [
      'Full coverage of tuition fees, library, and laboratory costs.',
      'Full insurance coverage.',
      'Travel and installation cost support.',
      'Monthly living allowance of up to €1,400 for the duration of the program (max 24 months).'
    ],
    process: [
      'Consult the official EMJM online catalogue.',
      'Select up to three different Erasmus Mundus programs.',
      'Apply directly to the specific consortium managing the program.',
      'Provide academic transcripts, proof of language proficiency, recommendation letters, and a CV.',
      'The consortium reviews application and coordinates selection with the European Commission.'
    ],
    officialLink: 'https://ec.europa.eu/programmes/erasmus-plus/opportunities/individuals/students/erasmus-mundus-joint-master-degrees_en',
    isFeatured: false,
    views: 840,
    createdAt: '2026-06-04'
  },
  {
    id: '5',
    title: 'MEXT Scholarship (Monbukagakusho)',
    provider: 'Ministry of Education, Culture, Sports, Science and Technology (MEXT)',
    country: 'Japan',
    amount: 40000,
    amountDisplay: 'Fully Funded (Full Tuition, Monthly Stipend, Airfare)',
    degreeLevel: 'undergraduate',
    fundingType: 'fully_funded',
    fieldOfStudy: ['STEM', 'Humanities', 'Medicine', 'Social Sciences'],
    deadline: '2026-05-31',
    description: 'The Japanese Government (MEXT) offers scholarships for international students who wish to study at Japanese universities. MEXT covers full tuition fees, round-trip airfare, and provides a monthly allowance. Undergraduate students spend their first year in a preparatory school learning Japanese.',
    eligibility: [
      'Nationality of a country that has diplomatic relations with Japan.',
      'Age limit: Generally under 25 for undergraduate, and under 35 for research students.',
      'Must be willing to learn the Japanese language and adapt to Japanese culture.',
      'Academic transcripts showing excellent scores.'
    ],
    benefits: [
      '100% tuition fees exemption for entrance exam, matriculation, and tuition.',
      'Monthly stipend ranging from 117,000 JPY to 145,000 JPY depending on the course level.',
      'Round-trip international flight ticket between home country and Japan.',
      'One-year Japanese language course prior to university entrance.'
    ],
    process: [
      'Submit application documents to the Japanese Embassy or Consulate in your home country.',
      'Undergo the primary screening consisting of document review, written examinations (English & Japanese), and an interview.',
      'If recommended by the Embassy, obtain letters of provisional acceptance from Japanese universities.',
      'Await the secondary screening results from MEXT in Tokyo.'
    ],
    officialLink: 'https://www.mext.go.jp/a_menu/koutou/ryugaku/boshu/1418701.htm',
    isFeatured: false,
    views: 730,
    createdAt: '2026-06-05'
  },
  {
    id: '6',
    title: 'Gates Cambridge Scholarships',
    provider: 'Bill & Melinda Gates Foundation',
    country: 'United Kingdom',
    amount: 60000,
    amountDisplay: 'Fully Funded (Tuition, Maintenance Allowance, Travel)',
    degreeLevel: 'phd',
    fundingType: 'fully_funded',
    fieldOfStudy: ['STEM', 'Humanities', 'Business', 'Medicine', 'Law', 'Social Sciences'],
    deadline: '2026-01-07',
    description: 'Gates Cambridge Scholarships are highly competitive, prestigious awards for outstanding applicants from countries outside the UK to pursue a full-time postgraduate degree in any subject available at the University of Cambridge.',
    eligibility: [
      'Citizen of any country outside the United Kingdom.',
      'Applying to pursue a full-time PhD, MSc, MLitt, or one-year postgraduate course at Cambridge.',
      'Outstanding intellectual ability and leadership capacity.',
      'A commitment to improving the lives of others.'
    ],
    benefits: [
      'The University Composition Fee (tuition) at the appropriate rate.',
      'A maintenance allowance (€18,744/year for 12 months, pro-rata for shorter courses).',
      'One inbound and outbound economy airfare.',
      'Visa costs and immigration health surcharge.',
      'Discretionary funding (conference attendance, family allowance, etc.).'
    ],
    process: [
      'Apply for admission to the University of Cambridge and a College.',
      'In the application, complete the Gates Cambridge section (submit a 500-word statement and reference).',
      'Submit academic transcripts, CV, and general references.',
      'If shortlisted by the academic department, participate in a rigorous panel interview.'
    ],
    officialLink: 'https://www.gatescambridge.org/',
    isFeatured: true,
    views: 1120,
    createdAt: '2026-06-06'
  },
  {
    id: '7',
    title: 'Lester B. Pearson International Scholarship',
    provider: 'University of Toronto',
    country: 'Canada',
    amount: 45000,
    amountDisplay: 'Fully Funded (Tuition, Books, Residence, Incidental Fees)',
    degreeLevel: 'undergraduate',
    fundingType: 'fully_funded',
    fieldOfStudy: ['STEM', 'Humanities', 'Business', 'Arts', 'Social Sciences'],
    deadline: '2026-01-15',
    description: 'The Lester B. Pearson International Scholarships at the University of Toronto provide an unparalleled opportunity for outstanding international students to study at one of the world\'s best universities. The scholarship is awarded annually to students who demonstrate exceptional academic achievement and creativity.',
    eligibility: [
      'An international student (non-Canadian requiring a study permit).',
      'Currently in their final year of secondary school or graduated no earlier than June 2025.',
      'Nominated by their high school guidance counselor.',
      'Beginning studies at the University of Toronto in September 2026.'
    ],
    benefits: [
      'Full tuition fees coverage for four years.',
      'Books and learning material allowance.',
      'Full incidental and campus fees.',
      'Full residence support (room and board) on campus.'
    ],
    process: [
      'Receive a nomination from your high school (high schools must apply to participate).',
      'Apply to study at the University of Toronto and complete your application for admission.',
      'Once the nomination is received and you\'ve applied, complete the online Lester B. Pearson Scholarship application.'
    ],
    officialLink: 'https://pearson.utoronto.ca/',
    isFeatured: true,
    views: 910,
    createdAt: '2026-06-07'
  },
  {
    id: '8',
    title: 'Swiss Government Excellence Scholarships',
    provider: 'Federal Commission for Scholarships for Foreign Students (FCS)',
    country: 'Switzerland',
    amount: 30000,
    amountDisplay: 'Fully Funded (CHF 1,920 - 3,500/Month + Health Insurance)',
    degreeLevel: 'phd',
    fundingType: 'fully_funded',
    fieldOfStudy: ['STEM', 'Humanities', 'Arts', 'Social Sciences'],
    deadline: '2026-11-30',
    description: 'The Swiss Government Excellence Scholarships target young researchers from abroad who have completed a Master\'s or PhD degree. The scholarship supports research fellowships, PhD, or Postdoctoral studies at public Swiss universities, federal institutes of technology, and universities of applied sciences.',
    eligibility: [
      'Master\'s degree or equivalent completed before the scholarship start date.',
      'Applicants must be born after December 31, 1990.',
      'High academic profile and a concrete research proposal.',
      'Letter of support from an academic mentor at a Swiss institution.'
    ],
    benefits: [
      'Monthly payment: CHF 1,920 for PhD / CHF 3,500 for Postdocs.',
      'Mandatory Swiss health insurance covered by the scholarship.',
      'Flight allowance (for non-EU/EFTA scholars returning home).',
      'Housing allowance of CHF 300 (one-off payment).'
    ],
    process: [
      'Obtain a Swiss mentor support letter confirming willingness to supervise your research.',
      'Request the application package from the Swiss Embassy in your home country.',
      'Submit 3 sets of hardcopy application documents to the Swiss representation before the local deadline.'
    ],
    officialLink: 'https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html',
    isFeatured: false,
    views: 620,
    createdAt: '2026-06-08'
  },
  {
    id: '9',
    title: 'Rotary Peace Fellowships',
    provider: 'The Rotary Foundation',
    country: 'Global',
    amount: 50000,
    amountDisplay: 'Fully Funded (Tuition, Fees, Room/Board, Round-trip Travel)',
    degreeLevel: 'postgraduate',
    fundingType: 'fully_funded',
    fieldOfStudy: ['Humanities', 'Law', 'Social Sciences'],
    deadline: '2026-05-15',
    description: 'Each year, Rotary awards up to 130 fully funded fellowships for dedicated leaders from around the world to study at one of the Rotary Peace Centers. The fellowships cover tuition and fees, room and board, round-trip transportation, and internship/field-study expenses.',
    eligibility: [
      'Have three years of related full-time work experience in peace or development.',
      'Have a bachelor\'s degree.',
      'Demonstrate leadership skills and a commitment to peace and international understanding.',
      'English proficiency is required.'
    ],
    benefits: [
      'Full tuition fees coverage.',
      'Room and board coverage.',
      'Round-trip air travel.',
      'All internship and field study expenses.'
    ],
    process: [
      'Review the eligibility guidelines and the Peace Centers locations (Duke, UNC, Tokyo, Bradford, Brisbane, Uppsala).',
      'Submit the online fellowship application before May 15.',
      'Get endorsement from a local Rotary District (facilitated online).'
    ],
    officialLink: 'https://www.rotary.org/en/our-programs/peace-fellowships',
    isFeatured: false,
    views: 450,
    createdAt: '2026-06-09'
  },
  {
    id: '10',
    title: 'Melbourne Research Scholarship (MRS)',
    provider: 'University of Melbourne',
    country: 'Australia',
    amount: 37000,
    amountDisplay: 'Fully Funded ($37,000/Yr Stipend + Fee Offset + Health)',
    degreeLevel: 'phd',
    fundingType: 'fully_funded',
    fieldOfStudy: ['STEM', 'Humanities', 'Business', 'Medicine', 'Law', 'Arts'],
    deadline: '2026-10-31',
    description: 'The Melbourne Research Scholarship is awarded to high-achieving domestic and international research students. Scholars receive a full tuition fee offset, a living allowance stipend, relocation grants, and overseas student health cover.',
    eligibility: [
      'Have applied for and meet the entry requirements for a Master by Research or doctoral degree at the University of Melbourne.',
      'Be currently enrolled in a research degree at Melbourne.'
    ],
    benefits: [
      'Full tuition fee offset for up to 2 years for Masters, and 4 years for PhD.',
      'Living allowance stipend of $37,000 per year (pro-rata).',
      'Relocation grant of up to $3,000 for students moving to Melbourne.',
      'Overseas Student Health Cover (OSHC) Single Membership.'
    ],
    process: [
      'Apply for a research degree course at the University of Melbourne.',
      'Tick the box on the course application form to be considered for graduate research scholarships.',
      'Await selection which is based on academic merit.'
    ],
    officialLink: 'https://scholarships.unimelb.edu.au/awards/melbourne-research-scholarship',
    isFeatured: false,
    views: 590,
    createdAt: '2026-06-10'
  }
];
