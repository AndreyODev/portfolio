import { useMemo, useState } from 'react'
import type { Project } from '@/domain/entities/Project'
import { ProjectCarousel } from '@/presentation/components/projects/ProjectCarousel'
import { Reveal } from '@/presentation/components/Reveal'
import { getLocalizedProject } from '@/shared/i18n/content'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

function ProjectsSkeleton() {
  return (
    <div className="animate-pulse space-y-[var(--section-gap)]">
      <div className="h-10 w-48 rounded-sm bg-bg-surface" />
      <div className="h-10 w-full max-w-sm rounded-sm bg-bg-surface" />
      <div className="flex items-center gap-4">
        <div className="hidden h-11 w-11 shrink-0 rounded-full bg-bg-surface sm:block" />
        <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-48 rounded-sm bg-bg-surface" />
          ))}
        </div>
        <div className="hidden h-11 w-11 shrink-0 rounded-full bg-bg-surface sm:block" />
      </div>
      <div className="flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-2.5 w-2.5 rounded-full bg-bg-surface" />
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
  const { locale, t } = useTranslation()

  const localizedProjects = useMemo(() => {
    const merged = [...featured, ...projects.filter((p) => !p.featured)]
    const seen = new Set<string>()
    return merged
      .filter((project) => {
        if (seen.has(project.id)) return false
        seen.add(project.id)
        return true
      })
      .map((project) => getLocalizedProject(project, locale))
  }, [featured, projects, locale])

  const filteredProjects = useMemo(
    () => filterProjects(localizedProjects, query),
    [localizedProjects, query],
  )

  const hasResults = filteredProjects.length > 0

  return (
    <div className="space-y-[var(--section-gap)]">
      <Reveal>
        <header className="space-y-3">
          <h2 className="font-display text-display-md font-medium text-balance">
            {t.projects.title}
          </h2>
          <p className="max-w-2xl font-body text-body-md text-text-primary/70">
            {t.projects.subtitle}
          </p>
        </header>
      </Reveal>

      <Reveal delay={0.1}>
        <label className="block max-w-sm">
          <span className="sr-only">{t.a11y.filterProjects}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.projects.filterPlaceholder}
            className="w-full border border-text-secondary bg-bg-surface px-4 py-3 font-mono text-body-sm text-text-primary placeholder:text-text-primary/35 focus:border-accent focus:outline-none"
          />
        </label>
      </Reveal>

      {!hasResults && (
        <Reveal>
          <p className="font-mono text-body-sm text-text-primary/50">
            {t.projects.noResults}
          </p>
        </Reveal>
      )}

      {filteredProjects.length > 0 && (
        <Reveal delay={0.15}>
          <ProjectCarousel projects={filteredProjects} />
        </Reveal>
      )}
    </div>
  )
}

export { ProjectsContent, ProjectsSkeleton }
