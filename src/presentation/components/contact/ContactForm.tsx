import type { FormEvent, ReactNode } from 'react'
import type { ContactFormValues } from '@/application/hooks/useContactForm'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

const inputStyles =
  'w-full border border-accent/30 bg-bg-primary px-4 py-3 font-body text-body-sm text-text-primary placeholder:text-text-primary/35 focus:border-accent focus:outline-none'

interface FormFieldProps {
  id: string
  label: string
  error?: string
  children: ReactNode
}

function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="font-mono text-label uppercase text-accent">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="font-mono text-[0.7rem] text-accent">
          {error}
        </p>
      )}
    </div>
  )
}

interface ContactFormProps {
  values: ContactFormValues
  errors: Partial<Record<keyof ContactFormValues, string>>
  isSubmitting: boolean
  isSuccess: boolean
  onChange: (field: keyof ContactFormValues, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function ContactForm({
  values,
  errors,
  isSubmitting,
  isSuccess,
  onChange,
  onSubmit,
}: ContactFormProps) {
  const { t } = useTranslation()

  return (
    <div className="flex h-full flex-col">
      <p className="mb-5 font-mono text-label uppercase tracking-widest text-accent">
        {t.contact.form}
      </p>

      <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-5" noValidate>
        <FormField id="contact-name" label={t.contact.name} error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => onChange('name', e.target.value)}
            className={inputStyles}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
        </FormField>

        <FormField id="contact-email" label={t.contact.email} error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => onChange('email', e.target.value)}
            className={inputStyles}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
        </FormField>

        <FormField
          id="contact-message"
          label={t.contact.message}
          error={errors.message}
        >
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(e) => onChange('message', e.target.value)}
            className={`${inputStyles} min-h-[8rem] resize-y`}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? 'contact-message-error' : undefined
            }
          />
        </FormField>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-auto w-full border border-accent px-6 py-3 font-mono text-label uppercase text-accent-light transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {isSubmitting ? t.contact.submitting : t.contact.submit}
        </button>

        {isSuccess && (
          <p className="font-mono text-[0.7rem] text-accent-light" role="status">
            {t.contact.success}
          </p>
        )}
      </form>
    </div>
  )
}
