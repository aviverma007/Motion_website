// Original GLSL for the studio demo. All three share the same uniform set.
const HEAD = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 uRes; uniform float uTime; uniform float uProgress; uniform vec2 uMouse;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++){ v += a * noise(p); p = r * p * 2.1 + 0.4; a *= 0.5; } return v; }
vec3 gold(float t){ return mix(mix(vec3(0.35,0.18,0.05), vec3(0.95,0.68,0.28), t), vec3(1.0,0.95,0.85), smoothstep(0.7,1.0,t)); }
`

/** Hero: a golden vortex seen edge-on that tilts toward face-on and pulls in as you scroll. */
export const VORTEX = `${HEAD}
void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float p = uProgress;
  // tilt: edge-on ring at the start, opening up as we scroll; zoom in slightly
  float tilt = mix(0.22, 0.75, smoothstep(0.0, 0.7, p));
  float zoom = mix(1.0, 1.35, p);
  uv *= zoom;
  uv += (uMouse - 0.5) * 0.06;
  vec2 q = vec2(uv.x, uv.y / tilt);
  float r = length(q);
  float a = atan(q.y, q.x);
  float spin = uTime * 0.12 + p * 2.0;
  // spiral arms
  float arms = fbm(vec2(a * 2.0 + r * 6.0 - spin * 2.0, r * 9.0 - spin));
  float ring = exp(-pow((r - 0.42) * 6.0, 2.0)) * 0.8;
  float disc = smoothstep(0.95, 0.25, r) * smoothstep(0.16, 0.30, r);
  float glow = disc * (0.15 + arms * 0.9) * 0.55 + ring * (0.3 + arms * 0.8);
  glow *= 0.85;
  // event horizon: the near side of the disc passes in front
  float hole = smoothstep(0.20, 0.17, r);
  glow *= 1.0 - hole;
  // lensing halo above the hole
  float halo = exp(-pow((length(uv * vec2(1.0, 1.6)) - 0.24) * 14.0, 2.0)) * 0.45 * (1.0 - hole);
  // stars
  vec2 sp = uv * 40.0 + vec2(uTime * 0.02, 0.0);
  float star = pow(hash(floor(sp)), 40.0) * smoothstep(0.06, 0.0, length(fract(sp) - 0.5)) * 2.0;
  vec3 col = gold(clamp(glow, 0.0, 1.0)) * min(glow, 1.6) + gold(0.9) * halo + vec3(star) * 0.6;
  col += vec3(0.012, 0.012, 0.02);
  // vignette + fade to black at the very end so the next section can take over
  col *= smoothstep(1.4, 0.4, length(uv)) * (1.0 - smoothstep(0.85, 1.0, p) * 0.8);
  o = vec4(col, 1.0);
}`

/** Process: an ember iris that opens with scroll, sparks drifting off the rim. */
export const IRIS = `${HEAD}
void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  uv += (uMouse - 0.5) * 0.04;
  float p = uProgress;
  // the lid: an ellipse that opens from a slit to a full eye
  float open = mix(0.05, 0.62, smoothstep(0.0, 0.6, p));
  vec2 e = vec2(uv.x / 0.95, uv.y / open);
  float lid = smoothstep(1.02, 0.97, length(e));
  // iris rings + fibres
  float r = length(uv);
  float a = atan(uv.y, uv.x);
  float fib = fbm(vec2(a * 6.0, r * 14.0 - uTime * 0.05));
  float iris = smoothstep(0.34, 0.30, r) * (0.35 + fib);
  float pupil = smoothstep(0.13 + 0.02 * sin(uTime * 0.7), 0.10, r);
  float rim = exp(-pow((r - 0.33) * 45.0, 2.0)) * 0.55;
  // sclera: dim warm, so only the iris and rim glow
  float sclera = smoothstep(0.30, 0.36, r) * 0.08;
  float inner = lid * (iris * (1.0 - pupil) * 0.9 + rim + sclera);
  // sparks along the upper lid, blown outward as it opens
  vec2 sp = uv * 26.0 + vec2(0.0, -uTime * 0.6 - p * 4.0);
  float sparks = pow(hash(floor(sp)), 30.0) * smoothstep(0.07, 0.0, length(fract(sp) - 0.5));
  sparks *= smoothstep(0.0, 0.25, uv.y) * smoothstep(1.0, 0.55, length(e)) * 3.0;
  // skin around the eye: soft warm gradient
  float skin = smoothstep(1.3, 0.3, length(uv * vec2(0.7, 1.4))) * 0.12 * (1.0 - lid);
  vec3 col = gold(clamp(inner, 0.0, 1.0)) * min(inner, 1.2) + gold(0.95) * sparks + vec3(0.14, 0.08, 0.05) * skin;
  col += vec3(0.01, 0.008, 0.012);
  col *= smoothstep(1.3, 0.35, length(uv));
  o = vec4(col, 1.0);
}`

/** Contact: a slow starfield drifting toward the viewer. */
export const STARS = `${HEAD}
void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  uv += (uMouse - 0.5) * 0.05;
  vec3 col = vec3(0.01, 0.01, 0.015);
  for (int l = 0; l < 4; l++){
    float fl = float(l);
    float z = fract(uTime * 0.03 * (1.0 + fl * 0.4) + fl * 0.25);
    float scl = mix(30.0, 6.0, z);
    vec2 sp = uv * scl + vec2(fl * 7.3, fl * 3.1);
    vec2 id = floor(sp);
    float h = hash(id + fl);
    vec2 c = fract(sp) - 0.5 - (vec2(hash(id + 1.3), hash(id + 2.7)) - 0.5) * 0.6;
    float d = length(c);
    float b = pow(h, 6.0) * smoothstep(0.08, 0.0, d) * (1.0 - z) * smoothstep(0.0, 0.15, z);
    // streaks
    b += pow(h, 9.0) * smoothstep(0.02, 0.0, abs(c.y)) * smoothstep(0.35, 0.0, abs(c.x)) * z * 0.6;
    vec3 tint = mix(vec3(0.7, 0.8, 1.0), vec3(1.0, 0.85, 0.55), hash(id + 9.0));
    col += tint * b * 1.6;
  }
  col *= smoothstep(1.4, 0.3, length(uv));
  o = vec4(col, 1.0);
}`
