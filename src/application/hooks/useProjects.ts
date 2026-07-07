import { useEffect, useState } from 'react'
import type { Project } from '@/domain/entities/Project'
import type { AsyncState } from '@/domain/types'
import { getAllProjects, getFeaturedProjects } from '@/application/use-cases/getProjects'
import { projectsRepository } from '@/infrastructure/repositories'

interface UseProjectsResult {
  projects: Project[]
  featured: Project[]
  status: AsyncState
  isLoading: boolean
  error: boolean
}

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([])
  const [featured, setFeatured] = useState<Project[]>([])
  const [status, setStatus] = useState<AsyncState>('idle')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    Promise.all([
      getAllProjects(projectsRepository),
      getFeaturedProjects(projectsRepository),
    ])
      .then(([all, featuredList]) => {
        if (cancelled) return
        setProjects(all)
        setFeatured(featuredList)
        setStatus('success')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return {
    projects,
    featured,
    status,
    isLoading: status === 'loading',
    error: status === 'error',
  }
}
