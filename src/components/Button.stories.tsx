import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Save changes' },
  decorators: [
    (Story, context) => (
      <div
        className={`inline-flex rounded-xl p-8 ${context.name === 'Dark Mode' ? 'dark bg-slate-950' : 'bg-white'}`}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = { args: { loading: true, children: 'Saving' } }
export const Disabled: Story = { args: { disabled: true } }
export const Error: Story = {
  args: { variant: 'danger', children: 'Delete project' },
}
export const DarkMode: Story = {
  name: 'Dark Mode',
  args: { variant: 'secondary' },
}
