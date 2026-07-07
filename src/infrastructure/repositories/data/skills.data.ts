import type { Skill } from '@/domain/entities/Skill'

export const skillsData: Skill[] = [
  { id: 'html', name: 'HTML', layer: 'frontend', level: 'dominated' },
  { id: 'css', name: 'CSS', layer: 'frontend', level: 'dominated' },
  { id: 'javascript', name: 'JavaScript', layer: 'frontend', level: 'dominated' },
  { id: 'react', name: 'React', layer: 'frontend', level: 'proficient' },
  { id: 'tailwind', name: 'Tailwind CSS', layer: 'frontend', level: 'proficient' },
  { id: 'nodejs', name: 'Node.js', layer: 'backend', level: 'proficient' },
  { id: 'express', name: 'Express', layer: 'backend', level: 'proficient' },
  { id: 'mongodb', name: 'MongoDB', layer: 'data', level: 'proficient' },
  { id: 'postgresql', name: 'PostgreSQL', layer: 'data', level: 'proficient' },
  { id: 'docker', name: 'Docker', layer: 'infra', level: 'proficient' },
  { id: 'java', name: 'Java', layer: 'learning', level: 'learning' },
  { id: 'spring-boot', name: 'Spring Boot', layer: 'learning', level: 'learning' },
]
