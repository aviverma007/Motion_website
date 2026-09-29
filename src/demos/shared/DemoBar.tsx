import { useEffect } from 'react'

/** Fixed "back to portfolio" pill shared by the demo pages.
 *  Inside the portfolio's viewer (iframe) it closes the dialog; standalone it navigates home. */
export function closeOrGoHome(e: React.MouseEvent) {
  if (window.parent !== window) {
    e.preventDefault()
    window.parent.postMessage({ type: 'close-demo' }, window.location.origin)
  }
}

/** When embedded in the portfolio's viewer, Esc closes the viewer. */
export function useEmbeddedEscape() {
  useEffect(() => {
    if (window.parent === window) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') window.parent.postMessage({ type: 'close-demo' }, window.location.origin)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}

export function DemoBar() {
  useEmbeddedEscape()
  return (
    <a
      href="/"
      onClick={closeOrGoHome}
      className="fixed bottom-4 left-4 z-[70] rounded-full bg-white px-4 py-2 text-xs font-medium text-black shadow-[0_10px_24px_rgba(0,0,0,0.4)] hover:bg-neutral-200"
    >
      ← Demo by Anirudh Verma · back to portfolio
    </a>
  )
}
