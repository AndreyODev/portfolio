import { lazy, Suspense, useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'

const HeroCompileScene = lazy(
  () => import('@/presentation/components/hero/HeroCompileScene'),
)

type SceneMode = 'idle' | 'high' | 'low' | 'static'

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

function detectMode(reduceMotion: boolean): SceneMode {
  if (reduceMotion || !detectWebGL()) return 'static'
  const cores = navigator.hardwareConcurrency ?? 8
  const isLowPower = window.innerWidth < 768 || cores <= 4
  return isLowPower ? 'low' : 'high'
}

/**
 * Fundo leve exibido imediatamente (sem layout shift) enquanto o bundle 3D
 * carrega, e como versão estática para reduced-motion / sem WebGL.
 */
function HeroSceneFallback({ animated }: { animated: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(171,135,49,0.16)_0%,rgba(171,135,49,0.05)_45%,transparent_72%)] blur-2xl" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(171,135,49,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(171,135,49,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
      <div
        className={`absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-2xl border border-accent/40 bg-accent/5 backdrop-blur-sm ${
          animated ? 'animate-pulse' : ''
        }`}
      />
    </div>
  )
}

export function HeroOrbitVisual() {
  const reduceMotion = usePrefersReducedMotion()
  const [mode, setMode] = useState<SceneMode>('idle')

  useEffect(() => {
    setMode(detectMode(reduceMotion))
  }, [reduceMotion])

  const showScene = mode === 'high' || mode === 'low'

  return (
    <div className="relative h-full w-full">
      <HeroSceneFallback animated={mode !== 'static'} />

      {showScene && (
        <Suspense fallback={null}>
          <HeroCompileScene quality={mode === 'low' ? 'low' : 'high'} />
        </Suspense>
      )}
    </div>
  )
}
