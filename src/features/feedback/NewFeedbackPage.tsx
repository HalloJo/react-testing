import { ArrowLeft, Check, Sparkles } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Input } from '../../components'
import { useCreateFeedback } from '../../hooks/useFeedback'

interface FormValues {
  title: string
  description: string
}

interface FormErrors {
  title?: string | undefined
  description?: string | undefined
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.title.trim())
    errors.title = 'Add a short title for this feedback.'
  else if (values.title.trim().length < 4)
    errors.title = 'Use at least 4 characters.'
  if (!values.description.trim())
    errors.description = 'Add the customer’s note.'
  else if (values.description.trim().length < 10)
    errors.description = 'Use at least 10 characters.'
  return errors
}

export function NewFeedbackPage() {
  const [values, setValues] = useState<FormValues>({
    title: '',
    description: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const createFeedback = useCreateFeedback()
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    createFeedback.mutate(
      { title: values.title.trim(), description: values.description.trim() },
      { onSuccess: (feedback) => navigate(`/feedback/${feedback.id}`) },
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link
        to="/feedback"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to feedback
      </Link>

      <div>
        <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <Sparkles aria-hidden="true" className="size-3.5" />
          Add a customer voice
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Capture feedback
        </h2>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Add a note from a customer. We’ll organize it into an actionable
          insight.
        </p>
      </div>

      <Card padding="lg">
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <Input
            label="Feedback title"
            name="title"
            placeholder="e.g. Search is too slow for large datasets"
            value={values.title}
            onChange={(event) => {
              setValues((current) => ({
                ...current,
                title: event.target.value,
              }))
              if (errors.title)
                setErrors((current) => ({ ...current, title: undefined }))
              createFeedback.reset()
            }}
            error={errors.title}
            maxLength={120}
            required
          />

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Customer note
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              placeholder="Share the customer’s feedback with enough context for your team..."
              value={values.description}
              onChange={(event) => {
                setValues((current) => ({
                  ...current,
                  description: event.target.value,
                }))
                if (errors.description)
                  setErrors((current) => ({
                    ...current,
                    description: undefined,
                  }))
                createFeedback.reset()
              }}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? 'description-error' : 'description-hint'
              }
              className={`w-full resize-y rounded-xl border bg-white px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 ${errors.description ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-500/10 dark:border-rose-500' : 'border-slate-200 dark:border-slate-700'}`}
              required
            />
            {errors.description ? (
              <p
                id="description-error"
                role="alert"
                className="mt-1.5 text-xs text-rose-600 dark:text-rose-400"
              >
                {errors.description}
              </p>
            ) : (
              <p
                id="description-hint"
                className="mt-1.5 text-xs text-slate-400"
              >
                Include the customer’s context and what they were trying to do.
              </p>
            )}
          </div>

          <div className="flex flex-col justify-between gap-4 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row sm:items-center">
            <p className="max-w-sm text-xs leading-5 text-slate-400">
              Demo analysis assigns sentiment, priority, and tags automatically.
            </p>
            <Button
              type="submit"
              loading={createFeedback.isPending}
              icon={
                createFeedback.isPending ? undefined : (
                  <Check aria-hidden="true" className="size-4" />
                )
              }
            >
              {createFeedback.isPending
                ? 'Analyzing feedback'
                : 'Analyze feedback'}
            </Button>
          </div>
          {createFeedback.isError && (
            <p
              role="alert"
              className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-300"
            >
              {createFeedback.error.message}
            </p>
          )}
        </form>
      </Card>
    </div>
  )
}
