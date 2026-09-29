# Motion_website

Personal developer portfolio for **Anirudh Verma** — a dark, motion-led showcase of the kinds of
websites he builds, what he knows and the work he does.

Built with React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · [Motion](https://motion.dev) ·
three.js (React Three Fiber) · Spline, in a shadcn-style project structure.

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
| `src/components/sections/` | The page sections, in order: `nav`, `hero`, `build`, `skills`, `work`, `about` (+ `Contact`). |
| `src/lib/utils.ts` | shadcn's `cn()` class-merge helper. |
| `src/index.css` | Tailwind import, dark theme tokens, fonts. |
| `components.json` | shadcn CLI config, so `npx shadcn add <component>` drops new components into the right folder. |

## Components used

| Component | Source | Used for |
| --- | --- | --- |
| `splite.tsx` + `spotlight.tsx` | 21st.dev / ibelick | Hero — Spline robot with a cursor spotlight (`card.tsx` from shadcn is available for future use) |
| `container-scroll-animation.tsx` | 21st.dev (Aceternity) | Tilting device frame that holds a **live** three.js scene |
| `pastel-scene.tsx` | own | The pastel 3D room (arches, stairs, reflective water, floating pearls) |
| `ink-canvas.tsx` | own | "Ink in still water" WebGL shader — stir with the pointer, press to drop a bead |

Ports from the originals: `framer-motion` → `motion/react` (same API), Next's `<Image>` → `<img>`
(this is Vite, not Next).

## Adding another 21st.dev component

1. Copy the component file into `src/components/ui/`.
2. Change `from "framer-motion"` to `from "motion/react"`, and `next/image` to a plain `<img>`.
3. Install anything it lists under "Install NPM dependencies".
4. Use it from a section in `src/components/sections/`.

## Deploy

`npm run build` outputs a static `dist/` folder — host it on Vercel / Netlify, or serve it from
IIS / Nginx like any static site.
