'use client'
import { motion } from 'motion/react'
import { Search, PenTool, Code2, Rocket } from 'lucide-react'
import { process } from '@/data'

const icons = [Search, PenTool, Code2, Rocket]
const ease = [0.22, 1, 0.36, 1] as const

export function Process() {
  return (
    <section id="process" className="px-5 md:px-10 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-5">(03) How a project runs</p>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[0.98] max-w-3xl">
          From a messy brief to <span className="font-serif italic font-normal">something live.</span>
        </h2>

        <ol className="mt-12 grid gap-4 md:grid-cols-4">
          {process.map((step, i) => {
            const Icon = icons[i]
            return (
              <motion.li
                key={step.title}
                className="card-shadow group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.05] transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-full border border-white/10 bg-black text-neutral-200">
                    <Icon size={16} />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-neutral-500">
                  {step.output}
                </p>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
