import type { ReactNode } from 'react'

interface ButtonProps {
  href: string
  children: ReactNode
  variant?: 'outline' | 'ghost'
}

const variants = {
  outline:
    'border border-accent text-accent-light hover:bg-accent/10',
  ghost:
    'border border-text-secondary text-text-primary/80 hover:border-accent/60 hover:text-accent-light',
}

export function Button({
  href,
  children,
  variant = 'outline',
}: ButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center px-6 py-3 font-mono text-label uppercase transition-colors ${variants[variant]}`}
    >
      {children}
    </a>
  )
}
