'use client'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { demos } from '@/data'

const ease = [0.22, 1, 0.36, 1] as const

export function Build() {
  return (
    <section id="build" className="relative px-5 md:px-10 pt-24 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-5">(01) Demo sites</p>
        <div className="md:flex md:items-end md:justify-between gap-10">
          <motion.h2
            className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[0.98] max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            Websites that <span className="font-serif italic font-normal">move.</span> Open one.
          </motion.h2>
          <p className="mt-4 md:mt-0 max-w-sm text-sm text-muted-foreground">
            Three live demo sites in three very different styles — each one a real page you can click
            through, not a mockup. Fictional brands, real code.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {demos.map((d, i) => (
            <motion.a
              key={d.slug}
              href={d.href}
              target="_blank"
              rel="noreferrer"
              className="card-shadow group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-colors hover:bg-white/[0.05]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10" style={{ background: d.tone }}>
                <img
                  src={d.image}
                  alt={`${d.title} — screenshot`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white backdrop-blur">
                  {d.kind}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-medium tracking-tight">{d.title}</h3>
                  <ArrowUpRight size={18} className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.text}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                  {d.tags.map((t) => (
                    <li key={t} className="rounded-full border border-white/10 px-3 py-1 text-[0.72rem] text-neutral-300">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.a>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Demos open in a new tab. Each has a “back to portfolio” pill in the corner.
        </p>
      </div>
    </section>
  )
}
