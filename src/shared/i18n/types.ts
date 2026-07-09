import type { AboutSections } from '@/domain/entities/Profile'

export type Locale = 'pt' | 'en'

export interface TimelineEntryTranslation {
  period: string
  title: string
  description: string
}

export interface ProjectHighlightTranslation {
  title: string
  description: string
}

export interface ProjectDetailsTranslation {
  tags?: string[]
  overview: string
  highlights?: ProjectHighlightTranslation[]
  imageCaptions?: string[]
}

export interface Translations {
  locale: Locale
  lang: {
    pt: string
    en: string
    switchTo: string
    current: string
  }
  nav: {
    hero: string
    sobre: string
    skills: string
    projetos: string
    trajetoria: string
    contato: string
  }
  header: {
    contact: string
    openMenu: string
    closeMenu: string
    mainNav: string
    mobileNav: string
  }
  sections: {
    hero: string
    sobre: string
    skills: string
    projetos: string
    trajetoria: string
    contato: string
  }
  a11y: {
    skipToContent: string
    scrollToAbout: string
    loading: string
    stack: string
    tags: string
    directLinks: string
    filterProjects: string
    learningPath: string
  }
  hero: {
    greeting: string
    ctaProjects: string
    ctaContact: string
    highlight: string
    role: string
    loadError: string
  }
  profile: {
    title: string
    tagline: string
    about: AboutSections
  }
  about: {
    whoAmI: string
    whatIDo: string
    whatIveDone: string
    underConstruction: string
    studyTime: string
    months: string
    studyMode: string
    next: string
    inProgress: string
    loadError: string
  }
  skills: {
    title: string
    subtitle: string
    loadError: string
    layers: {
      frontend: string
      backend: string
      data: string
      infra: string
      learning: string
    }
    levels: {
      dominated: string
      proficient: string
      learning: string
      next: string
    }
  }
  projects: {
    title: string
    subtitle: string
    filterPlaceholder: string
    noResults: string
    teamBadge: string
    learnMore: string
    repository: string
    private: string
    loadError: string
    prevPage: string
    nextPage: string
    carouselLabel: string
    projectSingular: string
    projectPlural: string
    carouselPages: string
    goToPage: string
    descriptions: Record<string, string>
  }
  projectModal: {
    overview: string
    highlights: string
    images: string
    close: string
    closeDetails: string
    viewRepository: string
    privateRepository: string
    details: Record<string, ProjectDetailsTranslation>
  }
  timeline: {
    title: string
    subtitle: string
    statusNow: string
    statusNext: string
    loadError: string
    entries: Record<string, TimelineEntryTranslation>
  }
  contact: {
    title: string
    subtitle: string
    form: string
    directLinks: string
    name: string
    email: string
    message: string
    submit: string
    submitting: string
    success: string
    loadError: string
    errors: {
      nameRequired: string
      emailRequired: string
      emailInvalid: string
      messageRequired: string
      messageMin: string
      emailNotConfigured: string
      sendFailed: string
    }
  }
  errors: {
    generic: string
  }
}

export type TranslationKey = keyof Translations
