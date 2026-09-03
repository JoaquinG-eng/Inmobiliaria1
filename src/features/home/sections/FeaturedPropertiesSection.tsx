import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'

import { featuredProperties } from '../data/properties'
import type {
  Property,
  PropertyImage,
  PropertyImageCategory,
} from '../../../types/property'

interface FeaturedPropertiesSectionProps {
  onOpenProperty: (slug: string) => void
}

const categoryLabel: Record<PropertyImageCategory, string> = {
  exterior: 'Exterior',
  living: 'Living',
  kitchen: 'Cocina',
  bedroom: 'Dormitorio',
  bathroom: 'Baño',
  patio: 'Patio',
  pool: 'Pileta',
  terrace: 'Terraza',
}

const priceFormatter = new Intl.NumberFormat('es-AR')

export function FeaturedPropertiesSection({
  onOpenProperty,
}: FeaturedPropertiesSectionProps) {
  const [selectedImages, setSelectedImages] = useState<
    Record<string, number>
  >({})

  const getSelectedImageIndex = (property: Property): number => {
    const index = selectedImages[property.id] ?? 0

    if (index < 0 || index >= property.images.length) {
      return 0
    }

    return index
  }

  const selectImage = (
    propertyId: string,
    imageIndex: number,
  ): void => {
    setSelectedImages((current) => ({
      ...current,
      [propertyId]: imageIndex,
    }))
  }

  const previousImage = (property: Property): void => {
    const currentIndex = getSelectedImageIndex(property)

    const nextIndex =
      currentIndex === 0
        ? property.images.length - 1
        : currentIndex - 1

    selectImage(property.id, nextIndex)
  }

  const nextImage = (property: Property): void => {
    const currentIndex = getSelectedImageIndex(property)

    const nextIndex =
      currentIndex === property.images.length - 1
        ? 0
        : currentIndex + 1

    selectImage(property.id, nextIndex)
  }

  return (
    <section
      className="properties-section"
      id="propiedades"
    >
      <div className="section-shell">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">PROPIEDADES DESTACADAS</p>

            <h2 className="section-display">
              Espacios elegidos con criterio.
            </h2>
          </div>

          <p className="section-intro">
            Una selección de propiedades donde arquitectura,
            ubicación y experiencia encuentran un equilibrio.
          </p>
        </div>

        <div className="property-grid">
          {featuredProperties.map(
            (property: Property, propertyIndex: number) => {
              const selectedImageIndex =
                getSelectedImageIndex(property)

              const selectedImage: PropertyImage =
                property.images[selectedImageIndex]

              return (
                <article
                  key={property.id}
                  className={`property-card property-card--${
                    propertyIndex + 1
                  }`}
                >
                  <div className="property-gallery">
                    <div className="property-image-link">
                      <img
                        key={selectedImage.id}
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        loading={
                          propertyIndex === 0
                            ? 'eager'
                            : 'lazy'
                        }
                      />

                      <span className="property-image-category">
                        {categoryLabel[selectedImage.category]}
                      </span>

                      <span className="property-image-counter">
                        {String(
                          selectedImageIndex + 1,
                        ).padStart(2, '0')}{' '}
                        /{' '}
                        {String(
                          property.images.length,
                        ).padStart(2, '0')}
                      </span>

                      <div className="property-gallery-controls">
                        <button
                          type="button"
                          className="property-gallery-button"
                          onClick={() =>
                            previousImage(property)
                          }
                          aria-label={`Imagen anterior de ${property.title}`}
                        >
                          <ArrowLeft size={17} />
                        </button>

                        <button
                          type="button"
                          className="property-gallery-button"
                          onClick={() =>
                            nextImage(property)
                          }
                          aria-label={`Imagen siguiente de ${property.title}`}
                        >
                          <ArrowRight size={17} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="property-arrow"
                        onClick={() =>
                          onOpenProperty(property.slug)
                        }
                        aria-label={`Ver detalle de ${property.title}`}
                      >
                        <ArrowUpRight size={18} />
                      </button>
                    </div>

                    <div className="property-space-selector">
                      {property.images.map(
                        (
                          image: PropertyImage,
                          imageIndex: number,
                        ) => {
                          const isActive =
                            imageIndex === selectedImageIndex

                          return (
                            <button
                              key={image.id}
                              type="button"
                              className={
                                isActive
                                  ? 'property-space property-space--active'
                                  : 'property-space'
                              }
                              onClick={() =>
                                selectImage(
                                  property.id,
                                  imageIndex,
                                )
                              }
                              aria-label={`Ver ${categoryLabel[
                                image.category
                              ].toLowerCase()} de ${
                                property.title
                              }`}
                              aria-pressed={isActive}
                            >
                              <img
                                src={image.src}
                                alt=""
                                loading="lazy"
                              />

                              <span>
                                {
                                  categoryLabel[
                                    image.category
                                  ]
                                }
                              </span>
                            </button>
                          )
                        },
                      )}
                    </div>

                    <p className="property-gallery-hint">
                      {property.images.length} espacios para
                      recorrer
                    </p>
                  </div>

                  <div className="property-info">
                    <div>
                      <p className="eyebrow">
                        {property.neighborhood} ·{' '}
                        {property.city}
                      </p>

                      <h3>{property.title}</h3>
                    </div>

                    <div className="property-numbers">
                      <strong>
                        {property.price > 0
                          ? `${property.currency} ${priceFormatter.format(
                              property.price,
                            )}`
                          : 'Precio a consultar'}
                      </strong>

                      <span>
                        {property.bedrooms} dorm. ·{' '}
                        {property.bathrooms} baños ·{' '}
                        {property.totalArea} m²
                      </span>
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