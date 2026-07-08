import type { Translations } from '@/shared/i18n/types'

export const en: Translations = {
  locale: 'en',
  lang: {
    pt: 'PT',
    en: 'EN',
    switchTo: 'Switch language to',
    current: 'Current language',
  },
  nav: {
    hero: 'Home',
    sobre: 'About',
    skills: 'Skills',
    projetos: 'Projects',
    trajetoria: 'Timeline',
    contato: 'Contact',
  },
  header: {
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile menu',
  },
  sections: {
    hero: '01 · home',
    sobre: '02 · about',
    skills: '03 · skills',
    projetos: '04 · projects',
    trajetoria: '05 · timeline',
    contato: '06 · contact',
  },
  a11y: {
    skipToContent: 'Skip to content',
    scrollToAbout: 'Scroll to about section',
    loading: 'Loading',
    stack: 'Stack',
    tags: 'Tags',
    directLinks: 'Direct links',
    filterProjects: 'Filter by name or stack',
    learningPath: 'Learning path',
  },
  hero: {
    greeting: "Hey, I'm",
    ctaProjects: 'View projects',
    ctaContact: 'Contact',
    highlight:
      '{{months}} months of intensive self-taught study — from HTML to Docker.',
    role: 'Full Stack Dev',
    loadError: 'Could not load profile.',
  },
  profile: {
    title: 'Full Stack Developer',
    tagline: 'From idea to deploy — I build digital products that work end to end.',
    about: {
      whoIAm: [
        "I'm Andrey, a full stack developer in training. I study intensively and self-taught, focused on building complete applications — from components to the database.",
      ],
      whatIDo: [
        'I master the JavaScript ecosystem end to end: React on the frontend, Node.js on the backend, MongoDB and PostgreSQL for data.',
        "Java is my current focus. Spring Boot is next — I don't hide what I'm still building.",
      ],
      whatIveDone: [
        'Nine months of intensive study. I went from HTML to APIs with databases and Docker.',
      ],
    },
  },
  about: {
    whoAmI: 'Who am I?',
    whatIDo: 'What do I do?',
    whatIveDone: 'What have I done?',
    underConstruction: 'in progress',
    studyTime: 'study time',
    months: 'months',
    studyMode: 'intensive · self-taught',
    next: 'next',
    inProgress: 'learning',
    loadError: 'Could not load the about section.',
  },
  skills: {
    title: 'Stack by layer',
    subtitle:
      'Grouped like code architecture — frontend, backend, data, infrastructure, and what is still being built.',
    loadError: 'Could not load skills.',
    layers: {
      frontend: 'Frontend',
      backend: 'Backend',
      data: 'Data',
      infra: 'Infrastructure',
      learning: 'Learning',
    },
    levels: {
      dominated: 'mastered',
      proficient: 'proficient',
      learning: 'learning',
      next: 'next',
    },
  },
  projects: {
    title: 'Projects',
    subtitle:
      'From layered backends to static frontends — ordered by technical relevance and complexity.',
    filterPlaceholder: 'filter by name or stack…',
    noResults: 'No projects match the filter.',
    teamBadge: 'team project',
    learnMore: 'learn more',
    repository: 'repository →',
    private: 'private · production',
    loadError: 'Could not load projects.',
    prevPage: 'Previous page',
    nextPage: 'Next page',
    carouselLabel: 'Projects carousel',
    projectSingular: 'project',
    projectPlural: 'projects',
    carouselPages: 'Carousel pages',
    goToPage: 'Go to page {{page}} of {{total}}',
    descriptions: {
      'sistema-gestao-materiais-construcao':
        'Construction materials management with real domain logic, state machines, business rules, and layered architecture.',
      'api-rest':
        'REST API with CRUD, pagination, Pydantic validation, documented layers, and a test suite.',
      'fastapi-mongodb-docker':
        'FastAPI API with containerized MongoDB, separated routes, repositories, schemas, and services.',
      'mecanica-automotiva':
        'Auto shop landing page built as a team with Git flow using feature branches.',
      'next-cent':
        'Modular site with reusable components and team collaboration by feature.',
      'havan-landing-page':
        'Large retail-inspired landing page split into numbered sections, simulating incremental team delivery.',
      'ev-website':
        'Institutional site with a modern frontend toolchain — React, Vite, and ESLint.',
      'cine-anime':
        'Anime catalog with carousel, search suggestions, mobile menu, and state synchronization.',
      'docker-postgresql-alembic':
        'PostgreSQL with Docker, Alembic migrations, and a Python application — infrastructure focused.',
      'ipitanga-books':
        'Book management application built for production use.',
      'ipitanga-justifica':
        'Justification system built for production use.',
      ridex:
        'Multi-file landing page with organized HTML, CSS, and JavaScript structure.',
      'projeto-lista-tarefas':
        'DOM task CRUD with frontend state management.',
      'food-delivery':
        'Visual food delivery landing page with responsive layout.',
      'alcool-gasolina':
        'Cost-benefit calculator comparing ethanol and gasoline.',
      'lista-nomes':
        'Dynamic list manipulation in the DOM.',
      'frases-motivacionais':
        'Random motivational quote generator.',
      'projeto-medium':
        'Medium layout clone with elaborate static HTML and CSS.',
      'projeto-site-noticias-cidade':
        'Static multi-page news portal layout.',
      'projeto-chale-hotel':
        'Hotel institutional site focused on visual composition.',
      'projeto-zoom':
        'Video conferencing interface clone — layout exercise.',
      agencia: 'Layout exercises with Flexbox and CSS Grid.',
      'projeto-tecblog': 'Static blog with structural HTML and CSS.',
      'projeto-annabella': 'Simple static site — early study phase.',
      'projeto-html': 'First contact with HTML — web fundamentals.',
    },
  },
  projectModal: {
    overview: 'overview',
    highlights: 'highlights',
    images: 'images',
    close: 'Close modal',
    closeDetails: 'Close project details',
    viewRepository: 'view repository →',
    privateRepository: 'private repository · in production',
    details: {
      'sistema-gestao-materiais-construcao': {
        tags: ['backend', 'domain', 'api'],
        overview:
          'Complete system for construction materials control, modeling inventory, movements, and real business rules. Layered architecture separates domain, services, repositories, and routes, with PostgreSQL and versioned migrations via Alembic.',
        highlights: [
          {
            title: 'State machine',
            description:
              'Material flows controlled by explicit transitions, preventing inventory inconsistencies.',
          },
          {
            title: 'Documented layers',
            description:
              'Clear separation between routes, services, repositories, and typed schemas.',
          },
          {
            title: 'Test suite',
            description:
              'Pytest coverage validating business rules and critical endpoints.',
          },
        ],
        imageCaptions: [
          'API overview',
          'Domain model',
          'Inventory endpoints',
          'Alembic migrations',
        ],
      },
      'api-rest': {
        tags: ['backend', 'api', 'crud'],
        overview:
          'Reference REST API with full CRUD, pagination, Pydantic validation, and automatic documentation. Base project to consolidate layer patterns, tests, and Docker containerization.',
        highlights: [
          {
            title: 'CRUD and pagination',
            description:
              'Paginated listings with filters and standardized responses for clients.',
          },
          {
            title: 'Pydantic validation',
            description:
              'Input and output schemas ensure stable contracts between layers.',
          },
          {
            title: 'Integrated OpenAPI',
            description: 'Interactive documentation automatically generated by FastAPI.',
          },
        ],
        imageCaptions: [
          'Swagger / OpenAPI',
          'CRUD endpoints',
          'Schema validation',
          'Automated tests',
        ],
      },
      'fastapi-mongodb-docker': {
        tags: ['backend', 'nosql', 'docker'],
        overview:
          'FastAPI integrated with MongoDB in a containerized environment. Demonstrates document-oriented persistence with dedicated repositories and a reproducible local stack.',
        highlights: [
          {
            title: 'Containerized MongoDB',
            description: 'NoSQL database orchestrated via Docker Compose with the app.',
          },
          {
            title: 'Layer separation',
            description:
              'Routes, repositories, schemas, and services isolated for simple maintenance.',
          },
        ],
        imageCaptions: ['Layer architecture', 'API routes', 'MongoDB integration'],
      },
      'mecanica-automotiva': {
        tags: ['frontend', 'landing page', 'team'],
        overview:
          'Institutional landing page for an auto shop, built as a team with Git flow via feature branches. Focus on visual composition, content hierarchy, and incremental delivery.',
        highlights: [
          {
            title: 'Team collaboration',
            description:
              '10 feature/* branches organizing sections and components by owner.',
          },
          {
            title: 'Responsive layout',
            description: 'Fluid adaptation between mobile and desktop with semantic HTML.',
          },
        ],
        imageCaptions: ['Hero section', 'Services', 'Testimonials', 'Contact'],
      },
      'next-cent': {
        tags: ['frontend', 'components', 'team'],
        overview:
          'Modular site built with reusable components and task division by feature. Simulates professional delivery with independent feature branches.',
        highlights: [
          {
            title: 'Reusable components',
            description: 'Shared HTML/CSS/JS blocks across pages for visual consistency.',
          },
          {
            title: 'Collaborative Git flow',
            description: '3 feature/* branches with incremental merges to main.',
          },
        ],
        imageCaptions: ['Home page', 'Services section', 'Footer and navigation'],
      },
      'havan-landing-page': {
        tags: ['frontend', 'landing page', 'team'],
        overview:
          'Large retail-inspired landing page split into ten numbered sections. Team project simulating incremental sprints with well-defined partial deliveries.',
        highlights: [
          {
            title: 'Incremental delivery',
            description:
              '10 sections developed and integrated progressively throughout the project.',
          },
          {
            title: 'Dense visual composition',
            description:
              'Grid, typography, and promotion hierarchy in an e-commerce layout.',
          },
        ],
        imageCaptions: [
          'Main banner',
          'Product grid',
          'Offers',
          'Newsletter',
          'Mobile',
        ],
      },
      'ev-website': {
        tags: ['frontend', 'react', 'spa'],
        overview:
          'Institutional site with a modern toolchain — React, Vite, and ESLint. Componentization, client-side routing, and optimized production build.',
        highlights: [
          {
            title: 'React + Vite stack',
            description: 'Fast development with HMR and lean bundle for deploy.',
          },
          {
            title: 'Code quality',
            description: 'Linting and folder structure ready to scale.',
          },
        ],
        imageCaptions: ['Home', 'About section', 'Components'],
      },
      'cine-anime': {
        tags: ['frontend', 'javascript', 'interactivity'],
        overview:
          'Anime catalog with featured carousel, real-time search suggestions, mobile menu, and DOM state synchronization. Project focused on UX and advanced event handling.',
        highlights: [
          {
            title: 'Search with suggestions',
            description: 'Dynamic autocomplete filtering titles as the user types.',
          },
          {
            title: 'Interactive carousel',
            description: 'Slide navigation highlighting releases and favorites.',
          },
          {
            title: 'Mobile menu',
            description: 'Adaptive navigation with toggle and overlay for small screens.',
          },
        ],
        imageCaptions: [
          'Main catalog',
          'Featured carousel',
          'Search suggestions',
          'Mobile menu',
        ],
      },
    },
  },
  timeline: {
    title: 'Timeline',
    subtitle:
      'Nine months of intensive study — from HTML to Docker, with Java in progress and Spring Boot on the horizon.',
    statusNow: 'now',
    statusNext: 'next',
    loadError: 'Could not load timeline.',
    entries: {
      'html-css': {
        period: 'Month 1–2',
        title: 'Web fundamentals',
        description:
          'Semantic HTML and CSS — layout, responsiveness, first static projects.',
      },
      javascript: {
        period: 'Month 3',
        title: 'JavaScript',
        description: 'Logic, DOM, events, and API consumption in the browser.',
      },
      react: {
        period: 'Month 4',
        title: 'React + Tailwind',
        description: 'Components, state, hooks, and utility-first styling.',
      },
      nodejs: {
        period: 'Month 5',
        title: 'Node.js + Express',
        description: 'REST APIs, middleware, routes, and error handling.',
      },
      databases: {
        period: 'Month 6–7',
        title: 'Databases',
        description: 'Modeling and queries in MongoDB and PostgreSQL.',
      },
      docker: {
        period: 'Month 8',
        title: 'Docker',
        description: 'Application containerization and reproducible environments.',
      },
      'team-projects': {
        period: 'Month 8–9',
        title: 'Team projects',
        description: 'Git workflow: branches, pull requests, and code review.',
      },
      java: {
        period: 'Now',
        title: 'Java',
        description: 'OOP, collections, streams, and JVM fundamentals.',
      },
      'spring-boot': {
        period: 'Next',
        title: 'Spring Boot',
        description: 'Java APIs with dependency injection and the Spring ecosystem.',
      },
    },
  },
  contact: {
    title: 'Contact',
    subtitle: 'Form or direct link — I reply as soon as possible.',
    form: 'form',
    directLinks: 'direct links',
    name: 'name',
    email: 'email',
    message: 'message',
    submit: 'send message',
    submitting: 'sending…',
    success: 'Message sent successfully.',
    loadError: 'Could not load contact section.',
    errors: {
      nameRequired: 'Please enter your name.',
      emailRequired: 'Please enter your email.',
      emailInvalid: 'Invalid email.',
      messageRequired: 'Please write a message.',
      messageMin: 'Minimum of 10 characters.',
      emailNotConfigured:
        'Email service not configured. Check .env.local.',
      sendFailed: 'Could not send. Please try again shortly.',
    },
  },
  errors: {
    generic: 'An unexpected error occurred.',
  },
}
