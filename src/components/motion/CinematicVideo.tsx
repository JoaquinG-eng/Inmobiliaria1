import { useEffect, useRef } from 'react'

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

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={ariaLabel}
    />
  )
}
