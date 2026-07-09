import emailjs from '@emailjs/browser'
import { useState, type FormEvent } from 'react'
import {
  emailjsConfig,
  isEmailjsConfigured,
} from '@/shared/config/emailjs'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

export interface ContactFormValues {
  name: string
  email: string
  message: string
}

type ContactFormField = keyof ContactFormValues

interface UseContactFormResult {
  values: ContactFormValues
  errors: Partial<Record<ContactFormField, string>>
  isSubmitting: boolean
  isSuccess: boolean
  handleChange: (field: ContactFormField, value: string) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useContactForm(): UseContactFormResult {
  const { t } = useTranslation()
  const [values, setValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Record<ContactFormField, string>>>(
    {},
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  function validate(
    formValues: ContactFormValues,
  ): Partial<Record<ContactFormField, string>> {
    const nextErrors: Partial<Record<ContactFormField, string>> = {}

    if (!formValues.name.trim()) {
      nextErrors.name = t.contact.errors.nameRequired
    }

    if (!formValues.email.trim()) {
      nextErrors.email = t.contact.errors.emailRequired
    } else if (!EMAIL_PATTERN.test(formValues.email.trim())) {
      nextErrors.email = t.contact.errors.emailInvalid
    }

    if (!formValues.message.trim()) {
      nextErrors.message = t.contact.errors.messageRequired
    } else if (formValues.message.trim().length < 10) {
      nextErrors.message = t.contact.errors.messageMin
    }

    return nextErrors
  }

  function handleChange(field: ContactFormField, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setIsSuccess(false)
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSuccess(false)

    const nextErrors = validate(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    if (!isEmailjsConfigured()) {
      setErrors({
        message: t.contact.errors.emailNotConfigured,
      })
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: values.name.trim(),
          from_email: values.email.trim(),
          message: values.message.trim(),
          reply_to: values.email.trim(),
        },
        { publicKey: emailjsConfig.publicKey },
      )

      setValues({ name: '', email: '', message: '' })
      setIsSuccess(true)
    } catch {
      setErrors({
        message: t.contact.errors.sendFailed,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
  }
}
