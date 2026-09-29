'use client'
import { motion } from 'motion/react'
import { InkCanvas } from '@/components/ui/ink-canvas'
import { skills } from '@/data'

const ease = [0.22, 1, 0.36, 1] as const

export function Skills() {
  return (
    <section id="skills" className="relative mt-28 md:mt-40">
      {/* ink tank — original WebGL shader, stir with the pointer, press to drop a bead */}
      <div className="relative h-[80vh] min-h-[560px] overflow-hidden bg-[#f4f4f4]">
        <InkCanvas className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 text-center">
          <div className="mix-blend-difference text-white">
            <p className="label !text-white/70 mb-4">(02) What I know</p>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em]">Ink in still water.</h2>
            <p className="mt-4 max-w-md mx-auto text-sm md:text-base text-white/80">
              Drag through the tank to stir the plumes, or press to drop a fresh bead. Written as a
              custom shader — the kind of detail that makes a page memorable.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-10 py-20 md:py-28 grid gap-10 md:grid-cols-4">
        {Object.entries(skills).map(([group, items], gi) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease, delay: gi * 0.08 }}
          >
            <h3 className="font-serif italic text-2xl">{group}</h3>
            <ul className="mt-4 space-y-2">
              {items.map((s) => (
                <li key={s} className="text-sm text-muted-foreground border-b border-white/5 pb-2">
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
