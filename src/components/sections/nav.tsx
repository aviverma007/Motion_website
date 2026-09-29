'use client'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import { Mail } from 'lucide-react'
import { profile } from '@/data'
import { cn } from '@/lib/utils'

const links = [
  { href: '#build', label: 'Demos' },
  { href: '#process', label: 'Process', desktopOnly: true },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About', desktopOnly: true },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > 40))


  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-10 transition-colors duration-300',
        solid && 'bg-background/70 backdrop-blur-md border-b border-white/5',
      )}
    >
      <a href="#top" className="text-sm font-medium tracking-tight">
        anirudh<span className="font-serif italic text-base">verma</span>
        <sup className="text-[0.5rem] ml-0.5">®</sup>
      </a>
      <nav aria-label="Primary" className="flex items-center gap-4 md:gap-8">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={cn(
              'text-[0.82rem] text-muted-foreground hover:text-foreground transition-colors',
              l.desktopOnly && 'hidden md:inline',
            )}
          >
            {l.label}
          </a>
        ))}
        <span className="hidden md:flex items-center gap-3 pl-3 border-l border-white/10">
          <a href={`mailto:${profile.email}`} aria-label="Email" className="text-muted-foreground hover:text-foreground">
            <Mail size={16} />
          </a>
        </span>
      </nav>
    </motion.header>
  )
}
