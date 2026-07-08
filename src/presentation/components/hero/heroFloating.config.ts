/** Espaçamento mínimo entre elementos flutuantes (px). */
export const HERO_FLOAT_MIN_GAP = 28

/** Folga obrigatória entre a borda inferior de um flutuante e o topo do bloco de texto (px). */
export const HERO_TEXT_BUFFER = 48

export type CodeWindowId = 'dev-ts' | 'use-profile' | 'dev-java'

export interface CodeWindowPlacement {
  id: CodeWindowId
  title: string
  /** Prioridade de exibição — menor = mais importante; oculta primeiro em telas apertadas. */
  priority: number
  top?: string
  right?: string
  bottom?: string
  left?: string
  rotate: number
  /** Classes responsivas de visibilidade / escala. */
  responsive: string
  widthClass: string
}

export interface PortraitIconPlacement {
  id: string
  label: string
  imageSrc: string
  side: 'left' | 'right'
  /** % do topo do container da foto */
  top: number
  /** % horizontal a partir da borda (negativo = mais para fora) */
  edge: number
  duration: number
  delay: number
  rotation: number
}

export interface BokehPlacement {
  left: string
  top: string
}

export const HERO_BOKEH: BokehPlacement = {
  left: '20%',
  top: '36%',
}

/**
 * Janelas de código — posições iniciais (ajustadas em runtime pela safe zone).
 * dev.ts fica no canto superior esquerdo, acima da área do texto.
 */
export const HERO_CODE_WINDOWS: CodeWindowPlacement[] = [
  {
    id: 'dev-ts',
    title: 'dev.ts',
    priority: 2,
    top: 'calc(var(--header-height) + 0.35rem)',
    left: 'var(--section-px)',
    rotate: -3,
    responsive: 'max-md:hidden',
    widthClass: 'w-[clamp(8.5rem,14vw,12rem)] xl:w-[clamp(9rem,12vw,12.5rem)]',
  },
  {
    id: 'use-profile',
    title: 'use-profile.ts',
    priority: 3,
    top: 'calc(var(--header-height) + 1.25rem)',
    right: 'clamp(1.25rem, 4vw, 2.75rem)',
    rotate: 2,
    responsive: 'max-xl:hidden',
    widthClass: 'w-[clamp(8.5rem,13vw,11.5rem)]',
  },
  {
    id: 'dev-java',
    title: 'Dev.java',
    priority: 1,
    bottom: 'clamp(4.25rem, 10vh, 6rem)',
    right: 'clamp(1rem, 3.5vw, 2.25rem)',
    rotate: -2,
    responsive: 'max-md:hidden',
    widthClass: 'w-[clamp(8.5rem,13vw,11.5rem)]',
  },
]

/**
 * Ícones ao redor da foto — afastados da janela Dev.java (canto inferior direito).
 * Docker deslocado para cima; Spring/Postgres com mais respiro vertical.
 */
export const HERO_PORTRAIT_ICONS: PortraitIconPlacement[] = [
  { id: 'react', label: 'React', imageSrc: '/images/tech/react.svg', side: 'left', top: 0, edge: -8, duration: 4.2, delay: 0, rotation: -8 },
  { id: 'java', label: 'Java', imageSrc: '/images/tech/java.svg', side: 'left', top: 24, edge: -12, duration: 3.6, delay: 0.7, rotation: -5 },
  { id: 'nodejs', label: 'Node.js', imageSrc: '/images/tech/nodejs.svg', side: 'left', top: 48, edge: -10, duration: 4.6, delay: 0.35, rotation: -6 },
  { id: 'tailwindcss', label: 'Tailwind CSS', imageSrc: '/images/tech/tailwindcss.svg', side: 'left', top: 72, edge: -6, duration: 3.9, delay: 1.1, rotation: 6 },
  { id: 'javascript', label: 'JavaScript', imageSrc: '/images/tech/javascript.svg', side: 'right', top: 4, edge: -8, duration: 4.0, delay: 0.5, rotation: 7 },
  { id: 'springboot', label: 'Spring Boot', imageSrc: '/images/tech/springboot.svg', side: 'right', top: 26, edge: -12, duration: 3.5, delay: 1.0, rotation: 8 },
  { id: 'postgresql', label: 'PostgreSQL', imageSrc: '/images/tech/postgresql.svg', side: 'right', top: 50, edge: -10, duration: 4.4, delay: 0.2, rotation: 9 },
  { id: 'docker', label: 'Docker', imageSrc: '/images/tech/docker.svg', side: 'right', top: 58, edge: -10, duration: 3.8, delay: 0.85, rotation: -5 },
]
