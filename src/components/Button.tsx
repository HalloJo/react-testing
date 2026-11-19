import { LoaderCircle } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:ring-indigo-500 disabled:bg-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:disabled:bg-indigo-900',
  secondary:
    'border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
  ghost:
    'text-slate-600 hover:bg-slate-100 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-800',
  danger:
    'bg-rose-600 text-white shadow-sm hover:bg-rose-500 focus-visible:ring-rose-500 disabled:bg-rose-300',
}

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'min-h-9 px-3 text-xs',
  md: 'min-h-10 px-4 text-sm',
  lg: 'min-h-12 px-5 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:focus-visible:ring-offset-slate-950 ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
      ) : (
        icon
      )}
      {children}
    </button>
  )
}
