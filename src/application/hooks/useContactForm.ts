import { useState, type FormEvent } from 'react'
import { isPlaceholder } from '@/shared/utils/isPlaceholder'

export interface ContactFormValues {
  name: string
  email: string
  message: string
}

type ContactFormField = keyof ContactFormValues

interface UseContactFormOptions {
  recipientEmail: string
}

interface UseContactFormResult {
  values: ContactFormValues
  errors: Partial<Record<ContactFormField, string>>
  isSubmitting: boolean
  isRecipientConfigured: boolean
  handleChange: (field: ContactFormField, value: string) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(
  values: ContactFormValues,
): Partial<Record<ContactFormField, string>> {
  const errors: Partial<Record<ContactFormField, string>> = {}

  if (!values.name.trim()) {
    errors.name = 'Informe seu nome.'
  }

  if (!values.email.trim()) {
    errors.email = 'Informe seu e-mail.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'E-mail inválido.'
  }

  if (!values.message.trim()) {
    errors.message = 'Escreva uma mensagem.'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Mínimo de 10 caracteres.'
  }

  return errors
}

export function useContactForm({
  recipientEmail,
}: UseContactFormOptions): UseContactFormResult {
  const [values, setValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Record<ContactFormField, string>>>(
    {},
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isRecipientConfigured = !isPlaceholder(recipientEmail)

  function handleChange(field: ContactFormField, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    if (!isRecipientConfigured) {
      setErrors({ message: 'Canal de envio ainda não configurado.' })
      return
    }

    setIsSubmitting(true)

    const subject = encodeURIComponent(
      `Contato via portfólio — ${values.name.trim()}`,
    )
    const body = encodeURIComponent(
      `Nome: ${values.name.trim()}\nE-mail: ${values.email.trim()}\n\n${values.message.trim()}`,
    )

    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`

    setIsSubmitting(false)
  }

  return {
    values,
    errors,
    isSubmitting,
    isRecipientConfigured,
    handleChange,
    handleSubmit,
  }
}
