import { useProfile } from '@/application/hooks/useProfile'
import { Button } from '@/presentation/components/Button'
import { LayeredStackVisual } from '@/presentation/components/hero/LayeredStackVisual'

function HeroSkeleton() {
  return (
    <section
      id="hero"
      aria-busy="true"
      aria-label="Carregando"
      className="scroll-mt-16 min-h-[calc(100vh-4rem)] border-b border-text-secondary/60 px-4 py-20 sm:px-6 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-5xl animate-pulse space-y-6">
        <div className="h-4 w-24 rounded-sm bg-bg-surface" />
        <div className="h-16 w-64 rounded-sm bg-bg-surface" />
        <div className="h-6 w-full max-w-md rounded-sm bg-bg-surface" />
      </div>
    </section>
  )
}

export function HeroSection() {
  const { profile, isLoading, error } = useProfile()

  if (isLoading) return <HeroSkeleton />

  if (error || !profile) {
    return (
      <section
        id="hero"
        className="scroll-mt-16 min-h-[calc(100vh-4rem)] border-b border-text-secondary/60 px-4 py-20 sm:px-6 md:px-12 lg:px-20"
      >
        <p className="font-mono text-body-sm text-accent">
          Não foi possível carregar o perfil.
        </p>
      </section>
    )
  }

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="scroll-mt-16 min-h-[calc(100vh-4rem)] border-b border-text-secondary/60 px-4 py-16 sm:px-6 sm:py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="space-y-6">
          <p className="font-mono text-label uppercase tracking-widest text-accent">
            01 · início
          </p>

          <div className="space-y-2">
            <h1
              id="hero-heading"
              className="font-display text-display-xl font-medium tracking-tight text-balance"
            >
              {profile.name}
            </h1>
            <p className="font-mono text-label uppercase text-accent-light">
              {profile.title}
            </p>
          </div>

          <p className="max-w-lg font-body text-body-lg text-text-primary/80 text-balance">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="#projetos">Ver projetos</Button>
            <Button href="#contato" variant="ghost">
              Contato
            </Button>
          </div>
        </div>

        <div className="relative lg:justify-self-end">
          <LayeredStackVisual />
        </div>
      </div>
    </section>
  )
}
