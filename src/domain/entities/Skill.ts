import type { ProficiencyLevel, SkillLayer } from '@/domain/types'

export interface Skill {
  id: string
  name: string
  layer: SkillLayer
  level: ProficiencyLevel
}

export const SKILL_LAYER_LABELS: Record<SkillLayer, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  data: 'Dados',
  infra: 'Infraestrutura',
  learning: 'Em estudo',
}

export const SKILL_LAYER_ORDER: SkillLayer[] = [
  'frontend',
  'backend',
  'data',
  'infra',
  'learning',
]
