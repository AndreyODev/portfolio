export interface AboutSections {
  whoIAm: string[]
  whatIDo: string[]
  whatIveDone: string[]
}

export interface Profile {
  name: string
  title: string
  tagline: string
  about: AboutSections
  monthsStudying: number
  currentlyLearning: string[]
  nextStep: string[]
  email: string
  github: string
  linkedin: string
}
