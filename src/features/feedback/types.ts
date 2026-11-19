export type Sentiment = 'positive' | 'neutral' | 'negative'
export type Priority = 'high' | 'medium' | 'low'
export type FeedbackSort = 'priority' | 'newest'

export interface Feedback {
  id: string
  title: string
  description: string
  sentiment: Sentiment
  priority: Priority
  tags: string[]
  createdDate: string
}

export interface CreateFeedbackInput {
  title: string
  description: string
}

export interface FeedbackFilters {
  search: string
  sentiment: Sentiment | 'all'
  sort: FeedbackSort
  scenario?: 'error' | 'empty'
}
