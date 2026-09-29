'use client'
import { useEffect, useRef } from 'react'
import type { MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Full-bleed WebGL2 quad driven by a scroll progress MotionValue.
 * Uniforms: uRes, uTime, uProgress (0..1), uMouse (px, y-up).
 * Renders only while on screen; drops to a static frame under reduced motion.
 */
const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

export function ScrubCanvas({
  frag,
  progress,
  className,
  scale = 0.75,
}: {
  frag: string
  progress: MotionValue<number>
  className?: string
  scale?: number
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false })
    if (!gl) return
    if (gl.isContextLost()) gl.getExtension('WEBGL_lose_context')?.restoreContext()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.error('[scrub-canvas]', gl.getShaderInfoLog(sh))
      return sh
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('[scrub-canvas]', gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = {
      res: gl.getUniformLocation(prog, 'uRes'),
      time: gl.getUniformLocation(prog, 'uTime'),
      progress: gl.getUniformLocation(prog, 'uProgress'),
      mouse: gl.getUniformLocation(prog, 'uMouse'),
    }

    const dpr = Math.min(window.devicePixelRatio, 1.5) * scale
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    let raf = 0
    let running = false
    const start = performance.now()

    const frame = () => {
      const w = Math.floor(canvas.clientWidth * dpr)
      const h = Math.floor(canvas.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      mouse.x += (mouse.tx - mouse.x) * 0.06
      mouse.y += (mouse.ty - mouse.y) * 0.06
      gl.uniform2f(u.res, w, h)
      gl.uniform1f(u.time, reduced ? 0 : (performance.now() - start) / 1000)
      gl.uniform1f(u.progress, progress.get())
      gl.uniform2f(u.mouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (running) raf = requestAnimationFrame(frame)
    }
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth
      mouse.ty = 1 - e.clientY / window.innerHeight
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    const io = new IntersectionObserver(([en]) => {
      running = en.isIntersecting
      cancelAnimationFrame(raf)
      if (running) raf = requestAnimationFrame(frame)
    })
    io.observe(canvas)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      gl.deleteProgram(prog)
      gl.deleteBuffer(buf)
    }
  }, [frag, progress, scale])

  return <canvas ref={ref} className={cn('block h-full w-full', className)} aria-hidden="true" />
}
