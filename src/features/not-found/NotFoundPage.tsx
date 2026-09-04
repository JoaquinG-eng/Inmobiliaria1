type NotFoundPageProps = {
  onBackHome: () => void
}

export function NotFoundPage({ onBackHome }: NotFoundPageProps) {
  return (
    <main className="not-found-page">
      <video
        className="not-found-page__video"
        src="/media/hero-1920.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      <div className="not-found-page__overlay" />

      <div className="not-found-page__content">
        <span className="not-found-page__eyebrow">404</span>

        <h1>Página no encontrada</h1>

        <p>
          La dirección que buscás no existe o ya no se encuentra disponible.
        </p>

        <button
          type="button"
          className="not-found-page__button"
          onClick={onBackHome}
        >
          Volver al inicio
        </button>
      </div>
    </main>
  )
}