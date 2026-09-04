import { useEffect, useState } from 'react'
import { ScrollToTopHint } from '../components/ui/ScrollToTopHint'
import { BuyPage } from '../features/buy/BuyPage'
import { HomePage } from '../features/home/HomePage'
import { allProperties } from '../features/home/data/properties'
import { PropertyDetailPage } from '../features/property/PropertyDetailPage'
import { RentPage } from '../features/rent/RentPage'
import { SellPage } from '../features/sell/SellPage'

type AppView =
  | { type: 'home' }
  | { type: 'property'; slug: string }
  | { type: 'buy' }
  | { type: 'rent' }
  | { type: 'sell' }

type PropertyOrigin =
  | 'home'
  | 'buy'
  | 'rent'

interface SeoState {
  title: string
  description: string
}

const DEFAULT_SEO: SeoState = {
  title: 'INMO — Propiedades',
  description:
    'Propiedades seleccionadas por arquitectura, ubicación y experiencia en Argentina.',
}

function getSeoState(
  view: AppView,
): SeoState {
  if (view.type === 'buy') {
    return {
      title: 'Comprar propiedades | INMO',
      description:
        'Propiedades en venta seleccionadas por arquitectura, ubicación y calidad de vida.',
    }
  }

  if (view.type === 'rent') {
    return {
      title: 'Alquilar propiedades | INMO',
      description:
        'Propiedades en alquiler seleccionadas por arquitectura, ubicación y experiencia.',
    }
  }

  if (view.type === 'sell') {
    return {
      title: 'Vender una propiedad | INMO',
      description:
        'Presentá tu propiedad para una evaluación comercial y una estrategia de venta cuidada.',
    }
  }

  if (view.type === 'property') {
    const property = allProperties.find(
      (item) => item.slug === view.slug,
    )

    if (property) {
      return {
        title: `${property.title} | INMO`,
        description:
          `${property.title} en ${property.neighborhood}, ${property.city}. ${property.bedrooms} dormitorios, ${property.bathrooms} baños y ${property.totalArea} m².`,
      }
    }
  }

  return DEFAULT_SEO
}

function setMetaContent(
  selector: string,
  content: string,
): void {
  const meta =
    document.querySelector<HTMLMetaElement>(
      selector,
    )

  if (meta) {
    meta.content = content
  }
}

export default function App() {
  const [view, setView] = useState<AppView>({
    type: 'home',
  })

  const [propertyOrigin, setPropertyOrigin] =
    useState<PropertyOrigin>('home')

  useEffect(() => {
    const seo = getSeoState(view)

    document.title = seo.title

    setMetaContent(
      'meta[name="description"]',
      seo.description,
    )

    setMetaContent(
      'meta[property="og:title"]',
      seo.title,
    )

    setMetaContent(
      'meta[property="og:description"]',
      seo.description,
    )

    setMetaContent(
      'meta[name="twitter:title"]',
      seo.title,
    )

    setMetaContent(
      'meta[name="twitter:description"]',
      seo.description,
    )
  }, [view])

  const scrollTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }

  const handleOpenProperty = (
    slug: string,
  ): void => {
    if (view.type === 'home') {
      setPropertyOrigin('home')
    }

    if (view.type === 'buy') {
      setPropertyOrigin('buy')
    }

    if (view.type === 'rent') {
      setPropertyOrigin('rent')
    }

    setView({
      type: 'property',
      slug,
    })

    scrollTop()
  }

  const handleOpenHome = (): void => {
    setView({
      type: 'home',
    })

    scrollTop()
  }

  const handleOpenBuy = (): void => {
    setView({
      type: 'buy',
    })

    scrollTop()
  }

  const handleOpenRent = (): void => {
    setView({
      type: 'rent',
    })

    scrollTop()
  }

  const handleOpenSell = (): void => {
    setView({
      type: 'sell',
    })

    scrollTop()
  }

  const handleBackFromProperty = (): void => {
    if (propertyOrigin === 'buy') {
      setView({
        type: 'buy',
      })

      scrollTop()

      return
    }

    if (propertyOrigin === 'rent') {
      setView({
        type: 'rent',
      })

      scrollTop()

      return
    }

    handleOpenHome()
  }

  const isHomeActive =
    view.type === 'home'

  return (
    <div className="site-canvas">
      <div
        hidden={!isHomeActive}
        aria-hidden={!isHomeActive}
      >
        <HomePage
          onOpenProperty={handleOpenProperty}
          onOpenBuy={handleOpenBuy}
          onOpenRent={handleOpenRent}
          onOpenSell={handleOpenSell}
        />
      </div>

      {view.type === 'property' && (
        <PropertyDetailPage
          slug={view.slug}
          onBack={handleBackFromProperty}
          onNavigate={handleOpenProperty}
        />
      )}

      {view.type === 'buy' && (
        <BuyPage
          onBack={handleOpenHome}
          onOpenProperty={handleOpenProperty}
        />
      )}

      {view.type === 'rent' && (
        <RentPage
          onBack={handleOpenHome}
          onOpenProperty={handleOpenProperty}
        />
      )}

      {view.type === 'sell' && (
        <SellPage
          onBack={handleOpenHome}
        />
      )}

      <ScrollToTopHint />
    </div>
  )
}
