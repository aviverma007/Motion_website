'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react'

export type DemoRef = { title: string; href: string; kind?: string }

/**
 * Full-screen viewer that loads a demo page in an iframe.
 * Closes on the Back button, Esc, or a `{type:'close-demo'}` postMessage from the iframe.
 */
export function DemoViewer({ demo, onClose }: { demo: DemoRef | null; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!demo) return
    setLoaded(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const onMsg = (e: MessageEvent) => {
      if (e.origin === window.location.origin && e.data?.type === 'close-demo') onClose()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('message', onMsg)
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('message', onMsg)
      document.documentElement.style.overflow = prev
    }
  }, [demo, onClose])

  return (
    <AnimatePresence>
      {demo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={demo.title}
          className="fixed inset-0 z-[90] flex flex-col bg-black"
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.985 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* dialog bar */}
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 bg-[#09090b] px-3 md:px-4">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-neutral-200 hover:bg-white/10"
            >
              <ArrowLeft size={14} /> Back to portfolio
            </button>
            <div className="flex min-w-0 items-center gap-2 px-2 text-xs text-muted-foreground">
              {demo.kind && <span className="hidden font-mono uppercase tracking-[0.16em] sm:inline">{demo.kind} ·</span>}
              <span className="truncate text-neutral-200">{demo.title}</span>
              <span className="hidden text-neutral-500 sm:inline">· demo</span>
            </div>
            <div className="flex items-center gap-1">
              <a
                href={demo.href}
                target="_blank"
                rel="noreferrer"
                aria-label="Open in a new tab"
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-white/10 hover:text-white"
              >
                <ArrowUpRight size={15} />
              </a>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-white/10 hover:text-white"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          <div className="relative flex-1">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-500">
                <span className="loader mr-3" /> Loading demo…
              </div>
            )}
            <iframe
              key={demo.href}
              src={`${demo.href}?embedded=1`}
              title={demo.title}
              onLoad={() => setLoaded(true)}
              className={`h-full w-full border-0 bg-black transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              allow="fullscreen"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
