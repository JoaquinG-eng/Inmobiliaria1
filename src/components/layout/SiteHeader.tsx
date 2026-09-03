import { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  Menu,
  X,
} from 'lucide-react'

interface NavigationItem {
  label: string
  selector: string
  index: string
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Inicio',
    selector: '.hero',
    index: '01',
  },
  {
    label: 'Propiedades',
    selector: '.properties-section',
    index: '02',
  },
  {
    label: 'Comprar · Alquilar · Vender',
    selector: '.intent-section',
    index: '03',
  },
  {
    label: 'Ubicaciones',
    selector: '.locations-section',
    index: '04',
  },
  {
    label: 'Contacto',
    selector: '.footer',
    index: '05',
  },
]

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] =
    useState<boolean>(false)

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (
      event: KeyboardEvent,
    ): void => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      document.body.style.overflow =
        previousOverflow

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [isMenuOpen])

  const navigateTo = (
    selector: string,
  ): void => {
    setIsMenuOpen(false)

    window.requestAnimationFrame(() => {
      const target =
        document.querySelector<HTMLElement>(
          selector,
        )

      target?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  return (
    <>
      <header className="site-header">
        <button
          type="button"
          className="brand"
          onClick={() =>
            navigateTo('.hero')
          }
          aria-label="Volver al inicio"
        >
          ESTUDIO
          <span className="brand-dot">
            .
          </span>
        </button>

        <nav
          className="desktop-nav"
          aria-label="Navegación principal"
        >
          <button
            type="button"
            onClick={() =>
              navigateTo(
                '.properties-section',
              )
            }
          >
            Propiedades
          </button>

          <button
            type="button"
            onClick={() =>
              navigateTo(
                '.intent-section',
              )
            }
          >
            Servicios
          </button>

          <button
            type="button"
            onClick={() =>
              navigateTo(
                '.locations-section',
              )
            }
          >
            Ubicaciones
          </button>
        </nav>

        <button
          type="button"
          className="menu-button"
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
          onClick={() =>
            setIsMenuOpen(true)
          }
        >
          Menú

          <Menu
            size={17}
            strokeWidth={1.5}
          />
        </button>
      </header>

      <div
        id="main-menu"
        className={[
          'main-menu',
          isMenuOpen
            ? 'main-menu--open'
            : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden={!isMenuOpen}
      >
        <div
          className="main-menu-backdrop"
          aria-hidden="true"
          onClick={() =>
            setIsMenuOpen(false)
          }
        />

        <div className="main-menu-panel">
          <header className="main-menu-header">
            <span className="main-menu-brand">
              ESTUDIO
              <span className="brand-dot">
                .
              </span>
            </span>

            <button
              type="button"
              className="main-menu-close"
              aria-label="Cerrar menú"
              onClick={() =>
                setIsMenuOpen(false)
              }
            >
              Cerrar

              <X
                size={18}
                strokeWidth={1.4}
              />
            </button>
          </header>

          <div className="main-menu-content">
            <p className="eyebrow main-menu-eyebrow">
              Navegación
            </p>

            <nav
              className="main-menu-navigation"
              aria-label="Menú principal"
            >
              {navigationItems.map(
                (
                  item: NavigationItem,
                ) => (
                  <button
                    key={item.selector}
                    type="button"
                    className="main-menu-item"
                    onClick={() =>
                      navigateTo(
                        item.selector,
                      )
                    }
                  >
                    <span className="main-menu-item-index">
                      {item.index}
                    </span>

                    <span className="main-menu-item-label">
                      {item.label}
                    </span>

                    <ArrowDownRight
                      className="main-menu-item-arrow"
                      size={28}
                      strokeWidth={1.1}
                    />
                  </button>
                ),
              )}
            </nav>
          </div>

          <footer className="main-menu-footer">
            <p>
              Propiedades seleccionadas.
              <br />
              Arquitectura, ubicación y
              experiencia.
            </p>

            <div>
              <span>
                Buenos Aires
              </span>

              <span>
                Córdoba
              </span>

              <span>
                Argentina
              </span>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}