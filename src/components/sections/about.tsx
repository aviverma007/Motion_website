'use client'
import { motion } from 'motion/react'
import { ArrowUpRight, Code2, Mail, MapPin } from 'lucide-react'
import { profile } from '@/data'

const ease = [0.22, 1, 0.36, 1] as const

export function About() {
  return (
    <section id="about" className="px-5 md:px-10 py-20 md:py-28 border-t border-white/10">
      <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="label mb-5">(05) About me</p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[0.98]">
            {profile.name.split(' ')[0]}
            <br />
            <span className="font-serif italic font-normal">{profile.name.split(' ')[1]}</span>
          </h2>
          <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MapPin size={14} /> {profile.location}
            </li>
            <li className="flex items-center gap-2">
              <Code2 size={14} />
              <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
                github.com/aviverma007
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} />
              <a href={`mailto:${profile.email}`} className="hover:text-foreground">
                {profile.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <motion.p
            className="text-xl md:text-2xl leading-relaxed tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            I’m a full-stack developer on the IT team at {profile.org}, a real-estate company in Gurugram.
            My job is to turn spreadsheets, SAP exports and approval chains into software people actually
            enjoy opening — and to keep it running once it’s live.
          </motion.p>
          <h3 className="mt-10 font-serif italic text-2xl">How I work</h3>
          <ol className="mt-4 space-y-4">
            {profile.howIWork.map((line, i) => (
              <motion.li
                key={line}
                className="flex gap-4 text-sm md:text-base text-muted-foreground"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              >
                <span className="font-mono text-xs text-neutral-500 pt-1">0{i + 1}</span>
                {line}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-5 md:px-10 pt-28 md:pt-40 pb-8 border-t border-white/10">
      {/* soft light from below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 bottom-[-40vw] h-[80vw] w-[80vw] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)' }}
      />
      <div className="relative mx-auto max-w-6xl">
        <p className="label mb-5">(06) Contact</p>
        <motion.h2
          className="text-5xl md:text-[7rem] font-semibold tracking-[-0.05em] leading-[0.95]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        >
          Let’s build something
          <br />
          <span className="font-serif italic font-normal">quietly brilliant.</span>
        </motion.h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-white transition-colors"
          >
            Say hello <Mail size={14} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm hover:bg-white/5 transition-colors"
          >
            GitHub <ArrowUpRight size={14} />
          </a>
        </div>
        <footer className="mt-32 md:mt-48 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>React · TypeScript · Tailwind · Motion · three.js · Spline</span>
          <a href="#top" className="hover:text-foreground">Back to top ↑</a>
        </footer>
      </div>
    </section>
  )
}
