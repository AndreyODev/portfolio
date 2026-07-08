import { forwardRef, type ReactNode } from 'react'

interface SectionShellProps {
  id: string
  children: ReactNode
  className?: string
  labelledBy?: string
  border?: boolean
  hero?: boolean
}

export const SectionShell = forwardRef<HTMLElement, SectionShellProps>(function SectionShell(
  {
    id,
    children,
    className = '',
    labelledBy,
    border = true,
    hero = false,
  },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      {...(labelledBy ? { 'aria-labelledby': labelledBy } : {})}
      className={`section-shell ${hero ? 'section-shell--hero' : ''} ${
        border ? 'border-b border-text-secondary/60' : ''
      } ${className}`}
    >
      {children}
    </section>
  )
})

interface SectionContainerProps {
  children: ReactNode
  className?: string
}

export function SectionContainer({
  children,
  className = '',
}: SectionContainerProps) {
  return <div className={`section-container ${className}`}>{children}</div>
}
