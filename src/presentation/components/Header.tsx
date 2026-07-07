import { useEffect, useId, useState } from 'react'
import { NavLinks } from '@/presentation/components/NavLinks'
import { SITE } from '@/shared/config/navigation'

export function Header() {
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-text-secondary/80 bg-bg-primary/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20">
        <a
          href="#hero"
          className="font-display text-xl font-medium tracking-tight text-text-primary transition-colors hover:text-accent-light focus-visible:text-accent-light"
        >
          {SITE.initials}
          <span className="sr-only">{SITE.name}</span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <NavLinks />
        </nav>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">
            {menuOpen ? 'Fechar menu' : 'Abrir menu'}
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

      <nav
        id={menuId}
        aria-label="Menu mobile"
        className={`border-t border-text-secondary/80 bg-bg-primary md:hidden ${menuOpen ? 'block' : 'hidden'}`}
      >
        <div className="px-4 py-6 sm:px-6">
          <NavLinks onNavigate={closeMenu} linkClassName="block py-3" />
        </div>
      </nav>
    </header>
  )
}
