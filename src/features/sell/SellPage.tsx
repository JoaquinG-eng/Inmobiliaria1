import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { SellerForm } from '../contact/SellerForm'

interface SellPageProps {
  onBack: () => void
}

export function SellPage({
  onBack,
}: SellPageProps) {
  const [isSellerOpen, setIsSellerOpen] = useState<boolean>(false)

  return (
    <main className="sell-page">
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
          Vender
        </span>
      </header>

      <section className="sell-page-hero">
        <div className="sell-page-background" />

        <div className="sell-page-overlay" />

        <div className="sell-page-hero-content section-shell">
          <p className="eyebrow">
            Propietarios
          </p>

          <h1>
            TU PROPIEDAD MERECE ALGO MÁS QUE UN AVISO.
          </h1>

          <p>
            Trabajamos presentación, contexto, arquitectura,
            fotografía y estrategia comercial para mostrar
            cada propiedad con el valor que merece.
          </p>

          <button
            type="button"
            className="sell-page-primary-action"
            onClick={() =>
              setIsSellerOpen(true)
            }
          >
            Quiero vender mi propiedad

            <ArrowUpRight
              size={20}
              strokeWidth={1.4}
            />
          </button>
        </div>
      </section>

      <section className="sell-page-process">
        <div className="section-shell">
          <header className="sell-page-process-heading">
            <p className="eyebrow">
              Nuestro proceso
            </p>

            <h2>
              VENDER BIEN EMPIEZA MUCHO ANTES DE PUBLICAR.
            </h2>
          </header>

          <div className="sell-page-process-grid">
            <article>
              <span>01</span>

              <h3>
                Entender
              </h3>

              <p>
                Conocemos la propiedad, su contexto
                y los objetivos del propietario.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>
                Presentar
              </h3>

              <p>
                Construimos una presentación que haga visible
                el carácter real del espacio.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>
                Posicionar
              </h3>

              <p>
                Definimos cómo y ante qué público
                tiene sentido presentar la propiedad.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="sell-page-cta">
        <div className="section-shell">
          <p className="eyebrow">
            Empecemos
          </p>

          <h2>
            CONTANOS SOBRE TU PROPIEDAD.
          </h2>

          <button
            type="button"
            className="sell-page-primary-action sell-page-primary-action--dark"
            onClick={() =>
              setIsSellerOpen(true)
            }
          >
            Solicitar evaluación

            <ArrowUpRight
              size={20}
              strokeWidth={1.4}
            />
          </button>
        </div>
      </section>

      <SellerForm
        isOpen={isSellerOpen}
        onClose={() =>
          setIsSellerOpen(false)
        }
      />
    </main>
  )
}