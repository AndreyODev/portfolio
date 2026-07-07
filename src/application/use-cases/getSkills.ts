import type { SkillsRepository } from '@/domain/repositories/SkillsRepository'
import type { Skill } from '@/domain/entities/Skill'
import { SKILL_LAYER_LABELS, SKILL_LAYER_ORDER } from '@/domain/entities/Skill'
import type { SkillLayer } from '@/domain/types'

export interface SkillGroup {
  layer: SkillLayer
  label: string
  skills: Skill[]
}

export async function getAllSkills(
  repository: SkillsRepository,
): Promise<Skill[]> {
  return repository.getAll()
}

export async function getSkillsGroupedByLayer(
  repository: SkillsRepository,
): Promise<SkillGroup[]> {
  const skills = await repository.getAll()

  return SKILL_LAYER_ORDER.map((layer) => ({
    layer,
    label: SKILL_LAYER_LABELS[layer],
    skills: skills.filter((skill) => skill.layer === layer),
  })).filter((group) => group.skills.length > 0)
}
