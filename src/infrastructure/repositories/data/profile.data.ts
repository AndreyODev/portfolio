import type { Profile } from '@/domain/entities/Profile'

export const profileData: Profile = {
  name: 'Andrey',
  title: 'Desenvolvedor Full Stack',
  tagline: 'Construo aplicações em camadas — do componente ao banco de dados.',
  about: [
    'Nove meses de estudo intensivo e autodidata. Parti do HTML e cheguei a APIs com banco de dados e Docker.',
    'Domino o ecossistema JavaScript de ponta a ponta: React no frontend, Node.js no backend, MongoDB e PostgreSQL nos dados.',
    'Java é o foco atual. Spring Boot vem em seguida — não escondo o que ainda estou construindo.',
  ],
  monthsStudying: 9,
  currentlyLearning: ['Java'],
  nextStep: ['Spring Boot'],
  email: '[[ seu-email@exemplo.com ]]',
  github: 'https://github.com/AndreyODev',
  linkedin: '[[ seu-linkedin ]]',
}
