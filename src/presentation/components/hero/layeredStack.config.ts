export interface StackLayer {
  id: string
  label: string
  tech: string
  top: number
  left: number
  depth: number
}

export const STACK_LAYERS: StackLayer[] = [
  {
    id: 'presentation',
    label: 'presentation',
    tech: 'React · Tailwind',
    top: 0,
    left: 0,
    depth: 1.4,
  },
  {
    id: 'application',
    label: 'application',
    tech: 'Node.js · Express',
    top: 56,
    left: 28,
    depth: 1.1,
  },
  {
    id: 'data',
    label: 'data',
    tech: 'PostgreSQL · MongoDB',
    top: 112,
    left: 56,
    depth: 0.85,
  },
  {
    id: 'infra',
    label: 'infra',
    tech: 'Docker',
    top: 168,
    left: 84,
    depth: 0.6,
  },
]

/** Pontos de conexão entre camadas (coordenadas do viewBox 320×280). */
export const LAYER_CONNECTIONS = [
  { x1: 100, y1: 36, x2: 128, y2: 92 },
  { x1: 128, y1: 92, x2: 156, y2: 148 },
  { x1: 156, y1: 148, x2: 184, y2: 204 },
] as const
