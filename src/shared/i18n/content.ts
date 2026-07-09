import type { Profile } from '@/domain/entities/Profile'
import type { Project } from '@/domain/entities/Project'
import type { ProjectDetails } from '@/domain/entities/Project'
import type { TimelineEntry } from '@/domain/entities/TimelineEntry'
import type { SkillLayer } from '@/domain/types'
import type { Locale, Translations } from '@/shared/i18n/types'
import { getTranslations } from '@/shared/i18n'

export function getLocalizedProfile(
  profile: Profile,
  locale: Locale,
): Pick<Profile, 'title' | 'tagline' | 'about'> {
  if (locale === 'pt') {
    return {
      title: profile.title,
      tagline: profile.tagline,
      about: profile.about,
    }
  }

  const t = getTranslations('en')
  return {
    title: t.profile.title,
    tagline: t.profile.tagline,
    about: t.profile.about,
  }
}

export function getLocalizedProject(project: Project, locale: Locale): Project {
  if (locale === 'pt') return project

  const description =
    getTranslations('en').projects.descriptions[project.id] ?? project.description

  return { ...project, description }
}

export function getLocalizedTimelineEntry(
  entry: TimelineEntry,
  locale: Locale,
): TimelineEntry {
  if (locale === 'pt') return entry

  const localized = getTranslations('en').timeline.entries[entry.id]
  if (!localized) return entry

  return {
    ...entry,
    period: localized.period,
    title: localized.title,
    description: localized.description,
  }
}

export function getLocalizedSkillLayerLabel(
  layer: SkillLayer,
  t: Translations,
): string {
  return t.skills.layers[layer]
}

export function getLocalizedProjectDetails(
  project: Project,
  details: ProjectDetails,
  locale: Locale,
): ProjectDetails {
  if (locale === 'pt') return details

  const localized = getTranslations('en').projectModal.details[project.id]
  if (localized) {
    return {
      tags: localized.tags ?? details.tags,
      overview: localized.overview,
      highlights: localized.highlights ?? details.highlights,
      images: details.images.map((image, index) => ({
        ...image,
        alt: localized.imageCaptions?.[index] ?? image.alt,
        caption: localized.imageCaptions?.[index] ?? image.caption,
      })),
    }
  }

  const t = getTranslations('en')
  const enProject = getLocalizedProject(project, 'en')

  return {
    ...details,
    overview: enProject.description,
    highlights: getDefaultModalHighlights(project, t),
    images:
      details.images.length > 0
        ? details.images.map((image, index) => {
            const defaults = getDefaultModalImages(project, t)
            return {
              ...image,
              alt: defaults[index]?.alt ?? image.alt,
              caption: defaults[index]?.caption ?? image.caption,
            }
          })
        : getDefaultModalImages(project, t),
  }
}

export function getDefaultModalHighlights(
  project: Project,
  t: Translations,
): ProjectDetails['highlights'] {
  const highlights = [
    {
      title: 'Stack',
      description: project.stack.join(' · '),
    },
  ]

  if (project.teamContext) {
    highlights.push({
      title: t.locale === 'en' ? 'Team context' : 'Contexto em equipe',
      description: project.teamContext,
    })
  }

  if (project.isPrivate) {
    highlights.push({
      title: t.locale === 'en' ? 'Production environment' : 'Ambiente de produção',
      description:
        t.locale === 'en'
          ? 'Private project in real use — code not publicly available.'
          : 'Projeto privado em uso real — código não disponível publicamente.',
    })
  }

  return highlights
}

export function getDefaultModalImages(
  project: Project,
  t: Translations,
): ProjectDetails['images'] {
  const overview = t.locale === 'en' ? 'Overview' : 'Visão geral'
  const ui = t.locale === 'en' ? 'Interface' : 'Interface'

  return [
    { alt: `${overview} — ${project.name}`, caption: overview },
    { alt: `${ui} — ${project.name}`, caption: ui },
  ]
}
