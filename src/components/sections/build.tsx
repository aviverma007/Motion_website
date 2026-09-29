'use client'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { SplineScene } from '@/components/ui/splite'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { capabilities } from '@/data'

const PastelScene = lazy(() => import('@/components/ui/pastel-scene'))

function useInView<T extends Element>(margin = '0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return { ref, inView }
}

const ease = [0.22, 1, 0.36, 1] as const

export function Build() {
  const reduced = useReducedMotion()
  const pastel = useInView<HTMLDivElement>('200px')

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

        {/* ── 1. Interactive 3D — Spline robot with spotlight (21st.dev: splite + spotlight + card) */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
        >
          <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-white/10">
            {/* the demo passed fill="white", but this Spotlight (ibelick) has no fill prop — the gradient classes set the colour */}
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={360} />
            <div className="flex h-full flex-col md:flex-row">
              <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                <p className="label mb-4">Interactive 3D</p>
                <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                  Scenes that look back.
                </h3>
                <p className="mt-4 text-neutral-300 max-w-lg">
                  Real-time 3D straight in the browser — Spline scenes, three.js worlds and shader effects
                  that follow the cursor and react to the visitor. Move your mouse.
                </p>
              </div>
              <div className="flex-1 relative min-h-[240px]">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ── 2. Pastel 3D world inside the scroll-tilting frame (21st.dev: container-scroll-animation) */}
      <div ref={pastel.ref} className="-mt-24 md:-mt-40">
        <ContainerScroll
          titleComponent={
            <>
              <p className="label mb-4">Motion-led sites</p>
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight">
                Websites that feel like <span className="font-serif italic font-normal">places.</span>
              </h3>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                A live three.js scene, not a screenshot — built in React with Motion for the choreography.
              </p>
            </>
          }
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#efdcd4]">
            <Suspense fallback={<div className="h-full w-full bg-[#efdcd4]" />}>
              <PastelScene active={pastel.inView} reducedMotion={!!reduced} quality="low" />
            </Suspense>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 md:p-6 flex justify-between text-[#2b2330] text-xs md:text-sm">
              <span className="font-serif italic text-base md:text-xl">Building the invisible.</span>
              <span className="font-mono uppercase tracking-widest text-[0.65rem]">three.js · R3F · Motion</span>
            </div>
          </div>
        </ContainerScroll>
      </div>

      {/* ── Capability grid */}
      <div className="mx-auto max-w-6xl -mt-20 md:-mt-40 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <motion.div
            key={c.title}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.05] transition-colors"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease, delay: i * 0.06 }}
          >
            <p className="font-mono text-[0.68rem] text-muted-foreground">0{i + 1}</p>
            <h4 className="mt-3 text-lg font-medium">{c.title}</h4>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
