/**
 * Smoke test da arquitetura em camadas.
 * Será removido quando as seções reais forem implementadas.
 */
import { useProfile } from '@/application/hooks/useProfile'
import { useProjects } from '@/application/hooks/useProjects'
import { useSkills } from '@/application/hooks/useSkills'
import { useTimeline } from '@/application/hooks/useTimeline'

export function ArchitectureStatus() {
  const { profile, isLoading: profileLoading } = useProfile()
  const { projects, isLoading: projectsLoading } = useProjects()
  const { groups, isLoading: skillsLoading } = useSkills()
  const { entries, isLoading: timelineLoading } = useTimeline()

  const isLoading =
    profileLoading || projectsLoading || skillsLoading || timelineLoading

  const skillCount = groups.reduce(
    (total, group) => total + group.skills.length,
    0,
  )

  return (
    <section
      aria-label="Status da arquitetura"
      className="space-y-3 rounded-sm border border-dashed border-accent/40 bg-bg-surface p-6"
    >
      <h2 className="font-mono text-label uppercase text-accent">
        domain → application → infrastructure
      </h2>

      {isLoading ? (
        <p className="font-mono text-body-sm text-text-primary/60">
          carregando repositórios mock…
        </p>
      ) : (
        <dl className="grid gap-2 font-mono text-body-sm text-accent-light">
          <div className="flex justify-between gap-4">
            <dt className="text-text-primary/60">profile</dt>
            <dd>{profile?.name ?? '—'}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-primary/60">skills</dt>
            <dd>
              {skillCount} em {groups.length} camadas
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-primary/60">timeline</dt>
            <dd>{entries.length} entradas</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-primary/60">projects</dt>
            <dd>{projects.length} provisórios</dd>
          </div>
        </dl>
      )}
    </section>
  )
}
