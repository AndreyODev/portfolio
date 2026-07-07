import type { Config } from 'tailwindcss'
import { colors } from './src/shared/theme/colors'
import { fontFamily, fontSize } from './src/shared/theme/typography'
import { breakpoints } from './src/shared/theme/breakpoints'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: breakpoints,
    extend: {
      colors: {
        bg: colors.bg,
        accent: colors.accent,
        text: colors.text,
      },
      fontFamily: {
        display: [...fontFamily.display],
        body: [...fontFamily.body],
        mono: [...fontFamily.mono],
      },
      fontSize: fontSize as unknown as Record<
        string,
        [string, { lineHeight: string; letterSpacing?: string }]
      >,
    },
  },
  plugins: [],
} satisfies Config
