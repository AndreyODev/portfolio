import type { Project } from '@/domain/entities/Project'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

interface ProjectCardProps {
  project: Project
  featured?: boolean
  onOpenDetails?: (project: Project) => void
}

function StackChips({ stack }: { stack: string[] }) {
  const { t } = useTranslation()

  return (
    <ul className="flex flex-wrap gap-2" aria-label={t.a11y.stack}>
      {stack.map((tech) => (
        <li
          key={tech}
          className="border border-accent/30 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-text-primary/60"
        >
          {tech}
        </li>
      ))}
    </ul>
  )
}

function TeamBadge() {
  const { t } = useTranslation()

  return (
    <span className="border border-accent/50 bg-accent/5 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-accent-light">
      {t.projects.teamBadge}
    </span>
  )
}

function CardActions({
  project,
  onOpenDetails,
}: {
  project: Project
  onOpenDetails?: (project: Project) => void
}) {
  const { t } = useTranslation()

  return (
    <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
      <button
        type="button"
        onClick={() => onOpenDetails?.(project)}
        className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-4 py-2 font-mono text-[0.65rem] uppercase tracking-wider text-bg-primary transition-colors hover:bg-accent-light hover:border-accent-light"
      >
        {t.projects.learnMore}
      </button>

      {!project.isPrivate && project.repositoryUrl && (
        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.65rem] uppercase tracking-wider text-accent-light transition-colors hover:text-accent"
        >
          {t.projects.repository}
        </a>
      )}

      {project.isPrivate && (
        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-text-primary/45">
          {t.projects.private}
        </span>
      )}
    </div>
  )
}

export function ProjectCard({
  project,
  featured = false,
  onOpenDetails,
}: ProjectCardProps) {
  const baseStyles = `flex h-full flex-col gap-4 border bg-bg-primary p-5 transition-colors ${
    featured
      ? 'border-accent/60 hover:border-accent'
      : 'border-text-secondary/80 hover:border-accent/40'
  }`

  return (
    <article className={baseStyles} aria-label={project.name}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3
          className={`font-mono text-text-primary ${
            featured ? 'text-body-lg' : 'text-body-sm'
          }`}
        >
          {project.name}
        </h3>
        {project.type === 'team' && <TeamBadge />}
      </div>

      <p
        className={`font-body text-text-primary/70 ${
          featured ? 'text-body-md' : 'text-body-sm'
        }`}
      >
        {project.description}
      </p>

      <StackChips stack={project.stack} />

      <CardActions project={project} onOpenDetails={onOpenDetails} />
    </article>
  )
}
