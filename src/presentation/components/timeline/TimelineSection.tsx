import { useTimeline } from '@/application/hooks/useTimeline'
import {
  TimelineContent,
  TimelineSkeleton,
} from '@/presentation/components/timeline/TimelineContent'
import { Section } from '@/presentation/components/Section'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

export function TimelineSection() {
  const { entries, isLoading, error } = useTimeline()
  const { t } = useTranslation()

  return (
    <Section id="trajetoria" label={t.sections.trajetoria}>
      {isLoading && <TimelineSkeleton />}

      {error && (
        <p className="font-mono text-body-sm text-accent">{t.timeline.loadError}</p>
      )}

      {!isLoading && !error && <TimelineContent entries={entries} />}
    </Section>
  )
}
