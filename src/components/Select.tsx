import type { SelectHTMLAttributes } from 'react'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  error?: string
}

export function Select({
  label,
  options,
  error,
  id,
  className = '',
  ...props
}: SelectProps) {
  const selectId = id ?? props.name ?? label.toLowerCase().replaceAll(' ', '-')

  return (
    <div className="w-full">
      <label
        htmlFor={selectId}
        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>
      <select
        id={selectId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${selectId}-error` : undefined}
        className={`min-h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:disabled:bg-slate-900 ${error ? 'border-rose-400' : 'border-slate-200'} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p
          id={`${selectId}-error`}
          className="mt-1.5 text-xs text-rose-600 dark:text-rose-400"
        >
          {error}
        </p>
      )}
    </div>
  )
}
