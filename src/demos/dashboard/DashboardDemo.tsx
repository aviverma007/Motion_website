'use client'
import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowDownRight, ArrowUpRight, Search } from 'lucide-react'
import { DemoBar } from '../shared/DemoBar'

/* ------------------------------------------------------------------ */
/* Sample data — deterministic, invented, for the demo only            */
/* ------------------------------------------------------------------ */
const projects = ['Orchard', 'Gems Plaza', 'Verdant Heights'] as const
const series = { Orchard: '#2a78d6', 'Gems Plaza': '#eb6834', 'Verdant Heights': '#1baf7a' } as const
const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']

function seeded(seed: number) {
  let s = seed
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280)
}
const rnd = seeded(7)
const bookings = projects.map((p) => ({
  project: p,
  values: months.map((_, i) => Math.round(18 + i * 3 + rnd() * 14 + (p === 'Gems Plaza' ? 6 : 0))),
}))
const leads = [
  { source: 'Website', count: 412, conv: 6.1 },
  { source: 'Channel partners', count: 298, conv: 11.4 },
  { source: 'Walk-ins', count: 121, conv: 17.2 },
  { source: 'Referrals', count: 88, conv: 21.5 },
  { source: 'Portals', count: 264, conv: 4.3 },
]
const units = Array.from({ length: 14 }, (_, i) => ({
  unit: `T${1 + (i % 3)}-${(4 + i) * 100 + (i % 7) + 1}`,
  project: projects[i % 3],
  type: ['3 BHK', '3 BHK + S', '4 BHK'][i % 3],
  status: ['Booked', 'Available', 'Hold', 'Booked'][i % 4],
  value: 2.1 + (i % 5) * 0.35,
}))

