import { http, HttpResponse } from 'msw'
import { seedFeedback } from '../features/feedback/seed'
import type {
  CreateFeedbackInput,
  Feedback,
  Priority,
  Sentiment,
} from '../features/feedback/types'

const priorityWeight: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

let feedbackItems = [...seedFeedback]
let nextId = 2000

function analyzeFeedback(input: CreateFeedbackInput): Feedback {
  const text = `${input.title} ${input.description}`.toLowerCase()
  const negativeTerms = [
    'crash',
    'broken',
    'slow',
    'bug',
    'fail',
    'issue',
    'problem',
  ]
  const positiveTerms = [
    'love',
    'great',
    'amazing',
    'easy',
    'helpful',
    'excellent',
  ]
  const negativeMatches = negativeTerms.filter((term) =>
    text.includes(term),
  ).length
  const positiveMatches = positiveTerms.filter((term) =>
    text.includes(term),
  ).length
  const sentiment: Sentiment =
    negativeMatches > positiveMatches
      ? 'negative'
      : positiveMatches > negativeMatches
        ? 'positive'
        : 'neutral'
  const priority: Priority =
    sentiment === 'negative' && negativeMatches > 1
      ? 'high'
      : sentiment === 'negative'
        ? 'medium'
        : 'low'
  const tags = [
    ...(text.includes('search') ? ['search'] : []),
    ...(text.includes('export') || text.includes('report')
      ? ['reporting']
      : []),
    ...(text.includes('mobile') ? ['mobile'] : []),
    ...(sentiment === 'negative' ? ['needs attention'] : []),
    ...(sentiment === 'positive' ? ['customer delight'] : []),
    ...(text.includes('feature') ? ['feature request'] : []),
  ]

  return {
    id: `fb-${nextId++}`,
    title: input.title.trim(),
    description: input.description.trim(),
    sentiment,
    priority,
    tags: tags.length > 0 ? tags : ['product feedback'],
    createdDate: new Date().toISOString(),
  }
}

export const handlers = [
  http.get('/feedback', ({ request }) => {
    const url = new URL(request.url)
    if (url.searchParams.get('scenario') === 'error') {
      return HttpResponse.json(
        { message: 'The feedback service is temporarily unavailable.' },
        { status: 503 },
      )
    }
    if (url.searchParams.get('scenario') === 'empty') {
      return HttpResponse.json([])
    }

    const search = url.searchParams.get('search')?.toLowerCase().trim() ?? ''
    const sentiment = url.searchParams.get('sentiment') ?? 'all'
    const sort = url.searchParams.get('sort') ?? 'priority'
    const filtered = feedbackItems.filter((item) => {
      const matchesSearch =
        search.length === 0 ||
        `${item.title} ${item.description} ${item.tags.join(' ')}`
          .toLowerCase()
          .includes(search)
      const matchesSentiment =
        sentiment === 'all' || item.sentiment === sentiment
      return matchesSearch && matchesSentiment
    })

    filtered.sort((a, b) => {
      if (sort === 'newest') {
        return Date.parse(b.createdDate) - Date.parse(a.createdDate)
      }
      return (
        priorityWeight[a.priority] - priorityWeight[b.priority] ||
        Date.parse(b.createdDate) - Date.parse(a.createdDate)
      )
    })
    return HttpResponse.json(filtered)
  }),
  http.get('/feedback/:id', ({ params }) => {
    const item = feedbackItems.find((feedback) => feedback.id === params.id)
    if (!item) {
      return HttpResponse.json(
        { message: 'Feedback not found.' },
        { status: 404 },
      )
    }
    return HttpResponse.json(item)
  }),
  http.post('/feedback', async ({ request }) => {
    const input = (await request.json()) as CreateFeedbackInput
    const feedback = analyzeFeedback(input)
    feedbackItems = [feedback, ...feedbackItems]
    return HttpResponse.json(feedback, { status: 201 })
  }),
]

export function resetFeedbackStore() {
  feedbackItems = [...seedFeedback]
  nextId = 2000
}
