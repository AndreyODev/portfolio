import { useEffect, useState } from 'react'
import type { Profile } from '@/domain/entities/Profile'
import type { AsyncState } from '@/domain/types'
import { getProfile } from '@/application/use-cases/getProfile'
import { profileRepository } from '@/infrastructure/repositories'

interface UseProfileResult {
  profile: Profile | null
  status: AsyncState
  isLoading: boolean
  error: boolean
}

export function useProfile(): UseProfileResult {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [status, setStatus] = useState<AsyncState>('idle')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    getProfile(profileRepository)
      .then((data) => {
        if (cancelled) return
        setProfile(data)
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
    profile,
    status,
    isLoading: status === 'loading',
    error: status === 'error',
  }
}
