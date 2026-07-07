import type { Project } from '@/domain/entities/Project'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

function StackChips({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Stack">
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
  return (
    <span className="border border-accent/50 bg-accent/5 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-accent-light">
      projeto em equipe
    </span>
  )
}

function PrivateBadge() {
  return (
    <span className="font-mono text-[0.65rem] uppercase tracking-wider text-text-primary/45">
      repositório privado · em produção
    </span>
  )
}

function CardContent({ project, featured }: ProjectCardProps) {
  return (
    <>
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

      {project.isPrivate ? (
        <PrivateBadge />
      ) : (
        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-accent-light">
          ver repositório →
        </span>
      )}
    </>
  )
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const baseStyles = `flex flex-col gap-4 border bg-bg-primary p-5 transition-colors ${
    featured
      ? 'border-accent/60 hover:border-accent'
      : 'border-text-secondary/80 hover:border-accent/40'
  }`

  if (project.isPrivate || !project.repositoryUrl) {
    return (
      <article className={baseStyles} aria-label={project.name}>
        <CardContent project={project} featured={featured} />
      </article>
    )
  }

  return (
    <a
      href={project.repositoryUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} group`}
      aria-label={`${project.name} — abrir repositório`}
    >
      <CardContent project={project} featured={featured} />
    </a>
  )
}
