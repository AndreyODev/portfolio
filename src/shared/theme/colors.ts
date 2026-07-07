/**
 * Tokens de cor — fonte única de verdade.
 * Tailwind e CSS custom properties consomem estes valores.
 */
export const colors = {
  bg: {
    primary: '#000000',
    surface: '#121212',
  },
  accent: {
    DEFAULT: '#AB8731',
    light: '#D9BE81',
  },
  text: {
    primary: '#F2EFE9',
    secondary: '#2A2A2A',
  },
} as const

export type ColorToken = typeof colors
