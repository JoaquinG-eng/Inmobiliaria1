import { useState } from 'react'
import { BuyPage } from '../features/buy/BuyPage'
import { HomePage } from '../features/home/HomePage'
import { PropertyDetailPage } from '../features/property/PropertyDetailPage'
import { RentPage } from '../features/rent/RentPage'
import { SellPage } from '../features/sell/SellPage'

type AppView =
  | { type: 'home' }
  | { type: 'property'; slug: string }
  | { type: 'buy' }
  | { type: 'rent' }
  | { type: 'sell' }

export default function App() {
  const [view, setView] = useState<AppView>({
    type: 'home',
  })

  const scrollTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }

  const handleOpenProperty = (
    slug: string,
  ): void => {
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

  return (
    <div className="site-canvas">
      {view.type === 'home' && (
        <HomePage
          onOpenProperty={handleOpenProperty}
          onOpenBuy={handleOpenBuy}
          onOpenRent={handleOpenRent}
          onOpenSell={handleOpenSell}
        />
      )}

      {view.type === 'property' && (
        <PropertyDetailPage
          slug={view.slug}
          onBack={handleOpenHome}
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
    </div>
  )
}