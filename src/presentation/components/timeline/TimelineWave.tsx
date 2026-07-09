const ITEM_HEIGHT = 160
const CENTER_X = 200
const OFFSET_X = 72

function buildWavePath(count: number): { d: string; height: number } {
  if (count === 0) return { d: '', height: 0 }

  const height = count * ITEM_HEIGHT
  let d = `M ${CENTER_X} 0`

  for (let i = 0; i < count; i++) {
    const y = i * ITEM_HEIGHT + ITEM_HEIGHT / 2
    const x = i % 2 === 0 ? CENTER_X - OFFSET_X : CENTER_X + OFFSET_X

    if (i === 0) {
      d += ` Q ${x} ${y / 2}, ${x} ${y}`
    } else {
      const prevY = (i - 1) * ITEM_HEIGHT + ITEM_HEIGHT / 2
      const midY = (prevY + y) / 2
      const prevX =
        (i - 1) % 2 === 0 ? CENTER_X - OFFSET_X : CENTER_X + OFFSET_X
      d += ` C ${prevX} ${midY}, ${x} ${midY}, ${x} ${y}`
    }
  }

  d += ` L ${CENTER_X} ${height}`

  return { d, height }
}

interface TimelineWaveProps {
  count: number
}

export function TimelineWave({ count }: TimelineWaveProps) {
  const { d, height } = buildWavePath(count)

  if (count === 0) return null

  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-0 hidden w-full max-w-md -translate-x-1/2 md:block"
      viewBox={`0 0 400 ${height}`}
      height={height}
      preserveAspectRatio="xMidYMin meet"
      aria-hidden="true"
    >
      <path
        d={d}
        fill="none"
        stroke="rgba(171, 135, 49, 0.35)"
        strokeWidth="1.5"
        strokeDasharray="6 6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export { ITEM_HEIGHT }
