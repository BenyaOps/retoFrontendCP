import { useEffect, type ReactNode } from 'react'
import { clsx } from 'clsx'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closable = true,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closable ? onClose : undefined}
      />

      {/* Panel */}
      <div
        className={clsx(
          'relative z-10 w-full rounded-2xl bg-dark-800 border border-dark-600 shadow-2xl animate-slide-up',
          {
            'max-w-sm': size === 'sm',
            'max-w-md': size === 'md',
            'max-w-2xl': size === 'lg',
          }
        )}
      >
        {/* Header */}
        {(title || closable) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-dark-600">
            {title && (
              <h2 className="text-lg font-semibold text-white font-display tracking-wide">
                {title}
              </h2>
            )}
            {closable && onClose && (
              <button
                onClick={onClose}
                className="ml-auto p-1 rounded-lg text-gray-400 hover:text-white hover:bg-dark-600 transition-colors"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}
