'use client'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Trees, Dumbbell, Waves, ShieldCheck, Car, Sun } from 'lucide-react'
import { DemoBar } from '../shared/DemoBar'

/* Fictional project for the demo — every name, number and price is invented. */
const ease = [0.22, 1, 0.36, 1] as const
const gold = '#d4b47a'

const amenities = [
  { icon: Trees, title: '4-acre central park', text: 'Native planting, a jogging loop and a quiet reading lawn.' },
  { icon: Waves, title: 'Temperature-controlled pool', text: 'Open year-round, with a shallow lane for children.' },
  { icon: Dumbbell, title: 'Two-storey clubhouse', text: 'Gym, yoga deck, a screening room and a café on the ground floor.' },
  { icon: ShieldCheck, title: 'Three-tier security', text: 'Gated entry, tower lobbies and app-based visitor passes.' },
  { icon: Car, title: 'Two basements of parking', text: 'EV charging in every fourth bay, visitor parking above ground.' },
  { icon: Sun, title: 'Solar-assisted commons', text: 'Rooftop panels power the lifts, lobbies and street lighting.' },
]

const plans = [
  { type: '3 BHK', area: '1,845 sq ft', price: '₹2.4 Cr onwards', facing: 'Park facing', tone: '#1d2a26' },
  { type: '3 BHK + study', area: '2,120 sq ft', price: '₹2.9 Cr onwards', facing: 'Pool facing', tone: '#26241d' },
  { type: '4 BHK', area: '2,760 sq ft', price: '₹3.8 Cr onwards', facing: 'Corner units', tone: '#1d2026' },
]

