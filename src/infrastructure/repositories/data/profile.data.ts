import type { Profile } from '@/domain/entities/Profile'

export const profileData: Profile = {
  name: 'Andrey',
  title: 'Desenvolvedor Full Stack',
  tagline: 'Da ideia ao deploy — construo produtos digitais que funcionam de ponta a ponta.',
  about: {
    whoIAm: [
      'Sou Andrey, desenvolvedor full stack em formação. Estudo de forma intensiva e autodidata, com foco em construir aplicações completas — do componente ao banco de dados.',
    ],
    whatIDo: [
      'Domino o ecossistema JavaScript de ponta a ponta: React no frontend, Node.js no backend, MongoDB e PostgreSQL nos dados.',
      'Java é o foco atual. Spring Boot vem em seguida — não escondo o que ainda estou construindo.',
    ],
    whatIveDone: [
      'Nove meses de estudo intensivo. Parti do HTML e cheguei a APIs com banco de dados e Docker.',
    ],
  },
  monthsStudying: 9,
  currentlyLearning: ['Java'],
  nextStep: ['Spring Boot'],
  email: '[[ seu-email@exemplo.com ]]',
  github: 'https://github.com/AndreyODev',
  linkedin: '[[ seu-linkedin ]]',
}
