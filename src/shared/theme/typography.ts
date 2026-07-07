/**
 * Tokens tipográficos.
 * Display: Cormorant Garamond — personalidade premium, serifada com caráter.
 * Body: Manrope — sans limpa, menos genérica que Inter.
 * Mono: JetBrains Mono — labels técnicos, stack, timeline.
 */
export const fontFamily = {
  display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
  body: ['Manrope', 'system-ui', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
} as const

export const fontSize = {
  'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
  'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
  'display-md': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
  'body-lg': ['1.125rem', { lineHeight: '1.6' }],
  'body-md': ['1rem', { lineHeight: '1.6' }],
  'body-sm': ['0.875rem', { lineHeight: '1.5' }],
  label: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.04em' }],
}

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
} as const
