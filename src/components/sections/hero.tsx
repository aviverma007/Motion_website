'use client'
import { motion } from 'motion/react'
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'
import { profile, stats } from '@/data'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-black">
      {/* cursor spotlight follows the pointer across the whole hero (ibelick/spotlight) */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={520} />

      {/* Spline robot — full height on the right, behind the copy on small screens */}
      <div className="absolute right-0 top-1/2 h-[500px] w-full -translate-y-1/2 md:w-[55%] opacity-60 md:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent md:via-transparent z-10 pointer-events-none" />
        <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
      </div>

      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-between px-5 pb-10 pt-28 md:px-10 md:pt-36">
        <div className="max-w-2xl">
          <motion.p
            className="label mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            {profile.role} · {profile.location}
          </motion.p>
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-semibold tracking-[-0.05em] leading-[0.95]">
            {['Anirudh', 'Verma.'].map((w, i) => (
              <span key={w} className="block overflow-hidden">
                <motion.span
                  className={`block bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 ${
                    i === 1 ? 'font-serif italic font-normal' : ''
                  }`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease, delay: 0.35 + i * 0.12 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="mt-8 max-w-lg text-base md:text-lg text-neutral-300 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.8 }}
          >
            {profile.intro}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1 }}
          >
            <a
              href="#build"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-white transition-colors"
            >
              See what I build <ArrowDown size={14} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm hover:bg-white/5 transition-colors"
            >
              Say hello <Mail size={14} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>

        <motion.dl
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-6 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.2 }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-serif text-3xl md:text-4xl leading-none">{s.value}</dt>
              <dd className="mt-2 text-xs md:text-sm text-muted-foreground leading-snug">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
