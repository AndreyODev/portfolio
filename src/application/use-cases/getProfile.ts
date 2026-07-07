import type { ProfileRepository } from '@/domain/repositories/ProfileRepository'
import type { Profile } from '@/domain/entities/Profile'

export function getProfile(repository: ProfileRepository): Promise<Profile> {
  return repository.get()
}
