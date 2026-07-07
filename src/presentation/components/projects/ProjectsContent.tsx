import { useMemo, useState } from 'react'
import type { Project } from '@/domain/entities/Project'
import { ProjectCard } from '@/presentation/components/projects/ProjectCard'

function ProjectsSkeleton() {
  return (
    <div className="animate-pulse space-y-10">
      <div className="h-10 w-48 rounded-sm bg-bg-surface" />
      <div className="h-10 w-full max-w-sm rounded-sm bg-bg-surface" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-48 rounded-sm bg-bg-surface" />
        ))}
      </div>
    </div>
  )
}

function filterProjects(projects: Project[], query: string): Project[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return projects

  return projects.filter(
    (project) =>
      project.name.toLowerCase().includes(normalized) ||
      project.description.toLowerCase().includes(normalized) ||
      project.stack.some((tech) => tech.toLowerCase().includes(normalized)),
  )
}

interface ProjectsContentProps {
  featured: Project[]
  projects: Project[]
}

function ProjectsContent({ featured, projects }: ProjectsContentProps) {
  const [query, setQuery] = useState('')

  const filteredFeatured = useMemo(
    () => filterProjects(featured, query),
    [featured, query],
  )

  const filteredRest = useMemo(() => {
    const featuredIds = new Set(featured.map((p) => p.id))
    const rest = projects.filter((p) => !featuredIds.has(p.id))
    return filterProjects(rest, query)
  }, [featured, projects, query])

  const hasResults = filteredFeatured.length > 0 || filteredRest.length > 0

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h2 className="font-display text-display-md font-medium text-balance">
          Projetos
        </h2>
        <p className="max-w-2xl font-body text-body-md text-text-primary/70">
          Do backend em camadas ao frontend estático — ordenados por relevância
          técnica e complexidade.
        </p>
      </header>

      <label className="block max-w-sm">
        <span className="sr-only">Filtrar por nome ou stack</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="filtrar por nome ou stack…"
          className="w-full border border-text-secondary bg-bg-surface px-4 py-3 font-mono text-body-sm text-text-primary placeholder:text-text-primary/35 focus:border-accent focus:outline-none"
        />
      </label>

      {!hasResults && (
        <p className="font-mono text-body-sm text-text-primary/50">
          Nenhum projeto corresponde ao filtro.
        </p>
      )}

      {filteredFeatured.length > 0 && (
        <section aria-label="Projetos em destaque">
          <p className="mb-4 font-mono text-label uppercase tracking-widest text-accent">
            destaque
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredFeatured.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        </section>
      )}

      {filteredRest.length > 0 && (
        <section aria-label="Demais projetos">
          <p className="mb-4 font-mono text-label uppercase tracking-widest text-accent">
            demais projetos
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRest.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export { ProjectsContent, ProjectsSkeleton }
