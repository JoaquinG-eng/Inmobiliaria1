import { useEffect, useRef, useState } from 'react'
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

  const menuButtonRef =
    useRef<HTMLButtonElement>(null)

  const closeButtonRef =
    useRef<HTMLButtonElement>(null)

  const menuPanelRef =
    useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const previousBodyOverflow =
      document.body.style.overflow

    const previousHtmlOverflow =
      document.documentElement.style.overflow

    const previousPaddingRight =
      document.body.style.paddingRight

    const scrollbarWidth =
      window.innerWidth -
      document.documentElement.clientWidth

    document.body.style.overflow =
      'hidden'

    document.documentElement.style.overflow =
      'hidden'

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight =
        `${scrollbarWidth}px`
    }

    window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus()
    })

    const handleKeyDown = (
      event: KeyboardEvent,
    ): void => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)

        window.requestAnimationFrame(() => {
          menuButtonRef.current?.focus()
        })

        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const panel = menuPanelRef.current

      if (!panel) {
        return
      }

      const focusableElements =
        Array.from(
          panel.querySelectorAll<HTMLElement>(
            [
              'button:not([disabled])',
              'a[href]',
              'input:not([disabled])',
              'select:not([disabled])',
              'textarea:not([disabled])',
              '[tabindex]:not([tabindex="-1"])',
            ].join(','),
          ),
        )

      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const first =
        focusableElements[0]

      const last =
        focusableElements[
          focusableElements.length - 1
        ]

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault()
        last.focus()
        return
      }

      if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      document.body.style.overflow =
        previousBodyOverflow

      document.documentElement.style.overflow =
        previousHtmlOverflow

      document.body.style.paddingRight =
        previousPaddingRight

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [isMenuOpen])

  const closeMenu = (): void => {
    setIsMenuOpen(false)

    window.requestAnimationFrame(() => {
      menuButtonRef.current?.focus()
    })
  }

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
        behavior: window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches
          ? 'auto'
          : 'smooth',
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
          <span
            className="brand-dot"
            aria-hidden="true"
          >
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
          ref={menuButtonRef}
          type="button"
          className="menu-button"
          aria-label={
            isMenuOpen
              ? 'Menú abierto'
              : 'Abrir menú'
          }
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
            aria-hidden="true"
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
        <button
          type="button"
          className="main-menu-backdrop"
          aria-label="Cerrar menú"
          tabIndex={isMenuOpen ? 0 : -1}
          onClick={closeMenu}
        />

        <div
          ref={menuPanelRef}
          className="main-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
        >
          <header className="main-menu-header">
            <span className="main-menu-brand">
              ESTUDIO
              <span
                className="brand-dot"
                aria-hidden="true"
              >
                .
              </span>
            </span>

            <button
              ref={closeButtonRef}
              type="button"
              className="main-menu-close"
              aria-label="Cerrar menú"
              onClick={closeMenu}
            >
              Cerrar

              <X
                size={18}
                strokeWidth={1.4}
                aria-hidden="true"
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
                      aria-hidden="true"
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
