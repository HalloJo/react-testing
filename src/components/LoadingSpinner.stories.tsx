import type { Meta, StoryObj } from '@storybook/react'
import { LoadingSpinner } from './LoadingSpinner'

const meta = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  args: { label: 'Loading your feedback' },
  decorators: [
    (Story, context) => (
      <div
        className={`inline-flex p-8 ${context.name === 'Dark Mode' ? 'dark bg-slate-950' : 'bg-white'}`}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoadingSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = {
  args: { label: 'Analyzing customer feedback', size: 'lg' },
}
export const Disabled: Story = {
  args: { label: 'Loading is paused', size: 'sm' },
}
export const Error: Story = {
  args: { label: 'Retrying connection', size: 'md' },
}
export const Empty: Story = { args: { label: 'No items to load', size: 'sm' } }
export const DarkMode: Story = { name: 'Dark Mode' }