/* ------------------------------------------------------------------ */
/* Charts — plain SVG, thin marks, hover tooltips                       */
/* ------------------------------------------------------------------ */
function LineChart({ range }: { range: number }) {
  const w = 640
  const h = 220
  const pad = { l: 36, r: 16, t: 16, b: 28 }
  const xs = months.slice(-range)
  const rows = bookings.map((b) => ({ ...b, values: b.values.slice(-range) }))
  const max = Math.max(...rows.flatMap((r) => r.values)) * 1.1
  const x = (i: number) => pad.l + (i / (xs.length - 1)) * (w - pad.l - pad.r)
  const y = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b)
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" onMouseLeave={() => setHover(null)}>
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <g key={f}>
            <line x1={pad.l} x2={w - pad.r} y1={y(max * f)} y2={y(max * f)} stroke="#e7e5e0" />
            <text x={pad.l - 8} y={y(max * f) + 4} textAnchor="end" fontSize="10" fill="#7a7871">
              {Math.round(max * f)}
            </text>
          </g>
        ))}
        {xs.map((m, i) => (
          <text key={m} x={x(i)} y={h - 8} textAnchor="middle" fontSize="11" fill="#52514e">
            {m}
          </text>
        ))}
        {rows.map((r) => (
          <g key={r.project}>
            <path
              d={r.values.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ')}
              fill="none"
              stroke={series[r.project]}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {r.values.map((v, i) => (
              <circle key={i} cx={x(i)} cy={y(v)} r={hover === i ? 5 : 3.5} fill={series[r.project]} stroke="#fcfcfb" strokeWidth="2" />
            ))}
            <text x={x(r.values.length - 1) + 6} y={y(r.values[r.values.length - 1]) + 4} fontSize="11" fill="#0b0b0b">
              {r.project}
            </text>
          </g>
        ))}
        {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={h - pad.b} stroke="#0b0b0b" strokeOpacity="0.25" />}
        {xs.map((_, i) => (
          <rect
            key={i}
            x={x(i) - (w - pad.l - pad.r) / (xs.length - 1) / 2}
            y={0}
            width={(w - pad.l - pad.r) / (xs.length - 1)}
            height={h}
            fill="transparent"
            onMouseEnter={() => setHover(i)}
          />
        ))}
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute top-2 rounded-lg border border-[#e7e5e0] bg-white px-3 py-2 text-xs shadow-md"
          style={{ left: `${(x(hover) / w) * 100}%`, transform: hover > xs.length / 2 ? 'translateX(-110%)' : 'translateX(10px)' }}
        >
          <div className="mb-1 font-medium">{xs[hover]} 2026</div>
          {rows.map((r) => (
            <div key={r.project} className="flex items-center gap-2">
              <i className="h-2 w-2 rounded-full" style={{ background: series[r.project] }} />
              <span className="text-[#52514e]">{r.project}</span>
              <span className="ml-auto font-medium tabular-nums">{r.values[hover]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function BarChart() {
  const max = Math.max(...leads.map((l) => l.count))
  const [hover, setHover] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {leads.map((l, i) => (
        <div key={l.source} className="grid grid-cols-[9rem_1fr_3rem] items-center gap-3 text-sm" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
          <span className="truncate text-[#52514e]">{l.source}</span>
          <div className="h-3 rounded-r-[4px] bg-[#f0efeb]">
            <motion.div
              className="h-full rounded-r-[4px]"
              style={{ background: '#2a78d6', opacity: hover === null || hover === i ? 1 : 0.45 }}
              initial={{ width: 0 }}
              whileInView={{ width: `${(l.count / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            />
          </div>
          <span className="text-right tabular-nums">{hover === i ? `${l.conv}%` : l.count}</span>
        </div>
      ))}
      <p className="text-xs text-[#7a7871]">Hover a bar to see conversion rate.</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */

const kpis = [
  { label: 'Bookings (Sep)', value: '212', delta: '+8.4%', up: true },
  { label: 'Collections (Sep)', value: '₹48.6 Cr', delta: '+3.1%', up: true },
  { label: 'Leads in pipeline', value: '1,183', delta: '−2.2%', up: false },
  { label: 'Inventory left', value: '37%', delta: '−4 pts', up: true },
]

export function DashboardDemo() {
  const [range, setRange] = useState(6)
  const [project, setProject] = useState<'All' | (typeof projects)[number]>('All')
  const [q, setQ] = useState('')
  const rows = useMemo(
    () => units.filter((u) => (project === 'All' || u.project === project) && u.unit.toLowerCase().includes(q.toLowerCase())),
    [project, q],
  )

  return (
    <div className="min-h-screen bg-[#f6f5f2] text-[#0b0b0b] [color-scheme:light]">
      <header className="sticky top-0 z-40 border-b border-[#e7e5e0] bg-[#fcfcfb]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-[#0b0b0b] text-[10px] font-bold text-white">SD</span>
            <span className="text-sm font-medium">Sales Desk</span>
            <span className="rounded-full bg-[#eef3fb] px-2 py-0.5 text-[10px] font-medium text-[#2a78d6]">DEMO DATA</span>
          </div>
          <nav className="hidden gap-6 text-sm text-[#52514e] md:flex">
            {['Overview', 'Bookings', 'Leads', 'Inventory', 'Collections'].map((n, i) => (
              <span key={n} className={i === 0 ? 'text-[#0b0b0b] font-medium' : ''}>
                {n}
              </span>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 md:px-8">
        {/* filter row */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg border border-[#e7e5e0] bg-white p-0.5 text-xs">
            {[3, 6].map((r) => (
              <button key={r} onClick={() => setRange(r)} className={`rounded-md px-3 py-1.5 ${range === r ? 'bg-[#0b0b0b] text-white' : 'text-[#52514e]'}`}>
                Last {r} months
              </button>
            ))}
          </div>
          <div className="flex rounded-lg border border-[#e7e5e0] bg-white p-0.5 text-xs">
            {(['All', ...projects] as const).map((p) => (
              <button key={p} onClick={() => setProject(p)} className={`rounded-md px-3 py-1.5 ${project === p ? 'bg-[#0b0b0b] text-white' : 'text-[#52514e]'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* KPI tiles */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              className="rounded-xl border border-[#e7e5e0] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <div className="text-xs text-[#52514e]">{k.label}</div>
              <div className="mt-2 text-2xl font-semibold tabular-nums tracking-tight">{k.value}</div>
              <div className={`mt-1 inline-flex items-center gap-1 text-xs ${k.up ? 'text-[#008300]' : 'text-[#b3261e]'}`}>
                {k.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {k.delta} vs Aug
              </div>
            </motion.div>
          ))}
        </div>

        {/* charts */}
        <div className="mt-4 grid gap-3 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-xl border border-[#e7e5e0] bg-white p-5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-medium">Bookings by project</h2>
              <span className="text-xs text-[#7a7871]">units / month</span>
            </div>
            <div className="mt-3 flex gap-4 text-xs text-[#52514e]">
              {projects.map((p) => (
                <span key={p} className="flex items-center gap-1.5">
                  <i className="h-2 w-2 rounded-full" style={{ background: series[p] }} /> {p}
                </span>
              ))}
            </div>
            <div className="mt-3">
              <LineChart range={range} />
            </div>
          </section>
          <section className="rounded-xl border border-[#e7e5e0] bg-white p-5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-medium">Leads by source</h2>
              <span className="text-xs text-[#7a7871]">Sep 2026</span>
            </div>
            <div className="mt-5">
              <BarChart />
            </div>
          </section>
        </div>

        {/* table */}
        <section className="mt-4 rounded-xl border border-[#e7e5e0] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e7e5e0] px-5 py-3">
            <h2 className="text-sm font-medium">Inventory</h2>
            <label className="flex items-center gap-2 rounded-md border border-[#e7e5e0] px-2 py-1 text-xs text-[#52514e]">
              <Search size={12} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search unit" className="w-28 bg-transparent outline-none placeholder:text-[#a3a29a]" />
            </label>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-[#52514e]">
                <tr className="border-b border-[#e7e5e0]">
                  {['Unit', 'Project', 'Type', 'Status', 'Value (₹ Cr)'].map((h) => (
                    <th key={h} className="px-5 py-2 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((u) => (
                  <tr key={u.unit} className="border-b border-[#f0efeb] last:border-0 hover:bg-[#fafaf8]">
                    <td className="px-5 py-2.5 font-mono text-xs">{u.unit}</td>
                    <td className="px-5 py-2.5">
                      <span className="flex items-center gap-1.5">
                        <i className="h-2 w-2 rounded-full" style={{ background: series[u.project] }} /> {u.project}
                      </span>
                    </td>
                    <td className="px-5 py-2.5">{u.type}</td>
                    <td className="px-5 py-2.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          u.status === 'Booked' ? 'bg-[#e8f4e8] text-[#1f6b1f]' : u.status === 'Hold' ? 'bg-[#fff4e0] text-[#8a5a00]' : 'bg-[#eef3fb] text-[#1f5aa6]'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-2.5 tabular-nums">{u.value.toFixed(2)}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-sm text-[#7a7871]">
                      No units match.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-8 text-xs text-[#7a7871]">All numbers are invented sample data for this demo. Demo by Anirudh Verma · React + Motion.</p>
      </main>
      <DemoBar />
    </div>
  )
}
