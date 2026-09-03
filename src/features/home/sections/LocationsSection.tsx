import { useState } from 'react'

import { PropertyMap } from '../../../components/maps/PropertyMap'

interface LocationItem {
  name: string
  lat: number
  lng: number
  zoom: number
}

const locations: LocationItem[] = [
  {
    name: 'Villa Carlos Paz',
    lat: -31.4208,
    lng: -64.4992,
    zoom: 13,
  },
  {
    name: 'Córdoba',
    lat: -31.4201,
    lng: -64.1888,
    zoom: 12,
  },
  {
    name: 'Buenos Aires',
    lat: -34.6037,
    lng: -58.3816,
    zoom: 12,
  },
]

export function LocationsSection() {
  const [activeLocation, setActiveLocation] =
    useState<LocationItem>(
      locations[0],
    )

  return (
    <section className="locations-section">
      <div className="locations-grid section-shell">
        <div className="locations-content">
          <p className="eyebrow">
            Ubicaciones
          </p>

          <h2 className="section-display">
            EL LUGAR TAMBIÉN DEFINE LA PROPIEDAD.
          </h2>

          <p className="locations-copy">
            Seleccionamos propiedades considerando
            arquitectura, entorno, privacidad,
            accesibilidad y calidad de vida.
          </p>

          <div
            className="place-list"
            aria-label="Seleccionar ubicación"
          >
            {locations.map(
              (
                location: LocationItem,
              ) => {
                const isActive =
                  location.name ===
                  activeLocation.name

                return (
                  <button
                    key={location.name}
                    type="button"
                    className={[
                      'place-button',
                      isActive
                        ? 'place-button--active'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-pressed={isActive}
                    onClick={() =>
                      setActiveLocation(
                        location,
                      )
                    }
                  >
                    {location.name}
                  </button>
                )
              },
            )}
          </div>
        </div>

        <PropertyMap
          location={activeLocation}
        />
      </div>
    </section>
  )
}