import type { Project } from '@/domain/entities/Project'
import type { ProjectDetails, ProjectImage } from '@/domain/entities/Project'

function screenshots(
  slug: string,
  labels: string[],
  extension = 'webp',
): ProjectImage[] {
  return labels.map((label, index) => ({
    src: `/projects/${slug}/${String(index + 1).padStart(2, '0')}.${extension}`,
    alt: label,
    caption: label,
  }))
}

export const projectDetailsMap: Record<string, ProjectDetails> = {
  'sistema-gestao-materiais-construcao': {
    tags: ['backend', 'domínio', 'api'],
    overview:
      'Sistema completo para controle de materiais de construção, modelando estoque, movimentações e regras de negócio reais. A arquitetura em camadas separa domínio, serviços, repositórios e rotas, com PostgreSQL e migrações versionadas via Alembic.',
    highlights: [
      {
        title: 'Máquina de estados',
        description:
          'Fluxos de materiais controlados por transições explícitas, evitando inconsistências no estoque.',
      },
      {
        title: 'Camadas documentadas',
        description:
          'Separação clara entre routes, services, repositories e schemas com contratos tipados.',
      },
      {
        title: 'Suite de testes',
        description:
          'Cobertura com Pytest para validar regras de negócio e endpoints críticos.',
      },
    ],
    images: screenshots('sistema-gestao-materiais-construcao', [
      'Visão geral da API',
      'Modelo de domínio',
      'Endpoints de estoque',
      'Migrações Alembic',
    ]),
  },
  'api-rest': {
    tags: ['backend', 'api', 'crud'],
    overview:
      'API REST de referência com CRUD completo, paginação, validação Pydantic e documentação automática. Projeto base para consolidar padrões de camadas, testes e containerização com Docker.',
    highlights: [
      {
        title: 'CRUD e paginação',
        description:
          'Listagens paginadas com filtros e respostas padronizadas para consumo por clientes.',
      },
      {
        title: 'Validação Pydantic',
        description:
          'Schemas de entrada e saída garantem contratos estáveis entre camadas.',
      },
      {
        title: 'OpenAPI integrada',
        description:
          'Documentação interativa gerada automaticamente pelo FastAPI.',
      },
    ],
    images: screenshots('api-rest', [
      'Swagger / OpenAPI',
      'Endpoints CRUD',
      'Validação de schemas',
      'Testes automatizados',
    ]),
  },
  'fastapi-mongodb-docker': {
    tags: ['backend', 'nosql', 'docker'],
    overview:
      'API FastAPI integrada ao MongoDB em ambiente containerizado. Demonstra persistência document-oriented com repositories dedicados e stack pronta para desenvolvimento local reproduzível.',
    highlights: [
      {
        title: 'MongoDB containerizado',
        description:
          'Banco NoSQL orquestrado via Docker Compose junto à aplicação.',
      },
      {
        title: 'Separação por camadas',
        description:
          'Routes, repositories, schemas e services isolados para manutenção simples.',
      },
    ],
    images: screenshots('fastapi-mongodb-docker', [
      'Arquitetura de camadas',
      'Rotas da API',
      'Integração MongoDB',
    ]),
  },
  'mecanica-automotiva': {
    tags: ['frontend', 'landing page', 'equipe'],
    overview:
      'Landing page institucional para oficina mecânica, desenvolvida em equipe com fluxo Git por feature branches. Foco em composição visual, hierarquia de conteúdo e entrega incremental.',
    highlights: [
      {
        title: 'Colaboração em equipe',
        description:
          '10 branches feature/* organizando seções e componentes por responsável.',
      },
      {
        title: 'Layout responsivo',
        description:
          'Adaptação fluida entre mobile e desktop com HTML semântico.',
      },
    ],
    images: screenshots('mecanica-automotiva', [
      'Hero section',
      'Serviços',
      'Depoimentos',
      'Contato',
    ]),
  },
  'next-cent': {
    tags: ['frontend', 'componentes', 'equipe'],
    overview:
      'Site modular construído com componentes reutilizáveis e divisão de tarefas por funcionalidade. Simula entrega profissional com branches independentes por feature.',
    highlights: [
      {
        title: 'Componentes reutilizáveis',
        description:
          'Blocos HTML/CSS/JS compartilhados entre páginas para consistência visual.',
      },
      {
        title: 'Fluxo Git colaborativo',
        description: '3 branches feature/* com merge incremental na main.',
      },
    ],
    images: screenshots('next-cent', [
      'Página inicial',
      'Seção de serviços',
      'Rodapé e navegação',
    ]),
  },
  'havan-landing-page': {
    tags: ['frontend', 'landing page', 'equipe'],
    overview:
      'Landing page extensa inspirada em varejo, dividida em dez seções numeradas. Projeto de equipe que simula sprints incrementais com entregas parciais bem definidas.',
    highlights: [
      {
        title: 'Entrega incremental',
        description:
          '10 seções desenvolvidas e integradas progressivamente ao longo do projeto.',
      },
      {
        title: 'Composição visual densa',
        description:
          'Grid, tipografia e hierarquia de promoções em layout de e-commerce.',
      },
    ],
    images: screenshots('havan-landing-page', [
      'Banner principal',
      'Grid de produtos',
      'Ofertas',
      'Newsletter',
      'Mobile',
    ]),
  },
  'ev-website': {
    tags: ['frontend', 'react', 'spa'],
    overview:
      'Site institucional com toolchain moderna — React, Vite e ESLint. Componentização, roteamento client-side e build otimizado para produção.',
    highlights: [
      {
        title: 'Stack React + Vite',
        description:
          'Desenvolvimento rápido com HMR e bundle enxuto para deploy.',
      },
      {
        title: 'Qualidade de código',
        description: 'Linting e estrutura de pastas preparada para escalar.',
      },
    ],
    images: screenshots('ev-website', [
      'Home',
      'Seção sobre',
      'Componentes',
    ]),
  },
  'cine-anime': {
    tags: ['frontend', 'javascript', 'interatividade'],
    overview:
      'Catálogo de animes com carrossel de destaques, busca com sugestões em tempo real, menu mobile e sincronização de estado no DOM. Projeto focado em UX e manipulação avançada de eventos.',
    highlights: [
      {
        title: 'Busca com sugestões',
        description:
          'Autocomplete dinâmico filtrando títulos conforme o usuário digita.',
      },
      {
        title: 'Carrossel interativo',
        description:
          'Navegação por slides com destaque para lançamentos e favoritos.',
      },
      {
        title: 'Menu mobile',
        description:
          'Navegação adaptativa com toggle e overlay para telas pequenas.',
      },
    ],
    images: screenshots('cine-anime', [
      'Catálogo principal',
      'Carrossel de destaques',
      'Busca com sugestões',
      'Menu mobile',
    ]),
  },
}

