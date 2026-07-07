import type { TimelineRepository } from '@/domain/repositories/TimelineRepository'
import type { TimelineEntry } from '@/domain/entities/TimelineEntry'

export function getTimeline(
  repository: TimelineRepository,
): Promise<TimelineEntry[]> {
  return repository.getAll()
}
