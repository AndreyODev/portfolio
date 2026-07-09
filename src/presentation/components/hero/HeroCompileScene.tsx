import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Grid } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'
import { colors } from '@/shared/theme/colors'

const CONFIG = {
  camera: { z: 6.4, fov: 48, lookAtY: 0.15 },
  swayAmplitude: 0.26,
  swaySpeed: 0.16,
  parallaxStrength: 0.5,
  parallaxEase: 0.045,
  scrollZoom: 1.1,
  coreRadius: 1.28,
  coreInnerScale: 0.44,
  corePulseSpeed: 1.5,
  corePulseAmount: 0.07,
  bloomIntensity: 0.95,
  bloomThreshold: 0.22,
  bloomRadius: 0.72,
} as const

const LOW_QUALITY_OVERRIDES = {
  swayAmplitude: 0.18,
}

const ACCENT = new THREE.Color(colors.accent.DEFAULT)
const ACCENT_LIGHT = new THREE.Color(colors.accent.light)
const CORE_POS = new THREE.Vector3(0, 0.25, 0)

function CanvasResize() {
  const { camera, gl, size } = useThree()

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return
    camera.aspect = size.width / Math.max(size.height, 1)
    camera.updateProjectionMatrix()
    gl.setSize(size.width, size.height)
  }, [camera, gl, size.width, size.height])

  return null
}

function CompileCore() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    const pulse =
      CONFIG.coreRadius * (1 + Math.sin(t * CONFIG.corePulseSpeed) * CONFIG.corePulseAmount)
    groupRef.current.scale.setScalar(pulse)
    groupRef.current.rotation.y = t * 0.25
    groupRef.current.rotation.x = t * 0.12
  })

  return (
    <group position={CORE_POS.toArray()}>
      <group ref={groupRef}>
        <mesh>
          <icosahedronGeometry args={[CONFIG.coreRadius, 0]} />
          <meshBasicMaterial wireframe color={ACCENT} transparent opacity={0.6} toneMapped={false} />
        </mesh>
        <mesh scale={CONFIG.coreInnerScale}>
          <icosahedronGeometry args={[CONFIG.coreRadius, 0]} />
          <meshBasicMaterial
            color={ACCENT_LIGHT}
            transparent
            opacity={0.95}
            toneMapped={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  )
}

function Rig() {
  const { camera } = useThree()
  const pointer = useRef({ x: 0, y: 0 })
  const scroll = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onScroll = () => {
      scroll.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight))
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useFrame(() => {
    const tx = pointer.current.x * CONFIG.parallaxStrength
    const ty = -pointer.current.y * CONFIG.parallaxStrength
    const tz = CONFIG.camera.z + scroll.current * CONFIG.scrollZoom
    camera.position.x += (tx - camera.position.x) * CONFIG.parallaxEase
    camera.position.y += (ty - camera.position.y) * CONFIG.parallaxEase
    camera.position.z += (tz - camera.position.z) * CONFIG.parallaxEase
    camera.lookAt(0, CONFIG.camera.lookAtY, 0)
  })

  return null
}

function SceneContent({ quality }: { quality: 'high' | 'low' }) {
  const sceneRef = useRef<THREE.Group>(null)
  const sway =
    quality === 'low' ? LOW_QUALITY_OVERRIDES.swayAmplitude : CONFIG.swayAmplitude

  useFrame((state) => {
    if (!sceneRef.current) return
    const t = state.clock.elapsedTime
    sceneRef.current.rotation.y = Math.sin(t * CONFIG.swaySpeed) * sway
    sceneRef.current.rotation.x = Math.sin(t * CONFIG.swaySpeed * 0.7) * sway * 0.3
  })

  return (
    <>
      <CanvasResize />
      <Rig />

      <Grid
        position={[0, -2.7, 0]}
        args={[24, 24]}
        cellSize={0.6}
        cellThickness={0.5}
        cellColor="#3a2f14"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#5c4a1f"
        fadeDistance={17}
        fadeStrength={2.5}
        infiniteGrid
      />

      <group ref={sceneRef}>
        <CompileCore />
      </group>

      {quality === 'high' && (
        <EffectComposer>
          <Bloom
            intensity={CONFIG.bloomIntensity}
            luminanceThreshold={CONFIG.bloomThreshold}
            radius={CONFIG.bloomRadius}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </>
  )
}

export default function HeroCompileScene({ quality = 'high' }: { quality?: 'high' | 'low' }) {
  const dpr = useMemo(
    () => (quality === 'low' ? ([1, 1.5] as [number, number]) : ([1, 2] as [number, number])),
    [quality],
  )

  return (
    <Canvas
      className="!absolute inset-0 h-full w-full"
      camera={{ position: [0, 0, CONFIG.camera.z], fov: CONFIG.camera.fov }}
      dpr={dpr}
      gl={{
        antialias: quality === 'high',
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <SceneContent quality={quality} />
      </Suspense>
    </Canvas>
  )
}
