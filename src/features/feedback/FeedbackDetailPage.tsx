import { ArrowLeft, CalendarDays, CircleAlert, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  LoadingSpinner,
} from '../../components'
import { useFeedbackItem } from '../../hooks/useFeedback'
import { formatDate } from './format'

export function FeedbackDetailPage() {
  const { id = '' } = useParams()
  const { data, isPending, isError, error, refetch } = useFeedbackItem(id)

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner label="Loading feedback details" size="lg" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <Card>
        <EmptyState
          title="We couldn't find that feedback"
          description={
            isError ? error.message : 'This feedback may have been removed.'
          }
          action={
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="secondary" onClick={() => void refetch()}>
                Try again
              </Button>
              <Link to="/feedback">
                <Button>Back to inbox</Button>
              </Link>
            </div>
          }
        />
      </Card>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <Link
        to="/feedback"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to feedback
      </Link>
      <Card padding="lg">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Customer feedback
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {data.title}
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <Badge
                tone={data.sentiment}
              >{`${data.sentiment} sentiment`}</Badge>
              <Badge tone={data.priority}>{`${data.priority} priority`}</Badge>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <CalendarDays aria-hidden="true" className="size-3.5" />
                {formatDate(data.createdDate)}
              </span>
            </div>
          </div>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
            <CircleAlert aria-hidden="true" className="size-5" />
          </span>
        </div>

        <div className="my-7 h-px bg-slate-100 dark:bg-slate-800" />
        <section>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Customer note
          </h3>
          <p className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-slate-600 dark:text-slate-300">
            {data.description}
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 dark:border-indigo-400/15 dark:bg-indigo-400/5">
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-800 dark:text-indigo-200">
            <Sparkles aria-hidden="true" className="size-4" />
            AI-generated tags
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/80 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Tags and sentiment are mock AI insights for this demo. Review them
            before taking action.
          </p>
        </section>
      </Card>
    </div>
  )
}
