import type { Project } from '@/domain/entities/Project'

/**
 * Dados provisórios — lista completa e ordenação final
 * serão definidas na branch feat/projects.
 */
export const projectsData: Project[] = [
  {
    id: 'fastapi-mongodb-docker',
    name: 'fastapi-mongodb-docker',
    slug: 'fastapi-mongodb-docker',
    description: 'API FastAPI com MongoDB containerizado via Docker.',
    stack: ['Python', 'FastAPI', 'MongoDB', 'Docker'],
    type: 'individual',
    repositoryUrl: 'https://github.com/AndreyODev/fastapi-mongodb-docker',
    relevanceRank: 1,
    featured: true,
  },
  {
    id: 'docker-postgresql-alembic',
    name: 'docker-postgresql-alembic',
    slug: 'docker-postgresql-alembic',
    description: 'PostgreSQL com Docker e migrações Alembic.',
    stack: ['Python', 'PostgreSQL', 'Docker', 'Alembic'],
    type: 'individual',
    repositoryUrl: 'https://github.com/AndreyODev/docker-postgresql-alembic',
    relevanceRank: 2,
    featured: true,
  },
]
