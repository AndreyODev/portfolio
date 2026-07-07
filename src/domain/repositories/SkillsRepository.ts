import type { Skill } from '@/domain/entities/Skill'
import type { SkillLayer } from '@/domain/types'

export interface SkillsRepository {
  getAll(): Promise<Skill[]>
  getByLayer(layer: SkillLayer): Promise<Skill[]>
}
