import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import { profile } from '../data'

const links = [
  { href: '#about', label: 'Index' },
  { href: '#work', label: 'Work' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)

  // hide on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 240)
    setSolid(y > 40)
  })

  return (
    <motion.header
      className={`nav ${solid ? 'nav--solid' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -90 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#top" className="nav-brand">
        {profile.name.split(' ')[0].toLowerCase()}
        <em>verma</em>
        <sup>®</sup>
      </a>
      <nav aria-label="Primary">
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link">
                <span data-text={l.label}>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}
