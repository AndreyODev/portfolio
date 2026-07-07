import { useProfile } from '@/application/hooks/useProfile'
import {
  ContactContent,
  ContactSkeleton,
} from '@/presentation/components/contact/ContactContent'
import { Section } from '@/presentation/components/Section'

export function ContactSection() {
  const { profile, isLoading, error } = useProfile()

  return (
    <Section id="contato" label="06 · contato" className="border-b-0">
      {isLoading && <ContactSkeleton />}

      {error && (
        <p className="font-mono text-body-sm text-accent">
          Não foi possível carregar a seção de contato.
        </p>
      )}

      {!isLoading && !error && profile && <ContactContent profile={profile} />}
    </Section>
  )
}
