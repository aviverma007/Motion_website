import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { stats, profile } from '../data'

const ease = [0.22, 1, 0.36, 1]

/** Paragraph whose words light up as it scrolls through the viewport. */
function ScrollLitText({ text }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className="about-lead">
      {words.map((w, i) => {
        const start = i / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]} reduced={reduced}>
            {w}
          </Word>
        )
      })}
    </p>
  )
}

function Word({ children, progress, range, reduced }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity: reduced ? 1 : opacity }} className="lit-word">
      {children}{' '}
    </motion.span>
  )
}

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="section-label">
        <span>(01)</span> Index
      </div>
      <ScrollLitText
        text={`${profile.org} is a small studio making brand identities and websites that feel like places — calm, tactile and a little unexpected. Strategy first, then design, then the build.`}
      />

      <div className="stats">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat clay"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
          >
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
