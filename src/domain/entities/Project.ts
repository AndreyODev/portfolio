import type { ProjectType } from '@/domain/types'

export interface ProjectImage {
  src?: string
  alt: string
  caption?: string
}

export interface ProjectHighlight {
  title: string
  description: string
}

export interface ProjectDetails {
  tags?: string[]
  overview: string
  highlights?: ProjectHighlight[]
  images: ProjectImage[]
}

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
  details?: ProjectDetails
}
