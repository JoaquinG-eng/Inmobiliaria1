import { useGSAP } from '@gsap/react'
import { ArrowDownRight } from 'lucide-react'
import gsap from 'gsap'
import { useRef } from 'react'
import { SiteHeader } from '../../../components/layout/SiteHeader'
import { CinematicVideo } from '../../../components/motion/CinematicVideo'
import { cinematicMedia } from '../data/media'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('.site-header', { opacity: 0, y: -16, duration: 0.9 })
        .from(
          '.hero-line',
          { opacity: 0, yPercent: 110, duration: 1.15, stagger: 0.1 },
          '-=0.45',
        )
        .from(
          '.hero-meta',
          { opacity: 0, y: 24, duration: 0.9, stagger: 0.08 },
          '-=0.65',
        )
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="hero" id="inicio">
      <CinematicVideo
        src={cinematicMedia.hero.src}
        className="hero-video"
        ariaLabel="Exterior cinematográfico de una casa contemporánea"
      />
      <div className="hero-fallback" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />
      <SiteHeader />

      <div className="hero-content content-grid">
        <div className="hero-title-wrap">
          <p className="hero-meta eyebrow">{cinematicMedia.hero.eyebrow}</p>
          <h1 className="hero-title">
            {cinematicMedia.hero.title.map((line) => (
              <span className="hero-line-mask" key={line}>
                <span className="hero-line">{line}</span>
              </span>
            ))}
          </h1>
        </div>

        <aside className="hero-side">
          <p className="hero-meta hero-side-kicker">PROPIEDADES EXTRAORDINARIAS</p>
          <p className="hero-meta hero-side-copy">
            Seleccionamos espacios donde arquitectura, ubicación y forma de vida
            encuentran un mismo lenguaje.
          </p>
          <a className="hero-meta text-link" href="#propiedades">
            Explorar propiedades
            <ArrowDownRight size={18} strokeWidth={1.4} />
          </a>
        </aside>
      </div>

      <div className="hero-index" aria-hidden="true">
        01 / 03
      </div>
    </section>
  )
}
