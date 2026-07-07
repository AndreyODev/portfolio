import {
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/presentation/components/contact/ContactIcons'

interface ContactLinkItem {
  id: string
  label: string
  value: string
  href: string
  external: boolean
  Icon: typeof GitHubIcon
}

interface ContactLinksProps {
  email: string
  github: string
  linkedin: string
}

const LINKS: Omit<ContactLinkItem, 'value' | 'href'>[] = [
  { id: 'github', label: 'github', external: true, Icon: GitHubIcon },
  { id: 'linkedin', label: 'linkedin', external: true, Icon: LinkedInIcon },
  { id: 'email', label: 'e-mail', external: false, Icon: EmailIcon },
]

function ContactLink({ label, value, href, external, Icon }: ContactLinkItem) {
  return (
    <li>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="group flex items-center gap-4 border border-accent/40 bg-bg-primary px-5 py-4 transition-colors hover:border-accent"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent text-accent transition-colors group-hover:text-accent-light">
          <Icon />
        </span>

        <span className="min-w-0 space-y-1">
          <span className="block font-mono text-label uppercase tracking-widest text-accent">
            {label}
          </span>
          <span className="block truncate font-body text-body-sm text-text-primary/75 group-hover:text-accent-light">
            {value}
          </span>
        </span>
      </a>
    </li>
  )
}

export function ContactLinks({ email, github, linkedin }: ContactLinksProps) {
  const values: Record<string, { href: string; value: string }> = {
    github: {
      href: github,
      value: 'AndreyODev',
    },
    linkedin: {
      href: linkedin,
      value: 'andrey-oliveira-dev',
    },
    email: {
      href: `mailto:${email}`,
      value: email,
    },
  }

  return (
    <div className="flex h-full flex-col">
      <p className="mb-5 font-mono text-label uppercase tracking-widest text-accent">
        links diretos
      </p>

      <ul className="space-y-3" aria-label="Links diretos">
        {LINKS.map((link) => (
          <ContactLink
            key={link.id}
            {...link}
            href={values[link.id].href}
            value={values[link.id].value}
          />
        ))}
      </ul>
    </div>
  )
}
