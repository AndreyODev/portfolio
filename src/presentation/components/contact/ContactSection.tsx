import { useProfile } from '@/application/hooks/useProfile'
import {
  ContactContent,
  ContactSkeleton,
} from '@/presentation/components/contact/ContactContent'
import { Section } from '@/presentation/components/Section'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

export function ContactSection() {
  const { profile, isLoading, error } = useProfile()
  const { t } = useTranslation()

  return (
    <Section id="contato" label={t.sections.contato} border={false}>
      {isLoading && <ContactSkeleton />}

      {error && (
        <p className="font-mono text-body-sm text-accent">{t.contact.loadError}</p>
      )}

      {!isLoading && !error && profile && <ContactContent profile={profile} />}
    </Section>
  )
}
