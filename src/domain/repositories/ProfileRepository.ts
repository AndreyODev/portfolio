import type { Profile } from '@/domain/entities/Profile'

export interface ProfileRepository {
  get(): Promise<Profile>
}
