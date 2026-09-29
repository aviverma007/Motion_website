'use client'
import { useEffect, useRef } from 'react'

/**
 * Cursor-controlled dry-brush scratch reveal.
 * IMAGE 2 sits underneath as a plain <img>; the canvas above draws IMAGE 1 every frame and
 * punches procedural, irregular brush stamps out of it with destination-out.
 * Stamps live ~2.7 s and physically shrink (no opacity fade); the mask is rebuilt each frame.
 */
type Stamp = { x: number; y: number; r: number; angle: number; born: number; seed: number }

const LIFE = 2.7
const SAMPLES = 48

function brushRadius(w: number, h: number) {
  return Math.min(w, h) * 0.175
}

function drawBrush(ctx: CanvasRenderingContext2D, s: Stamp, time: number, stretch: number) {
  const pts: [number, number][] = []
  for (let i = 0; i < SAMPLES; i++) {
    const a = (i / SAMPLES) * Math.PI * 2
    // multi-frequency radius modulation → big bumps, medium irregularities, small tears
    let r =
      s.r *
      (1 +
        0.085 * Math.sin(3 * a + time + s.seed) +
        0.048 * Math.sin(5 * a - time * 1.15 + s.seed * 2.1) +
        0.022 * Math.sin(9 * a + time * 0.6 + s.seed * 3.7) +
        0.03 * Math.sin(13 * a + s.seed * 5.3) +
        0.018 * Math.sin(21 * a - s.seed * 7.9))
    // a couple of torn notches per stamp
    const notch = Math.sin(2 * a + s.seed * 11.3)
    if (notch > 0.93) r *= 0.78
    // elongate along the movement direction (mild)
    const ca = Math.cos(a)
    const sa = Math.sin(a)
    const ex = ca * r * stretch
    const ey = sa * r
    const rx = ex * Math.cos(s.angle) - ey * Math.sin(s.angle)
    const ry = ex * Math.sin(s.angle) + ey * Math.cos(s.angle)
    pts.push([s.x + rx, s.y + ry])
  }
  // Catmull-Rom → cubic Bézier closed path
  ctx.beginPath()
  ctx.moveTo(pts[0][0], pts[0][1])
  for (let i = 0; i < SAMPLES; i++) {
    const p0 = pts[(i - 1 + SAMPLES) % SAMPLES]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % SAMPLES]
    const p3 = pts[(i + 2) % SAMPLES]
    ctx.bezierCurveTo(
      p1[0] + (p2[0] - p0[0]) / 6,
      p1[1] + (p2[1] - p0[1]) / 6,
      p2[0] - (p3[0] - p1[0]) / 6,
      p2[1] - (p3[1] - p1[1]) / 6,
      p2[0],
      p2[1],
    )
  }
  ctx.closePath()
  ctx.fill()
}

