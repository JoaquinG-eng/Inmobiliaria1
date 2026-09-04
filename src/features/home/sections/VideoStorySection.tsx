import {
  useEffect,
  useRef,
  useState,
} from 'react'

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
  const sectionRef =
    useRef<HTMLElement>(null)

  const [shouldLoadVideo, setShouldLoadVideo] =
    useState<boolean>(false)

  const [isPrimaryReady, setIsPrimaryReady] =
    useState<boolean>(false)

  const isVertical =
    variant === 'vertical'

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        setShouldLoadVideo(true)

        observer.disconnect()
      },
      {
        /*
         * El video empieza a prepararse antes
         * de llegar visualmente a la sección,
         * pero ya no compite con el Hero al
         * cargar toda la Home.
         */
        rootMargin: '600px 0px',
        threshold: 0.01,
      },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={[
        'video-story',
        align === 'right'
          ? 'video-story--right'
          : '',
        isVertical
          ? 'video-story--vertical'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {shouldLoadVideo && (
        isVertical ? (
          <>
            {isPrimaryReady && (
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
            )}

            <video
              className="story-video story-video--foreground"
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onPlaying={() => {
                setIsPrimaryReady(true)
              }}
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
        )
      )}

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
