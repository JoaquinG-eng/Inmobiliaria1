import {
  ArrowUpRight,
  Check,
  X,
} from 'lucide-react'
import {
  FormEvent,
  useEffect,
  useState,
} from 'react'

interface PropertyInquiryFormProps {
  propertyTitle: string
  propertyLocation: string
  isOpen: boolean
  onClose: () => void
}

interface FormValues {
  name: string
  email: string
  phone: string
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
  message: '',
}

function validateForm(
  values: FormValues,
): FormErrors {
  const errors: FormErrors = {}

  if (values.name.trim().length < 2) {
    errors.name =
      'Ingresá tu nombre.'
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      values.email.trim(),
    )
  ) {
    errors.email =
      'Ingresá un email válido.'
  }

  if (
    values.phone.trim().length > 0 &&
    values.phone
      .replace(/\D/g, '')
      .length < 8
  ) {
    errors.phone =
      'Ingresá un teléfono válido.'
  }

  if (
    values.message.trim().length < 10
  ) {
    errors.message =
      'Contanos brevemente qué necesitás.'
  }

  return errors
}

export function PropertyInquiryForm({
  propertyTitle,
  propertyLocation,
  isOpen,
  onClose,
}: PropertyInquiryFormProps) {
  const [values, setValues] =
    useState<FormValues>(initialValues)

  const [errors, setErrors] =
    useState<FormErrors>({})

  const [isValidated, setIsValidated] =
    useState<boolean>(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow =
      'hidden'

    const handleEscape = (
      event: KeyboardEvent,
    ): void => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener(
      'keydown',
      handleEscape,
    )

    return () => {
      document.body.style.overflow =
        previousOverflow

      window.removeEventListener(
        'keydown',
        handleEscape,
      )
    }
  }, [isOpen, onClose])

  const updateField = (
    field: keyof FormValues,
    value: string,
  ): void => {
    setValues(
      (
        currentValues: FormValues,
      ) => ({
        ...currentValues,
        [field]: value,
      }),
    )

    setErrors(
      (
        currentErrors: FormErrors,
      ) => ({
        ...currentErrors,
        [field]: undefined,
      }),
    )

    setIsValidated(false)
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault()

    const nextErrors =
      validateForm(values)

    setErrors(nextErrors)

    if (
      Object.keys(nextErrors).length >
      0
    ) {
      return
    }

    /*
     * Todavía no enviamos datos.
     * El backend se conecta en la
     * siguiente etapa.
     */
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
      className="property-inquiry"
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-inquiry-title"
    >
      <button
        type="button"
        className="property-inquiry-backdrop"
        aria-label="Cerrar formulario"
        onClick={handleClose}
      />

      <div className="property-inquiry-panel">
        <header className="property-inquiry-header">
          <div>
            <span>
              Consulta
            </span>

            <strong>
              {propertyTitle}
            </strong>
          </div>

          <button
            type="button"
            className="property-inquiry-close"
            aria-label="Cerrar"
            onClick={handleClose}
          >
            <X
              size={20}
              strokeWidth={1.4}
            />
          </button>
        </header>

        <div className="property-inquiry-body">
          <div className="property-inquiry-intro">
            <p className="eyebrow">
              {propertyLocation}
            </p>

            <h2
              id="property-inquiry-title"
            >
              Coordinemos una visita.
            </h2>

            <p>
              Dejanos tus datos y
              contanos qué te gustaría
              saber sobre esta propiedad.
            </p>
          </div>

          {isValidated ? (
            <div className="property-inquiry-success">
              <span className="property-inquiry-success-icon">
                <Check
                  size={25}
                  strokeWidth={1.5}
                />
              </span>

              <p className="eyebrow">
                Formulario validado
              </p>

              <h3>
                Todo está listo.
              </h3>

              <p>
                La interfaz y la
                validación ya funcionan.
                El envío real se conecta
                cuando incorporemos el
                backend.
              </p>

              <button
                type="button"
                onClick={() =>
                  setIsValidated(false)
                }
              >
                Editar consulta
              </button>
            </div>
          ) : (
            <form
              className="property-inquiry-form"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="property-inquiry-field">
                <label htmlFor="inquiry-name">
                  Nombre
                </label>

                <input
                  id="inquiry-name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  placeholder="Tu nombre"
                  aria-invalid={
                    errors.name
                      ? 'true'
                      : 'false'
                  }
                  onChange={(event) =>
                    updateField(
                      'name',
                      event.target.value,
                    )
                  }
                />

                {errors.name && (
                  <span className="property-inquiry-error">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="property-inquiry-row">
                <div className="property-inquiry-field">
                  <label htmlFor="inquiry-email">
                    Email
                  </label>

                  <input
                    id="inquiry-email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    placeholder="nombre@email.com"
                    aria-invalid={
                      errors.email
                        ? 'true'
                        : 'false'
                    }
                    onChange={(event) =>
                      updateField(
                        'email',
                        event.target.value,
                      )
                    }
                  />

                  {errors.email && (
                    <span className="property-inquiry-error">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="property-inquiry-field">
                  <label htmlFor="inquiry-phone">
                    Teléfono
                  </label>

                  <input
                    id="inquiry-phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    placeholder="+54 9..."
                    aria-invalid={
                      errors.phone
                        ? 'true'
                        : 'false'
                    }
                    onChange={(event) =>
                      updateField(
                        'phone',
                        event.target.value,
                      )
                    }
                  />

                  {errors.phone && (
                    <span className="property-inquiry-error">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="property-inquiry-field">
                <label htmlFor="inquiry-message">
                  Mensaje
                </label>

                <textarea
                  id="inquiry-message"
                  rows={5}
                  value={values.message}
                  placeholder={
                    `Hola, me interesa ${propertyTitle} y quisiera...`
                  }
                  aria-invalid={
                    errors.message
                      ? 'true'
                      : 'false'
                  }
                  onChange={(event) =>
                    updateField(
                      'message',
                      event.target.value,
                    )
                  }
                />

                {errors.message && (
                  <span className="property-inquiry-error">
                    {errors.message}
                  </span>
                )}
              </div>

              <div className="property-inquiry-property">
                <span>
                  Propiedad
                </span>

                <strong>
                  {propertyTitle}
                </strong>

                <small>
                  {propertyLocation}
                </small>
              </div>

              <button
                type="submit"
                className="property-inquiry-submit"
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