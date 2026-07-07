import type { ReactNode } from 'react'
import { Header } from '@/presentation/components/Header'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:border focus:border-accent focus:bg-bg-surface focus:px-4 focus:py-2 focus:font-mono focus:text-label focus:text-accent-light"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main>{children}</main>
    </div>
  )
}
