import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import {
  HERO_CODE_WINDOWS,
  type CodeWindowPlacement,
} from '@/presentation/components/hero/heroFloating.config'
import {
  collidesWithText,
  useHeroSafeZone,
} from '@/presentation/components/hero/HeroSafeZoneContext'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'

const CODE_COLORS = {
  kw: 'text-[#E4C77E]',
  fn: 'text-[#D6B25E]',
  type: 'text-[#C9A24B]',
  str: 'text-[#B7986A]',
  num: 'text-[#DBC488]',
  prop: 'text-[#E9E3D6]',
  txt: 'text-[#F2EFE9]',
  punc: 'text-[rgba(242,239,233,0.5)]',
  com: 'text-[rgba(242,239,233,0.32)]',
} as const

type Token = [keyof typeof CODE_COLORS, string]

const CODE_SNIPPETS: Record<CodeWindowPlacement['id'], Token[][]> = {
  'dev-ts': [
    [['kw', 'const '], ['prop', 'dev'], ['punc', ' = {']],
    [['prop', '  name'], ['punc', ': '], ['str', "'Andrey'"], ['punc', ',']],
    [['prop', '  stack'], ['punc', ': ['], ['str', "'React'"], ['punc', ', '], ['str', "'Node'"], ['punc', '],']],
    [['prop', '  role'], ['punc', ': '], ['str', "'Full Stack'"], ['punc', ',']],
    [['prop', '  learning'], ['punc', ': '], ['num', 'true'], ['punc', ',']],
    [['punc', '}']],
  ],
  'use-profile': [
    [['kw', 'export function '], ['fn', 'useProfile'], ['punc', '() {']],
    [['kw', '  const '], ['punc', '['], ['prop', 'data'], ['punc', ', '], ['prop', 'set'], ['punc', '] = '], ['fn', 'useState'], ['punc', '()']],
    [['fn', '  useEffect'], ['punc', '(() => {']],
    [['fn', '    getProfile'], ['punc', '().'], ['fn', 'then'], ['punc', '(set)']],
    [['punc', '  }, [])']],
    [['kw', '  return '], ['punc', '{ '], ['prop', 'data'], ['punc', ' }']],
    [['punc', '}']],
  ],
  'dev-java': [
    [['kw', 'public class '], ['type', 'Dev'], ['punc', ' {']],
    [['prop', '  String name'], ['punc', ' = '], ['str', '"Andrey"'], ['punc', ';']],
    [['prop', '  String[] stack'], ['punc', ' = {'], ['str', '"Java"'], ['punc', ', '], ['str', '"Spring"'], ['punc', '};']],
    [['prop', '  String role'], ['punc', ' = '], ['str', '"Full Stack"'], ['punc', ';']],
    [['prop', '  boolean learning'], ['punc', ' = '], ['num', 'true'], ['punc', ';']],
    [['punc', '}']],
  ],
}

function countChars(lines: Token[][]) {
  return lines.reduce(
    (sum, line) => sum + line.reduce((s, [, text]) => s + text.length, 0),
    0,
  )
}

function renderVisibleLine(line: Token[], remaining: number) {
  let left = remaining
  const parts: ReactNode[] = []

  for (const [color, text] of line) {
    if (left <= 0) break
    const take = Math.min(text.length, left)
    parts.push(
      <span key={`${color}-${parts.length}`} className={CODE_COLORS[color]}>
        {text.slice(0, take)}
      </span>,
    )
    left -= take
  }

  return parts
}

function placementStyle(placement: CodeWindowPlacement): CSSProperties {
  return {
    top: placement.top,
    right: placement.right,
    bottom: placement.bottom,
    left: placement.left,
    transform: `rotate(${placement.rotate}deg)`,
  }
}

