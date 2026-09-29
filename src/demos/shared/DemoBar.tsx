/** Fixed "back to portfolio" pill shared by the demo pages. */
export function DemoBar() {
  return (
    <a
      href="/"
      className="fixed bottom-4 left-4 z-[70] rounded-full bg-white px-4 py-2 text-xs font-medium text-black shadow-[0_10px_24px_rgba(0,0,0,0.4)] hover:bg-neutral-200"
    >
      ← Demo by Anirudh Verma · back to portfolio
    </a>
  )
}
