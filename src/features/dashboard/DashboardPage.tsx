import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  MessageSquareText,
  ShieldAlert,
  Smile,
  Sparkles,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Link } from 'react-router-dom'
import { useFeedback } from '../../hooks/useFeedback'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  LoadingSpinner,
} from '../../components'
import { getDashboardMetrics, getSentimentSeries } from './metrics'
import { formatDate } from '../feedback/format'
import type { FeedbackFilters } from '../feedback/types'

const defaultFilters: FeedbackFilters = {
  search: '',
  sentiment: 'all',
  sort: 'priority',
}

export function DashboardPage() {
  const {
    data = [],
    isPending,
    isError,
    error,
    refetch,
  } = useFeedback(defaultFilters)

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner label="Loading your dashboard" size="lg" />
      </div>
    )
  }

  if (isError) {
    return (
      <Card>
        <EmptyState
          title="We couldn't load your dashboard"
          description={error.message}
          action={<Button onClick={() => void refetch()}>Try again</Button>}
        />
      </Card>
    )
  }

  const metrics = getDashboardMetrics(data)
  const sentimentData = getSentimentSeries(data)
  const priorityData = [
    { name: 'High', value: metrics.highPriority, fill: '#e06e69' },
    {
      name: 'Medium',
      value: data.filter((item) => item.priority === 'medium').length,
      fill: '#e5a84b',
    },
    {
      name: 'Low',
      value: data.filter((item) => item.priority === 'low').length,
      fill: '#6b9fce',
    },
  ]
  const statCards = [
    {
      label: 'Total feedback',
      value: metrics.total,
      note: 'Customer voices collected',
      icon: MessageSquareText,
      tone: 'indigo',
    },
    {
      label: 'Positive sentiment',
      value: metrics.positive,
      note: 'Customers feeling good',
      icon: Smile,
      tone: 'emerald',
    },
    {
      label: 'Negative sentiment',
      value: metrics.negative,
      note: 'Worth a closer look',
      icon: ArrowDownRight,
      tone: 'rose',
    },
    {
      label: 'High priority',
      value: metrics.highPriority,
      note: 'Issues to act on first',
      icon: ShieldAlert,
      tone: 'amber',
    },
  ] as const

  if (data.length === 0) {
    return (
      <Card>
        <EmptyState
          title="Your dashboard is ready"
          description="Once feedback is collected, your sentiment and priority trends will appear here."
          action={
            <Link
              to="/feedback/new"
              className="inline-flex min-h-10 items-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Add the first feedback
            </Link>
          }
        />
      </Card>
    )
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Your feedback, at a glance
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-[28px]">
            Good afternoon, Jorik <span aria-hidden="true">✦</span>
          </h2>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Here’s what your customers are telling you.
          </p>
        </div>
        <Link
          to="/feedback"
          className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          View all feedback
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      <section
        aria-label="Feedback statistics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {statCards.map(({ label, value, note, icon: Icon, tone }) => (
          <Card key={label} padding="md" className="relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {label}
                </p>
                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {value}
                </p>
              </div>
              <span
                className={`flex size-10 items-center justify-center rounded-xl ${tone === 'indigo' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300' : tone === 'emerald' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300' : tone === 'rose' ? 'bg-rose-50 text-rose-600 dark:bg-rose-400/10 dark:text-rose-300' : 'bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300'}`}
              >
                <Icon aria-hidden="true" className="size-4.5" />
              </span>
            </div>
            <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400 dark:border-slate-800">
              {note}
            </p>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Card
          title="Sentiment overview"
          description="How customers are feeling about your product"
          action={<Badge tone="info">All feedback</Badge>}
        >
          <div
            role="img"
            aria-label="Feedback by sentiment chart"
            className="h-67.5 w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sentimentData}
                margin={{ top: 10, right: 12, left: -18, bottom: 0 }}
              >
                <CartesianGrid stroke="#eef0f5" vertical={false} />
                <XAxis
                  dataKey="sentiment"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#8290a3', fontSize: 12 }}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#8290a3', fontSize: 11 }}
                />
                <Tooltip cursor={{ fill: '#f5f6fa' }} />
                <Bar
                  dataKey="count"
                  name="Feedback"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={54}
                >
                  {sentimentData.map((entry) => (
                    <Cell key={entry.sentiment} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card
          title="Priority mix"
          description="Where your team should focus next"
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row xl:flex-col 2xl:flex-row">
            <div
              role="img"
              aria-label="Feedback by priority chart"
              className="h-51.25 w-full max-w-60"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={58}
                    outerRadius={84}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {priorityData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="w-full space-y-3">
              {priorityData.map(({ name, value, fill }) => (
                <li
                  key={name}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: fill }}
                    />
                    {name} priority
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>

      <Card
        title="Latest feedback"
        description="The most recent notes from your customers"
        action={
          <Link
            to="/feedback"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            See inbox{' '}
            <ArrowUpRight aria-hidden="true" className="ml-1 inline size-3.5" />
          </Link>
        }
      >
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {data.slice(0, 4).map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0 sm:gap-4"
            >
              <span
                className={`hidden size-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold sm:flex ${item.sentiment === 'negative' ? 'bg-rose-50 text-rose-600 dark:bg-rose-400/10 dark:text-rose-300' : item.sentiment === 'positive' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300'}`}
              >
                {item.sentiment === 'negative'
                  ? '!'
                  : item.sentiment === 'positive'
                    ? '↑'
                    : '—'}
              </span>
              <div className="min-w-0 flex-1">
                <Link
                  to={`/feedback/${item.id}`}
                  className="block truncate text-sm font-semibold text-slate-800 hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-400"
                >
                  {item.title}
                </Link>
                <p className="mt-1 truncate text-xs text-slate-400">
                  {item.tags.join(' · ')}
                </p>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <Badge tone={item.sentiment}>{item.sentiment}</Badge>
                <Badge tone={item.priority}>{item.priority}</Badge>
              </div>
              <span className="shrink-0 text-xs text-slate-400">
                {formatDate(item.createdDate, true)}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
