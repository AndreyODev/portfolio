import type { ReactNode } from 'react'
import { Reveal } from '@/presentation/components/Reveal'
import { RevealItem, RevealStagger } from '@/presentation/components/RevealStagger'
import type { AboutSections } from '@/domain/entities/Profile'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

interface LearningStepProps {
  label: string
  status: 'in-progress' | 'planned'
}

function LearningStep({ label, status }: LearningStepProps) {
  const { t } = useTranslation()
  const isPlanned = status === 'planned'

  return (
    <li
      className={`flex items-center justify-between border px-4 py-3 ${
        isPlanned
          ? 'border-dashed border-accent/40 bg-bg-primary'
          : 'border-accent/70 bg-bg-surface/50'
      }`}
    >
      <span className="font-mono text-body-sm text-text-primary">{label}</span>
      <span className="font-mono text-label uppercase text-accent-light">
        {isPlanned ? t.about.next : t.about.inProgress}
      </span>
    </li>
  )
}

interface AboutBlockProps {
  index: string
  title: string
  children: ReactNode
  delay?: number
}

function AboutBlock({ index, title, children, delay = 0 }: AboutBlockProps) {
  return (
    <Reveal delay={delay} className="space-y-4">
      <header className="space-y-2 border-l-2 border-accent/50 pl-5">
        <p className="font-mono text-label uppercase tracking-widest text-accent-light">
          {index}
        </p>
        <h3 className="font-display text-[clamp(1.35rem,2.5vw,1.75rem)] font-medium leading-tight text-balance text-text-primary">
          {title}
        </h3>
      </header>
      <div className="pl-5">{children}</div>
    </Reveal>
  )
}

function AboutParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <RevealStagger className="space-y-3">
      {paragraphs.map((paragraph) => (
        <RevealItem key={paragraph}>
          <p className="max-w-2xl font-body text-body-md text-text-primary/80">
            {paragraph}
          </p>
        </RevealItem>
      ))}
    </RevealStagger>
  )
}

function AboutSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="grid gap-[var(--section-gap)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="aspect-[4/5] rounded-2xl bg-bg-surface" />
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-4 border-l-2 border-text-secondary pl-5">
              <div className="h-3 w-8 rounded-sm bg-bg-surface" />
              <div className="h-7 w-48 rounded-sm bg-bg-surface" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded-sm bg-bg-surface" />
                <div className="h-4 w-5/6 rounded-sm bg-bg-surface" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface AboutContentProps {
  monthsStudying: number
  about: AboutSections
  currentlyLearning: string[]
  nextStep: string[]
}

function AboutContent({
  monthsStudying,
  about,
  currentlyLearning,
  nextStep,
}: AboutContentProps) {
  const { t } = useTranslation()

  return (
    <div className="grid items-start gap-[var(--section-gap)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <Reveal variant="scaleIn" className="relative mx-auto w-full min-w-0 lg:sticky lg:top-24 lg:max-w-none">
        <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-bg-surface">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(171,135,49,0.15)_0%,transparent_70%)]"
          />
          <img
            src="/images/about.png"
            alt="Andrey Oliveira"
            className="relative z-10 w-full object-cover"
          />
        </div>
      </Reveal>

      <div className="space-y-10">
        <AboutBlock index="01" title={t.about.whoAmI}>
          <AboutParagraphs paragraphs={about.whoIAm} />
        </AboutBlock>

        <AboutBlock index="02" title={t.about.whatIDo} delay={0.1}>
          <div className="space-y-5">
            <AboutParagraphs paragraphs={about.whatIDo} />

            <div className="space-y-3">
              <p className="font-mono text-label uppercase text-accent">
                {t.about.underConstruction}
              </p>
              <ul className="space-y-2">
                {currentlyLearning.map((tech) => (
                  <LearningStep key={tech} label={tech} status="in-progress" />
                ))}
                {nextStep.map((tech) => (
                  <LearningStep key={tech} label={tech} status="planned" />
                ))}
              </ul>
            </div>
          </div>
        </AboutBlock>

        <AboutBlock index="03" title={t.about.whatIveDone} delay={0.2}>
          <div className="space-y-5">
            <AboutParagraphs paragraphs={about.whatIveDone} />

            <div className="border border-text-secondary bg-bg-surface px-6 py-5">
              <p className="font-mono text-label uppercase text-accent-light">
                {t.about.studyTime}
              </p>
              <p className="mt-2 font-display text-display-lg font-medium text-accent">
                {monthsStudying}
                <span className="ml-2 font-body text-body-lg text-text-primary/70">
                  {t.about.months}
                </span>
              </p>
              <p className="mt-1 font-mono text-[0.65rem] text-text-primary/45">
                {t.about.studyMode}
              </p>
            </div>
          </div>
        </AboutBlock>
      </div>
    </div>
  )
}

export { AboutContent, AboutSkeleton }
