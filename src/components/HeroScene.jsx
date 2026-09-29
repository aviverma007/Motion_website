import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshReflectorMaterial, Environment, Lightformer } from '@react-three/drei'

const C = {
  bg: '#efdcd4',
  wall: '#ecd2c9',
  stair: '#f4e5de',
  stone: '#e2cbc2',
  pearl: '#f7ebe6',
  water: '#e4d3d6',
  skyTop: '#f6c8b4',
  skyBottom: '#d3e3ea',
}

const FLOOR_Y = -1

/** Rect-plus-semicircle opening, drawn clockwise as a hole path. */
function archPath(cx, bottom, width, rectHeight) {
  const r = width / 2
  const p = new THREE.Path()
  p.moveTo(cx - r, bottom)
  p.lineTo(cx + r, bottom)
  p.lineTo(cx + r, bottom + rectHeight)
  p.absarc(cx, bottom + rectHeight, r, 0, Math.PI, false)
  p.lineTo(cx - r, bottom)
  return p
}

function ArchWall() {
  const geometry = useMemo(() => {
    const w = 16
    const h = 8
    const s = new THREE.Shape()
    s.moveTo(-w / 2, FLOOR_Y)
    s.lineTo(w / 2, FLOOR_Y)
    s.lineTo(w / 2, FLOOR_Y + h)
    s.lineTo(-w / 2, FLOOR_Y + h)
    s.lineTo(-w / 2, FLOOR_Y)
    s.holes.push(archPath(-3.1, FLOOR_Y, 2.1, 2.5)) // doorway
    s.holes.push(archPath(0.9, 1.5, 1.0, 1.2)) // window above the stairs
    s.holes.push(archPath(3.6, FLOOR_Y + 0.6, 1.3, 1.9)) // side arch
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.5, bevelEnabled: false, curveSegments: 40 })
    g.translate(0, 0, -0.5)
    return g
  }, [])

  return (
    <mesh geometry={geometry} position={[0, 0, -3]} castShadow receiveShadow>
      <meshStandardMaterial color={C.wall} roughness={0.95} />
    </mesh>
  )
}

