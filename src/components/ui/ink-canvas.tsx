'use client'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Original monochrome "ink in water" shader.
 * Domain-warped noise forms the plumes; the pointer stirs them and a
 * press drops a fresh bead. Pauses when off-screen or under reduced motion.
 */
const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uStir;
uniform vec4 uBeads[6]; // xy = position, z = birth time, w = strength

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 6; i++){ v += a * noise(p); p = r * p * 2.05 + 0.3; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.05;

  // pointer swirl: rotate space around the cursor, fading with distance
  vec2 m = (uMouse - 0.5 * uRes) / uRes.y;
  vec2 d = uv - m;
  float dist = length(d);
  float swirl = uStir * exp(-dist * 4.0) * 2.2;
  float s = sin(swirl), c = cos(swirl);
  vec2 warped = m + mat2(c, -s, s, c) * d;

  // dropped beads: expanding rings that push the field outward
  for (int i = 0; i < 6; i++){
    vec4 b = uBeads[i];
    if (b.w <= 0.0) continue;
    vec2 bp = (b.xy - 0.5 * uRes) / uRes.y;
    float age = uTime - b.z;
    vec2 bd = warped - bp;
    float r = length(bd);
    float ring = exp(-pow((r - age * 0.12) * 6.0, 2.0)) * exp(-age * 0.35) * b.w;
    warped += normalize(bd + 1e-4) * ring * 0.25;
  }

  vec2 q = vec2(fbm(warped * 1.6 + t), fbm(warped * 1.6 - t * 0.7 + 5.2));
  vec2 r2 = vec2(fbm(warped * 1.6 + 4.0 * q + vec2(1.7, 9.2) + t * 0.6),
                 fbm(warped * 1.6 + 4.0 * q + vec2(8.3, 2.8) - t * 0.4));
  float f = fbm(warped * 1.6 + 4.0 * r2);

  // ink density: dark core in the middle of the tank, wispy edges
  float core = smoothstep(0.75, 0.05, length(uv * vec2(0.8, 1.3)));
  float ink = smoothstep(0.35, 0.75, f) * (0.35 + 0.65 * core) + core * 0.45;
  ink += (r2.x - 0.5) * 0.25;
  vec3 col = mix(vec3(0.97), vec3(0.06, 0.06, 0.07), clamp(ink, 0.0, 1.0));
  o = vec4(col, 1.0);
}`

export function InkCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false })
    if (!gl) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      return sh
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
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
      mouse: gl.getUniformLocation(prog, 'uMouse'),
      stir: gl.getUniformLocation(prog, 'uStir'),
      beads: gl.getUniformLocation(prog, 'uBeads'),
    }

    const dpr = Math.min(window.devicePixelRatio, 1.5)
    const scale = 0.6 * dpr // render at reduced resolution; the ink is soft anyway
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, stir: 0 }
    const beads = new Float32Array(24)
    let beadIdx = 0
    let raf = 0
    let running = false
    let lastMove = 0
    const start = performance.now()

    const resize = () => {
      const w = Math.floor(canvas.clientWidth * scale)
      const h = Math.floor(canvas.clientHeight * scale)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    const frame = () => {
      resize()
      const now = (performance.now() - start) / 1000
      mouse.x += (mouse.tx - mouse.x) * 0.08
      mouse.y += (mouse.ty - mouse.y) * 0.08
      const idle = performance.now() - lastMove > 120
      mouse.stir += ((idle ? 0 : 1) - mouse.stir) * 0.05
      gl.uniform2f(u.res, canvas.width, canvas.height)
      gl.uniform1f(u.time, reduced ? 0 : now)
      gl.uniform2f(u.mouse, mouse.x * scale, canvas.height - mouse.y * scale)
      gl.uniform1f(u.stir, mouse.stir)
      gl.uniform4fv(u.beads, beads)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (running && !reduced) raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - r.left
      mouse.ty = e.clientY - r.top
      lastMove = performance.now()
    }
    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const i = (beadIdx++ % 6) * 4
      beads[i] = (e.clientX - r.left) * scale
      beads[i + 1] = (canvas.clientHeight - (e.clientY - r.top)) * scale
      beads[i + 2] = (performance.now() - start) / 1000
      beads[i + 3] = 1
    }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerdown', onDown)

    // initial pointer at centre so the swirl has somewhere sensible to sit
    mouse.tx = mouse.x = canvas.clientWidth / 2
    mouse.ty = mouse.y = canvas.clientHeight / 2

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (running) raf = requestAnimationFrame(frame)
    })
    io.observe(canvas)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerdown', onDown)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return <canvas ref={ref} className={cn('block h-full w-full touch-none', className)} aria-hidden="true" />
}
