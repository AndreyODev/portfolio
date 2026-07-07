import type { TimelineEntry } from '@/domain/entities/TimelineEntry'

export interface TimelineRepository {
  getAll(): Promise<TimelineEntry[]>
}
