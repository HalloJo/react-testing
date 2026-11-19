import { ArrowDownUp, Search, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  LoadingSpinner,
  Select,
} from '../../components'
import { useFeedback } from '../../hooks/useFeedback'
import type { FeedbackFilters, Sentiment } from './types'
import { formatDate } from './format'

const sentimentOptions = [
  { label: 'All sentiment', value: 'all' },
  { label: 'Positive', value: 'positive' },
  { label: 'Neutral', value: 'neutral' },
  { label: 'Negative', value: 'negative' },
]

const sortOptions = [
  { label: 'Priority: high to low', value: 'priority' },
  { label: 'Newest first', value: 'newest' },
]

export function FeedbackListPage() {
  const [search, setSearch] = useState('')
  const [sentiment, setSentiment] = useState<Sentiment | 'all'>('all')
  const [sort, setSort] = useState<FeedbackFilters['sort']>('priority')
  const location = useLocation()
  const scenarioParam = new URLSearchParams(location.search).get('scenario')
  const scenario =
    scenarioParam === 'error' || scenarioParam === 'empty'
      ? scenarioParam
      : undefined
  const filters: FeedbackFilters = {
    search,
    sentiment,
    sort,
    ...(scenario ? { scenario } : {}),
  }
  const { data = [], isPending, isError, error, refetch } = useFeedback(filters)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span className="size-1.5 rounded-full bg-indigo-500" />
            Customer voice
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Feedback inbox
          </h2>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Every customer note, organized and ready to act on.
          </p>
        </div>
        <div className="text-sm text-slate-400">
          {isPending
            ? 'Loading feedback…'
            : `${data.length} ${data.length === 1 ? 'item' : 'items'}`}
        </div>
      </div>

      <Card padding="sm">
        <div className="grid gap-3 sm:grid-cols-[minmax(220px,1fr)_190px_220px]">
          <div className="relative">
            <Search
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
            />
            <Input
              label="Search feedback"
              hideLabel
              placeholder="Search feedback, tags..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-10"
              aria-label="Search feedback"
            />
            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            )}
          </div>
          <Select
            label="Sentiment"
            options={sentimentOptions}
            value={sentiment}
            onChange={(event) =>
              setSentiment(event.target.value as Sentiment | 'all')
            }
          />
          <Select
            label="Sort by"
            options={sortOptions}
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as FeedbackFilters['sort'])
            }
          />
        </div>
      </Card>

      {isPending ? (
        <Card>
          <div className="flex min-h-64 items-center justify-center">
            <LoadingSpinner label="Loading feedback" size="lg" />
          </div>
        </Card>
      ) : isError ? (
        <Card>
          <EmptyState
            title="Feedback could not be loaded"
            description={error.message}
            action={<Button onClick={() => void refetch()}>Try again</Button>}
          />
        </Card>
      ) : data.length === 0 ? (
        <Card>
          <EmptyState
            title={
              search || sentiment !== 'all'
                ? 'No feedback matches those filters'
                : 'No feedback yet'
            }
            description={
              search || sentiment !== 'all'
                ? 'Try another search or clear the filters to see more customer feedback.'
                : 'Add a customer note to start building your product insights.'
            }
            action={
              search || sentiment !== 'all' ? (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearch('')
                    setSentiment('all')
                  }}
                  icon={<X aria-hidden="true" className="size-4" />}
                >
                  Clear filters
                </Button>
              ) : (
                <Link
                  to="/feedback/new"
                  className="inline-flex min-h-10 items-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                >
                  Add feedback
                </Link>
              )
            }
          />
        </Card>
      ) : (
        <Card padding="none" className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                All customer feedback
              </h3>
              <p className="mt-0.5 text-xs text-slate-400">
                Reviewed and categorized by Feedback Pulse
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <ArrowDownUp aria-hidden="true" className="size-3.5" />
              Sorted by {sort === 'priority' ? 'priority' : 'newest'}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:border-slate-800 dark:bg-slate-950/30">
                  <th scope="col" className="px-6 py-3">
                    Feedback
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Sentiment
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Priority
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Received
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="group transition hover:bg-slate-50/70 dark:hover:bg-slate-800/50"
                  >
                    <td className="max-w-90 px-6 py-4">
                      <Link
                        to={`/feedback/${item.id}`}
                        className="block truncate text-sm font-semibold text-slate-800 group-hover:text-indigo-700 dark:text-slate-100 dark:group-hover:text-indigo-300"
                      >
                        {item.title}
                      </Link>
                      <p className="mt-1 truncate text-xs text-slate-400">
                        {item.description}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <Badge tone={item.sentiment}>{item.sentiment}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge tone={item.priority}>{item.priority}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex max-w-50 flex-wrap gap-1.5">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className="px-1 py-1 text-[10px] text-slate-400">
                            +{item.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs text-slate-400">
                      {formatDate(item.createdDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3 text-xs text-slate-400 dark:border-slate-800">
            <span>
              Showing {data.length} {data.length === 1 ? 'result' : 'results'}
            </span>
            <span>AI-assisted insights · Always review before acting</span>
          </div>
        </Card>
      )}
    </div>
  )
}
