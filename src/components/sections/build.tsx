'use client'
import { motion } from 'motion/react'
import { SqueezeCarousel, type SqueezeSlide } from '@/components/ui/carousel-squeeze'
import { capabilities } from '@/data'

const ease = [0.22, 1, 0.36, 1] as const

const mark = (text: string) => (
  <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white">{text}</span>
)

// Panels: real frames from this site where one exists, gradients for the rest.
const art: Array<Pick<SqueezeSlide, 'image' | 'imageAlt' | 'background'>> = [
  { image: '/showcase/robot.jpg', imageAlt: 'A black humanoid robot rendered in real time' },
  { image: '/showcase/pastel.jpg', imageAlt: 'A pastel 3D room with arches, stairs and a reflective floor' },
  {
    background:
      'radial-gradient(120% 90% at 20% 10%, #1f2937 0%, #0b0f19 55%), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 64px), repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 64px)',
  },
  { background: 'linear-gradient(135deg, #2b2330 0%, #0f0f11 45%, #3b2a2f 100%)' },
  { image: '/showcase/ink.jpg', imageAlt: 'Black ink plumes swirling in white water' },
  { background: 'radial-gradient(80% 80% at 80% 90%, #14532d 0%, #0a0f0c 60%), linear-gradient(0deg, #09090b, #111827)' },
]

const slides: SqueezeSlide[] = capabilities.map((c, i) => ({
  id: c.title,
  title: `${c.title}.`,
  description: c.text,
  overlay: mark(c.title),
  action: i === 2 || i === 3 ? 'See the work' : 'Start a project',
  href: i === 2 || i === 3 ? '#work' : '#contact',
  ...art[i],
}))

export function Build() {
  return (
    <section id="build" className="relative px-5 md:px-10 pt-24 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-5">(01) What I can build</p>
        <motion.h2
          className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[0.98] max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          Websites that <span className="font-serif italic font-normal">move,</span> and the systems behind them.
        </motion.h2>
        <p className="mt-5 max-w-xl text-muted-foreground">
          Six kinds of work, one slide each. Hover a panel to widen it, click to bring it forward, or use
          the arrows — the copy underneath follows.
        </p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
        >
          <SqueezeCarousel
            slides={slides}
            label="What I can build"
            height="clamp(140px, 36cqi, 420px)"
            radius={14}
            duration={800}
            autoplay
            interval={5000}
            panelClassName="card-shadow"
          />
        </motion.div>
      </div>
    </section>
  )
}
