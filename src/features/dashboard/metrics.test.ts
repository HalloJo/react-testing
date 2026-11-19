import { getDashboardMetrics, getSentimentSeries } from './metrics'
import { seedFeedback } from '../feedback/seed'

describe('dashboard metrics', () => {
  it('counts total, sentiment, and urgent feedback', () => {
    expect(getDashboardMetrics(seedFeedback)).toEqual({
      total: 12,
      positive: 5,
      negative: 5,
      highPriority: 3,
    })
  })

  it('provides a chart series for each sentiment', () => {
    expect(
      getSentimentSeries(seedFeedback).map(({ sentiment, count }) => [
        sentiment,
        count,
      ]),
    ).toEqual([
      ['Positive', 5],
      ['Neutral', 2],
      ['Negative', 5],
    ])
  })
})
