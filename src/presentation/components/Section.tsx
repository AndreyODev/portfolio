import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  label: string
  children: ReactNode
  className?: string
}

export function Section({ id, label, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      className={`scroll-mt-16 flex min-h-dvh items-center border-b border-text-secondary/60 px-4 py-12 sm:px-6 md:px-12 lg:px-20 ${className}`}
    >
      <div className="mx-auto w-full max-w-5xl">
        <p
          id={`${id}-label`}
          className="mb-6 font-mono text-label uppercase tracking-widest text-accent"
        >
          {label}
        </p>
        {children}
      </div>
    </section>
  )
}
