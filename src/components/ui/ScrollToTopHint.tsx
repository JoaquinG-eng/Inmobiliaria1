import { ArrowUp } from 'lucide-react'
import {
  useEffect,
  useRef,
  useState,
} from 'react'

const IDLE_DELAY = 500
const MIN_SCROLL_DISTANCE = 500

function easeOutCubic(
  progress: number,
): number {
  return 1 - Math.pow(1 - progress, 3)
}

export function ScrollToTopHint() {
  const [isVisible, setIsVisible] =
    useState<boolean>(false)

  const isVisibleRef =
    useRef<boolean>(false)

  const animationFrameRef =
    useRef<number | null>(null)

  const previousScrollBehaviorRef =
    useRef<string>('')

  useEffect(() => {
    isVisibleRef.current =
      isVisible
  }, [isVisible])

  useEffect(() => {
    let idleTimer: number | undefined

    const clearIdleTimer = (): void => {
      if (idleTimer !== undefined) {
        window.clearTimeout(idleTimer)
        idleTimer = undefined
      }
    }

    const scheduleHint = (): void => {
      clearIdleTimer()

      if (
        isVisibleRef.current ||
        window.scrollY <
          MIN_SCROLL_DISTANCE
      ) {
        return
      }

      idleTimer = window.setTimeout(
        () => {
          if (
            window.scrollY >=
            MIN_SCROLL_DISTANCE
          ) {
            setIsVisible(true)
          }
        },
        IDLE_DELAY,
      )
    }

    const handleActivity = (): void => {
      if (isVisibleRef.current) {
        return
      }

      scheduleHint()
    }

    const handleScroll = (): void => {
      if (
        window.scrollY <
        MIN_SCROLL_DISTANCE
      ) {
        clearIdleTimer()

        if (isVisibleRef.current) {
          setIsVisible(false)
        }

        return
      }

      if (!isVisibleRef.current) {
        scheduleHint()
      }
    }

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      },
    )

    window.addEventListener(
      'pointermove',
      handleActivity,
      {
        passive: true,
      },
    )

    window.addEventListener(
      'pointerdown',
      handleActivity,
      {
        passive: true,
      },
    )

    window.addEventListener(
      'touchstart',
      handleActivity,
      {
        passive: true,
      },
    )

    window.addEventListener(
      'keydown',
      handleActivity,
    )

    scheduleHint()

    return () => {
      clearIdleTimer()

      window.removeEventListener(
        'scroll',
        handleScroll,
      )

      window.removeEventListener(
        'pointermove',
        handleActivity,
      )

      window.removeEventListener(
        'pointerdown',
        handleActivity,
      )

      window.removeEventListener(
        'touchstart',
        handleActivity,
      )

      window.removeEventListener(
        'keydown',
        handleActivity,
      )
    }
  }, [])

  useEffect(() => {
    const cancelAnimation = (): void => {
      if (
        animationFrameRef.current === null
      ) {
        return
      }

      window.cancelAnimationFrame(
        animationFrameRef.current,
      )

      animationFrameRef.current = null

      document.documentElement.style.scrollBehavior =
        previousScrollBehaviorRef.current
    }

    window.addEventListener(
      'wheel',
      cancelAnimation,
      {
        passive: true,
      },
    )

    window.addEventListener(
      'touchstart',
      cancelAnimation,
      {
        passive: true,
      },
    )

    return () => {
      cancelAnimation()

      window.removeEventListener(
        'wheel',
        cancelAnimation,
      )

      window.removeEventListener(
        'touchstart',
        cancelAnimation,
      )
    }
  }, [])

  const handleClick = (): void => {
    setIsVisible(false)

    const startY = window.scrollY

    if (startY <= 0) {
      return
    }

    if (
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
    ) {
      window.scrollTo(0, 0)
      return
    }

    if (
      animationFrameRef.current !== null
    ) {
      window.cancelAnimationFrame(
        animationFrameRef.current,
      )
    }

    const duration = Math.min(
      650,
      Math.max(
        340,
        startY * 0.11,
      ),
    )

    const startTime =
      performance.now()

    previousScrollBehaviorRef.current =
      document.documentElement.style.scrollBehavior

    document.documentElement.style.scrollBehavior =
      'auto'

    const animate = (
      currentTime: number,
    ): void => {
      const elapsed =
        currentTime - startTime

      const progress = Math.min(
        elapsed / duration,
        1,
      )

      const eased =
        easeOutCubic(progress)

      window.scrollTo(
        0,
        Math.max(
          0,
          startY * (1 - eased),
        ),
      )

      if (progress < 1) {
        animationFrameRef.current =
          window.requestAnimationFrame(
            animate,
          )

        return
      }

      animationFrameRef.current = null

      window.scrollTo(0, 0)

      document.documentElement.style.scrollBehavior =
        previousScrollBehaviorRef.current
    }

    animationFrameRef.current =
      window.requestAnimationFrame(
        animate,
      )
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      type="button"
      className="scroll-top-hint"
      aria-label="Volver arriba"
      onClick={handleClick}
    >
      <ArrowUp
        size={17}
        strokeWidth={1.5}
        aria-hidden="true"
      />

      <span>
        Volver arriba
      </span>
    </button>
  )
}
