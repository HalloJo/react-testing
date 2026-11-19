import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { EmptyState } from './EmptyState'

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  args: {
    title: 'No feedback yet',
    description: 'When customer feedback arrives, you’ll find it here.',
    action: <Button size="sm">Add feedback</Button>,
  },
  decorators: [
    (Story, context) => (
      <div
        className={`max-w-lg rounded-2xl p-8 ${context.name === 'Dark Mode' ? 'dark bg-slate-950' : 'bg-white'}`}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = {
  args: {
    title: 'Getting things ready',
    description: 'Your feedback workspace is loading.',
    action: (
      <Button size="sm" loading>
        Loading
      </Button>
    ),
  },
}
export const Disabled: Story = {
  args: {
    action: (
      <Button size="sm" disabled>
        Add feedback
      </Button>
    ),
  },
}
export const Error: Story = {
  args: {
    title: 'Could not load feedback',
    description: 'The service is temporarily unavailable. Please try again.',
    action: (
      <Button size="sm" variant="secondary">
        Try again
      </Button>
    ),
  },
}
export const Empty: Story = {
  args: {
    title: 'Nothing here yet',
    description:
      'Add your first customer note to start seeing product insights.',
    action: undefined,
  },
}
export const DarkMode: Story = { name: 'Dark Mode' }
