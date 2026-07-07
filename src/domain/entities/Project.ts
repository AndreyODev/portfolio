import type { ProjectType } from '@/domain/types'

export interface Project {
  id: string
  name: string
  slug: string
  description: string
  stack: string[]
  type: ProjectType
  teamContext?: string
  repositoryUrl?: string
  isPrivate?: boolean
  relevanceRank: number
  featured: boolean
}
