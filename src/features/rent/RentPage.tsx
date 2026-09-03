import { ArrowLeft } from 'lucide-react'
import { RentPropertiesSection } from './RentPropertiesSection'

interface RentPageProps {
  onBack: () => void
  onOpenProperty: (slug: string) => void
}

export function RentPage({
  onBack,
  onOpenProperty,
}: RentPageProps) {
  return (
    <main className="catalog-page catalog-page--rent">
      <header className="catalog-page-topbar">
        <button
          type="button"
          className="catalog-page-back"
          onClick={onBack}
        >
          <ArrowLeft
            size={18}
            strokeWidth={1.4}
          />

          Inicio
        </button>

        <span>
          Alquilar
        </span>
      </header>

      <section className="catalog-page-hero catalog-page-hero--rent">
        <div className="catalog-page-hero-background" />

        <div className="catalog-page-hero-overlay" />

        <div className="catalog-page-hero-content section-shell">
          <p className="eyebrow">
            Propiedades en alquiler
          </p>

          <h1>
            EL PRÓXIMO LUGAR NO TIENE QUE SER PARA SIEMPRE.
          </h1>

          <p>
            Espacios preparados para una nueva etapa,
            seleccionados con el mismo criterio que una propiedad
            para comprar.
          </p>
        </div>
      </section>

      <RentPropertiesSection
        onOpenProperty={onOpenProperty}
      />
    </main>
  )
}