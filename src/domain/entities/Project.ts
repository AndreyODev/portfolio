import type { ProjectType } from '@/domain/types'

export interface Project {
  id: string
  name: string
  slug: string
  description: string
  stack: string[]
  type: ProjectType
  teamContext?: string
  repositoryUrl: string
  relevanceRank: number
  featured: boolean
}
