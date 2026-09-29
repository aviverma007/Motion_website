// All site copy lives here — edit this file to change what the portfolio says.

// Demo content for a fictional design studio — swap for a real client's copy.
export const profile = {
  name: 'Atelier Nord',
  role: 'Brand & digital studio',
  org: 'Atelier Nord',
  email: 'anirudh.verma@smartworlddevelopers.com',
  location: 'Gurugram · remote',
}

export const stackMarquee = [
  'Identity', 'Websites', 'Art direction', 'Motion', '3D', 'Campaigns',
  'Editorial', 'E-commerce', 'Naming', 'Packaging', 'Photography', 'Type',
]

export const stats = [
  { value: '12', label: 'brands launched since 2021' },
  { value: '3', label: 'design awards, one of them twice' },
  { value: '40+', label: 'websites shipped, most still live' },
  { value: '1', label: 'studio dog, present at every review' },
]

export const projects = [ // fictional client work for the demo
  {
    id: '01',
    title: 'Kove — fashion house',
    kind: 'Identity + site',
    blurb:
      'A monochrome identity and an editorial site with a rotating lookbook — quiet type, big photography, nothing in the way.',
    tags: ['React 19', 'TypeScript', 'Zustand', 'Motion'],
    tone: 'peach',
  },
  {
    id: '02',
    title: 'Halma Hotels',
    kind: 'Website',
    blurb:
      'A booking-first site for a boutique hotel group: room stories, seasonal menus and a calm three-step reservation flow.',
    tags: ['React', 'Node / Express', 'SQL Server'],
    tone: 'sage',
  },
  {
    id: '03',
    title: 'Sable Skincare',
    kind: 'E-commerce',
    blurb:
      'Product pages that read like a magazine, with ingredient stories and a routine builder that suggests the next step.',
    tags: ['React 19', 'Flask', 'JWT'],
    tone: 'lilac',
  },
  {
    id: '04',
    title: 'Meridian Architects',
    kind: 'Portfolio',
    blurb:
      'A drawing-led portfolio with full-bleed plans, project timelines and a press section that updates itself.',
    tags: ['React', 'Express', 'PDF engine'],
    tone: 'sky',
  },
  {
    id: '05',
    title: 'Field Notes Coffee',
    kind: 'Brand + site',
    blurb:
      'Packaging, a subscription site and a small roastery journal — one warm, hand-drawn system across all three.',
    tags: ['Flask', 'Waitress', 'SAP', 'NSSM'],
    tone: 'clay',
  },
  {
    id: '06',
    title: 'Nord Festival 2026',
    kind: 'Campaign',
    blurb:
      'A three-week campaign site with a live programme, artist pages and ticketing that held up on opening morning.',
    tags: ['FastAPI', 'Python', 'Excel pipeline'],
    tone: 'butter',
  },
]

export const stackGroups = [
  { title: 'Strategy', items: ['Positioning', 'Naming', 'Tone of voice', 'Content plans'] },
  { title: 'Design', items: ['Identity', 'Art direction', 'Editorial layout', '3D & motion'] },
  { title: 'Build', items: ['React', 'Motion', 'three.js', 'Headless CMS', 'Performance'] },
]
