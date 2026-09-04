import { useRef, useState } from 'react'
import type { TouchEvent } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

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

  const [openingPropertySlug, setOpeningPropertySlug] =
    useState<string | null>(null)

  const touchStartRef = useRef<{
    propertyId: string
    x: number
    y: number
  } | null>(null)

  const suppressClickRef =
    useRef<boolean>(false)

  const getSelectedImageIndex = (
    property: Property,
  ): number => {
    const index = selectedImages[property.id] ?? 0

    if (
      index < 0 ||
      index >= property.images.length
    ) {
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

  const previousImage = (
    property: Property,
  ): void => {
    const currentIndex =
      getSelectedImageIndex(property)

    const nextIndex =
      currentIndex === 0
        ? property.images.length - 1
        : currentIndex - 1

    selectImage(
      property.id,
      nextIndex,
    )
  }

  const nextImage = (
    property: Property,
  ): void => {
    const currentIndex =
      getSelectedImageIndex(property)

    const nextIndex =
      currentIndex ===
      property.images.length - 1
        ? 0
        : currentIndex + 1

    selectImage(
      property.id,
      nextIndex,
    )
  }

  const openProperty = (
    property: Property,
  ): void => {
    if (openingPropertySlug) {
      return
    }

    setOpeningPropertySlug(
      property.slug,
    )

    window.setTimeout(() => {
      setOpeningPropertySlug(null)
      onOpenProperty(property.slug)
    }, 420)
  }

  const handleTouchStart = (
    property: Property,
    event: TouchEvent<HTMLDivElement>,
  ): void => {
    const touch = event.touches[0]

    if (!touch) {
      return
    }

    touchStartRef.current = {
      propertyId: property.id,
      x: touch.clientX,
      y: touch.clientY,
    }
  }

  const handleTouchEnd = (
    property: Property,
    event: TouchEvent<HTMLDivElement>,
  ): void => {
    const start =
      touchStartRef.current

    const touch =
      event.changedTouches[0]

    touchStartRef.current = null

    if (
      !start ||
      !touch ||
      start.propertyId !== property.id
    ) {
      return
    }

    const deltaX =
      touch.clientX - start.x

    const deltaY =
      touch.clientY - start.y

    const isHorizontalSwipe =
      Math.abs(deltaX) >= 45 &&
      Math.abs(deltaX) >
        Math.abs(deltaY) * 1.2

    if (!isHorizontalSwipe) {
      return
    }

    suppressClickRef.current = true

    if (deltaX > 0) {
      previousImage(property)
    } else {
      nextImage(property)
    }

    window.setTimeout(() => {
      suppressClickRef.current = false
    }, 350)
  }

  const loader =
    openingPropertySlug &&
    typeof document !== 'undefined'
      ? createPortal(
          <div
            className="property-navigation-loader"
            role="status"
            aria-live="polite"
            aria-label="Cargando propiedad"
          >
            <div className="property-navigation-loader-inner">
              <span className="property-navigation-loader-brand">
                ESTUDIO.
              </span>

              <span className="property-navigation-loader-label">
                CARGANDO
              </span>

              <div className="property-navigation-loader-line">
                <span />
              </div>
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <>
      {loader}

<section
        className="properties-section"
        id="propiedades"
      >
        <div className="section-shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">
                PROPIEDADES DESTACADAS
              </p>

              <h2 className="section-display">
                Espacios elegidos con criterio.
              </h2>
            </div>

            <p className="section-intro">
              Una selección de propiedades donde
              arquitectura, ubicación y experiencia
              encuentran un equilibrio.
            </p>
          </div>

          <div className="property-grid">
            {featuredProperties.map(
              (
                property: Property,
                propertyIndex: number,
              ) => {
                const selectedImageIndex =
                  getSelectedImageIndex(property)

                const selectedImage: PropertyImage =
                  property.images[
                    selectedImageIndex
                  ]

                return (
                  <article
                    key={property.id}
                    className={`property-card property-card--${
                      propertyIndex + 1
                    }`}
                  >
                    <div className="property-gallery">
                      <div
                        className="property-image-link"
                        role="link"
                        tabIndex={0}
                        aria-label={`Ver detalle de ${property.title}`}
                        onClick={() => {
                          if (
                            suppressClickRef.current
                          ) {
                            return
                          }

                          openProperty(property)
                        }}
                        onTouchStart={(event) =>
                          handleTouchStart(
                            property,
                            event,
                          )
                        }
                        onTouchEnd={(event) =>
                          handleTouchEnd(
                            property,
                            event,
                          )
                        }
                        onKeyDown={(event) => {
                          if (
                            event.key === 'Enter' ||
                            event.key === ' '
                          ) {
                            event.preventDefault()
                            openProperty(property)
                          }
                        }}
                      >
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
                          {
                            categoryLabel[
                              selectedImage.category
                            ]
                          }
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

                        <button
                          type="button"
                          className="property-gallery-side property-gallery-side--previous"
                          onClick={(event) => {
                            event.stopPropagation()
                            previousImage(property)
                          }}
                          aria-label={`Imagen anterior de ${property.title}`}
                        >
                          <ArrowLeft
                            size={20}
                            strokeWidth={1.7}
                          />
                        </button>

                        <button
                          type="button"
                          className="property-gallery-side property-gallery-side--next"
                          onClick={(event) => {
                            event.stopPropagation()
                            nextImage(property)
                          }}
                          aria-label={`Imagen siguiente de ${property.title}`}
                        >
                          <ArrowRight
                            size={20}
                            strokeWidth={1.7}
                          />
                        </button>
                      </div>

                      <div className="property-space-selector">
                        {property.images.map(
                          (
                            image: PropertyImage,
                            imageIndex: number,
                          ) => {
                            const isActive =
                              imageIndex ===
                              selectedImageIndex

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
                        {property.images.length}{' '}
                        espacios para recorrer
                      </p>
                    </div>

                    <div className="property-info">
                      <div>
                        <p className="eyebrow">
                          {property.neighborhood}{' '}
                          · {property.city}
                        </p>

                        <h3>
                          {property.title}
                        </h3>
                      </div>

                      <div className="property-numbers">
                        <strong>
                          {property.price > 0
                            ? `${
                                property.currency
                              } ${priceFormatter.format(
                                property.price,
                              )}`
                            : 'Precio a consultar'}
                        </strong>

                        <span>
                          {property.bedrooms}{' '}
                          dorm. ·{' '}
                          {property.bathrooms}{' '}
                          baños ·{' '}
                          {property.totalArea}{' '}
                          m²
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
    </>
  )
}
