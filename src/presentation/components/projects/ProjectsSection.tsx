import { useProjects } from '@/application/hooks/useProjects'
import {
  ProjectsContent,
  ProjectsSkeleton,
} from '@/presentation/components/projects/ProjectsContent'
import { Section } from '@/presentation/components/Section'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

export function ProjectsSection() {
  const { projects, featured, isLoading, error } = useProjects()
  const { t } = useTranslation()

  return (
    <Section id="projetos" label={t.sections.projetos}>
      {isLoading && <ProjectsSkeleton />}

      {error && (
        <p className="font-mono text-body-sm text-accent">{t.projects.loadError}</p>
      )}

      {!isLoading && !error && (
        <ProjectsContent featured={featured} projects={projects} />
      )}
    </Section>
  )
}
