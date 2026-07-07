import type { SkillsRepository } from '@/domain/repositories/SkillsRepository'
import type { Skill } from '@/domain/entities/Skill'
import type { SkillLayer } from '@/domain/types'
import { SKILL_LAYER_ORDER } from '@/domain/entities/Skill'
import { skillsData } from './data/skills.data'

const simulateLatency = (ms = 80) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

function sortByLayer(skills: Skill[]): Skill[] {
  return [...skills].sort(
    (a, b) =>
      SKILL_LAYER_ORDER.indexOf(a.layer) - SKILL_LAYER_ORDER.indexOf(b.layer),
  )
}

export class MockSkillsRepository implements SkillsRepository {
  async getAll(): Promise<Skill[]> {
    await simulateLatency()
    return sortByLayer(skillsData)
  }

  async getByLayer(layer: SkillLayer): Promise<Skill[]> {
    const all = await this.getAll()
    return all.filter((skill) => skill.layer === layer)
  }
}

export const skillsRepository = new MockSkillsRepository()
