import { useProfile } from '@/application/hooks/useProfile'
import {
  AboutContent,
  AboutSkeleton,
} from '@/presentation/components/about/AboutContent'
import { Section } from '@/presentation/components/Section'

export function AboutSection() {
  const { profile, isLoading, error } = useProfile()

  return (
    <Section id="sobre" label="02 · sobre">
      {isLoading && <AboutSkeleton />}

      {error && (
        <p className="font-mono text-body-sm text-accent">
          Não foi possível carregar a seção sobre.
        </p>
      )}

      {!isLoading && !error && profile && (
        <AboutContent
          monthsStudying={profile.monthsStudying}
          about={profile.about}
          currentlyLearning={profile.currentlyLearning}
          nextStep={profile.nextStep}
        />
      )}
    </Section>
  )
}