function Words({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.25em]" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease, delay: delay + i * 0.07 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* generated "twilight towers" backdrop — CSS only, no stock photo */}
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y, scale }}>
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_100%,#3a2a1c_0%,#17130f_45%,#0a0908_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-[repeating-linear-gradient(90deg,transparent_0_54px,rgba(212,180,122,0.12)_54px_56px)] opacity-70 [mask-image:linear-gradient(to_top,black,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-[52%] bg-[repeating-linear-gradient(0deg,transparent_0_34px,rgba(212,180,122,0.10)_34px_36px)] opacity-60 [mask-image:linear-gradient(to_top,black,transparent)]" />
        <div className="absolute left-1/2 top-[18%] h-[38vmin] w-[38vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#f1dcae_0%,rgba(241,220,174,0.35)_35%,transparent_70%)] blur-2xl" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-transparent to-[#0a0908]/60" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-16 md:px-10 md:pb-24">
        <motion.p
          className="label mb-6"
          style={{ color: gold }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Sector 89, Gurugram · Launching winter 2026
        </motion.p>
        <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-medium tracking-[-0.045em] leading-[0.95] text-[#f4ecdd]">
          <Words text="Verdant" delay={0.3} />
          <br />
          <Words text="Heights." className="font-serif italic font-normal" delay={0.5} />
        </h1>
        <motion.div
          className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease }}
        >
          <p className="max-w-md text-neutral-300 text-base md:text-lg">
            Three towers around a four-acre park — 3 and 4 BHK residences with a clubhouse the size of a
            small hotel.
          </p>
          <div className="flex gap-3">
            <a
              href="#enquire"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[#0a0908]"
              style={{ background: gold }}
            >
              Request the brochure <ArrowRight size={14} />
            </a>
            <a href="#plans" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm hover:bg-white/5">
              Floor plans
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Numbers() {
  const items = [
    ['3', 'towers'],
    ['G+32', 'floors'],
    ['4 ac', 'central park'],
    ['78%', 'open space'],
  ]
  return (
    <div className="border-y border-white/10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x">
        {items.map(([v, l], i) => (
          <motion.div
            key={l}
            className="px-5 py-8 md:px-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.7, ease }}
          >
            <div className="font-serif text-4xl md:text-5xl" style={{ color: gold }}>
              {v}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{l}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Amenities() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
      <p className="label mb-5">Amenities</p>
      <h2 className="max-w-2xl text-4xl md:text-6xl font-medium tracking-[-0.04em] leading-[0.98]">
        A day that <span className="font-serif italic font-normal">never needs</span> the car.
      </h2>
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((a, i) => (
          <motion.div
            key={a.title}
            className="card-shadow rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.05] transition-colors"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.06, duration: 0.7, ease }}
            whileHover={{ y: -6 }}
          >
            <a.icon size={20} style={{ color: gold }} />
            <h3 className="mt-5 text-lg font-medium">{a.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Plans() {
  const [active, setActive] = useState(0)
  const plan = plans[active]
  return (
    <section id="plans" className="border-t border-white/10 bg-[#0d0c0a]">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1fr_1.1fr] md:px-10 md:py-28">
        <div>
          <p className="label mb-5">Residences</p>
          <h2 className="text-4xl md:text-6xl font-medium tracking-[-0.04em] leading-[0.98]">
            Pick a <span className="font-serif italic font-normal">plan.</span>
          </h2>
          <div className="mt-10 flex flex-col divide-y divide-white/10 border-y border-white/10">
            {plans.map((p, i) => (
              <button
                key={p.type}
                onClick={() => setActive(i)}
                className={`flex items-center justify-between py-5 text-left transition-colors ${
                  i === active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-xl md:text-2xl">{p.type}</span>
                <span className="font-mono text-xs uppercase tracking-widest">{p.area}</span>
              </button>
            ))}
          </div>
        </div>
        <motion.div
          key={plan.type}
          className="card-shadow relative overflow-hidden rounded-3xl border border-white/10 p-8"
          style={{ background: plan.tone }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease }}
        >
          {/* schematic floor-plan lines */}
          <svg viewBox="0 0 400 260" className="h-56 w-full md:h-72" fill="none" stroke={gold} strokeOpacity="0.55" strokeWidth="1.5">
            <rect x="20" y="20" width="360" height="220" rx="4" />
            <path d="M20 130h150M170 20v220M170 130h210M280 130v110M280 20v60M230 60h150" />
            <path d="M60 130a30 30 0 0 1 30-30" strokeDasharray="3 3" />
            <path d="M280 200a30 30 0 0 1 30 30" strokeDasharray="3 3" />
          </svg>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-serif text-3xl">{plan.type}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {plan.area} · {plan.facing}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg" style={{ color: gold }}>
                {plan.price}
              </div>
              <a href="#enquire" className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                Get the price sheet <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Enquire() {
  const [sent, setSent] = useState(false)
  return (
    <section id="enquire" className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
      <div className="card-shadow grid gap-10 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:grid-cols-2 md:p-12">
        <div>
          <p className="label mb-5">Enquire</p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.04em] leading-[1]">
            Site visits every weekend, <span className="font-serif italic font-normal">by appointment.</span>
          </h2>
          <p className="mt-5 text-sm text-muted-foreground">
            This is a demo form — nothing is sent. In a real project it would post to the sales CRM.
          </p>
        </div>
        {sent ? (
          <div className="flex items-center justify-center rounded-2xl border border-white/10 p-10 text-center">
            <p className="text-lg">
              Thanks — the team would call you back within a day.
              <br />
              <span className="text-sm text-muted-foreground">(demo: no data was sent)</span>
            </p>
          </div>
        ) : (
          <form
            className="grid gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            {['Full name', 'Phone', 'Email'].map((f) => (
              <input
                key={f}
                required
                placeholder={f}
                className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-white/30"
              />
            ))}
            <select className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-neutral-300 outline-none">
              <option>3 BHK</option>
              <option>3 BHK + study</option>
              <option>4 BHK</option>
            </select>
            <button className="mt-2 rounded-xl px-5 py-3 text-sm font-medium text-[#0a0908]" style={{ background: gold }}>
              Book a site visit
            </button>
          </form>
        )}
      </div>
      <footer className="mt-12 flex flex-wrap justify-between gap-3 text-xs text-muted-foreground">
        <span>Verdant Heights is a fictional project created for this demo.</span>
        <span>Demo by Anirudh Verma · React + Motion</span>
      </footer>
    </section>
  )
}

export function EstateDemo() {
  return (
    <div className="bg-[#0a0908] text-[#f4ecdd]">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-10">
        <span className="font-serif text-xl italic">Verdant Heights</span>
        <a href="#enquire" className="rounded-full border border-white/20 px-4 py-2 text-xs hover:bg-white/5">
          Enquire
        </a>
      </header>
      <Hero />
      <Numbers />
      <Amenities />
      <Plans />
      <Enquire />
      <DemoBar />
    </div>
  )
}
