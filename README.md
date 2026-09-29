# Motion_website

Personal developer portfolio for **Anirudh Verma** — a soft pastel, 3D "clay" site built with
React 19, [Motion](https://motion.dev) and three.js (React Three Fiber).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Node 20.19+ is required (Vite 8).

## Where things live

| File | What it does |
| --- | --- |
| `src/data.js` | **All copy** — name, stats, projects, stack. Edit this to change what the site says. |
| `src/components/HeroScene.jsx` | three.js hero: arched plaster wall, stairs, reflective water, floating pearls, camera intro + mouse parallax |
| `src/components/Hero.jsx` | Headline word-by-word reveal, scroll parallax, lazy-loads the 3D scene and pauses it off-screen |
| `src/components/Marquee.jsx` | Tech strip that speeds up / reverses with scroll velocity |
| `src/components/About.jsx` | Paragraph that lights up word by word on scroll + clay stat cards |
| `src/components/Work.jsx` | Sticky stacking project cards with scroll-scale and 3D hover tilt |
| `src/components/Stack.jsx` | Toolkit columns with bouncy staggered chips |
| `src/components/Contact.jsx` | Rising orb, magnetic buttons, footer |
| `src/styles.css` | Design tokens (colors, shadows, fonts) and all styling |

## Motion techniques used

- `initial` → `animate` masked word reveals (hero)
- `useScroll` + `useTransform` for parallax, card stacking and scroll-lit text
- `useVelocity` + `useAnimationFrame` for the velocity-driven marquee
- `useMotionValue` + `useSpring` for magnetic buttons and card tilt
- `whileInView`, `whileHover`, `whileTap`, variants with `staggerChildren`
- `MotionConfig reducedMotion="user"` — respects the OS "reduce motion" setting

## Deploy

`npm run build` outputs a static `dist/` folder — host it on Vercel / Netlify, or serve it from
IIS / Nginx like any static site.
