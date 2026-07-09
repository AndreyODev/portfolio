import type { ReactNode } from 'react'
import { Reveal } from '@/presentation/components/Reveal'
import {
  SectionContainer,
  SectionShell,
} from '@/presentation/components/SectionShell'

interface SectionProps {
  id: string
  label: string
  children: ReactNode
  className?: string
  border?: boolean
}

export function Section({
  id,
  label,
  children,
  className = '',
  border = true,
}: SectionProps) {
  return (
    <SectionShell
      id={id}
      labelledBy={`${id}-label`}
      border={border}
      className={className}
    >
      <SectionContainer>
        <Reveal>
          <p
            id={`${id}-label`}
            className="mb-[var(--section-gap)] font-mono text-label uppercase tracking-widest text-accent"
          >
            {label}
          </p>
        </Reveal>
        {children}
      </SectionContainer>
    </SectionShell>
  )
}
