'use client'
import { motion } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { ScratchReveal } from '@/components/ui/scratch-reveal'
import { DemoBar } from '../shared/DemoBar'

const ease = [0.22, 1, 0.36, 1] as const

const notes = [
  ['Brush', 'Procedural, 48-point outline, five noise frequencies, torn notches, Catmull-Rom smoothed'],
  ['Trail', 'Each stamp lives 2.7 s and physically shrinks — no opacity fade, no ghosting'],
  ['Stroke', 'Stamps every 9% of the brush radius along an eased follower, stretched with velocity'],
  ['Mask', 'Rebuilt every frame: draw image 1, destination-out the stamps, repaint dry-brush holes'],
]

export function ScratchDemo() {
  return (
    <div className="bg-[#0a0a0a] text-white">
      <ScratchReveal top="/showcase/scratch-top.jpg" under="/showcase/scratch-under.jpg">
        <div className="flex h-full flex-col justify-between p-6 md:p-10">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-neutral-700 mix-blend-difference">
              Scratch reveal
            </span>
            <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-neutral-700 backdrop-blur">
              Demo
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[0.98] text-neutral-900 mix-blend-multiply">
              Move your cursor.
              <br />
              <span className="font-serif italic font-normal">Scratch the surface.</span>
            </h1>
            <p className="mt-4 max-w-md text-sm md:text-base text-neutral-600">
              Drag anywhere across the hero to wipe the picture away with a dry brush and see what’s underneath.
              Stop, and the scratch heals in a few seconds.
            </p>
            <a
              href="#how"
              className="pointer-events-auto mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm text-white hover:bg-black"
            >
              How it works <ArrowDown size={14} />
            </a>
          </motion.div>
        </div>
      </ScratchReveal>

      <section id="how" className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
        <p className="label mb-5">Under the hood</p>
        <h2 className="max-w-3xl text-3xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1]">
          One canvas, no DOM per stroke, <span className="font-serif italic font-normal">60 fps.</span>
        </h2>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {notes.map(([k, v], i) => (
            <motion.div
              key={k}
              className="card-shadow rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: i * 0.06 }}
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{k}</p>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{v}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          Works with touch too — drag on a phone. The same component takes any two aligned images, so it can front a
          before/after, a product reveal, or a “day to night” hero.
        </p>
        <footer className="mt-16 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground">
          <span>Demo by Anirudh Verma · React + Canvas</span>
          <a href="/" className="inline-flex items-center gap-1 hover:text-foreground">
            Portfolio <ArrowUpRight size={12} />
          </a>
        </footer>
      </section>
      <DemoBar />
    </div>
  )
}
