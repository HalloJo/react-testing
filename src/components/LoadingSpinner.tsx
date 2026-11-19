interface LoadingSpinnerProps {
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'size-4 border-2',
  md: 'size-7 border-[3px]',
  lg: 'size-10 border-4',
}

export function LoadingSpinner({
  label = 'Loading',
  size = 'md',
}: LoadingSpinnerProps) {
  return (
    <span className="inline-flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
      <span
        aria-hidden="true"
        className={`animate-spin rounded-full border-indigo-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400 ${sizes[size]}`}
      />
      <span role="status" aria-label={label}>
        {label}
      </span>
    </span>
  )
}
