import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { profile } from '../data'
import MagneticButton from './MagneticButton'

const HeroScene = lazy(() => import('./HeroScene'))

const ease = [0.22, 1, 0.36, 1]

function Words({ text, className, delay = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span className="word-mask" key={i} aria-hidden="true">
          <motion.span
            className="word"
            initial={{ y: '110%', rotate: 4 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.08 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function useInView(ref) {
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.02 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return inView
}

export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref)
  const [quality] = useState(() =>
    typeof window !== 'undefined' && (window.innerWidth < 768 || (navigator.hardwareConcurrency || 8) <= 4)
      ? 'low'
      : 'high',
  )

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  return (
    <section className="hero" ref={ref} id="top">
      <motion.div className="hero-scene" style={reduced ? undefined : { scale: sceneScale }}>
        <Suspense fallback={<div className="hero-fallback" />}>
          <HeroScene active={inView} reducedMotion={reduced} quality={quality} />
        </Suspense>
      </motion.div>

      <motion.div className="hero-copy" style={reduced ? undefined : { y: textY, opacity: textOpacity }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          {profile.role} · {profile.location}
        </motion.p>
        <h1 className="hero-title">
          <Words text="Creating the" className="serif-line" delay={0.35} />
          <Words text="unexpected." className="sans-line" delay={0.6} />
        </h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.1 }}
        >
          A brand and digital studio for people who want their website to feel like a place —
          soft light, real depth, and motion that knows when to stop.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.3 }}
        >
          <MagneticButton href="#work">View our work ↘</MagneticButton>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="scroll-cue"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span />
      </motion.a>
    </section>
  )
}
