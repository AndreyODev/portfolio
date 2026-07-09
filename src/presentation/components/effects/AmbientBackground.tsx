import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'

const ACCENT = { r: 171, g: 135, b: 49 }
const ACCENT_LIGHT = { r: 217, g: 190, b: 129 }

interface Point3D {
  x: number
  y: number
  z: number
}

interface ProjectedPoint {
  x: number
  y: number
  depth: number
  scale: number
}

function rotateY(point: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return {
    x: point.x * cos + point.z * sin,
    y: point.y,
    z: -point.x * sin + point.z * cos,
  }
}

function rotateX(point: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos,
  }
}

function rotateZ(point: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
    z: point.z,
  }
}

function project(
  point: Point3D,
  width: number,
  height: number,
  fov: number,
  offsetX: number,
  offsetY: number,
): ProjectedPoint | null {
  const depth = fov + point.z
  if (depth <= 1) return null

  const scale = fov / depth
  return {
    x: width / 2 + point.x * scale + offsetX,
    y: height * 0.52 + point.y * scale + offsetY,
    depth,
    scale,
  }
}

function createIcosahedronVertices(radius: number): Point3D[] {
  const phi = (1 + Math.sqrt(5)) / 2
  const scale = radius / Math.sqrt(1 + phi * phi)

  const raw: Point3D[] = [
    { x: -1, y: phi, z: 0 },
    { x: 1, y: phi, z: 0 },
    { x: -1, y: -phi, z: 0 },
    { x: 1, y: -phi, z: 0 },
    { x: 0, y: -1, z: phi },
    { x: 0, y: 1, z: phi },
    { x: 0, y: -1, z: -phi },
    { x: 0, y: 1, z: -phi },
    { x: phi, y: 0, z: -1 },
    { x: phi, y: 0, z: 1 },
    { x: -phi, y: 0, z: -1 },
    { x: -phi, y: 0, z: 1 },
  ]

  return raw.map((point) => ({
    x: point.x * scale,
    y: point.y * scale,
    z: point.z * scale,
  }))
}

