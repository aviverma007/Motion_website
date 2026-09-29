'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { profile, stats } from '@/data'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Spline only hears the pointer over its own canvas, so the robot stopped
 * looking the moment the cursor left it. This forwards every pointer move on
 * the page to the canvas, so the robot tracks the cursor site-wide.
 */
function useForwardPointer(box: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const canvas = box.current?.querySelector('canvas')
      if (!canvas || e.target === canvas) return
      canvas.dispatchEvent(
        new PointerEvent('pointermove', {
          clientX: e.clientX,
          clientY: e.clientY,
          pointerType: e.pointerType,
          bubbles: false,
        }),
      )
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [box])
}

export function Hero() {
  const splineBox = useRef<HTMLDivElement>(null)
  useForwardPointer(splineBox)

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-black">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={520} />

      {/* pointer-events-none: the canvas gets its moves from useForwardPointer, so text stays selectable */}
      <div
        ref={splineBox}
        className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-full -translate-y-1/2 md:w-[55%] opacity-60 md:opacity-100"
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/60 to-transparent md:via-transparent" />
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
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1 }}
          >
            {/* liquid-glass button (21st.dev). Its asChild can't take a link (the glass layers
                make Slot see several children), so navigation happens on click instead. */}
            <LiquidButton
              size="xl"
              className="rounded-full"
              onClick={() => document.querySelector('#build')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="flex items-center gap-2">
                See what I build <ArrowDown size={14} />
              </span>
            </LiquidButton>
            <LiquidButton
              size="xl"
              className="rounded-full"
              onClick={() => {
                window.location.href = `mailto:${profile.email}`
              }}
            >
              <span className="flex items-center gap-2">
                Say hello <Mail size={14} />
              </span>
            </LiquidButton>
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
