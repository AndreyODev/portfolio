import { NAV_ITEM_IDS } from '@/shared/config/navigation'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

interface NavLinksProps {
  onNavigate?: () => void
  className?: string
  linkClassName?: string
  pill?: boolean
}

export function NavLinks({
  onNavigate,
  className = '',
  linkClassName = '',
  pill = false,
}: NavLinksProps) {
  const { t } = useTranslation()

  return (
    <ul
      className={`flex flex-col gap-1 md:flex-row md:items-center ${pill ? 'md:gap-1' : 'md:gap-6'} ${className}`}
    >
      {NAV_ITEM_IDS.map((id) => (
        <li key={id}>
          <a
            href={`#${id}`}
            onClick={onNavigate}
            className={`group relative font-mono text-label uppercase transition-colors ${
              pill
                ? 'rounded-full px-4 py-2 text-text-primary/60 hover:bg-accent/10 hover:text-accent-light'
                : 'text-text-primary/70 hover:text-accent-light'
            } ${linkClassName}`}
          >
            {t.nav[id]}
            {!pill && (
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full group-focus-visible:w-full"
              />
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}
