import type {
  CreateFeedbackInput,
  Feedback,
  FeedbackFilters,
} from '../features/feedback/types'
import { makeFeedbackQuery } from './query'

async function request<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, init)
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      message?: string
    } | null
    throw new Error(payload?.message ?? `Request failed (${response.status})`)
  }
  return (await response.json()) as T
}

export const feedbackApi = {
  list(filters: FeedbackFilters): Promise<Feedback[]> {
    const query = makeFeedbackQuery(filters)
    return request(`/feedback?${query.toString()}`)
  },
  get(id: string): Promise<Feedback> {
    return request(`/feedback/${encodeURIComponent(id)}`)
  },
  create(input: CreateFeedbackInput): Promise<Feedback> {
    return request('/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
  },
}
