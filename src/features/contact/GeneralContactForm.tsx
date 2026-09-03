import { ArrowUpRight, Check, X } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'

interface GeneralContactFormProps {
  isOpen: boolean
  onClose: () => void
}

type ContactReason = 'comprar' | 'alquilar' | 'vender' | 'general'

interface FormValues {
  name: string
  email: string
  phone: string
  reason: ContactReason
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  reason: 'general',
  message: '',
}

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Ingresá tu nombre.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Ingresá un email válido.'
  }

  if (
    values.phone.trim().length > 0 &&
    values.phone.replace(/\D/g, '').length < 8
  ) {
    errors.phone = 'Ingresá un teléfono válido.'
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Contanos brevemente qué necesitás.'
  }

  return errors
}

export function GeneralContactForm({
  isOpen,
  onClose,
}: GeneralContactFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isValidated, setIsValidated] = useState<boolean>(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const updateField = <Key extends keyof FormValues>(
    field: Key,
    value: FormValues[Key],
  ): void => {
    setValues((currentValues: FormValues) => ({
      ...currentValues,
      [field]: value,
    }))

    setErrors((currentErrors: FormErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }))

    setIsValidated(false)
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault()

    const nextErrors = validateForm(values)

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsValidated(true)
  }

  const handleClose = (): void => {
    setErrors({})
    setIsValidated(false)
    onClose()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="general-contact"
      role="dialog"
      aria-modal="true"
      aria-labelledby="general-contact-title"
    >
      <button
        type="button"
        className="general-contact-backdrop"
        aria-label="Cerrar formulario"
        onClick={handleClose}
      />

      <div className="general-contact-panel">
        <header className="general-contact-header">
          <div>
            <span>Contacto</span>
            <strong>Hablemos</strong>
          </div>

          <button
            type="button"
            className="general-contact-close"
            aria-label="Cerrar"
            onClick={handleClose}
          >
            <X size={20} strokeWidth={1.4} />
          </button>
        </header>

        <div className="general-contact-body">
          <div className="general-contact-intro">
            <p className="eyebrow">Contacto general</p>

            <h2 id="general-contact-title">
              CONTANOS QUÉ ESTÁS BUSCANDO.
            </h2>

            <p>
              Comprar, alquilar, vender o simplemente conversar sobre una
              oportunidad. La idea es entender primero qué necesitás.
            </p>
          </div>

          {isValidated ? (
            <div className="general-contact-success">
              <span className="general-contact-success-icon">
                <Check size={25} strokeWidth={1.5} />
              </span>

              <p className="eyebrow">Formulario validado</p>

              <h3>Todo está listo.</h3>

              <p>
                El formulario ya quedó preparado para conectarlo al backend
                cuando hagamos la etapa de persistencia y envío real.
              </p>

              <button
                type="button"
                onClick={() => setIsValidated(false)}
              >
                Editar consulta
              </button>
            </div>
          ) : (
            <form
              className="general-contact-form"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="general-contact-field">
                <label htmlFor="general-contact-name">
                  Nombre
                </label>

                <input
                  id="general-contact-name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  placeholder="Tu nombre"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  onChange={(event) =>
                    updateField('name', event.target.value)
                  }
                />

                {errors.name && (
                  <span className="general-contact-error">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="general-contact-row">
                <div className="general-contact-field">
                  <label htmlFor="general-contact-email">
                    Email
                  </label>

                  <input
                    id="general-contact-email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    placeholder="nombre@email.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    onChange={(event) =>
                      updateField('email', event.target.value)
                    }
                  />

                  {errors.email && (
                    <span className="general-contact-error">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="general-contact-field">
                  <label htmlFor="general-contact-phone">
                    Teléfono
                  </label>

                  <input
                    id="general-contact-phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    placeholder="+54 9..."
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    onChange={(event) =>
                      updateField('phone', event.target.value)
                    }
                  />

                  {errors.phone && (
                    <span className="general-contact-error">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="general-contact-field">
                <label htmlFor="general-contact-reason">
                  Motivo
                </label>

                <select
                  id="general-contact-reason"
                  value={values.reason}
                  onChange={(event) =>
                    updateField(
                      'reason',
                      event.target.value as ContactReason,
                    )
                  }
                >
                  <option value="general">
                    Consulta general
                  </option>

                  <option value="comprar">
                    Quiero comprar
                  </option>

                  <option value="alquilar">
                    Quiero alquilar
                  </option>

                  <option value="vender">
                    Quiero vender
                  </option>
                </select>
              </div>

              <div className="general-contact-field">
                <label htmlFor="general-contact-message">
                  Mensaje
                </label>

                <textarea
                  id="general-contact-message"
                  rows={5}
                  value={values.message}
                  placeholder="Contanos un poco más..."
                  aria-invalid={errors.message ? 'true' : 'false'}
                  onChange={(event) =>
                    updateField('message', event.target.value)
                  }
                />

                {errors.message && (
                  <span className="general-contact-error">
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="general-contact-submit"
              >
                Continuar

                <ArrowUpRight
                  size={19}
                  strokeWidth={1.4}
                />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}