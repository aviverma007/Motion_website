'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'motion/react'
import { useState } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { ScrubCanvas } from '@/components/ui/scrub-canvas'
import { Preloader } from '@/components/ui/preloader'
import { useLenis } from '@/lib/use-lenis'
import { DemoBar } from '../shared/DemoBar'
import { VORTEX, IRIS, STARS } from './shaders'
import { brand, heroSteps, services, phases, packageIncludes } from './data'

const ease = [0.22, 1, 0.36, 1] as const
const gold = brand.accent

/* ---------- small pieces ---------- */

function Pill({ children, dot = true }: { children: React.ReactNode; dot?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-neutral-300">
      {dot && <i className="h-1.5 w-1.5 rounded-full" style={{ background: gold }} />}
      {children}
    </span>
  )
}

function Headline({ a, b, sub }: { a: string; b: string; sub: string }) {
  return (
    <div className="text-center">
      <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-medium tracking-[-0.045em] leading-[0.95]">
        <span className="block">{a}</span>
        <span className="block" style={{ color: gold }}>
          {b}
        </span>
      </h1>
      <p className="mx-auto mt-7 max-w-xl text-base md:text-lg text-neutral-300">{sub}</p>
      <div className="mt-10 flex flex-col items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-neutral-500 to-transparent" />
      </div>
    </div>
  )
}

/** One card that fades/slides in over a progress window, with a connector dot. */
function StepCard({
  progress,
  range,
  step,
  title,
  rows,
  pill,
  side,
}: {
  progress: MotionValue<number>
  range: [number, number]
  step: string
  title: string
  rows: string[][]
  pill: string[]
  side: 'left' | 'right'
}) {
  const [a, b] = range
  const win = (v: number) => {
    if (v <= a || v >= b) return 0
    if (v < a + 0.05) return (v - a) / 0.05
    if (v > b - 0.05) return (b - v) / 0.05
    return 1
  }
  const opacity = useTransform(progress, win)
  const y = useTransform(progress, (v) => (v < (a + b) / 2 ? 40 : -40) * (1 - win(v)))
  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute top-[12%] w-[min(380px,88vw)] rounded-2xl border border-white/10 bg-black/55 p-6 backdrop-blur-md ${
        side === 'right' ? 'right-[6%]' : 'left-[6%]'
      }`}
    >
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-neutral-400">{step}</p>
      <h3 className="mt-2 text-2xl md:text-3xl font-medium tracking-tight">{title}</h3>
      <dl className="mt-4 space-y-3">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-neutral-500">
              <i className="h-1 w-1 rounded-full" style={{ background: gold }} /> {k}
            </dt>
            <dd className="mt-1 text-sm text-neutral-200">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] py-1 pl-1 pr-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-neutral-300">
        <span className="rounded-full px-2 py-0.5 text-[0.6rem] font-semibold text-black" style={{ background: gold }}>
          {pill[0]}
        </span>
        {pill[1]}
      </p>
      <i
        className={`absolute top-1/2 hidden h-2 w-2 rounded-full md:block ${side === 'right' ? '-left-16' : '-right-16'}`}
        style={{ background: gold, boxShadow: `0 0 12px ${gold}` }}
      />
    </motion.div>
  )
}

/** A pinned chapter: tall scroll track, sticky viewport, shader scrubbed by progress. */
function Chapter({
  id,
  frag,
  vh,
  intro,
  cards,
  footer,
}: {
  id: string
  frag: string
  vh: number
  intro: { a: string; b: string; sub: string; pill: string }
  cards: { step: string; title: string; rows: string[][]; pill: string[] }[]
  footer: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const introOpacity = useTransform(scrollYProgress, (v) => Math.max(0, 1 - v / 0.12))
  const introY = useTransform(scrollYProgress, (v) => -60 * Math.min(1, v / 0.12))
  const n = cards.length
  // cards share the middle 70% of the track, in order
  const ranges = cards.map((_, i): [number, number] => [0.15 + (i / n) * 0.72, 0.15 + ((i + 1) / n) * 0.72])

  return (
    <section id={id} ref={ref} className="relative" style={{ height: `${vh}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <ScrubCanvas frag={frag} progress={scrollYProgress} className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060608]/70 via-transparent to-[#060608]" />
        <motion.div style={{ opacity: introOpacity, y: introY }} className="absolute inset-0 flex flex-col items-center justify-center px-5">
          <div className="mb-8">
            <Pill>{intro.pill}</Pill>
          </div>
          <Headline a={intro.a} b={intro.b} sub={intro.sub} />
        </motion.div>
        {cards.map((c, i) => (
          <StepCard key={c.title} progress={scrollYProgress} range={ranges[i]} side={i % 2 ? 'left' : 'right'} {...c} />
        ))}
        <p className="absolute bottom-16 right-5 max-w-[60vw] text-right font-mono text-[0.62rem] uppercase tracking-[0.25em] text-neutral-500 md:bottom-6 md:right-6 md:max-w-none">{footer}</p>
      </div>
    </section>
  )
}

/* ---------- sections ---------- */

function Nav() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > 30))
  const links = ['Services', 'Process', 'Package', 'Contact']
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${solid ? 'bg-[#060608]/70 backdrop-blur-md border-b border-white/5' : ''}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <a href="#home" className="flex items-center gap-2 font-mono text-sm tracking-[0.3em]">
          <span className="grid h-6 w-6 place-items-center rounded-sm text-[0.6rem] font-bold text-black" style={{ background: gold }}>
            {brand.mark[0]}
          </span>
          {brand.mark}
        </a>
        <nav className="hidden gap-8 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-neutral-400 md:flex">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <a href={`mailto:${brand.email}`} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-black hover:bg-neutral-200">
          Start a project <ArrowUpRight size={12} />
        </a>
      </div>
    </header>
  )
}

