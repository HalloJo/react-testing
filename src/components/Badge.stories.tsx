import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'positive', tone: 'positive' },
  decorators: [
    (Story, context) => (
      <div
        className={`inline-flex p-8 ${context.name === 'Dark Mode' ? 'dark bg-slate-950' : 'bg-white'}`}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = {
  args: { children: 'analyzing', tone: 'neutral' },
}
export const Disabled: Story = {
  args: { children: 'archived', tone: 'neutral', className: 'opacity-50' },
}
export const Error: Story = { args: { children: 'negative', tone: 'negative' } }
export const Empty: Story = {
  args: { children: 'uncategorized', tone: 'info' },
}
export const DarkMode: Story = { name: 'Dark Mode' }