/** Gradient backdrop seen through the arches. */
function Sky() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          top: { value: new THREE.Color(C.skyTop) },
          bottom: { value: new THREE.Color(C.skyBottom) },
        },
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 top; uniform vec3 bottom; varying vec2 vUv;
          void main(){ gl_FragColor = vec4(mix(bottom, top, smoothstep(0.15, 0.95, vUv.y)), 1.0); }`,
        depthWrite: false,
      }),
    [],
  )
  return (
    <group>
      <mesh position={[0, 3, -9]} material={material}>
        <planeGeometry args={[40, 16]} />
      </mesh>
      {/* distant dune seen through the doorway */}
      <mesh position={[-4.5, -1.6, -7]} scale={[4, 1.4, 1]}>
        <sphereGeometry args={[1, 48, 24]} />
        <meshStandardMaterial color="#e7c3bd" roughness={1} />
      </mesh>
    </group>
  )
}

function Stairs() {
  const steps = 6
  const rise = 0.2
  const run = 0.38
  return (
    <group position={[0.9, 0, -3]}>
      {Array.from({ length: steps }, (_, i) => {
        const height = rise * (steps - i)
        return (
          <mesh
            key={i}
            position={[0, FLOOR_Y + height / 2, i * run + run / 2]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[2.2, height, run]} />
            <meshStandardMaterial color={C.stair} roughness={0.9} />
          </mesh>
        )
      })}
    </group>
  )
}

function Stones() {
  return (
    <group>
      <mesh position={[3.4, FLOOR_Y + 0.25, -0.6]} scale={[0.95, 0.6, 0.8]} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 32]} />
        <meshStandardMaterial color={C.stone} roughness={1} />
      </mesh>
      <mesh position={[4.6, FLOOR_Y + 0.05, 0.4]} scale={[0.45, 0.28, 0.4]} castShadow>
        <sphereGeometry args={[1, 48, 24]} />
        <meshStandardMaterial color={C.stone} roughness={1} />
      </mesh>
      {/* column stub */}
      <mesh position={[-4.4, FLOOR_Y + 0.55, -1.4]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.45, 1.1, 48]} />
        <meshStandardMaterial color={C.stair} roughness={0.9} />
      </mesh>
    </group>
  )
}

function Pearls({ animate }) {
  return (
    <group>
      <Float enabled={animate} speed={1.2} rotationIntensity={0} floatIntensity={1.1}>
        <mesh position={[-4.4, 0.55, -1.4]} castShadow>
          <sphereGeometry args={[0.42, 64, 32]} />
          <meshPhysicalMaterial color={C.pearl} roughness={0.25} clearcoat={1} clearcoatRoughness={0.15} />
        </mesh>
      </Float>
      <Float enabled={animate} speed={1.6} rotationIntensity={0} floatIntensity={1.6}>
        <mesh position={[2.3, 1.1, 0.2]} castShadow>
          <sphereGeometry args={[0.2, 48, 24]} />
          <meshPhysicalMaterial color="#f2d2c8" roughness={0.3} clearcoat={1} />
        </mesh>
      </Float>
    </group>
  )
}

function Water({ quality }) {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, FLOOR_Y + 0.001, 0]} receiveShadow>
      <planeGeometry args={[40, 30]} />
      <MeshReflectorMaterial
        resolution={quality === 'low' ? 256 : 768}
        blur={[400, 120]}
        mixBlur={1}
        mixStrength={1.6}
        mirror={0.45}
        depthScale={0.6}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.2}
        color={C.water}
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  )
}

/** Eases the camera in on load, then follows the pointer gently. */
function CameraRig({ animate }) {
  const start = useRef(null)
  const look = useMemo(() => new THREE.Vector3(0, 0.5, -2.4), [])
  useFrame((state, delta) => {
    const cam = state.camera
    // narrow screens need the camera further back to keep the arches in frame
    const aspect = state.size.width / state.size.height
    const restZ = aspect < 1 ? 6.8 + (1 - aspect) * 9 : 6.8
    if (!animate) {
      cam.position.set(0, 0.45, restZ)
      cam.lookAt(look)
      return
    }
    if (start.current === null) start.current = state.clock.elapsedTime
    const t = Math.min((state.clock.elapsedTime - start.current) / 2.4, 1)
    const intro = 1 - Math.pow(1 - t, 3)
    const tx = state.pointer.x * 0.55
    const ty = 0.45 + state.pointer.y * 0.22
    const tz = restZ + 2.7 - intro * 2.7
    const k = 1 - Math.exp(-delta * 3)
    cam.position.x += (tx - cam.position.x) * k
    cam.position.y += (ty - cam.position.y) * k
    cam.position.z = t < 1 ? tz : cam.position.z + (restZ - cam.position.z) * k
    cam.lookAt(look)
  })
  return null
}

export default function HeroScene({ active = true, reducedMotion = false, quality = 'high' }) {
  const animate = active && !reducedMotion
  return (
    <Canvas
      shadows
      dpr={quality === 'low' ? [1, 1.25] : [1, 1.75]}
      frameloop={animate ? 'always' : 'demand'}
      camera={{ position: [0, 0.45, 9.5], fov: 38, near: 0.1, far: 60 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <color attach="background" args={[C.bg]} />
      <fog attach="fog" args={[C.bg, 11, 26]} />

      <hemisphereLight args={['#fff4ee', '#e6d2d4', 1.25]} />
      {/* low sun behind the wall so light falls through the arches */}
      <directionalLight
        position={[-4, 5.5, -10]}
        intensity={3.2}
        color="#fff0e2"
        castShadow
        shadow-mapSize={[1536, 1536]}
        shadow-bias={-0.0004}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={7}
        shadow-camera-bottom={-5}
        shadow-camera-far={30}
      />
      <directionalLight position={[3, 3, 8]} intensity={0.9} color="#ffe9e2" />

      <Environment resolution={128} frames={1}>
        <Lightformer intensity={1.2} color="#ffe6dc" position={[0, 4, 6]} scale={[10, 4, 1]} />
        <Lightformer intensity={0.6} color="#dfe8f2" position={[-6, 2, 0]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} />
      </Environment>

      <Sky />
      <ArchWall />
      <Stairs />
      <Stones />
      <Pearls animate={animate} />
      <Water quality={quality} />
      <CameraRig animate={animate} />
    </Canvas>
  )
}
