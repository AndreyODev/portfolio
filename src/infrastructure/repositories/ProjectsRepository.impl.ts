import type { ProjectsRepository } from '@/domain/repositories/ProjectsRepository'
import type { Project } from '@/domain/entities/Project'
import { projectsData } from './data/projects.data'

const simulateLatency = (ms = 80) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

function sortByRelevance(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => a.relevanceRank - b.relevanceRank)
}

export class MockProjectsRepository implements ProjectsRepository {
  async getAll(): Promise<Project[]> {
    await simulateLatency()
    return sortByRelevance(projectsData)
  }

  async getFeatured(): Promise<Project[]> {
    const all = await this.getAll()
    return all.filter((project) => project.featured)
  }

  async getBySlug(slug: string): Promise<Project | null> {
    const all = await this.getAll()
    return all.find((project) => project.slug === slug) ?? null
  }
}

export const projectsRepository = new MockProjectsRepository()
