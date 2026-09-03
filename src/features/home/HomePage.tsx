import { useState } from 'react'

import { GeneralContactForm } from '../contact/GeneralContactForm'
import { cinematicMedia } from './data/media'
import { FeaturedPropertiesSection } from './sections/FeaturedPropertiesSection'
import { FooterSection } from './sections/FooterSection'
import { HeroSection } from './sections/HeroSection'
import { IntentSection } from './sections/IntentSection'
import { LocationsSection } from './sections/LocationsSection'
import { ManifestoSection } from './sections/ManifestoSection'
import { VideoStorySection } from './sections/VideoStorySection'

interface HomePageProps {
  onOpenProperty: (slug: string) => void
  onOpenBuy: () => void
  onOpenRent: () => void
  onOpenSell: () => void
}

export function HomePage({
  onOpenProperty,
  onOpenBuy,
  onOpenRent,
  onOpenSell,
}: HomePageProps) {
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false)

  return (
    <main>


      <HeroSection />

      <ManifestoSection />

      <VideoStorySection
        src={cinematicMedia.mountain.src}
        index="02"
        label="NATURALEZA"
        title="EL ENTORNO TAMBIÉN ES PARTE DE LA PROPIEDAD."
        body="Arquitectura, paisaje y privacidad en una misma experiencia."
        variant="vertical"
      />

      <FeaturedPropertiesSection
        onOpenProperty={onOpenProperty}
      />

      <VideoStorySection
        src={cinematicMedia.greenery.src}
        index="03"
        label="PRIVACIDAD"
        title="ESPACIOS QUE CAMBIAN EL RITMO."
        body="Una selección pensada para quienes buscan algo más que metros cuadrados."
        align="right"
      />

      <IntentSection
        onOpenBuy={onOpenBuy}
        onOpenRent={onOpenRent}
        onOpenSell={onOpenSell}
      />

      <LocationsSection />

      <FooterSection
        onOpenContact={() =>
          setIsContactOpen(true)
        }
      />

      <GeneralContactForm
        isOpen={isContactOpen}
        onClose={() =>
          setIsContactOpen(false)
        }
      />
    </main>
  )
}