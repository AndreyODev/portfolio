import { useTranslation } from '@/shared/i18n/LanguageProvider'
import type { Locale } from '@/shared/i18n/types'

const LOCALES: Locale[] = ['pt', 'en']

interface LanguageSwitcherProps {
  className?: string
  onSelect?: () => void
}

export function LanguageSwitcher({
  className = '',
  onSelect,
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useTranslation()

  return (
    <div
      className={`flex rounded-full border border-text-secondary/60 bg-bg-surface/40 p-0.5 ${className}`}
      role="group"
      aria-label={t.lang.current}
    >
      {LOCALES.map((code) => {
        const isActive = locale === code
        const label = t.lang[code]

        return (
          <button
            key={code}
            type="button"
            onClick={() => {
              setLocale(code)
              onSelect?.()
            }}
            aria-label={`${t.lang.switchTo} ${label}`}
            aria-pressed={isActive}
            className={`rounded-full px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider transition-colors sm:px-3 sm:py-1.5 sm:text-label ${
              isActive
                ? 'bg-accent text-bg-primary'
                : 'text-text-primary/60 hover:text-accent-light'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