function FloatingCodeWindow({
  placement,
  reduceMotion,
}: {
  placement: CodeWindowPlacement
  reduceMotion: boolean
}) {
  const { safeZone, textBuffer } = useHeroSafeZone()
  const lines = CODE_SNIPPETS[placement.id]
  const total = countChars(lines)
  const [visible, setVisible] = useState(reduceMotion ? total : 0)
  const [offsetY, setOffsetY] = useState(0)
  const [hidden, setHidden] = useState(false)
  const nodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion) {
      setVisible(total)
      return
    }

    let chars = 0
    let holdTimer: ReturnType<typeof setTimeout> | null = null
    let tickTimer: ReturnType<typeof setInterval> | null = null

    const startTyping = () => {
      chars = 0
      setVisible(0)
      tickTimer = setInterval(() => {
        chars += 1
        setVisible(chars)
        if (chars >= total) {
          if (tickTimer) clearInterval(tickTimer)
          holdTimer = setTimeout(startTyping, 2400)
        }
      }, 38)
    }

    startTyping()

    return () => {
      if (tickTimer) clearInterval(tickTimer)
      if (holdTimer) clearTimeout(holdTimer)
    }
  }, [reduceMotion, total])

  useLayoutEffect(() => {
    const node = nodeRef.current
    if (!node) return

    const hero = node.closest('#hero')
    if (!hero) return

    const measure = () => {
      const heroRect = hero.getBoundingClientRect()
      const nodeRect = node.getBoundingClientRect()
      const relativeBottom = nodeRect.bottom - heroRect.top
      const relativeTop = nodeRect.top - heroRect.top

      let nextOffset = 0
      let shouldHide = false

      if (safeZone) {
        const maxBottom = safeZone.top - textBuffer
        if (relativeBottom > maxBottom) {
          nextOffset = maxBottom - relativeBottom
        }

        const adjustedTop = relativeTop + nextOffset

        if (adjustedTop < 56) {
          shouldHide = true
        }

        const adjustedRect = new DOMRect(
          nodeRect.left,
          nodeRect.top + nextOffset,
          nodeRect.width,
          nodeRect.height,
        )

        if (collidesWithText(adjustedRect, safeZone, textBuffer)) {
          shouldHide = true
        }
      }

      if (window.innerWidth < 1280 && placement.priority >= 3) {
        shouldHide = true
      }

      if (window.innerWidth < 1120 && placement.priority >= 2 && placement.id !== 'dev-java') {
        shouldHide = true
      }

      setOffsetY(nextOffset)
      setHidden(shouldHide)
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(node)
    observer.observe(hero)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [placement.id, placement.priority, safeZone, textBuffer])

  let remaining = Math.floor(visible)

  if (hidden) return null

  return (
    <div
      ref={nodeRef}
      aria-hidden="true"
      className={`pointer-events-none absolute z-[5] rounded-2xl border border-accent/55 bg-[rgba(10,9,8,0.92)] shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-transform duration-200 ${placement.widthClass} ${placement.responsive}`}
      style={{
        ...placementStyle(placement),
        transform: `translateY(${offsetY}px) rotate(${placement.rotate}deg)`,
      }}
    >
      <div className="flex items-center gap-2 rounded-t-2xl border-b border-accent/10 bg-accent/[0.06] px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#8a6f2a]" />
          <span className="h-2 w-2 rounded-full bg-[#ab8731]" />
          <span className="h-2 w-2 rounded-full bg-[#d9be81]" />
        </div>
        <span className="truncate font-mono text-[0.62rem] font-medium tracking-wide text-text-primary/40">
          {placement.title}
        </span>
      </div>

      <pre className="overflow-hidden px-3 py-2.5 font-mono text-[clamp(0.5rem,0.8vw,0.66rem)] leading-[1.55]">
        {lines.map((line, li) => {
          const lineContent = renderVisibleLine(line, remaining)
          remaining -= line.reduce((s, [, text]) => s + text.length, 0)
          return (
            <div key={li} className="whitespace-pre">
              {lineContent}
            </div>
          )
        })}
      </pre>
    </div>
  )
}

export function HeroFloatingCodeWindows() {
  const reduceMotion = usePrefersReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {HERO_CODE_WINDOWS.map((placement) => (
        <FloatingCodeWindow
          key={placement.id}
          placement={placement}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  )
}
