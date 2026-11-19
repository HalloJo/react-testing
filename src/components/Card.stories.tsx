import type { Meta, StoryObj } from '@storybook/react'
import { Button, EmptyState, LoadingSpinner } from '.'
import { Card } from './Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    title: 'Customer sentiment',
    description: 'A quick read on how your customers feel.',
    children: (
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Positive feedback is trending up this week.
      </p>
    ),
  },
  decorators: [
    (Story, context) => (
      <div
        className={`max-w-lg p-8 ${context.name === 'Dark Mode' ? 'dark bg-slate-950' : 'bg-slate-50'}`}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = {
  args: {
    children: (
      <div className="py-4">
        <LoadingSpinner label="Loading insights" />
      </div>
    ),
  },
}
export const Disabled: Story = {
  args: {
    'aria-disabled': true,
    className: 'opacity-60',
    children: (
      <p className="text-sm text-slate-500">This panel is unavailable.</p>
    ),
  },
}
export const Error: Story = {
  args: {
    title: 'Insights unavailable',
    children: (
      <p role="alert" className="text-sm text-rose-600">
        We couldn’t load your insights. Try again in a moment.
      </p>
    ),
  },
}
export const Empty: Story = {
  args: {
    title: 'No insights yet',
    children: (
      <EmptyState
        title="A little quiet here"
        description="Customer feedback will appear once it comes in."
        action={<Button size="sm">Add feedback</Button>}
      />
    ),
  },
}
export const DarkMode: Story = { name: 'Dark Mode' }
