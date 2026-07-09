import { useContactForm } from '@/application/hooks/useContactForm'
import type { Profile } from '@/domain/entities/Profile'
import { ContactForm } from '@/presentation/components/contact/ContactForm'
import { ContactLinks } from '@/presentation/components/contact/ContactLinks'
import { Reveal } from '@/presentation/components/Reveal'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

const panelStyles =
  'border border-accent/40 bg-bg-surface p-6 sm:p-8'

function ContactSkeleton() {
  return (
    <div className="animate-pulse space-y-[var(--section-gap)]">
      <div className="h-10 w-48 bg-bg-surface" />
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className={`space-y-5 ${panelStyles}`}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-12 bg-bg-primary" />
          ))}
          <div className="h-32 bg-bg-primary" />
        </div>
        <div className={`space-y-3 ${panelStyles}`}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-20 bg-bg-primary" />
          ))}
        </div>
      </div>
    </div>
  )
}

interface ContactContentProps {
  profile: Profile
}

function ContactContent({ profile }: ContactContentProps) {
  const { t } = useTranslation()
  const { values, errors, isSubmitting, isSuccess, handleChange, handleSubmit } =
    useContactForm()

  return (
    <div className="space-y-[var(--section-gap)]">
      <Reveal>
        <header className="space-y-3">
          <h2 className="font-display text-display-md font-medium text-balance">
            {t.contact.title}
          </h2>
          <p className="max-w-2xl font-body text-body-md text-text-primary/70">
            {t.contact.subtitle}
          </p>
        </header>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <Reveal delay={0.1}>
          <div className={panelStyles}>
            <ContactForm
              values={values}
              errors={errors}
              isSubmitting={isSubmitting}
              isSuccess={isSuccess}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className={panelStyles}>
            <ContactLinks
              email={profile.email}
              github={profile.github}
              linkedin={profile.linkedin}
            />
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export { ContactContent, ContactSkeleton }
