import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const options = [
  { label: 'All sentiment', value: 'all' },
  { label: 'Positive', value: 'positive' },
  { label: 'Neutral', value: 'neutral' },
  { label: 'Negative', value: 'negative' },
]

const meta = {
  title: 'Components/Select',
  component: Select,
  args: { label: 'Sentiment', options, defaultValue: 'all' },
  decorators: [
    (Story, context) => (
      <div
        className={`w-80 p-8 ${context.name === 'Dark Mode' ? 'dark bg-slate-950' : 'bg-white'}`}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = {
  args: { disabled: true, label: 'Loading sentiment options' },
}
export const Disabled: Story = { args: { disabled: true } }
export const Error: Story = {
  args: { error: 'Choose a sentiment to continue.' },
}
export const Empty: Story = {
  args: {
    label: 'No options available',
    options: [{ label: 'No options available', value: '' }],
    disabled: true,
  },
}
export const DarkMode: Story = { name: 'Dark Mode' }
