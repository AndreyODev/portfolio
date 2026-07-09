import type { SkillGroup } from '@/application/use-cases/getSkills'
import { SkillChip } from '@/presentation/components/skills/SkillChip'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

interface SkillLayerGroupProps {
  group: SkillGroup
}

export function SkillLayerGroup({ group }: SkillLayerGroupProps) {
  const { t } = useTranslation()

  return (
    <article
      aria-labelledby={`layer-${group.layer}`}
      className="border-l border-accent/30 pl-5 sm:pl-6"
    >
      <h3
        id={`layer-${group.layer}`}
        className="mb-4 font-mono text-label uppercase tracking-widest text-accent"
      >
        {t.skills.layers[group.layer]}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <SkillChip key={skill.id} skill={skill} />
        ))}
      </ul>
    </article>
  )
}
