import { type InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-300"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full rounded-lg px-3 py-2.5 text-sm bg-dark-700 border text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-800',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-dark-500 focus:border-brand-500 focus:ring-brand-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400 mt-0.5" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-gray-500 mt-0.5">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
