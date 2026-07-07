import type { TimelineStatus } from '@/domain/types'

export interface TimelineEntry {
  id: string
  period: string
  title: string
  description: string
  status: TimelineStatus
  technologies: string[]
}
