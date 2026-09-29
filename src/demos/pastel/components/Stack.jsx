import { motion } from 'motion/react'
import { stackGroups } from '../data'

const ease = [0.34, 1.56, 0.64, 1] // soft clay bounce

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const chip = {
  hidden: { opacity: 0, y: 24, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } },
}

export default function Stack() {
  return (
    <section className="section stack" id="stack">
      <div className="section-label">
        <span>(03)</span> Toolkit
      </div>
      <h2 className="display">
        Strategy to <em>screen,</em> under one roof.
      </h2>
      <div className="stack-grid">
        {stackGroups.map((g, gi) => (
          <motion.div
            key={g.title}
            className="stack-col clay"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: gi * 0.12 }}
          >
            <h3>{g.title}</h3>
            <motion.ul variants={list} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {g.items.map((it) => (
                <motion.li key={it} variants={chip} whileHover={{ y: -4, scale: 1.05 }} className="chip">
                  {it}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
