import { useTimeline } from '@/application/hooks/useTimeline'
import {
  TimelineContent,
  TimelineSkeleton,
} from '@/presentation/components/timeline/TimelineContent'
import { Section } from '@/presentation/components/Section'

export function TimelineSection() {
  const { entries, isLoading, error } = useTimeline()

  return (
    <Section id="trajetoria" label="05 · trajetória">
      {isLoading && <TimelineSkeleton />}

      {error && (
        <p className="font-mono text-body-sm text-accent">
          Não foi possível carregar a trajetória.
        </p>
      )}

      {!isLoading && !error && <TimelineContent entries={entries} />}
    </Section>
  )
}
