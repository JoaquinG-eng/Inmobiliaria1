import { ArrowUpRight } from 'lucide-react'
import { allProperties } from '../home/data/properties'
import type { Property } from '../../types/property'

interface BuyPropertiesSectionProps {
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

export function BuyPropertiesSection({
  onOpenProperty,
}: BuyPropertiesSectionProps) {
  const properties = allProperties.filter(
    (property: Property) =>
      property.operation === 'venta' ||
      property.alsoAvailableFor === 'venta',
  )

  return (
    <section
      className="buy-properties-section"
      id="comprar"
    >
      <div className="section-shell">
        <header className="buy-properties-heading">
          <div>
            <p className="eyebrow">
              Comprar
            </p>

            <h2>
              PROPIEDADES PARA HACERLAS TUYAS.
            </h2>
          </div>

          <div className="buy-properties-heading-side">
            <span>
              {String(properties.length).padStart(2, '0')}
            </span>

            <p>
              Una selección de propiedades en venta elegidas por
              arquitectura, ubicación y calidad espacial.
            </p>
          </div>
        </header>

        <div className="buy-properties-grid">
          {properties.map(
            (
              property: Property,
              index: number,
            ) => {
              const isMixed =
                property.operation === 'venta' &&
                property.alsoAvailableFor === 'alquiler'

              return (
                <article
                  className={[
                    'buy-property-card',
                    `buy-property-card--${(index % 4) + 1}`,
                  ].join(' ')}
                  key={property.id}
                >
                  <button
                    type="button"
                    className="buy-property-image"
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
                      className="buy-property-image-shade"
                      aria-hidden="true"
                    />

                    <span className="buy-property-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {isMixed && (
                      <span className="property-dual-badge">
                        Venta / Alquiler
                      </span>
                    )}

                    <span className="buy-property-action">
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.4}
                      />
                    </span>
                  </button>

                  <div className="buy-property-info">
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

                    <div className="buy-property-price">
                      <span>
                        Venta
                      </span>

                      <strong>
                        {formatPrice(
                          property.price,
                          property.currency,
                        )}
                      </strong>

                      {isMixed &&
                        property.rentalPrice !== undefined && (
                          <small>
                            Alquiler{' '}
                            {formatPrice(
                              property.rentalPrice,
                              property.rentalCurrency ??
                                property.currency,
                            )}
                            {' / mes'}
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