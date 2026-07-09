import type { ProficiencyLevel } from '@/domain/types'
import type { Skill } from '@/domain/entities/Skill'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

function getChipStyles(skill: Skill): string {
  if (skill.id === 'spring-boot') {
    return 'border-dashed border-accent/35 bg-bg-primary text-text-primary/70'
  }

  switch (skill.level) {
    case 'dominated':
      return 'border-accent bg-accent/5 text-accent-light'
    case 'proficient':
      return 'border-accent/50 bg-bg-surface/40 text-text-primary'
    case 'learning':
      return 'border-dashed border-accent/60 bg-bg-surface/30 text-text-primary'
    default:
      return 'border-text-secondary text-text-primary/70'
  }
}

function getLevelLabel(skill: Skill, levels: Record<ProficiencyLevel | 'next', string>): string {
  if (skill.id === 'spring-boot') return levels.next
  return levels[skill.level]
}

interface SkillChipProps {
  skill: Skill
}

export function SkillChip({ skill }: SkillChipProps) {
  const { t } = useTranslation()

  return (
    <li
      className={`inline-flex items-center gap-2 border px-3 py-2 ${getChipStyles(skill)}`}
    >
      <span className="font-mono text-body-sm">{skill.name}</span>
      <span className="font-mono text-[0.6rem] uppercase tracking-wider text-text-primary/40">
        {getLevelLabel(skill, t.skills.levels)}
      </span>
    </li>
  )
}
