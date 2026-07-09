import type { ReactNode } from 'react'

interface ButtonProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  icon?: 'mail'
}

const variants = {
  primary:
    'rounded-full border border-accent bg-accent px-7 py-3 text-bg-primary hover:bg-accent-light hover:border-accent-light',
  outline:
    'rounded-full border border-accent text-accent-light hover:bg-accent/10',
  ghost:
    'rounded-full border border-text-secondary/80 text-text-primary/80 hover:border-accent/60 hover:text-accent-light',
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  )
}

export function Button({
  href,
  children,
  variant = 'outline',
  icon,
}: ButtonProps) {
  const showIconOnly = variant === 'ghost' && icon

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 font-mono text-label uppercase transition-colors ${variants[variant]} ${
        showIconOnly ? 'px-3.5 py-3.5' : ''
      }`}
      aria-label={showIconOnly ? String(children) : undefined}
    >
      {icon === 'mail' && <MailIcon />}
      {!showIconOnly && children}
    </a>
  )
}
