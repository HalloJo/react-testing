import type { HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  title?: string
  description?: string
  action?: ReactNode
  children?: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
}

export function Card({
  title,
  description,
  action,
  children,
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_28px_rgba(27,39,66,0.035)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {(title || description || action) && (
        <header className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  )
}