const ICOSAHEDRON_EDGES: [number, number][] = [
  [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
  [1, 5], [1, 7], [1, 8], [1, 9],
  [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
  [3, 4], [3, 6], [3, 8], [3, 9],
  [4, 9], [4, 11], [5, 10], [5, 11],
  [6, 7], [6, 10], [7, 8], [8, 9],
]

function createOrbitRing(segments: number, radiusX: number, radiusZ: number, y: number) {
  return Array.from({ length: segments }, (_, index) => {
    const angle = (index / segments) * Math.PI * 2
    return {
      x: Math.cos(angle) * radiusX,
      y,
      z: Math.sin(angle) * radiusZ,
    }
  })
}

function drawAmbientGlow(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  parallaxX: number,
  parallaxY: number,
) {
  const primary = context.createRadialGradient(
    width * 0.68 + parallaxX,
    height * 0.34 + parallaxY,
    0,
    width * 0.68 + parallaxX,
    height * 0.34 + parallaxY,
    Math.max(width, height) * 0.55,
  )
  primary.addColorStop(0, 'rgba(171, 135, 49, 0.12)')
  primary.addColorStop(0.55, 'rgba(171, 135, 49, 0.04)')
  primary.addColorStop(1, 'rgba(0, 0, 0, 0)')
  context.fillStyle = primary
  context.fillRect(0, 0, width, height)

  const secondary = context.createRadialGradient(
    width * 0.24 - parallaxX * 0.35,
    height * 0.68 - parallaxY * 0.35,
    0,
    width * 0.24 - parallaxX * 0.35,
    height * 0.68 - parallaxY * 0.35,
    Math.max(width, height) * 0.42,
  )
  secondary.addColorStop(0, 'rgba(217, 190, 129, 0.07)')
  secondary.addColorStop(1, 'rgba(0, 0, 0, 0)')
  context.fillStyle = secondary
  context.fillRect(0, 0, width, height)
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return

    let frameId = 0
    let width = 0
    let height = 0
    let dpr = 1
    let time = 0
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let parallaxX = 0
    let parallaxY = 0

    const icosahedron = createIcosahedronVertices(4.2)
    const orbitRings = [
      createOrbitRing(72, 7.2, 7.2, -0.4),
      createOrbitRing(56, 9.4, 5.6, 0.2),
      createOrbitRing(64, 6.4, 8.8, 0.8),
    ]

    const drawStaticFallback = () => {
      context.clearRect(0, 0, width, height)
      drawAmbientGlow(context, width, height, 0, 0)
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (reduceMotion) {
        drawStaticFallback()
      }
    }

    const handleMove = (event: MouseEvent) => {
      mouseX = (event.clientX / width - 0.5) * 2
      mouseY = (event.clientY / height - 0.5) * 2
      cursorX = event.clientX
      cursorY = event.clientY
    }

    const drawWireframeShape = (
      points: Point3D[],
      edges: [number, number][],
      options: {
        spinX: number
        spinY: number
        spinZ: number
        offsetX: number
        offsetY: number
        lineAlpha: number
        lineWidth: number
      },
    ) => {
      const projected = points
        .map((point) => {
          let transformed = rotateX(point, options.spinX)
          transformed = rotateY(transformed, options.spinY)
          transformed = rotateZ(transformed, options.spinZ)
          const screen = project(
            transformed,
            width,
            height,
            520,
            options.offsetX,
            options.offsetY,
          )
          return screen
        })
        .filter((entry): entry is ProjectedPoint => entry !== null)

      for (const [from, to] of edges) {
        const start = projected[from]
        const end = projected[to]
        if (!start || !end) continue

        const depthAlpha = Math.min(1, 220 / ((start.depth + end.depth) / 2))
        const alpha = options.lineAlpha * depthAlpha

        context.strokeStyle = `rgba(${ACCENT_LIGHT.r}, ${ACCENT_LIGHT.g}, ${ACCENT_LIGHT.b}, ${alpha})`
        context.lineWidth = options.lineWidth
        context.beginPath()
        context.moveTo(start.x, start.y)
        context.lineTo(end.x, end.y)
        context.stroke()
      }

      for (const vertex of projected) {
        const alpha = Math.min(0.9, 160 / vertex.depth) * 0.75
        const radius = Math.max(1.1, 2.4 * vertex.scale)

        const glow = context.createRadialGradient(
          vertex.x,
          vertex.y,
          0,
          vertex.x,
          vertex.y,
          radius * 3,
        )
        glow.addColorStop(0, `rgba(${ACCENT_LIGHT.r}, ${ACCENT_LIGHT.g}, ${ACCENT_LIGHT.b}, ${alpha})`)
        glow.addColorStop(1, 'rgba(171, 135, 49, 0)')

        context.fillStyle = glow
        context.beginPath()
        context.arc(vertex.x, vertex.y, radius * 3, 0, Math.PI * 2)
        context.fill()
      }
    }

    const drawOrbitRing = (
      ring: Point3D[],
      options: {
        spinX: number
        spinY: number
        offsetX: number
        offsetY: number
        alpha: number
      },
    ) => {
      const projected = ring
        .map((point) => {
          let transformed = rotateX(point, options.spinX)
          transformed = rotateY(transformed, options.spinY)
          return project(transformed, width, height, 520, options.offsetX, options.offsetY)
        })
        .filter((entry): entry is ProjectedPoint => entry !== null)

      if (projected.length < 2) return

      context.strokeStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${options.alpha})`
      context.lineWidth = 0.85
      context.beginPath()
      context.moveTo(projected[0].x, projected[0].y)
      for (let index = 1; index < projected.length; index += 1) {
        context.lineTo(projected[index].x, projected[index].y)
      }
      context.closePath()
      context.stroke()
    }

    const drawGridFloor = (
      spinY: number,
      offsetX: number,
      offsetY: number,
    ) => {
      const extent = width < 768 ? 7 : 10
      const step = 1.1
      const gridY = 2.8

      const transform = (x: number, z: number) => {
        let point = rotateX({ x, y: gridY, z }, 1.05)
        point = rotateY(point, spinY)
        return project(point, width, height, 520, offsetX, offsetY)
      }

      context.lineWidth = 0.65

      for (let index = -extent; index <= extent; index += 1) {
        const offset = index * step
        const lineAlpha = 0.08 + (1 - Math.abs(index) / extent) * 0.14

        context.strokeStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${lineAlpha})`

        context.beginPath()
        for (let stepIndex = -extent; stepIndex <= extent; stepIndex += 0.5) {
          const projected = transform(stepIndex * step, offset)
          if (!projected) continue
          if (stepIndex === -extent) context.moveTo(projected.x, projected.y)
          else context.lineTo(projected.x, projected.y)
        }
        context.stroke()

        context.beginPath()
        for (let stepIndex = -extent; stepIndex <= extent; stepIndex += 0.5) {
          const projected = transform(offset, stepIndex * step)
          if (!projected) continue
          if (stepIndex === -extent) context.moveTo(projected.x, projected.y)
          else context.lineTo(projected.x, projected.y)
        }
        context.stroke()
      }
    }

    const draw = () => {
      if (reduceMotion) {
        drawStaticFallback()
        return
      }

      if (document.hidden) {
        frameId = requestAnimationFrame(draw)
        return
      }

      time += 0.005
      parallaxX += (mouseX * 28 - parallaxX) * 0.04
      parallaxY += (mouseY * 18 - parallaxY) * 0.04

      context.clearRect(0, 0, width, height)
      drawAmbientGlow(context, width, height, parallaxX, parallaxY)

      const spinY = time * 0.18
      const spinX = 0.42 + Math.sin(time * 0.22) * 0.06
      const spinZ = Math.sin(time * 0.15) * 0.12
      const offsetX = parallaxX * 0.55 + width * 0.08
      const offsetY = parallaxY * 0.35

      drawGridFloor(spinY * 0.65, offsetX * 0.25, offsetY * 0.15)

      drawOrbitRing(orbitRings[0], {
        spinX: spinX + 0.55,
        spinY: spinY * 1.1,
        offsetX,
        offsetY,
        alpha: 0.22,
      })
      drawOrbitRing(orbitRings[1], {
        spinX: spinX + 0.2,
        spinY: -spinY * 0.85,
        offsetX,
        offsetY,
        alpha: 0.16,
      })
      drawOrbitRing(orbitRings[2], {
        spinX: spinX + 0.95,
        spinY: spinY * 0.55,
        offsetX,
        offsetY,
        alpha: 0.12,
      })

      drawWireframeShape(icosahedron, ICOSAHEDRON_EDGES, {
        spinX,
        spinY,
        spinZ,
        offsetX,
        offsetY,
        lineAlpha: 0.42,
        lineWidth: 0.9,
      })

      const sparkCount = width < 768 ? 18 : 28
      for (let index = 0; index < sparkCount; index += 1) {
        const angle = (index / sparkCount) * Math.PI * 2 + time * 0.35
        const radius = 8 + (index % 5) * 1.6
        const point = rotateY(
          rotateX(
            {
              x: Math.cos(angle) * radius,
              y: Math.sin(time * 0.8 + index) * 1.8,
              z: Math.sin(angle) * radius,
            },
            spinX,
          ),
          spinY,
        )
        const projected = project(point, width, height, 520, offsetX * 0.4, offsetY * 0.25)
        if (!projected) continue

        const screenDist = Math.hypot(projected.x - cursorX, projected.y - cursorY)
        const cursorBoost = Math.max(0, 1 - screenDist / 220) * 0.45
        const alpha = Math.min(0.75, 150 / projected.depth) * 0.35 + cursorBoost

        context.fillStyle = `rgba(${ACCENT_LIGHT.r}, ${ACCENT_LIGHT.g}, ${ACCENT_LIGHT.b}, ${alpha})`
        context.beginPath()
        context.arc(projected.x, projected.y, Math.max(0.8, 1.6 * projected.scale), 0, Math.PI * 2)
        context.fill()
      }

      frameId = requestAnimationFrame(draw)
    }

    resize()

    if (!reduceMotion) {
      frameId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMove, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(frameId)
    }
  }, [reduceMotion])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/10 via-transparent to-bg-primary/45" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.42)_100%)]" />
    </div>
  )
}
