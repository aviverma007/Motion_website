'use client'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
  wrap,
} from 'motion/react'

const items = [
  'React 19', 'TypeScript', 'Motion', 'Tailwind', 'three.js', 'Spline',
  'Node / Express', 'Flask', 'FastAPI', 'SQL Server', 'SAP OData', 'Salesforce API', 'Windows services',
]

/** Infinite strip that speeds up (and reverses) with scroll velocity. */
export function Marquee({ baseVelocity = -1.8 }: { baseVelocity?: number }) {
  const reduced = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    let move = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    move += direction.current * move * f
    baseX.set(baseX.get() + move)
  })

  const strip = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.02] py-5" aria-label="Technologies I use">
      <motion.div className="flex w-max" style={{ x }}>
        {strip.map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-8 pr-8 font-serif italic text-2xl md:text-4xl whitespace-nowrap text-neutral-300"
          >
            {t}
            <i className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
