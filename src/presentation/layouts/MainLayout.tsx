import type { ReactNode } from 'react'
import { VisualEffects } from '@/presentation/components/effects/VisualEffects'
import { Header } from '@/presentation/components/Header'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { t } = useTranslation()

  return (
    <div className="relative min-h-screen">
      <VisualEffects />

      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:border focus:border-accent focus:bg-bg-surface focus:px-4 focus:py-2 focus:font-mono focus:text-label focus:text-accent-light"
      >
        {t.a11y.skipToContent}
      </a>

      <Header />

      <main className="relative z-10">{children}</main>
    </div>
  )
}
