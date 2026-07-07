import type { TimelineEntry } from '@/domain/entities/TimelineEntry'
import type { TimelineStatus } from '@/domain/types'

const STATUS_LABELS: Record<TimelineStatus, string | null> = {
  completed: null,
  'in-progress': 'agora',
  planned: 'próximo',
}

function getEntryStyles(status: TimelineStatus) {
  switch (status) {
    case 'completed':
      return {
        card: 'border border-accent/70 bg-bg-surface/50',
        marker: 'bg-accent',
      }
    case 'in-progress':
      return {
        card: 'border border-accent bg-bg-surface/50',
        marker: 'bg-accent-light',
      }
    case 'planned':
      return {
        card: 'border border-dashed border-accent/40 bg-bg-primary',
        marker: 'border border-accent bg-bg-primary',
      }
  }
}

interface TimelineItemProps {
  entry: TimelineEntry
}

export function TimelineItem({ entry }: TimelineItemProps) {
  const styles = getEntryStyles(entry.status)
  const statusLabel = STATUS_LABELS[entry.status]

  return (
    <li className="relative pb-8 last:pb-0">
      <span
        className={`absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 ${styles.marker}`}
        aria-hidden="true"
      />

      <article className={`space-y-3 p-5 ${styles.card}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-mono text-label uppercase tracking-widest text-accent-light">
            {entry.period}
          </p>
          {statusLabel && (
            <span className="font-mono text-[0.6rem] uppercase tracking-wider text-accent">
              {statusLabel}
            </span>
          )}
        </div>

        <h3 className="font-display text-body-lg font-medium text-text-primary">
          {entry.title}
        </h3>

        <p className="font-body text-body-sm text-text-primary/70">
          {entry.description}
        </p>

        <ul className="flex flex-wrap gap-2" aria-label="Tecnologias">
          {entry.technologies.map((tech) => (
            <li
              key={tech}
              className="border border-accent/30 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-text-primary/60"
            >
              {tech}
            </li>
          ))}
        </ul>
      </article>
    </li>
  )
}
