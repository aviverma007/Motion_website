# Motion_website

Personal developer portfolio for **Anirudh Verma** — a dark, motion-led showcase of the kinds of
websites he builds, what he knows and the work he does.

Built with React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · [Motion](https://motion.dev) · Spline,
in a shadcn-style project structure.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npx tsc          # type-check
```

Node 20.19+ is required (Vite 8).

## Project structure (shadcn conventions)

| Path | What it is |
| --- | --- |
| `src/data.ts` | **All copy** — name, intro, stats, capabilities, skills, projects. Edit this to change what the site says. |
| `src/components/ui/` | Reusable UI components. Anything copied from 21st.dev / shadcn goes here so its `@/components/ui/...` imports work unchanged. |
| `src/components/sections/` | The page sections, in order: `nav`, `hero`, `marquee`, `build`, `skills`, `process`, `work`, `about` (+ `Contact`). |
| `src/lib/utils.ts` | shadcn's `cn()` class-merge helper. |
| `src/lib/use-lenis.ts` | Lenis smooth scrolling hook (anchor links ease instead of jumping). |
| `src/index.css` | Tailwind import, dark theme tokens, fonts. |
| `public/showcase/` | Thumbnails of the demo sites. |
| `demos/*/index.html` + `src/demos/*` | The demo sites — each is its own page in the multi-page Vite build, served at `/demos/<name>/`. |
| `components.json` | shadcn CLI config, so `npx shadcn add <component>` drops new components into the right folder. |

## Components used

| Component | Source | Used for |
| --- | --- | --- |
| `splite.tsx` + `spotlight.tsx` | 21st.dev / ibelick | Hero — Spline robot with a cursor spotlight. Pointer moves anywhere on the page are forwarded to the Spline canvas so the robot tracks site-wide |
| `liquid-glass-button.tsx` | 21st.dev | Hero buttons (`LiquidButton`). Note: its `asChild` can't wrap a link, so navigation is done in `onClick` |
| `card.tsx` | shadcn | Available for future use |
| `scrub-canvas.tsx` | own | Full-bleed WebGL quad driven by a scroll-progress MotionValue (used by the studio demo) |
| `demo-viewer.tsx` | own | Full-screen in-page viewer (iframe) for the demo cards — Back button, Esc, or the demo's own pill closes it (demos post `{type:'close-demo'}` to the parent) |
| `preloader.tsx` | own | 0→100% loading counter that wipes away (portfolio + studio demo) |
| `ink-canvas.tsx` | own | "Ink in still water" WebGL shader — stir with the pointer, press to drop a bead |

Ports from the originals: `framer-motion` → `motion/react` (same API), Next's `<Image>` → `<img>`
(this is Vite, not Next).

## Demo sites

| URL | What it is |
| --- | --- |
| `/demos/pastel/` | Atelier Nord — pastel 3D studio site (React + Motion + three.js, plain CSS) |
| `/demos/estate/` | Verdant Heights — real-estate project launch page |
| `/demos/dashboard/` | Sales Desk — light analytics dashboard with sample data |
| `/demos/scratch/` | Scratch reveal — cursor-controlled dry-brush hero (`components/ui/scratch-reveal.tsx`): procedural irregular brush, 2.7 s shrinking trail, mask rebuilt each frame, touch support |
| `/demos/studio/` | Verma Studio — freelance studio site: preloader, Lenis smooth scroll, two pinned scroll-scrubbed shader chapters (`src/demos/studio/shaders.ts`), services, package, starfield contact. Brand name is one constant in `src/demos/studio/data.ts`. |

Demo cards open in an in-page viewer (`?embedded=1`); Ctrl/⌘-click opens the demo in a new tab.
All brands, names and numbers in the demos are fictional. To add a real client site to the grid,
add an entry to `demos` in `src/data.ts` with its public `href`.

## Adding another 21st.dev component

1. Copy the component file into `src/components/ui/`.
2. Change `from "framer-motion"` to `from "motion/react"`, and `next/image` to a plain `<img>`.
3. Install anything it lists under "Install NPM dependencies".
4. Use it from a section in `src/components/sections/`.

## Deploy

`npm run build` outputs a static `dist/` folder — host it on Vercel / Netlify, or serve it from
IIS / Nginx like any static site.
