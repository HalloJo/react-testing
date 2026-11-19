import type { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string | undefined
  hint?: string | undefined
  hideLabel?: boolean
}

export function Input({
  label,
  error,
  hint,
  hideLabel = false,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? props.name ?? label.toLowerCase().replaceAll(' ', '-')
  const helpId = `${inputId}-help`

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className={`${hideLabel ? 'sr-only' : 'mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200'}`}
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? helpId : undefined}
        className={`min-h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:disabled:bg-slate-900 ${error ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-500/10 dark:border-rose-500' : 'border-slate-200 dark:border-slate-700'} ${className}`}
        {...props}
      />
      {(error || hint) && (
        <p
          id={helpId}
          className={`mt-1.5 text-xs ${error ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'}`}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  )
}
