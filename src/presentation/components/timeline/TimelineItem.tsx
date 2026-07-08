import type { TimelineEntry } from '@/domain/entities/TimelineEntry'
import type { TimelineStatus } from '@/domain/types'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

function getStatusLabel(status: TimelineStatus, t: ReturnType<typeof useTranslation>['t']) {
  switch (status) {
    case 'in-progress':
      return t.timeline.statusNow
    case 'planned':
      return t.timeline.statusNext
    default:
      return null
  }
}

function getStatusStyles(status: TimelineStatus) {
  switch (status) {
    case 'completed':
      return {
        card: 'border-accent/50 shadow-[0_8px_32px_rgba(171,135,49,0.1)]',
        marker: 'bg-accent shadow-[0_0_12px_rgba(171,135,49,0.5)]',
      }
    case 'in-progress':
      return {
        card: 'border-accent shadow-[0_8px_40px_rgba(217,190,129,0.15)]',
        marker: 'bg-accent-light ring-2 ring-accent-light/40',
      }
    case 'planned':
      return {
        card: 'border-dashed border-accent/30 shadow-[0_4px_24px_rgba(171,135,49,0.05)]',
        marker: 'border-2 border-accent/60 bg-bg-primary',
      }
  }
}

type TimelinePosition = 'left' | 'right'

interface TimelineItemProps {
  entry: TimelineEntry
  position: TimelinePosition
}

function TimelineMarker({ status }: { status: TimelineStatus }) {
  const styles = getStatusStyles(status)

  return (
    <span
      className={`relative z-10 block h-3.5 w-3.5 shrink-0 rounded-full ${styles.marker}`}
      aria-hidden="true"
    />
  )
}

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  const { t } = useTranslation()
  const styles = getStatusStyles(entry.status)
  const statusLabel = getStatusLabel(entry.status, t)

  return (
    <article
      className={`w-full space-y-3 rounded-sm border bg-bg-surface/70 p-4 backdrop-blur-sm md:max-w-[280px] ${styles.card}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-accent-light">
          {entry.period}
        </p>
        {statusLabel && (
          <span className="font-mono text-[0.55rem] uppercase tracking-wider text-accent">
            {statusLabel}
          </span>
        )}
      </div>

      <h3 className="font-display text-body-sm font-medium text-text-primary">
        {entry.title}
      </h3>

      <p className="font-body text-[0.8rem] leading-relaxed text-text-primary/65">
        {entry.description}
      </p>

      <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologias">
        {entry.technologies.map((tech) => (
          <li
            key={tech}
            className="border border-accent/25 px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-text-primary/55"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function TimelineItem({ entry, position }: TimelineItemProps) {
  const isLeft = position === 'left'
  const markerPosition = isLeft ? 'left-[32%]' : 'left-[68%]'

  return (
    <li className="relative md:min-h-[160px]">
      {/* Mobile: coluna única à esquerda */}
      <div className="flex gap-4 pb-8 md:hidden">
        <div className="relative z-10 flex flex-col items-center pt-1">
          <TimelineMarker status={entry.status} />
        </div>
        <div className="min-w-0 flex-1">
          <TimelineCard entry={entry} />
        </div>
      </div>

      {/* Desktop: zigue-zague com a onda */}
      <div className="relative mx-auto hidden h-full min-h-[160px] max-w-3xl md:block">
        <div
          className={`absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 ${markerPosition}`}
        >
          <TimelineMarker status={entry.status} />
        </div>

        <div
          className={`absolute top-1/2 flex -translate-y-1/2 items-center gap-3 ${
            isLeft
              ? 'right-[68%] left-0 justify-end pr-2 sm:pr-4'
              : 'left-[68%] right-0 justify-start pl-2 sm:pl-4'
          }`}
        >
          {isLeft && (
            <>
              <TimelineCard entry={entry} />
              <span className="h-px w-6 shrink-0 bg-accent/30 sm:w-8" aria-hidden="true" />
            </>
          )}

          {!isLeft && (
            <>
              <span className="h-px w-6 shrink-0 bg-accent/30 sm:w-8" aria-hidden="true" />
              <TimelineCard entry={entry} />
            </>
          )}
        </div>
      </div>
    </li>
  )
}
