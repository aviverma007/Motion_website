'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

/** Counts 0→100 while the page settles, then wipes away. */
export function Preloader({ label = 'LOADING', accent = '#e9c46a' }: { label?: string; accent?: string }) {
  const [n, setN] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      return
    }
    const t0 = performance.now()
    const dur = 1400
    let raf = 0
    const tick = () => {
      const p = Math.min((performance.now() - t0) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setDone(true), 250)
    }
    raf = requestAnimationFrame(tick)
    document.documentElement.style.overflow = 'hidden'
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (done) document.documentElement.style.overflow = ''
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#060608] text-white"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-neutral-500">{label}</span>
          <span className="mt-3 font-mono text-6xl tabular-nums" style={{ color: accent }}>
            {n}%
          </span>
          <span className="mt-6 h-px w-40 bg-white/10">
            <span className="block h-px" style={{ width: `${n}%`, background: accent }} />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