function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
      <Pill>What I do</Pill>
      <h2 className="mt-6 max-w-3xl text-4xl md:text-6xl font-medium tracking-[-0.04em] leading-[0.98]">
        Design, motion and build — <span style={{ color: gold }}>one person,</span> start to finish.
      </h2>
      <p className="mt-5 max-w-xl text-neutral-400">
        {brand.name} is a one-developer studio. You talk to the person who designs and builds your site, and
        the site ships in weeks, not months.
      </p>
      <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease, delay: i * 0.06 }}
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: gold }}
            />
            <p className="font-mono text-[0.62rem] text-neutral-500">0{i + 1}</p>
            <h3 className="mt-4 text-xl font-medium">{s.title}</h3>
            <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{s.text}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-neutral-300">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
        <div className="flex flex-col justify-between rounded-2xl p-7" style={{ background: gold }}>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-black/60">Not sure what you need?</p>
          <div>
            <p className="text-2xl font-medium leading-tight text-black">Send a one-line brief. I’ll reply with a plan and a quote in a day.</p>
            <a href={`mailto:${brand.email}`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm text-white">
              Email {brand.mark.toLowerCase()} <Mail size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Package() {
  return (
    <section id="package" className="relative border-y border-white/5 bg-[#08080b]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[1.2fr_1fr] md:px-10 md:py-36">
        <div>
          <div className="flex flex-wrap gap-2">
            <Pill>The launch package</Pill>
            <Pill dot={false}>For founders & small teams</Pill>
          </div>
          <h2 className="mt-6 text-4xl md:text-6xl font-medium tracking-[-0.04em] leading-[0.98]">
            One site, <span style={{ color: gold }}>done properly.</span>
          </h2>
          <p className="mt-5 max-w-xl text-neutral-400">
            Everything a small business needs to look established online — designed, animated, built and
            launched by one person who answers the phone.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-neutral-200">
            {packageIncludes.map((s) => (
              <li key={s} className="flex items-start gap-3">
                <i className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: gold }} />
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-6 max-w-md">
            {[
              ['2–3', 'weeks'],
              ['1', 'point of contact'],
              ['30', 'days support'],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl font-medium">{v}</div>
                <div className="text-xs text-neutral-500">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <motion.div
          className="self-center rounded-3xl border p-8"
          style={{ borderColor: `${gold}55`, background: 'linear-gradient(180deg, rgba(233,196,106,0.08), rgba(0,0,0,0))' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em]" style={{ color: gold }}>
            Fixed scope · fixed price
          </p>
          <p className="mt-4 text-4xl font-medium">Ask for a quote</p>
          <p className="mt-1 text-sm text-neutral-400">Priced per project after a short call. No retainers, no surprises.</p>
          <ul className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm text-neutral-300">
            <li>✓ Reply within one working day</li>
            <li>✓ Design preview before you commit</li>
            <li>✓ You own the code and the domain</li>
          </ul>
          <a href={`mailto:${brand.email}`} className="mt-8 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:bg-neutral-200">
            Start a project <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  return (
    <section id="contact" ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <ScrubCanvas frag={STARS} progress={scrollYProgress} className="absolute inset-0" scale={0.6} />
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 py-32 md:px-10">
        <div>
          <Pill>Chapter III · Let’s build</Pill>
        </div>
        <h2 className="mt-8 text-6xl md:text-8xl lg:text-[9rem] font-medium tracking-[-0.05em] leading-[0.92]">
          Build with <span style={{ color: gold }}>{brand.mark[0] + brand.mark.slice(1).toLowerCase()}.</span>
        </h2>
        <p className="mt-8 max-w-xl text-lg text-neutral-300">
          Bring an idea, leave with a website that works — designed, built and delivered in weeks. Fast,
          beautiful, and unmistakably yours.
        </p>
        <ul className="mt-10 space-y-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-neutral-400">
          <li className="flex items-center gap-3">
            <i className="h-1.5 w-1.5 rounded-full" style={{ background: gold }} /> {brand.email}
          </li>
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={`mailto:${brand.email}`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-neutral-200">
            Start a project <ArrowUpRight size={14} />
          </a>
        </div>
        <footer className="mt-32 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-neutral-500">
          <span>
            {brand.name} · {new Date().getFullYear()}
          </span>
          <span>Demo site · fictional studio brand</span>
        </footer>
      </div>
    </section>
  )
}

export function StudioDemo() {
  useLenis()
  return (
    <div className="bg-[#060608] text-white" style={{ fontFamily: 'Geist, Inter, system-ui, sans-serif' }}>
      <Preloader label={`${brand.name} — loading`} accent={gold} />
      <Nav />
      <Chapter
        id="home"
        frag={VORTEX}
        vh={520}
        intro={{
          pill: `${brand.tagline} · delivered in weeks`,
          a: 'Websites that',
          b: 'move.',
          sub: 'Need a site that looks like it cost a fortune, on a small-business timeline? I design, animate and build it — start to finish — and hand it over live.',
        }}
        cards={heroSteps}
        footer={brand.availability}
      />
      <Services />
      <Chapter
        id="process"
        frag={IRIS}
        vh={420}
        intro={{
          pill: 'Chapter II · The process',
          a: 'From idea',
          b: 'to launch.',
          sub: 'Every project starts with listening. Then three short phases, each reviewed with you, until the site is live on your domain.',
        }}
        cards={phases.map((p) => ({ step: p.phase, title: p.title, rows: p.rows, pill: p.pill }))}
        footer="Brand · Design · Launch"
      />
      <Package />
      <Contact />
      <DemoBar />
    </div>
  )
}
