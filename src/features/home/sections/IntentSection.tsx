import { ArrowRight } from 'lucide-react'

interface IntentSectionProps {
  onOpenBuy: () => void
  onOpenRent: () => void
  onOpenSell: () => void
}

type IntentAction =
  | 'buy'
  | 'rent'
  | 'sell'

interface IntentItem {
  title: string
  subtitle: string
  image: string
  action: IntentAction
}

const intents: IntentItem[] = [
  {
    title: 'Comprar',
    subtitle:
      'Encontrá el espacio para tu próxima etapa.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
    action: 'buy',
  },
  {
    title: 'Alquilar',
    subtitle:
      'Vivir bien también puede empezar hoy.',
    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85',
    action: 'rent',
  },
  {
    title: 'Vender',
    subtitle:
      'Presentamos tu propiedad como realmente merece.',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85',
    action: 'sell',
  },
]

export function IntentSection({
  onOpenBuy,
  onOpenRent,
  onOpenSell,
}: IntentSectionProps) {
  const handleIntentClick = (
    action: IntentAction,
  ): void => {
    if (action === 'buy') {
      onOpenBuy()
      return
    }

    if (action === 'rent') {
      onOpenRent()
      return
    }

    onOpenSell()
  }

  return (
    <section
      className="intent-section"
      id="experiencia"
    >
      {intents.map(
        (
          intent: IntentItem,
          index: number,
        ) => (
          <article
            className="intent-panel intent-panel--interactive"
            key={intent.title}
            style={{
              backgroundImage:
                `url(${intent.image})`,
            }}
            role="button"
            tabIndex={0}
            onClick={() =>
              handleIntentClick(
                intent.action,
              )
            }
            onKeyDown={(event) => {
              if (
                event.key === 'Enter' ||
                event.key === ' '
              ) {
                event.preventDefault()

                handleIntentClick(
                  intent.action,
                )
              }
            }}
          >
            <div
              className="intent-shade"
              aria-hidden="true"
            />

            <span className="intent-number">
              0{index + 1}
            </span>

            <div className="intent-copy">
              <h2>
                {intent.title}
              </h2>

              <p>
                {intent.subtitle}
              </p>

              <span
                className="round-action"
                aria-hidden="true"
              >
                <ArrowRight
                  size={21}
                  strokeWidth={1.35}
                />
              </span>
            </div>
          </article>
        ),
      )}
    </section>
  )
}