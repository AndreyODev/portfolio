import type { SkillGroup } from '@/application/use-cases/getSkills'
import { SkillLayerGroup } from '@/presentation/components/skills/SkillLayerGroup'

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
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h2 className="font-display text-display-md font-medium text-balance">
          Stack por camada
        </h2>
        <p className="max-w-2xl font-body text-body-md text-text-primary/70">
          Agrupada como na arquitetura do código — frontend, backend, dados,
          infraestrutura e o que está em construção.
        </p>
      </header>

      <div className="space-y-8">
        {groups.map((group) => (
          <SkillLayerGroup key={group.layer} group={group} />
        ))}
      </div>
    </div>
  )
}

export { SkillsContent, SkillsSkeleton }
