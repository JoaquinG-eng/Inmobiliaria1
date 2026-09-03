import { ArrowUpRight } from 'lucide-react'
import { allProperties } from '../home/data/properties'
import type { Property } from '../../types/property'

interface RentPropertiesSectionProps {
  onOpenProperty: (slug: string) => void
}

function formatPrice(
  amount: number,
  currency: Property['currency'],
): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

function getRentalPrice(
  property: Property,
): number {
  if (property.operation === 'alquiler') {
    return property.price
  }

  return property.rentalPrice ?? 0
}

export function RentPropertiesSection({
  onOpenProperty,
}: RentPropertiesSectionProps) {
  const properties = allProperties.filter(
    (property: Property) =>
      property.operation === 'alquiler' ||
      property.alsoAvailableFor === 'alquiler',
  )

  return (
    <section
      className="rent-properties-section"
      id="alquilar"
    >
      <div className="section-shell">
        <header className="rent-properties-heading">
          <div>
            <p className="eyebrow">
              Alquilar
            </p>

            <h2>
              ESPACIOS PARA TU PRÓXIMA ETAPA.
            </h2>
          </div>

          <div className="rent-properties-heading-side">
            <span>
              {String(properties.length).padStart(2, '0')}
            </span>

            <p>
              Propiedades disponibles para vivirlas ahora,
              seleccionadas por entorno, carácter y experiencia.
            </p>
          </div>
        </header>

        <div className="rent-properties-grid">
          {properties.map(
            (
              property: Property,
              index: number,
            ) => {
              const isMixed =
                property.operation === 'venta' &&
                property.alsoAvailableFor === 'alquiler'

              const rentalPrice =
                getRentalPrice(property)

              return (
                <article
                  className="rent-property-card"
                  key={property.id}
                >
                  <div className="rent-property-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <button
                    type="button"
                    className="rent-property-image"
                    onClick={() =>
                      onOpenProperty(property.slug)
                    }
                    aria-label={`Ver ${property.title}`}
                  >
                    <img
                      src={property.coverImage}
                      alt={property.title}
                      loading="lazy"
                    />

                    <div
                      className="rent-property-image-shade"
                      aria-hidden="true"
                    />

                    {isMixed && (
                      <span className="property-dual-badge">
                        Venta / Alquiler
                      </span>
                    )}

                    <span className="rent-property-action">
                      <ArrowUpRight
                        size={19}
                        strokeWidth={1.4}
                      />
                    </span>
                  </button>

                  <div className="rent-property-copy">
                    <div>
                      <p>
                        {property.neighborhood}
                        {' · '}
                        {property.city}
                      </p>

                      <h3>
                        {property.title}
                      </h3>
                    </div>

                    <div className="rent-property-meta">
                      <span>
                        {property.bedrooms} dorm.
                      </span>

                      <span>
                        {property.bathrooms} baños
                      </span>

                      <span>
                        {property.totalArea} m²
                      </span>
                    </div>

                    <div className="rent-property-price">
                      <span>
                        Alquiler mensual
                      </span>

                      <strong>
                        {formatPrice(
                          rentalPrice,
                          property.rentalCurrency ??
                            property.currency,
                        )}
                      </strong>

                      {isMixed && (
                        <small>
                          Venta{' '}
                          {formatPrice(
                            property.price,
                            property.currency,
                          )}
                        </small>
                      )}
                    </div>
                  </div>
                </article>
              )
            },
          )}
        </div>
      </div>
    </section>
  )
}