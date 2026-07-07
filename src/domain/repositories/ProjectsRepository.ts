import type { Project } from '@/domain/entities/Project'

export interface ProjectsRepository {
  getAll(): Promise<Project[]>
  getFeatured(): Promise<Project[]>
  getBySlug(slug: string): Promise<Project | null>
}
