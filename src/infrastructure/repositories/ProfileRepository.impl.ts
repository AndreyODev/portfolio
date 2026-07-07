import type { ProfileRepository } from '@/domain/repositories/ProfileRepository'
import type { Profile } from '@/domain/entities/Profile'
import { profileData } from './data/profile.data'

const simulateLatency = (ms = 80) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export class MockProfileRepository implements ProfileRepository {
  async get(): Promise<Profile> {
    await simulateLatency()
    return { ...profileData }
  }
}

export const profileRepository = new MockProfileRepository()
