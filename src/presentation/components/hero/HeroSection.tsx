import { useRef } from 'react'
import { useProfile } from '@/application/hooks/useProfile'
import { Button } from '@/presentation/components/Button'
import { HeroFloatingCodeWindows } from '@/presentation/components/hero/HeroFloatingCodeWindows'
import { HeroOrbitVisual } from '@/presentation/components/hero/HeroOrbitVisual'
import { HeroPortrait } from '@/presentation/components/hero/HeroPortrait'
import { HeroSafeZoneProvider } from '@/presentation/components/hero/HeroSafeZoneContext'
import { ScrollIndicator } from '@/presentation/components/hero/ScrollIndicator'
import { RevealItem, RevealStagger } from '@/presentation/components/RevealStagger'
import {
  SectionContainer,
  SectionShell,
} from '@/presentation/components/SectionShell'
import { getLocalizedProfile } from '@/shared/i18n/content'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

function HeroSkeleton() {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      aria-busy="true"
      aria-label={t.a11y.loading}
      className="section-shell section-shell--hero border-b border-text-secondary/60"
    >
      <SectionContainer>
        <div className="animate-pulse space-y-[var(--section-gap)]">
          <div className="h-4 w-32 rounded-sm bg-bg-surface" />
          <div className="h-20 w-3/4 max-w-md rounded-sm bg-bg-surface" />
          <div className="h-6 w-full max-w-md rounded-sm bg-bg-surface" />
        </div>
      </SectionContainer>
    </section>
  )
}

export function HeroSection() {
  const { profile, isLoading, error } = useProfile()
  const { locale, t } = useTranslation()
  const heroRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  if (isLoading) return <HeroSkeleton />

  if (error || !profile) {
    return (
      <SectionShell id="hero" hero border>
        <SectionContainer>
          <p className="font-mono text-body-sm text-accent">{t.hero.loadError}</p>
        </SectionContainer>
      </SectionShell>
    )
  }

  const localized = getLocalizedProfile(profile, locale)

  return (
    <HeroSafeZoneProvider heroRef={heroRef} textRef={textRef}>
      <SectionShell ref={heroRef} id="hero" labelledBy="hero-heading" hero border>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <HeroOrbitVisual />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_right,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.5)_46%,rgba(0,0,0,0.28)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_100%,transparent_55%,rgba(0,0,0,0.55)_100%)]"
        />

        <HeroFloatingCodeWindows />

        <SectionContainer className="relative z-10 grid w-full grid-cols-1 items-center gap-[clamp(1.25rem,3vh,2rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] lg:gap-[var(--section-gap)]">
          <RevealStagger
            ref={textRef}
            id="hero-text-content"
            immediate
            className="relative z-20 min-w-0 max-w-xl space-y-[clamp(1rem,2.5vh,1.5rem)] lg:max-w-none"
          >
            <RevealItem>
              <p className="font-body text-[clamp(0.9rem,1.5vw,1rem)] text-text-primary/70">
                {t.hero.greeting}{' '}
                <span className="font-medium text-accent">{profile.name}</span>
              </p>
            </RevealItem>

            <RevealItem>
              <h1
                id="hero-heading"
                className="font-display text-[clamp(2rem,5vw+1rem,4.5rem)] font-medium leading-[1.05] tracking-tight text-balance"
              >
                {localized.title}
              </h1>
            </RevealItem>

            <RevealItem>
              <p className="max-w-lg font-body text-[clamp(0.95rem,1.5vw,1.125rem)] leading-relaxed text-text-primary/75 text-balance">
                {localized.tagline}
              </p>
            </RevealItem>

            <RevealItem>
              <div className="flex flex-wrap items-center gap-[clamp(0.75rem,2vw,1rem)] pt-1">
                <Button href="#projetos" variant="primary">
                  {t.hero.ctaProjects}
                </Button>
                <Button href="#contato" variant="ghost" icon="mail">
                  {t.hero.ctaContact}
                </Button>
              </div>
            </RevealItem>
          </RevealStagger>

          <div className="relative z-10 mx-auto w-full min-w-0 max-lg:max-w-sm lg:justify-self-end">
            <HeroPortrait />
          </div>
        </SectionContainer>

        <ScrollIndicator />
      </SectionShell>
    </HeroSafeZoneProvider>
  )
}
