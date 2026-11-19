import type { FeedbackFilters } from '../features/feedback/types'

export function makeFeedbackQuery(filters: FeedbackFilters): URLSearchParams {
  const query = new URLSearchParams()
  if (filters.search.trim()) query.set('search', filters.search.trim())
  if (filters.sentiment !== 'all') query.set('sentiment', filters.sentiment)
  query.set('sort', filters.sort)
  if (filters.scenario) query.set('scenario', filters.scenario)
  return query
}
