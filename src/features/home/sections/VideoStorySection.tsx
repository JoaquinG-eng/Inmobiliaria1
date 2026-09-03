interface VideoStorySectionProps {
  src: string
  index: string
  label: string
  title: string
  body: string
  align?: 'left' | 'right'
  variant?: 'default' | 'vertical'
}

export function VideoStorySection({
  src,
  index,
  label,
  title,
  body,
  align = 'left',
  variant = 'default',
}: VideoStorySectionProps) {
  const isVertical = variant === 'vertical'

  return (
    <section
      className={[
        'video-story',
        align === 'right' ? 'video-story--right' : '',
        isVertical ? 'video-story--vertical' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isVertical ? (
        <>
          <video
            className="story-video story-video--background"
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />

          <video
            className="story-video story-video--foreground"
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        </>
      ) : (
        <video
          className="story-video"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}

      <div
        className="story-fallback"
        aria-hidden="true"
      />

      <div
        className="story-overlay"
        aria-hidden="true"
      />

      <div className="story-grid section-shell">
        <span className="story-index">
          {index}
        </span>

        <div className="story-copy">
          <p className="eyebrow">
            {label}
          </p>

          <h2>
            {title}
          </h2>

          <p>
            {body}
          </p>

          <a
            href="#propiedades"
            className="text-link"
          >
            Descubrir selección
            <span aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}