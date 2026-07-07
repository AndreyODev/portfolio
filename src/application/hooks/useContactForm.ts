import emailjs from '@emailjs/browser'
import { useState, type FormEvent } from 'react'
import {
  emailjsConfig,
  isEmailjsConfigured,
} from '@/shared/config/emailjs'

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

export function useContactForm(): UseContactFormResult {
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
        message: 'Serviço de e-mail não configurado. Verifique o .env.local.',
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
        message: 'Não foi possível enviar. Tente novamente em instantes.',
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
