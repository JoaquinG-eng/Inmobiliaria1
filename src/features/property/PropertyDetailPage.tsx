import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Bath, BedDouble, MapPin, Ruler } from 'lucide-react'
import { PropertyMap } from '../../components/maps/PropertyMap'
import { allProperties } from '../home/data/properties'
import { PropertyInquiryForm } from './PropertyInquiryForm'
import type { Property, PropertyImage, PropertyImageCategory } from '../../types/property'

interface PropertyDetailPageProps {
  slug: string
  onBack: () => void
  onNavigate: (slug: string) => void
}

const categoryLabel: Record<PropertyImageCategory, string> = {
  exterior: 'Exterior',
  living: 'Living',
  kitchen: 'Cocina',
  bedroom: 'Dormitorio',
  bathroom: 'Baño',
  patio: 'Patio',
  pool: 'Piscina',
  terrace: 'Terraza',
}

const propertyTypeLabel: Record<Property['propertyType'], string> = {
  casa: 'Casa',
  departamento: 'Departamento',
  desarrollo: 'Desarrollo',
  exclusiva: 'Propiedad exclusiva',
}

const operationLabel: Record<Property['operation'], string> = {
  venta: 'En venta',
  alquiler: 'En alquiler',
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

export function PropertyDetailPage({
  slug,
  onBack,
  onNavigate,
}: PropertyDetailPageProps) {
  const propertyIndex = useMemo(
    () =>
      allProperties.findIndex(
        (property: Property) => property.slug === slug,
      ),
    [slug],
  )

  const property: Property | undefined =
    propertyIndex >= 0
      ? allProperties[propertyIndex]
      : undefined

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false)

  useEffect(() => {
    setActiveImageIndex(0)
    setIsInquiryOpen(false)

    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }, [slug])

  if (property === undefined) {
    return (
      <main className="property-detail">
        <section className="property-detail-missing">
          <div className="section-shell">
            <p className="eyebrow">
              Propiedad no encontrada
            </p>

            <h1>
              Esta propiedad ya no está disponible.
            </h1>

            <button
              type="button"
              className="property-detail-back"
              onClick={onBack}
            >
              <ArrowLeft size={18} />

              Volver a propiedades
            </button>
          </div>
        </section>
      </main>
    )
  }

  const images: PropertyImage[] =
    property.images.length > 0
      ? property.images
      : [
          {
            id: `${property.id}-cover`,
            src: property.coverImage,
            alt: property.title,
            category: 'exterior',
          },
        ]

  const activeImage: PropertyImage =
    images[activeImageIndex] ?? images[0]

  const previousProperty: Property =
    allProperties[
      propertyIndex === 0
        ? allProperties.length - 1
        : propertyIndex - 1
    ]

  const nextProperty: Property =
    allProperties[
      propertyIndex === allProperties.length - 1
        ? 0
        : propertyIndex + 1
    ]

  const handlePreviousImage = (): void => {
    setActiveImageIndex((currentIndex: number) =>
      currentIndex === 0
        ? images.length - 1
        : currentIndex - 1,
    )
  }

  const handleNextImage = (): void => {
    setActiveImageIndex((currentIndex: number) =>
      currentIndex === images.length - 1
        ? 0
        : currentIndex + 1,
    )
  }

  const handleImageSelect = (
    imageIndex: number,
  ): void => {
    setActiveImageIndex(imageIndex)
  }

  const locationLabel =
    `${property.neighborhood}, ${property.city}`

  return (
    <main className="property-detail">
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="property-detail-hero">
        <img
          className="property-detail-hero-image"
          src={property.coverImage}
          alt={`${property.title} en ${locationLabel}`}
        />

        <div
          className="property-detail-hero-overlay"
          aria-hidden="true"
        />

        <header className="property-detail-topbar">
          <button
            type="button"
            className="property-detail-back"
            onClick={onBack}
          >
            <ArrowLeft size={17} />

            Volver
          </button>

          <span>
            {propertyTypeLabel[property.propertyType]}
          </span>
        </header>

        <div className="property-detail-hero-content section-shell">
          <div>
            <p className="eyebrow">
              {operationLabel[property.operation]}
              {' · '}
              {locationLabel}
            </p>

            <h1>
              {property.title}
            </h1>
          </div>

          <div className="property-detail-price">
            <span>
              Valor
            </span>

            <strong>
              {formatPrice(
                property.price,
                property.currency,
              )}
            </strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          RESUMEN
          ===================================================== */}

      <section className="property-detail-summary">
        <div className="property-detail-summary-grid section-shell">
          <article className="property-detail-stat">
            <BedDouble
              size={25}
              strokeWidth={1.45}
            />

            <span>
              Dormitorios
            </span>

            <strong>
              {property.bedrooms}
            </strong>
          </article>

          <article className="property-detail-stat">
            <Bath
              size={25}
              strokeWidth={1.45}
            />

            <span>
              Baños
            </span>

            <strong>
              {property.bathrooms}
            </strong>
          </article>

          <article className="property-detail-stat">
            <Ruler
              size={25}
              strokeWidth={1.45}
            />

            <span>
              Superficie
            </span>

            <strong>
              {property.totalArea} m²
            </strong>
          </article>

          <article className="property-detail-stat">
            <MapPin
              size={25}
              strokeWidth={1.45}
            />

            <span>
              Ubicación
            </span>

            <strong>
              {property.neighborhood}
            </strong>
          </article>
        </div>
      </section>

      {/* =====================================================
          GALERÍA
          ===================================================== */}

      <section className="property-detail-gallery">
        <div className="section-shell">
          <header className="property-detail-section-heading">
            <div>
              <p className="eyebrow">
                Recorrer la propiedad
              </p>

              <h2>
                Cada espacio forma parte de la experiencia.
              </h2>
            </div>

            <p>
              Explorá los ambientes, materiales,
              visuales y relaciones entre interior
              y exterior.
            </p>
          </header>

          <div className="property-detail-gallery-main">
            <img
              key={activeImage.id}
              src={activeImage.src}
              alt={activeImage.alt}
            />

            <span className="property-detail-gallery-category">
              {categoryLabel[activeImage.category]}
            </span>

            <span className="property-detail-gallery-count">
              {String(activeImageIndex + 1).padStart(2, '0')}
              {' / '}
              {String(images.length).padStart(2, '0')}
            </span>

            {images.length > 1 && (
              <div className="property-detail-gallery-controls">
                <button
                  type="button"
                  aria-label="Imagen anterior"
                  onClick={handlePreviousImage}
                >
                  <ArrowLeft size={19} />
                </button>

                <button
                  type="button"
                  aria-label="Imagen siguiente"
                  onClick={handleNextImage}
                >
                  <ArrowRight size={19} />
                </button>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="property-detail-thumbnails">
              {images.map(
                (
                  image: PropertyImage,
                  imageIndex: number,
                ) => {
                  const isActive =
                    imageIndex === activeImageIndex

                  return (
                    <button
                      key={image.id}
                      type="button"
                      className={[
                        'property-detail-thumbnail',
                        isActive
                          ? 'property-detail-thumbnail--active'
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-label={
                        `Ver ${categoryLabel[image.category]}`
                      }
                      aria-pressed={isActive}
                      onClick={() =>
                        handleImageSelect(imageIndex)
                      }
                    >
                      <img
                        src={image.src}
                        alt=""
                        loading="lazy"
                      />

                      <span>
                        {categoryLabel[image.category]}
                      </span>
                    </button>
                  )
                },
              )}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          HISTORIA
          ===================================================== */}

      <section className="property-detail-story">
        <div className="property-detail-story-grid section-shell">
          <div>
            <p className="eyebrow">
              La propiedad
            </p>

            <h2>
              Un espacio pensado para ser vivido.
            </h2>
          </div>

          <div className="property-detail-story-copy">
            <p>
              La arquitectura define mucho más que
              una distribución. Define cómo entra
              la luz, cómo se relacionan los
              ambientes y qué lugar ocupa el
              paisaje dentro de la vida cotidiana.
            </p>

            <p>
              En {property.title}, cada espacio
              busca equilibrio entre privacidad,
              amplitud y conexión con el entorno.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CARACTERÍSTICAS
          ===================================================== */}

      <section className="property-detail-features">
        <div className="section-shell">
          <p className="eyebrow">
            Características
          </p>

          <h2 className="section-display">
            Lo esencial, sin ruido.
          </h2>

          <div className="property-detail-feature-grid">
            <span>
              {property.bedrooms} dormitorios
            </span>

            <span>
              {property.bathrooms} baños
            </span>

            <span>
              {property.totalArea} m²
            </span>

            <span>
              {property.neighborhood}
            </span>

            <span>
              {property.city}
            </span>

            <span>
              {propertyTypeLabel[property.propertyType]}
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          UBICACIÓN
          ===================================================== */}

      <section className="property-detail-location">
        <div className="property-detail-location-grid section-shell">
          <div>
            <p className="eyebrow">
              Ubicación
            </p>

            <h2>
              {property.neighborhood}
            </h2>

            <p>
              {property.city}. Una ubicación
              seleccionada no sólo por dónde está,
              sino por la experiencia que propone
              alrededor de la propiedad.
            </p>
          </div>

          <PropertyMap
            location={{
              name: locationLabel,
              lat: property.location.latitude,
              lng: property.location.longitude,
              zoom: 14,
            }}
          />
        </div>
      </section>

      {/* =====================================================
          CONTACTO
          ===================================================== */}

      <section className="property-detail-contact">
        <div className="property-detail-contact-inner section-shell">
          <p className="eyebrow">
            Una propiedad merece contexto.
          </p>

          <h2>
            ¿La vemos?
          </h2>

          <button
            type="button"
            className="property-detail-contact-button"
            onClick={() =>
              setIsInquiryOpen(true)
            }
          >
            Consultar propiedad

            <ArrowUpRight
              size={19}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </section>

      {/* =====================================================
          NAVEGACIÓN ENTRE PROPIEDADES
          ===================================================== */}

      <nav
        className="property-detail-navigation"
        aria-label="Navegación entre propiedades"
      >
        <button
          type="button"
          onClick={() =>
            onNavigate(previousProperty.slug)
          }
        >
          <ArrowLeft
            size={22}
            strokeWidth={1.4}
          />

          <span>
            <small>
              Propiedad anterior
            </small>

            {previousProperty.title}
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            onNavigate(nextProperty.slug)
          }
        >
          <span>
            <small>
              Siguiente propiedad
            </small>

            {nextProperty.title}
          </span>

          <ArrowRight
            size={22}
            strokeWidth={1.4}
          />
        </button>
      </nav>

      {/* =====================================================
          FORMULARIO DE CONSULTA
          ===================================================== */}

      <PropertyInquiryForm
        propertyTitle={property.title}
        propertyLocation={locationLabel}
        isOpen={isInquiryOpen}
        onClose={() =>
          setIsInquiryOpen(false)
        }
      />
    </main>
  )
}