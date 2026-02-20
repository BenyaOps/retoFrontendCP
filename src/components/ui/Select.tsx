import { type SelectHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={selectId} className="text-sm font-medium text-gray-300">
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            'w-full rounded-lg px-3 py-2.5 text-sm bg-dark-700 border text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-800 appearance-none cursor-pointer',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-dark-500 focus:border-brand-500 focus:ring-brand-500',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-dark-700">
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-red-400 mt-0.5" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
