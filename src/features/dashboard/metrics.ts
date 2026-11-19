import type { Feedback } from '../feedback/types'

export interface DashboardMetrics {
  total: number
  positive: number
  negative: number
  highPriority: number
}

export interface SentimentPoint {
  sentiment: string
  count: number
  fill: string
}

export function getDashboardMetrics(feedback: Feedback[]): DashboardMetrics {
  return {
    total: feedback.length,
    positive: feedback.filter((item) => item.sentiment === 'positive').length,
    negative: feedback.filter((item) => item.sentiment === 'negative').length,
    highPriority: feedback.filter((item) => item.priority === 'high').length,
  }
}

export function getSentimentSeries(feedback: Feedback[]): SentimentPoint[] {
  const metrics = getDashboardMetrics(feedback)
  return [
    { sentiment: 'Positive', count: metrics.positive, fill: '#16a37b' },
    {
      sentiment: 'Neutral',
      count: feedback.filter((item) => item.sentiment === 'neutral').length,
      fill: '#7890a8',
    },
    { sentiment: 'Negative', count: metrics.negative, fill: '#e06e69' },
  ]
}
