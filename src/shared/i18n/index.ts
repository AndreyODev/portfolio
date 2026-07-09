import type { Locale, Translations } from '@/shared/i18n/types'
import { en } from '@/shared/i18n/locales/en'
import { pt } from '@/shared/i18n/locales/pt'

export const translations: Record<Locale, Translations> = { pt, en }

export function getTranslations(locale: Locale): Translations {
  return translations[locale]
}

export const LOCALE_STORAGE_KEY = 'portfolio-locale'

export function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'pt'

  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored === 'pt' || stored === 'en') return stored

  const browserLang = navigator.language.toLowerCase()
  return browserLang.startsWith('en') ? 'en' : 'pt'
}

export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
    String(values[key] ?? ''),
  )
}
