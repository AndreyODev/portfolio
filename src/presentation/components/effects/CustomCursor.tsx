import { useEffect, useRef } from 'react'
import { useHasFinePointer } from '@/shared/hooks/useHasFinePointer'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'

const LERP_RING = 0.14
const LERP_DOT = 0.38
const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, summary, [role="button"], [data-cursor-hover]'

export function CustomCursor() {
  const hasFinePointer = useHasFinePointer()
  const reduceMotion = usePrefersReducedMotion()
  const enabled = hasFinePointer && !reduceMotion

  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const dot = useRef({ x: 0, y: 0 })
  const visible = useRef(false)
  const hovering = useRef(false)

  useEffect(() => {
    if (!enabled) return

    document.body.classList.add('custom-cursor-active')

    const handleMove = (event: MouseEvent) => {
      target.current = { x: event.clientX, y: event.clientY }
      visible.current = true
    }

    const handleLeave = () => {
      visible.current = false
    }

    const handleOver = (event: MouseEvent) => {
      const targetEl = event.target
      if (!(targetEl instanceof Element)) return
      hovering.current = Boolean(targetEl.closest(INTERACTIVE_SELECTOR))
    }

    let frameId = 0

    const animate = () => {
      ring.current.x += (target.current.x - ring.current.x) * LERP_RING
      ring.current.y += (target.current.y - ring.current.y) * LERP_RING
      dot.current.x += (target.current.x - dot.current.x) * LERP_DOT
      dot.current.y += (target.current.y - dot.current.y) * LERP_DOT

      const opacity = visible.current ? 1 : 0
      const scale = hovering.current ? 1.55 : 1

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${scale})`
        ringRef.current.style.opacity = String(opacity)
        ringRef.current.style.borderColor = hovering.current
          ? 'rgba(217, 190, 129, 0.65)'
          : 'rgba(171, 135, 49, 0.5)'
        ringRef.current.style.boxShadow = hovering.current
          ? '0 0 28px rgba(217, 190, 129, 0.25)'
          : '0 0 20px rgba(171, 135, 49, 0.15)'
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%)`
        dotRef.current.style.opacity = String(opacity)
      }

      frameId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('mouseover', handleOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleLeave)
    frameId = requestAnimationFrame(animate)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      cancelAnimationFrame(frameId)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[120]"
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border bg-accent/[0.04] transition-[border-color,box-shadow] duration-300 will-change-transform"
        style={{ opacity: 0 }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-accent-light/80 will-change-transform"
        style={{ opacity: 0 }}
      />
    </div>
  )
}
