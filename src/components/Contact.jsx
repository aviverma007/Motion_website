import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { profile } from '../data'
import MagneticButton from './MagneticButton'

export default function Contact() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const orbY = useTransform(scrollYProgress, [0, 1], ['40%', '0%'])
  const orbScale = useTransform(scrollYProgress, [0, 1], [0.6, 1])

  return (
    <section className="section contact" id="contact" ref={ref}>
      <motion.div
        className="contact-orb"
        aria-hidden="true"
        style={reduced ? undefined : { y: orbY, scale: orbScale }}
      />
      <div className="section-label">
        <span>(04)</span> Contact
      </div>
      <motion.h2
        className="contact-title"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        Let’s build something
        <br />
        <em>quietly brilliant.</em>
      </motion.h2>
      <div className="contact-actions">
        <MagneticButton href={`mailto:${profile.email}`}>Say hello</MagneticButton>
        <MagneticButton href={profile.github} variant="ghost">
          GitHub ↗
        </MagneticButton>
      </div>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with React, Motion &amp; three.js</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  )
}
