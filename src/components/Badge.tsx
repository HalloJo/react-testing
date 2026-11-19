import type { HTMLAttributes } from 'react'
import type { Priority, Sentiment } from '../features/feedback/types'

type BadgeTone = Sentiment | Priority | 'info'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  children: string
}

const tones: Record<BadgeTone, string> = {
  positive:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/10 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20',
  negative:
    'bg-rose-50 text-rose-700 ring-rose-600/10 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/20',
  neutral:
    'bg-slate-100 text-slate-600 ring-slate-500/10 dark:bg-slate-700/60 dark:text-slate-300 dark:ring-slate-500/20',
  high: 'bg-rose-50 text-rose-700 ring-rose-600/10 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/20',
  medium:
    'bg-amber-50 text-amber-700 ring-amber-600/10 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20',
  low: 'bg-sky-50 text-sky-700 ring-sky-600/10 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/20',
  info: 'bg-indigo-50 text-indigo-700 ring-indigo-600/10 dark:bg-indigo-400/10 dark:text-indigo-300 dark:ring-indigo-400/20',
}

export function Badge({
  tone = 'info',
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1 ring-inset ${tones[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
