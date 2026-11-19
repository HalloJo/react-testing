import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { label: 'Work email', placeholder: 'you@company.com' },
  decorators: [
    (Story, context) => (
      <div
        className={`w-80 p-8 ${context.name === 'Dark Mode' ? 'dark bg-slate-950' : 'bg-white'}`}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = {
  args: { disabled: true, defaultValue: 'Checking address…' },
}
export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Unavailable' },
}
export const Error: Story = {
  args: { defaultValue: 'not-an-email', error: 'Enter a valid email address.' },
}
export const Empty: Story = {
  args: { defaultValue: '', hint: 'We’ll only use this for account updates.' },
}
export const DarkMode: Story = { name: 'Dark Mode' }
