interface LearningStepProps {
  label: string
  status: 'in-progress' | 'planned'
}

function LearningStep({ label, status }: LearningStepProps) {
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
        {isPlanned ? 'próximo' : 'em estudo'}
      </span>
    </li>
  )
}

function AboutSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-10 w-48 rounded-sm bg-bg-surface" />
      <div className="space-y-3">
        <div className="h-4 w-full rounded-sm bg-bg-surface" />
        <div className="h-4 w-full rounded-sm bg-bg-surface" />
        <div className="h-4 w-3/4 rounded-sm bg-bg-surface" />
      </div>
    </div>
  )
}

interface AboutContentProps {
  monthsStudying: number
  about: string[]
  currentlyLearning: string[]
  nextStep: string[]
}

function AboutContent({
  monthsStudying,
  about,
  currentlyLearning,
  nextStep,
}: AboutContentProps) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
      <div className="space-y-6">
        <h2 className="font-display text-display-md font-medium text-balance">
          Trajetória
        </h2>

        <div className="space-y-4">
          {about.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-2xl font-body text-body-md text-text-primary/80"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <aside className="space-y-6" aria-label="Resumo e próximos passos">
        <div className="border border-text-secondary bg-bg-surface px-6 py-5">
          <p className="font-mono text-label uppercase text-accent-light">
            tempo de estudo
          </p>
          <p className="mt-2 font-display text-display-lg font-medium text-accent">
            {monthsStudying}
            <span className="ml-2 font-body text-body-lg text-text-primary/70">
              meses
            </span>
          </p>
          <p className="mt-1 font-mono text-[0.65rem] text-text-primary/45">
            intensivo · autodidata
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-label uppercase text-accent">
            em construção
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
      </aside>
    </div>
  )
}

export { AboutContent, AboutSkeleton }
