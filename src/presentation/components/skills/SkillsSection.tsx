import { useSkills } from '@/application/hooks/useSkills'
import {
  SkillsContent,
  SkillsSkeleton,
} from '@/presentation/components/skills/SkillsContent'
import { Section } from '@/presentation/components/Section'

export function SkillsSection() {
  const { groups, isLoading, error } = useSkills()

  return (
    <Section id="skills" label="03 · skills">
      {isLoading && <SkillsSkeleton />}

      {error && (
        <p className="font-mono text-body-sm text-accent">
          Não foi possível carregar as skills.
        </p>
      )}

      {!isLoading && !error && <SkillsContent groups={groups} />}
    </Section>
  )
}
