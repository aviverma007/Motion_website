// All site copy lives here — edit this file to change what the portfolio says.

export const profile = {
  name: 'Anirudh Verma',
  role: 'Full-stack developer',
  org: 'Smart World Developers',
  location: 'Gurugram, India',
  github: 'https://github.com/aviverma007',
  email: 'anirudh.verma@smartworlddevelopers.com',
  intro:
    'I build the software a business runs on but rarely sees: analytics dashboards, approval portals, billing platforms and the data pipelines underneath them. Fast interfaces on top, sturdy services and clean data below.',
  howIWork: [
    'Start from the spreadsheet or SAP export people actually use, then design the screen around it.',
    'Ship a working version early, then refine it with the team that uses it every day.',
    'Keep the data honest: upserts over blind inserts, tie-outs against the source, logs you can read.',
    'Own it in production — Windows services, servers, deployments and the 2 a.m. fixes.',
  ],
}

export const stats = [
  { value: '6+', label: 'internal apps live in production' },
  { value: '75k+', label: 'service cases analysed in one live dashboard' },
  { value: '9', label: 'gated approval steps in a single HR flow' },
  { value: '4 MB', label: 'database size after rebuilding a 10 GB sync around upserts' },
]

export const capabilities = [
  {
    title: 'Interactive 3D',
    text: 'Real-time 3D scenes, Spline embeds, shader effects and product showcases that react to the visitor.',
  },
  {
    title: 'Motion-led marketing sites',
    text: 'Scroll-driven storytelling, cinematic hero sections and micro-interactions built with Motion.',
  },
  {
    title: 'Data dashboards',
    text: 'KPI strips, drill-down charts and filters over live SQL Server, SAP and Salesforce data.',
  },
  {
    title: 'Workflow portals',
    text: 'Role-based approval flows, OTP logins, PDF generation and audit trails for real teams.',
  },
  {
    title: 'Integrations & services',
    text: 'Python and Node services that sync SAP, vendor APIs and CRMs into one clean database.',
  },
  {
    title: 'Infra & deployment',
    text: 'Windows services, IIS/Nginx, portable runtimes, monitoring and runbooks — I run what I ship.',
  },
]

export const process = [
  {
    title: 'Discover',
    text: 'A short call, then I sit with the spreadsheet, export or approval chain the team actually uses today.',
    output: 'Output · one-page brief',
  },
  {
    title: 'Design',
    text: 'Screens sketched around real data, not placeholders. You see the flow before any code is written.',
    output: 'Output · clickable mockup',
  },
  {
    title: 'Build',
    text: 'A working version ships early — then weekly rounds with the people who will use it every day.',
    output: 'Output · staging link',
  },
  {
    title: 'Run',
    text: 'Deployed, monitored and documented. I stay on for the fixes and the next set of asks.',
    output: 'Output · live app + runbook',
  },
]

export const skills = {
  Frontend: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Motion', 'three.js', 'Zustand', 'shadcn/ui'],
  Backend: ['Node / Express', 'Flask', 'FastAPI', 'JWT auth', 'Waitress', 'PDF generation'],
  'Data & integration': ['SQL Server', 'SAP OData / RFC', 'Salesforce API', 'Excel pipelines', 'REST APIs'],
  Infra: ['Windows services', 'IIS / Nginx', 'NSSM', 'Git & GitHub', 'Vercel / Netlify'],
}

export const projects = [
  {
    id: '01',
    title: 'Sales & Leasing Analytics',
    kind: 'Dashboard',
    blurb:
      'A single analytics home for bookings, CRM cases, cost control and vendor ageing — drill-down drawers on every chart and live SAP purchase data.',
    tags: ['React 19', 'TypeScript', 'Zustand', 'Motion'],
  },
  {
    id: '02',
    title: 'Commercial Leasing & Billing',
    kind: 'Platform',
    blurb:
      'Lease management for 90 commercial units: GST-compliant e-invoices, pool billing, per-lease alerts and a dozen finance reports.',
    tags: ['React', 'Node / Express', 'SQL Server'],
  },
  {
    id: '03',
    title: 'Careers & Onboarding',
    kind: 'Portal',
    blurb:
      'A five-role hiring portal where every referral moves through nine approval gates — from CV to onboarding-ready — with OTP candidate login.',
    tags: ['React 19', 'Flask', 'JWT'],
  },
  {
    id: '04',
    title: 'NFA Review Workflow',
    kind: 'Portal',
    blurb:
      'Rewrote the backend of a four-page approval portal: a synced mirror of 13k records, generated PDFs and covering indexes that ended the freezes.',
    tags: ['React', 'Express', 'PDF engine'],
  },
  {
    id: '05',
    title: 'SAP Purchase Sync',
    kind: 'Data service',
    blurb:
      'A Python service moving purchase-requisition data between SAP and SQL Server — rebuilt around upserts, running as a self-healing Windows service.',
    tags: ['Flask', 'Waitress', 'SAP', 'NSSM'],
  },
  {
    id: '06',
    title: 'Complaint MIS Gateway',
    kind: 'Gateway',
    blurb:
      'One login and one link in front of three companies’ complaint dashboards — data refreshes by dropping in a new Excel file, no rebuild.',
    tags: ['FastAPI', 'Python', 'Excel pipeline'],
  },
]
