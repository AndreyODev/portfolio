export const SITE = {
  name: 'Andrey',
  initials: 'A.',
} as const

export const NAV_ITEM_IDS = [
  'hero',
  'sobre',
  'skills',
  'projetos',
  'trajetoria',
  'contato',
] as const

export type NavItemId = (typeof NAV_ITEM_IDS)[number]

export const HEADER_HEIGHT = '4rem'
