import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import { HERO_TEXT_BUFFER, HERO_FLOAT_MIN_GAP } from '@/presentation/components/hero/heroFloating.config'

export interface HeroSafeZone {
  top: number
  left: number
  right: number
  bottom: number
  width: number
  height: number
}

interface HeroSafeZoneContextValue {
  safeZone: HeroSafeZone | null
  minGap: number
  textBuffer: number
}

const HeroSafeZoneContext = createContext<HeroSafeZoneContextValue | null>(null)

export function useHeroSafeZone() {
  const ctx = useContext(HeroSafeZoneContext)
  if (!ctx) {
    throw new Error('useHeroSafeZone must be used within HeroSafeZoneProvider')
  }
  return ctx
}

function rectsOverlap(a: DOMRect, b: HeroSafeZone, buffer: number) {
  return !(
    a.right <= b.left - buffer ||
    a.left >= b.right + buffer ||
    a.bottom <= b.top - buffer ||
    a.top >= b.bottom + buffer
  )
}

export function collidesWithText(
  rect: DOMRect,
  safeZone: HeroSafeZone | null,
  textBuffer: number,
) {
  if (!safeZone) return false
  return rectsOverlap(rect, safeZone, textBuffer)
}

interface HeroSafeZoneProviderProps {
  heroRef: RefObject<HTMLElement | null>
  textRef: RefObject<HTMLElement | null>
  children: ReactNode
}

export function HeroSafeZoneProvider({
  heroRef,
  textRef,
  children,
}: HeroSafeZoneProviderProps) {
  const [safeZone, setSafeZone] = useState<HeroSafeZone | null>(null)

  const updateSafeZone = useCallback(() => {
    const hero = heroRef.current
    const text = textRef.current
    if (!hero || !text) return

    const heroRect = hero.getBoundingClientRect()
    const textRect = text.getBoundingClientRect()

    setSafeZone({
      top: textRect.top - heroRect.top,
      left: textRect.left - heroRect.left,
      right: textRect.right - heroRect.left,
      bottom: textRect.bottom - heroRect.top,
      width: textRect.width,
      height: textRect.height,
    })
  }, [heroRef, textRef])

  useEffect(() => {
    updateSafeZone()

    const hero = heroRef.current
    const text = textRef.current
    if (!hero || !text) return

    const observer = new ResizeObserver(updateSafeZone)
    observer.observe(hero)
    observer.observe(text)
    window.addEventListener('resize', updateSafeZone)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateSafeZone)
    }
  }, [heroRef, textRef, updateSafeZone])

  const value = useMemo(
    () => ({
      safeZone,
      minGap: HERO_FLOAT_MIN_GAP,
      textBuffer: HERO_TEXT_BUFFER,
    }),
    [safeZone],
  )

  return (
    <HeroSafeZoneContext.Provider value={value}>{children}</HeroSafeZoneContext.Provider>
  )
}
