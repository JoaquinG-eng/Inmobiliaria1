import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startPlayback()
          return
        }

        video.pause()
      },
      {
        threshold: 0.05,
      },
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!isVideoReady) return

    /*
     * Esperamos muy poco después de que el video
     * realmente comenzó a reproducirse.
     * Evita sostener el loader 1.5 s mientras el
     * navegador ya está pintando el Hero.
     */
    const timer = window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        setIsLoaderVisible(false)
      })
    }, 180)

    return () => {
      window.clearTimeout(timer)
    }
  }, [isVideoReady])

  const loader =
    isLoaderVisible &&
    typeof document !== 'undefined'
      ? createPortal(
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
          </div>,
          document.body,
        )
      : null

  return (
    <>
      {loader}

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
        onPlaying={() => {
          setIsVideoReady(true)
        }}
      />
    </>
  )
}
