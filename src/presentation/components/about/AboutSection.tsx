import { useProfile } from '@/application/hooks/useProfile'
import {
  AboutContent,
  AboutSkeleton,
} from '@/presentation/components/about/AboutContent'
import { Section } from '@/presentation/components/Section'
import { getLocalizedProfile } from '@/shared/i18n/content'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

export function AboutSection() {
  const { profile, isLoading, error } = useProfile()
  const { locale, t } = useTranslation()

  return (
    <Section id="sobre" label={t.sections.sobre}>
      {isLoading && <AboutSkeleton />}

      {error && (
        <p className="font-mono text-body-sm text-accent">{t.about.loadError}</p>
      )}

      {!isLoading && !error && profile && (
        <AboutContent
          monthsStudying={profile.monthsStudying}
          about={getLocalizedProfile(profile, locale).about}
          currentlyLearning={profile.currentlyLearning}
          nextStep={profile.nextStep}
        />
      )}
    </Section>
  )
}