export function ScratchReveal({ top, under, children }: { top: string; under: string; children?: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = hostRef.current
    if (!canvas || !host) return
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    img.src = top
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let W = 0
    let H = 0
    const resize = () => {
      W = host.clientWidth
      H = host.clientHeight
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    // object-fit: cover, object-position: center — identical to the <img> underneath
    const drawCover = () => {
      if (!img.complete || !img.naturalWidth) return
      const s = Math.max(W / img.naturalWidth, H / img.naturalHeight)
      const dw = img.naturalWidth * s
      const dh = img.naturalHeight * s
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh)
    }

    const stamps: Stamp[] = []
    let inside = false
    let tx = 0
    let ty = 0
    let sx = 0
    let sy = 0
    let lastX = 0
    let lastY = 0
    let lastAngle = 0
    let stretch = 1
    let last = performance.now()
    let raf = 0

    const addStamp = (x: number, y: number, angle: number) => {
      stamps.push({ x, y, r: brushRadius(W, H), angle, born: performance.now(), seed: Math.random() * 100 })
    }

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const time = now / 1000

      if (inside) {
        const k = 1 - Math.pow(1 - 0.17, dt * 60)
        sx += (tx - sx) * k
        sy += (ty - sy) * k
        const dx = sx - lastX
        const dy = sy - lastY
        const dist = Math.hypot(dx, dy)
        const R = brushRadius(W, H)
        const spacing = R * 0.09
        if (dist >= spacing) {
          const ang = Math.atan2(dy, dx)
          // ease the angle so direction changes rotate naturally
          lastAngle += Math.atan2(Math.sin(ang - lastAngle), Math.cos(ang - lastAngle)) * 0.35
          const speed = dist / Math.max(dt, 1 / 120)
          stretch += (Math.min(1.35, 1 + speed / 4000) - stretch) * 0.2
          const n = Math.floor(dist / spacing)
          for (let i = 1; i <= n; i++) {
            const t = i / n
            addStamp(lastX + dx * t, lastY + dy * t, lastAngle)
          }
          lastX = sx
          lastY = sy
        }
      }

      // age out
      for (let i = stamps.length - 1; i >= 0; i--) {
        if ((now - stamps[i].born) / 1000 >= LIFE) stamps.splice(i, 1)
      }

      ctx.clearRect(0, 0, W, H)
      drawCover()
      if (stamps.length) {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.fillStyle = '#000'
        for (const s of stamps) {
          const age = (now - s.born) / 1000
          const life = Math.max(0, 1 - age / LIFE)
          const r = s.r * Math.pow(life, 0.85)
          if (r < 0.5) continue
          drawBrush(ctx, { ...s, r }, time, stretch)
        }
        // dry-brush holes: re-draw slivers of IMAGE 1 inside the strokes
        ctx.globalCompositeOperation = 'source-over'
        for (const s of stamps) {
          const age = (now - s.born) / 1000
          const life = Math.max(0, 1 - age / LIFE)
          const r = s.r * Math.pow(life, 0.85)
          if (r < 6) continue
          // only a few stamps carry holes, otherwise overlapping stamps shatter the stroke
          if (s.seed % 7 > 1.2) continue
          const n = 1 + Math.floor(((s.seed * 7.31) % 1) * 2)
          for (let i = 0; i < n; i++) {
            const t = (s.seed * (3.7 + i * 1.9)) % 1
            const u = (s.seed * (5.1 + i * 2.3)) % 1
            const hx = s.x + (t - 0.5) * r * 1.1
            const hy = s.y + (u - 0.5) * r * 1.1
            const hr = r * (0.025 + 0.035 * ((s.seed * (2.9 + i)) % 1))
            const ang = s.angle + ((s.seed * (1.3 + i)) % 1) * Math.PI
            ctx.save()
            ctx.beginPath()
            for (let k = 0; k < 12; k++) {
              const a = (k / 12) * Math.PI * 2
              const rr = hr * (1 + 0.3 * Math.sin(3 * a + s.seed * 4 + i))
              const ex = Math.cos(a) * rr * 3.2
              const ey = Math.sin(a) * rr
              const px = hx + ex * Math.cos(ang) - ey * Math.sin(ang)
              const py = hy + ex * Math.sin(ang) + ey * Math.cos(ang)
              k ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
            }
            ctx.closePath()
            ctx.clip()
            drawCover()
            ctx.restore()
          }
        }
      }
      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const local = (e: PointerEvent | Touch) => {
      const r = host.getBoundingClientRect()
      return [e.clientX - r.left, e.clientY - r.top] as const
    }
    const enter = (x: number, y: number) => {
      inside = true
      // snap the follower so no stroke connects from an old position
      tx = sx = lastX = x
      ty = sy = lastY = y
    }
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const [x, y] = local(e)
      enter(x, y)
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const [x, y] = local(e)
      if (!inside) enter(x, y)
      tx = x
      ty = y
    }
    const onLeave = () => {
      inside = false
    }
    const onTouchStart = (e: TouchEvent) => {
      const [x, y] = local(e.touches[0])
      enter(x, y)
    }
    const onTouchMove = (e: TouchEvent) => {
      const [x, y] = local(e.touches[0])
      tx = x
      ty = y
    }
    host.addEventListener('pointerenter', onEnter)
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    host.addEventListener('touchstart', onTouchStart, { passive: true })
    host.addEventListener('touchmove', onTouchMove, { passive: true })
    host.addEventListener('touchend', onLeave)
    host.addEventListener('touchcancel', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      host.removeEventListener('pointerenter', onEnter)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      host.removeEventListener('touchstart', onTouchStart)
      host.removeEventListener('touchmove', onTouchMove)
      host.removeEventListener('touchend', onLeave)
      host.removeEventListener('touchcancel', onLeave)
    }
  }, [top])

  return (
    <div ref={hostRef} className="relative h-[100svh] w-full overflow-hidden bg-black touch-none">
      {/* IMAGE 2 — underneath */}
      <img src={under} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover object-center select-none" />
      {/* IMAGE 1 — drawn on the canvas, scratched away */}
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
      {/* UI above the mask */}
      <div className="pointer-events-none absolute inset-0 z-10">{children}</div>
    </div>
  )
}
