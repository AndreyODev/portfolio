import { useProjects } from '@/application/hooks/useProjects'
import {
  ProjectsContent,
  ProjectsSkeleton,
} from '@/presentation/components/projects/ProjectsContent'
import { Section } from '@/presentation/components/Section'

export function ProjectsSection() {
  const { projects, featured, isLoading, error } = useProjects()

  return (
    <Section id="projetos" label="04 · projetos">
      {isLoading && <ProjectsSkeleton />}

      {error && (
        <p className="font-mono text-body-sm text-accent">
          Não foi possível carregar os projetos.
        </p>
      )}

      {!isLoading && !error && (
        <ProjectsContent featured={featured} projects={projects} />
      )}
    </Section>
  )
}
