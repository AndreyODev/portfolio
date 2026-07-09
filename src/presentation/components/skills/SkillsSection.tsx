import { useSkills } from '@/application/hooks/useSkills'
import {
  SkillsContent,
  SkillsSkeleton,
} from '@/presentation/components/skills/SkillsContent'
import { Section } from '@/presentation/components/Section'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

export function SkillsSection() {
  const { groups, isLoading, error } = useSkills()
  const { t } = useTranslation()

  return (
    <Section id="skills" label={t.sections.skills}>
      {isLoading && <SkillsSkeleton />}

      {error && (
        <p className="font-mono text-body-sm text-accent">{t.skills.loadError}</p>
      )}

      {!isLoading && !error && <SkillsContent groups={groups} />}
    </Section>
  )
}
