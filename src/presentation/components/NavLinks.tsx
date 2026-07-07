import { NAV_ITEMS } from '@/shared/config/navigation'

interface NavLinksProps {
  onNavigate?: () => void
  className?: string
  linkClassName?: string
}

export function NavLinks({
  onNavigate,
  className = '',
  linkClassName = '',
}: NavLinksProps) {
  return (
    <ul className={`flex flex-col gap-1 md:flex-row md:items-center md:gap-6 ${className}`}>
      {NAV_ITEMS.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={onNavigate}
            className={`group relative font-mono text-label uppercase text-text-primary/70 transition-colors hover:text-accent-light focus-visible:text-accent-light ${linkClassName}`}
          >
            {item.label}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full group-focus-visible:w-full"
            />
          </a>
        </li>
      ))}
    </ul>
  )
}
