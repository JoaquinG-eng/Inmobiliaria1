import { useEffect, useRef, useState } from 'react'

interface CinematicVideoProps {
  src: string
  className?: string
  poster?: string
  ariaLabel: string
}

export function CinematicVideo({
  src,
  className = '',
  poster,
  ariaLabel,
}: CinematicVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  const [isVideoReady, setIsVideoReady] =
    useState<boolean>(false)

  const [isLoaderVisible, setIsLoaderVisible] =
    useState<boolean>(true)

  useEffect(() => {
    const video = ref.current

    if (!video) return

    const startPlayback = (): void => {
      void video.play().catch(() => undefined)
    }

    startPlayback()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startPlayback()
          return
        }

        video.pause()
      },
      {
        threshold: 0.1,
      },
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!isVideoReady) return

    const timer = window.setTimeout(() => {
      setIsLoaderVisible(false)
    }, 1500)

    return () => {
      window.clearTimeout(timer)
    }
  }, [isVideoReady])

  return (
    <>
      {isLoaderVisible && (
        <div
          className="cinematic-loader"
          aria-hidden="true"
        >
          <div className="cinematic-loader-inner">
            <span className="cinematic-loader-brand">
              ESTUDIO.
            </span>

            <span className="cinematic-loader-label">
              CARGANDO
            </span>

            <div className="cinematic-loader-line">
              <span />
            </div>
          </div>
        </div>
      )}

      <video
        ref={ref}
        className={className}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={ariaLabel}
        onLoadedData={() => {
          setIsVideoReady(true)
        }}
        onCanPlay={() => {
          setIsVideoReady(true)
        }}
      />
    </>
  )
}