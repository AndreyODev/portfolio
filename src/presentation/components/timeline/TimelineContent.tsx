import type { TimelineEntry } from '@/domain/entities/TimelineEntry'
import { TimelineItem } from '@/presentation/components/timeline/TimelineItem'

function TimelineSkeleton() {
  return (
    <div className="animate-pulse space-y-10">
      <div className="h-10 w-48 rounded-sm bg-bg-surface" />
      <div className="space-y-8 border-l border-text-secondary pl-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-32 rounded-sm bg-bg-surface" />
        ))}
      </div>
    </div>
  )
}

interface TimelineContentProps {
  entries: TimelineEntry[]
}

function TimelineContent({ entries }: TimelineContentProps) {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h2 className="font-display text-display-md font-medium text-balance">
          Linha do tempo
        </h2>
        <p className="max-w-2xl font-body text-body-md text-text-primary/70">
          Nove meses de estudo intensivo — do HTML ao Docker, com Java em
          andamento e Spring Boot no horizonte.
        </p>
      </header>

      <ol
        className="relative border-l border-accent/30 pl-8"
        aria-label="Trajetória de aprendizado"
      >
        {entries.map((entry) => (
          <TimelineItem key={entry.id} entry={entry} />
        ))}
      </ol>
    </div>
  )
}

export { TimelineContent, TimelineSkeleton }
