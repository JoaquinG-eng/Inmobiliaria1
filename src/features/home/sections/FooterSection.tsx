interface FooterSectionProps {
  onOpenContact: () => void
}

export function FooterSection({ onOpenContact }: FooterSectionProps) {
  return (
    <footer className="footer">
      <div className="section-shell footer-grid">
        <div>
          <p className="eyebrow">INMO · ARGENTINA</p>

          <h2>
            TU PRÓXIMO
            <br />
            LUGAR EMPIEZA ACÁ.
          </h2>
        </div>

        <div className="footer-links">
          <a href="#propiedades">
            Propiedades
          </a>

          <a href="#experiencia">
            Comprar / Alquilar / Vender
          </a>

          <a href="#ubicaciones">
            Ubicaciones
          </a>

          <button
            type="button"
            className="footer-contact-link"
            onClick={onOpenContact}
          >
            Contacto
          </button>
        </div>
      </div>
    </footer>
  )
}