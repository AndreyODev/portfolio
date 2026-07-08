import type { TimelineEntry } from '@/domain/entities/TimelineEntry'
import { TimelineItem } from '@/presentation/components/timeline/TimelineItem'
import { TimelineWave } from '@/presentation/components/timeline/TimelineWave'
import { Reveal } from '@/presentation/components/Reveal'
import { getLocalizedTimelineEntry } from '@/shared/i18n/content'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

function TimelineSkeleton() {
  return (
    <div className="animate-pulse space-y-[var(--section-gap)]">
      <div className="h-10 w-48 rounded-sm bg-bg-surface" />
      <div className="relative mx-auto max-w-3xl space-y-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`h-36 w-full rounded-sm bg-bg-surface md:max-w-[280px] ${
              index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

interface TimelineContentProps {
  entries: TimelineEntry[]
}

function TimelineContent({ entries }: TimelineContentProps) {
  const { locale, t } = useTranslation()

  return (
    <div className="space-y-[var(--section-gap)]">
      <Reveal>
        <header className="space-y-3">
          <h2 className="font-display text-display-md font-medium text-balance">
            {t.timeline.title}
          </h2>
          <p className="max-w-2xl font-body text-body-md text-text-primary/70">
            {t.timeline.subtitle}
          </p>
        </header>
      </Reveal>

      <div className="relative mx-auto max-w-3xl">
        <TimelineWave count={entries.length} />

        <ol className="relative" aria-label={t.a11y.learningPath}>
          <span
            className="pointer-events-none absolute bottom-8 left-[7px] top-2 w-px bg-accent/20 md:hidden"
            aria-hidden="true"
          />
          {entries.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 0.1}>
              <TimelineItem
                entry={getLocalizedTimelineEntry(entry, locale)}
                position={index % 2 === 0 ? 'left' : 'right'}
              />
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  )
}

export { TimelineContent, TimelineSkeleton }
