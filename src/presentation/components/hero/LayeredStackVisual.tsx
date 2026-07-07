import { useCallback, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'
import {
  LAYER_CONNECTIONS,
  STACK_LAYERS,
} from '@/presentation/components/hero/layeredStack.config'

interface PointerOffset {
  x: number
  y: number
}

export function LayeredStackVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState<PointerOffset>({ x: 0, y: 0 })
  const prefersReducedMotion = usePrefersReducedMotion()

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5

      setOffset({ x, y })
    },
    [prefersReducedMotion],
  )

  const handlePointerLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 })
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-[280px] w-full max-w-[320px] select-none sm:max-w-none"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {LAYER_CONNECTIONS.map((line, index) => (
          <g key={index}>
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="var(--color-accent)"
              strokeWidth="1"
              strokeOpacity="0.45"
              strokeDasharray="4 4"
            />
            <circle
              cx={line.x1}
              cy={line.y1}
              r="2.5"
              fill="var(--color-accent)"
              fillOpacity="0.7"
            />
          </g>
        ))}
        <circle
          cx={LAYER_CONNECTIONS[2].x2}
          cy={LAYER_CONNECTIONS[2].y2}
          r="2.5"
          fill="var(--color-accent)"
          fillOpacity="0.7"
        />
      </svg>

      {STACK_LAYERS.map((layer) => {
        const translateX = prefersReducedMotion ? 0 : offset.x * layer.depth * 18
        const translateY = prefersReducedMotion ? 0 : offset.y * layer.depth * 14

        return (
          <div
            key={layer.id}
            className="absolute w-[200px] border border-accent/40 bg-bg-surface/70 px-4 py-3 backdrop-blur-sm transition-transform duration-200 ease-out sm:w-[220px]"
            style={{
              top: layer.top,
              left: layer.left,
              transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
              zIndex: Math.round(layer.depth * 10),
            }}
          >
            <p className="font-mono text-label uppercase text-accent">
              {layer.label}
            </p>
            <p className="mt-1 font-mono text-[0.65rem] text-text-primary/45">
              {layer.tech}
            </p>
          </div>
        )
      })}
    </div>
  )
}
