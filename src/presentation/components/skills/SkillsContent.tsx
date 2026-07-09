import type { SkillGroup } from '@/application/use-cases/getSkills'
import { SkillLayerGroup } from '@/presentation/components/skills/SkillLayerGroup'
import { Reveal } from '@/presentation/components/Reveal'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

function SkillsSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-4 border-l border-text-secondary pl-6">
          <div className="h-3 w-24 rounded-sm bg-bg-surface" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((__, i) => (
              <div key={i} className="h-9 w-28 rounded-sm bg-bg-surface" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

interface SkillsContentProps {
  groups: SkillGroup[]
}

function SkillsContent({ groups }: SkillsContentProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-[var(--section-gap)]">
      <Reveal>
        <header className="space-y-3">
          <h2 className="font-display text-display-md font-medium text-balance">
            {t.skills.title}
          </h2>
          <p className="max-w-2xl font-body text-body-md text-text-primary/70">
            {t.skills.subtitle}
          </p>
        </header>
      </Reveal>

      <div className="space-y-8">
        {groups.map((group, index) => (
          <Reveal key={group.layer} delay={index * 0.1}>
            <SkillLayerGroup group={group} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export { SkillsContent, SkillsSkeleton }
