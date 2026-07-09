import { useEffect, useId, useState } from 'react'
import { LanguageSwitcher } from '@/presentation/components/LanguageSwitcher'
import { NavLinks } from '@/presentation/components/NavLinks'
import { SITE } from '@/shared/config/navigation'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

export function Header() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-text-secondary/40 bg-bg-primary/85 backdrop-blur-md">
      <div className="section-container flex h-[var(--header-height)] items-center justify-between gap-[clamp(0.5rem,2vw,1rem)]">
        <a
          href="#hero"
          className="shrink-0 font-display text-xl font-medium tracking-tight text-text-primary transition-colors hover:text-accent-light focus-visible:text-accent-light"
        >
          {SITE.initials}
          <span className="sr-only">{SITE.name}</span>
        </a>

        <nav
          aria-label={t.header.mainNav}
          className="hidden rounded-full border border-text-secondary/60 bg-bg-surface/40 px-2 py-1 md:block"
        >
          <NavLinks pill />
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="hidden sm:flex" />

          <a
            href="#contato"
            className="hidden items-center gap-2 rounded-full border border-text-secondary/60 bg-bg-surface/40 px-4 py-2 font-mono text-label uppercase text-text-primary/80 transition-colors hover:border-accent/50 hover:text-accent-light md:inline-flex"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125V4.875a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            {t.header.contact}
          </a>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center md:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {menuOpen ? t.header.closeMenu : t.header.openMenu}
            </span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span
                className={`h-px w-full bg-accent transition-transform ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
              />
              <span
                className={`h-px w-full bg-accent transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`h-px w-full bg-accent transition-transform ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
              />
            </span>
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        aria-label={t.header.mobileNav}
        className={`border-t border-text-secondary/80 bg-bg-primary md:hidden ${menuOpen ? 'block' : 'hidden'}`}
      >
        <div className="section-container space-y-6 py-6">
          <LanguageSwitcher className="sm:hidden" onSelect={closeMenu} />
          <NavLinks onNavigate={closeMenu} linkClassName="block py-3" />
        </div>
      </nav>
    </header>
  )
}
