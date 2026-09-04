import { createPortal } from 'react-dom'

interface GlobalLoaderProps {
  visible: boolean
  label?: string
}

export function GlobalLoader({
  visible,
  label = 'CARGANDO',
}: GlobalLoaderProps) {
  if (
    !visible ||
    typeof document === 'undefined'
  ) {
    return null
  }

  return createPortal(
    <div
      className="global-loader"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="global-loader-inner">
        <span className="global-loader-brand">
          ESTUDIO.
        </span>

        <span className="global-loader-label">
          {label}
        </span>

        <div className="global-loader-line">
          <span />
        </div>
      </div>
    </div>,
    document.body,
  )
}