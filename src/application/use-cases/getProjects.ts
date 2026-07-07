import type { ProjectsRepository } from '@/domain/repositories/ProjectsRepository'
import type { Project } from '@/domain/entities/Project'

export function getAllProjects(
  repository: ProjectsRepository,
): Promise<Project[]> {
  return repository.getAll()
}

export function getFeaturedProjects(
  repository: ProjectsRepository,
): Promise<Project[]> {
  return repository.getFeatured()
}

export function getProjectBySlug(
  repository: ProjectsRepository,
  slug: string,
): Promise<Project | null> {
  return repository.getBySlug(slug)
}
