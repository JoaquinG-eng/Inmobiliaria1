import { ArrowLeft } from 'lucide-react'
import { BuyPropertiesSection } from './BuyPropertiesSection'

interface BuyPageProps {
  onBack: () => void
  onOpenProperty: (slug: string) => void
}

export function BuyPage({
  onBack,
  onOpenProperty,
}: BuyPageProps) {
  return (
    <main className="catalog-page catalog-page--buy">
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
          Comprar
        </span>
      </header>

      <section className="catalog-page-hero catalog-page-hero--buy">
        <div className="catalog-page-hero-background" />

        <div className="catalog-page-hero-overlay" />

        <div className="catalog-page-hero-content section-shell">
          <p className="eyebrow">
            Propiedades en venta
          </p>

          <h1>
            ENCONTRÁ UN LUGAR QUE VALGA LA PENA HACER TUYO.
          </h1>

          <p>
            Casas, departamentos y residencias seleccionadas
            por arquitectura, ubicación, entorno y calidad de vida.
          </p>
        </div>
      </section>

      <BuyPropertiesSection
        onOpenProperty={onOpenProperty}
      />
    </main>
  )
}