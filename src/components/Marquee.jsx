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
import { stackMarquee } from '../data'

/** Infinite strip that speeds up (and reverses) with scroll velocity. */
export default function Marquee({ baseVelocity = -2.2 }) {
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

  const items = [...stackMarquee, ...stackMarquee]
  return (
    <div className="marquee" aria-label="Technologies I use">
      <motion.div className="marquee-track" style={{ x }}>
        {items.map((t, i) => (
          <span key={i} className="marquee-item" aria-hidden={i >= stackMarquee.length}>
            {t}
            <i className="marquee-dot" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
