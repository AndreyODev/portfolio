import type { TimelineRepository } from '@/domain/repositories/TimelineRepository'
import type { TimelineEntry } from '@/domain/entities/TimelineEntry'
import { timelineData } from './data/timeline.data'

const simulateLatency = (ms = 80) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export class MockTimelineRepository implements TimelineRepository {
  async getAll(): Promise<TimelineEntry[]> {
    await simulateLatency()
    return [...timelineData]
  }
}

export const timelineRepository = new MockTimelineRepository()
