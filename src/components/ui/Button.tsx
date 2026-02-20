import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          'inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            // variants
            'bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white focus-visible:ring-brand-500':
              variant === 'primary',
            'bg-dark-600 hover:bg-dark-500 active:bg-dark-700 text-white border border-dark-500 focus-visible:ring-dark-400':
              variant === 'secondary',
            'bg-transparent hover:bg-dark-700 active:bg-dark-800 text-gray-300 hover:text-white focus-visible:ring-dark-400':
              variant === 'ghost',
            'bg-red-700 hover:bg-red-800 text-white focus-visible:ring-red-500':
              variant === 'danger',
            // sizes
            'text-sm px-3 py-1.5': size === 'sm',
            'text-sm px-5 py-2.5': size === 'md',
            'text-base px-6 py-3': size === 'lg',
            // fullWidth
            'w-full': fullWidth,
          },
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
