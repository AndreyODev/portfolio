import { useEffect, useState } from 'react'
import type { AsyncState } from '@/domain/types'
import {
  getSkillsGroupedByLayer,
  type SkillGroup,
} from '@/application/use-cases/getSkills'
import { skillsRepository } from '@/infrastructure/repositories'

interface UseSkillsResult {
  groups: SkillGroup[]
  status: AsyncState
  isLoading: boolean
  error: boolean
}

export function useSkills(): UseSkillsResult {
  const [groups, setGroups] = useState<SkillGroup[]>([])
  const [status, setStatus] = useState<AsyncState>('idle')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    getSkillsGroupedByLayer(skillsRepository)
      .then((data) => {
        if (cancelled) return
        setGroups(data)
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
    groups,
    status,
    isLoading: status === 'loading',
    error: status === 'error',
  }
}