function inferTags(project: Project): string[] {
  const tags = new Set<string>()

  if (project.type === 'team') tags.add('equipe')
  if (project.isPrivate) tags.add('produção')

  const stack = project.stack.map((tech) => tech.toLowerCase())

  if (stack.some((tech) => ['python', 'fastapi', 'postgresql', 'mongodb'].includes(tech))) {
    tags.add('backend')
  }
  if (stack.some((tech) => ['react', 'vite', 'javascript'].includes(tech))) {
    tags.add('frontend')
  }
  if (stack.some((tech) => ['html', 'css'].includes(tech)) && !tags.has('frontend')) {
    tags.add('frontend')
  }
  if (stack.includes('docker')) tags.add('devops')

  return Array.from(tags)
}

function defaultHighlights(project: Project) {
  const highlights = [
    {
      title: 'Stack',
      description: project.stack.join(' · '),
    },
  ]

  if (project.teamContext) {
    highlights.push({
      title: 'Contexto em equipe',
      description: project.teamContext,
    })
  }

  if (project.isPrivate) {
    highlights.push({
      title: 'Ambiente de produção',
      description:
        'Projeto privado em uso real — código não disponível publicamente.',
    })
  }

  return highlights
}

function defaultImages(project: Project): ProjectImage[] {
  return [
    {
      alt: `Preview de ${project.name}`,
      caption: 'Visão geral',
    },
    {
      alt: `Detalhe de ${project.name}`,
      caption: 'Interface',
    },
  ]
}

export function resolveProjectDetails(project: Project): ProjectDetails {
  if (project.details) return project.details

  const mapped = projectDetailsMap[project.id]
  if (mapped) return mapped

  return {
    tags: inferTags(project),
    overview: project.description,
    highlights: defaultHighlights(project),
    images: defaultImages(project),
  }
}

export function enrichProjectWithDetails(project: Project): Project {
  const details = project.details ?? projectDetailsMap[project.id]
  return details ? { ...project, details } : project
}
