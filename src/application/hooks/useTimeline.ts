import { useEffect, useState } from 'react'
import type { TimelineEntry } from '@/domain/entities/TimelineEntry'
import type { AsyncState } from '@/domain/types'
import { getTimeline } from '@/application/use-cases/getTimeline'
import { timelineRepository } from '@/infrastructure/repositories'

interface UseTimelineResult {
  entries: TimelineEntry[]
  status: AsyncState
  isLoading: boolean
  error: boolean
}

export function useTimeline(): UseTimelineResult {
  const [entries, setEntries] = useState<TimelineEntry[]>([])
  const [status, setStatus] = useState<AsyncState>('idle')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    getTimeline(timelineRepository)
      .then((data) => {
        if (cancelled) return
        setEntries(data)
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
    entries,
    status,
    isLoading: status === 'loading',
    error: status === 'error',
  }
}
