// All site copy lives here — edit this file to change what the portfolio says.

export const profile = {
  name: 'Anirudh Verma',
  role: 'Full-stack developer',
  org: 'Smart World Developers',
  github: 'https://github.com/aviverma007',
  email: 'anirudh.verma@smartworlddevelopers.com',
  location: 'Gurugram, India',
}

export const stackMarquee = [
  'React 19', 'TypeScript', 'Motion', 'Vite', 'Tailwind', 'Zustand',
  'Node / Express', 'Flask', 'FastAPI', 'SQL Server', 'SAP OData', 'Windows services',
]

export const stats = [
  { value: '4 MB', label: 'database size after rebuilding a 10 GB sync service around upserts' },
  { value: '75k+', label: 'service cases analysed in one live dashboard' },
  { value: '9', label: 'gated steps in an HR onboarding flow, end to end' },
  { value: '6+', label: 'internal apps shipped and running in production' },
]

export const projects = [
  {
    id: '01',
    title: 'Sales & Leasing Analytics',
    kind: 'Dashboard',
    blurb:
      'A single analytics home for bookings, CRM cases, cost control and vendor ageing — with drill-down drawers on every chart and live SAP purchase data.',
    tags: ['React 19', 'TypeScript', 'Zustand', 'Motion'],
    tone: 'peach',
  },
  {
    id: '02',
    title: 'Commercial Leasing & Billing',
    kind: 'Platform',
    blurb:
      'Lease management for 90 commercial units: GST-compliant e-invoices, pool billing, per-lease alerts and a dozen finance reports.',
    tags: ['React', 'Node / Express', 'SQL Server'],
    tone: 'sage',
  },
  {
    id: '03',
    title: 'Careers & Onboarding',
    kind: 'Portal',
    blurb:
      'A five-role hiring portal where every referral moves through nine approval gates — from CV to onboarding-ready — with OTP candidate login.',
    tags: ['React 19', 'Flask', 'JWT'],
    tone: 'lilac',
  },
  {
    id: '04',
    title: 'NFA Review Workflow',
    kind: 'Portal',
    blurb:
      'Rewrote the backend of a four-page approval portal: synced mirror of 13k records, generated PDFs and covering indexes that ended the freezes.',
    tags: ['React', 'Express', 'PDF engine'],
    tone: 'sky',
  },
  {
    id: '05',
    title: 'SAP Purchase Sync',
    kind: 'Data service',
    blurb:
      'A Python service moving purchase-requisition data between SAP and SQL Server — rebuilt around upserts, running as a self-healing Windows service.',
    tags: ['Flask', 'Waitress', 'SAP', 'NSSM'],
    tone: 'clay',
  },
  {
    id: '06',
    title: 'Complaint MIS Gateway',
    kind: 'Gateway',
    blurb:
      'One login and one link in front of three companies’ complaint dashboards — data refreshes by dropping in a new Excel file, no rebuild.',
    tags: ['FastAPI', 'Python', 'Excel pipeline'],
    tone: 'butter',
  },
]

export const stackGroups = [
  { title: 'Interfaces', items: ['React 19', 'TypeScript', 'Vite', 'Tailwind', 'Motion', 'Zustand'] },
  { title: 'Services', items: ['Node / Express', 'Flask', 'FastAPI', 'JWT auth', 'PDF generation'] },
  { title: 'Data & infra', items: ['SQL Server', 'SAP OData / RFC', 'Windows services', 'Waitress', 'Git'] },
]
