import { useEffect } from 'react'
import { MotionConfig, motion, useScroll, useSpring } from 'motion/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Work from './components/Work'
import Stack from './components/Stack'
import Contact from './components/Contact'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  // embedded in the portfolio viewer: Esc closes it
  useEffect(() => {
    if (window.parent === window) return
    const onKey = (e) => e.key === 'Escape' && window.parent.postMessage({ type: 'close-demo' }, window.location.origin)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    // reducedMotion="user" turns transform animations off for people who ask for less motion
    <MotionConfig reducedMotion="user">
      <motion.div className="progress" style={{ scaleX: progress }} />
      <a
        href="/"
        className="demo-bar"
        onClick={(e) => {
          if (window.parent !== window) {
            e.preventDefault()
            window.parent.postMessage({ type: 'close-demo' }, window.location.origin)
          }
        }}
      >
        ← Demo by Anirudh Verma · back to portfolio
      </a>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Stack />
        <Contact />
      </main>
    </MotionConfig>
  )
}
