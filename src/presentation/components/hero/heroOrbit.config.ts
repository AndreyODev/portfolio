export interface OrbitTech {
  id: string
  label: string
  imageSrc: string
  /** Posição em % do container (0–100) */
  x: number
  y: number
  /** Inclinação leve do card, como na referência */
  rotation: number
  floatDelay: number
}

export interface OrbitEllipse {
  cx: number
  cy: number
  rx: number
  ry: number
  opacity: number
  dashSpeed: number
}

/** Órbitas centradas na altura do torso — abaixo do rosto */
export const HERO_ORBIT_ELLIPSES: OrbitEllipse[] = [
  { cx: 200, cy: 395, rx: 182, ry: 68, opacity: 0.1, dashSpeed: 26 },
  { cx: 200, cy: 388, rx: 140, ry: 52, opacity: 0.16, dashSpeed: 20 },
]

/**
 * Ícones nas laterais e base — evitando a zona do rosto (~28–72% x, ~8–46% y).
 */
export const HERO_ORBIT_TECH: OrbitTech[] = [
  {
    id: 'react',
    label: 'React',
    imageSrc: '/images/tech/react.svg',
    x: 7,
    y: 14,
    rotation: -8,
    floatDelay: 0,
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    imageSrc: '/images/tech/javascript.svg',
    x: 93,
    y: 12,
    rotation: 7,
    floatDelay: 0.35,
  },
  {
    id: 'java',
    label: 'Java',
    imageSrc: '/images/tech/java.svg',
    x: 4,
    y: 36,
    rotation: -5,
    floatDelay: 0.7,
  },
  {
    id: 'springboot',
    label: 'Spring Boot',
    imageSrc: '/images/tech/springboot.svg',
    x: 96,
    y: 34,
    rotation: 8,
    floatDelay: 1.05,
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    imageSrc: '/images/tech/nodejs.svg',
    x: 5,
    y: 56,
    rotation: -6,
    floatDelay: 0.55,
  },
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    imageSrc: '/images/tech/postgresql.svg',
    x: 95,
    y: 54,
    rotation: 9,
    floatDelay: 1.25,
  },
  {
    id: 'docker',
    label: 'Docker',
    imageSrc: '/images/tech/docker.svg',
    x: 82,
    y: 80,
    rotation: -5,
    floatDelay: 0.85,
  },
  {
    id: 'tailwindcss',
    label: 'Tailwind CSS',
    imageSrc: '/images/tech/tailwindcss.svg',
    x: 14,
    y: 82,
    rotation: 6,
    floatDelay: 1.15,
  },
]
