export function formatDate(date: string, compact = false): string {
  const formatter = new Intl.DateTimeFormat('en', {
    month: compact ? 'short' : 'long',
    day: 'numeric',
    ...(compact ? {} : { year: 'numeric' }),
  })
  return formatter.format(new Date(date))
}
