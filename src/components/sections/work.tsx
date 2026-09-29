'use client'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data'

const ease = [0.22, 1, 0.36, 1] as const

export function Work() {
  return (
    <section id="work" className="px-5 md:px-10 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-5">(04) Work I do</p>
        <div className="md:flex md:items-end md:justify-between gap-10">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[0.98]">
            Things I’ve <span className="font-serif italic font-normal">shipped.</span>
          </h2>
          <p className="mt-4 md:mt-0 max-w-sm text-sm text-muted-foreground">
            Internal tools built for finance, sales, HR and procurement teams. The screens are private,
            so these are the stories behind them.
          </p>
        </div>

        <div className="mt-9">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              className="card-shadow group my-3 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:grid-cols-[4rem_1fr_1.3fr_auto] md:items-start hover:bg-white/[0.05] transition-colors"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.04 }}
            >
              <span className="font-mono text-xs text-muted-foreground pt-2">{p.id}</span>
              <div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                  {p.title}
                </h3>
                <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {p.kind}
                </p>
              </div>
              <p className="text-sm md:text-[0.95rem] text-muted-foreground leading-relaxed">{p.blurb}</p>
              <ul className="flex flex-wrap gap-2 md:max-w-[12rem] md:justify-end">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-full border border-white/10 px-3 py-1 text-[0.72rem] text-neutral-300">
                    {t}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <a
          href="https://github.com/aviverma007"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          More on GitHub <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  )
}
