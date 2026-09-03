import { ArrowUpRight, Check, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

interface SellerFormProps {
  isOpen: boolean
  onClose: () => void
}

type PropertyType = 'casa' | 'departamento' | 'desarrollo' | 'terreno' | 'otro'

interface SellerFormValues {
  name: string
  email: string
  phone: string
  location: string
  propertyType: PropertyType
  area: string
  bedrooms: string
  bathrooms: string
  estimatedPrice: string
  message: string
}

interface SellerFormErrors {
  name?: string
  email?: string
  phone?: string
  location?: string
  area?: string
  estimatedPrice?: string
  message?: string
}

const initialValues: SellerFormValues = {
  name: '',
  email: '',
  phone: '',
  location: '',
  propertyType: 'casa',
  area: '',
  bedrooms: '',
  bathrooms: '',
  estimatedPrice: '',
  message: '',
}

function validateForm(values: SellerFormValues): SellerFormErrors {
  const errors: SellerFormErrors = {}

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

  if (values.location.trim().length < 3) {
    errors.location = 'Ingresá la ubicación de la propiedad.'
  }

  if (
    values.area.trim().length > 0 &&
    Number(values.area) <= 0
  ) {
    errors.area = 'Ingresá una superficie válida.'
  }

  if (
    values.estimatedPrice.trim().length > 0 &&
    Number(values.estimatedPrice) <= 0
  ) {
    errors.estimatedPrice = 'Ingresá un valor válido.'
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Contanos brevemente sobre la propiedad.'
  }

  return errors
}

export function SellerForm({
  isOpen,
  onClose,
}: SellerFormProps) {
  const [values, setValues] = useState<SellerFormValues>(initialValues)
  const [errors, setErrors] = useState<SellerFormErrors>({})
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

  const updateField = <Key extends keyof SellerFormValues>(
    field: Key,
    value: SellerFormValues[Key],
  ): void => {
    setValues((currentValues: SellerFormValues) => ({
      ...currentValues,
      [field]: value,
    }))

    setErrors((currentErrors: SellerFormErrors) => ({
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
      className="seller-form"
      role="dialog"
      aria-modal="true"
      aria-labelledby="seller-form-title"
    >
      <button
        type="button"
        className="seller-form-backdrop"
        aria-label="Cerrar formulario"
        onClick={handleClose}
      />

      <div className="seller-form-panel">
        <header className="seller-form-header">
          <div>
            <span>Vender propiedad</span>
            <strong>INMO · Argentina</strong>
          </div>

          <button
            type="button"
            className="seller-form-close"
            aria-label="Cerrar"
            onClick={handleClose}
          >
            <X size={20} strokeWidth={1.4} />
          </button>
        </header>

        <div className="seller-form-body">
          <div className="seller-form-intro">
            <p className="eyebrow">Propietarios</p>

            <h2 id="seller-form-title">
              CONOZCAMOS TU PROPIEDAD.
            </h2>

            <p>
              Contanos los datos esenciales. Después evaluamos ubicación,
              arquitectura, estado, contexto y potencial comercial.
            </p>
          </div>

          {isValidated ? (
            <div className="seller-form-success">
              <span className="seller-form-success-icon">
                <Check size={25} strokeWidth={1.5} />
              </span>

              <p className="eyebrow">Información validada</p>

              <h3>La propiedad está lista para evaluar.</h3>

              <p>
                El formulario ya quedó preparado. El envío real se conecta
                cuando incorporemos el backend.
              </p>

              <button
                type="button"
                onClick={() => setIsValidated(false)}
              >
                Editar información
              </button>
            </div>
          ) : (
            <form
              className="seller-form-fields"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="seller-form-field">
                <label htmlFor="seller-name">Nombre</label>

                <input
                  id="seller-name"
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
                  <span className="seller-form-error">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="seller-form-row">
                <div className="seller-form-field">
                  <label htmlFor="seller-email">Email</label>

                  <input
                    id="seller-email"
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
                    <span className="seller-form-error">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="seller-form-field">
                  <label htmlFor="seller-phone">Teléfono</label>

                  <input
                    id="seller-phone"
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
                    <span className="seller-form-error">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="seller-form-field">
                <label htmlFor="seller-location">Ubicación</label>

                <input
                  id="seller-location"
                  type="text"
                  value={values.location}
                  placeholder="Barrio, ciudad, provincia"
                  aria-invalid={errors.location ? 'true' : 'false'}
                  onChange={(event) =>
                    updateField('location', event.target.value)
                  }
                />

                {errors.location && (
                  <span className="seller-form-error">
                    {errors.location}
                  </span>
                )}
              </div>

              <div className="seller-form-field">
                <label htmlFor="seller-type">Tipo de propiedad</label>

                <select
                  id="seller-type"
                  value={values.propertyType}
                  onChange={(event) =>
                    updateField(
                      'propertyType',
                      event.target.value as PropertyType,
                    )
                  }
                >
                  <option value="casa">Casa</option>
                  <option value="departamento">Departamento</option>
                  <option value="desarrollo">Desarrollo</option>
                  <option value="terreno">Terreno</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="seller-form-row seller-form-row--three">
                <div className="seller-form-field">
                  <label htmlFor="seller-area">Superficie m²</label>

                  <input
                    id="seller-area"
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={values.area}
                    placeholder="250"
                    aria-invalid={errors.area ? 'true' : 'false'}
                    onChange={(event) =>
                      updateField('area', event.target.value)
                    }
                  />

                  {errors.area && (
                    <span className="seller-form-error">
                      {errors.area}
                    </span>
                  )}
                </div>

                <div className="seller-form-field">
                  <label htmlFor="seller-bedrooms">Dormitorios</label>

                  <input
                    id="seller-bedrooms"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    value={values.bedrooms}
                    placeholder="3"
                    onChange={(event) =>
                      updateField('bedrooms', event.target.value)
                    }
                  />
                </div>

                <div className="seller-form-field">
                  <label htmlFor="seller-bathrooms">Baños</label>

                  <input
                    id="seller-bathrooms"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    value={values.bathrooms}
                    placeholder="2"
                    onChange={(event) =>
                      updateField('bathrooms', event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="seller-form-field">
                <label htmlFor="seller-price">
                  Valor estimado USD
                </label>

                <input
                  id="seller-price"
                  type="number"
                  min="0"
                  inputMode="decimal"
                  value={values.estimatedPrice}
                  placeholder="350000"
                  aria-invalid={errors.estimatedPrice ? 'true' : 'false'}
                  onChange={(event) =>
                    updateField('estimatedPrice', event.target.value)
                  }
                />

                {errors.estimatedPrice && (
                  <span className="seller-form-error">
                    {errors.estimatedPrice}
                  </span>
                )}
              </div>

              <div className="seller-form-field">
                <label htmlFor="seller-message">
                  Sobre la propiedad
                </label>

                <textarea
                  id="seller-message"
                  rows={5}
                  value={values.message}
                  placeholder="Contanos estado, características, entorno o cualquier detalle relevante..."
                  aria-invalid={errors.message ? 'true' : 'false'}
                  onChange={(event) =>
                    updateField('message', event.target.value)
                  }
                />

                {errors.message && (
                  <span className="seller-form-error">
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="seller-form-submit"
              >
                Solicitar evaluación

                <ArrowUpRight size={19} strokeWidth={1.4} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}