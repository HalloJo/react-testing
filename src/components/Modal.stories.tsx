import type { Meta, StoryObj } from '@storybook/react'
import { Button, EmptyState, LoadingSpinner } from '.'
import { Modal } from './Modal'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  args: {
    open: true,
    title: 'Invite a teammate',
    description: 'Bring your product team into the conversation.',
    onClose: () => undefined,
    children: (
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
        Your teammate will receive an invitation by email.
      </p>
    ),
  },
  decorators: [
    (Story, context) => (
      <div
        className={`min-h-72 p-8 ${context.name === 'Dark Mode' ? 'dark bg-slate-950' : 'bg-slate-50'}`}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = {
  args: { children: <LoadingSpinner label="Sending invitation" /> },
}
export const Disabled: Story = {
  args: { children: <Button disabled>Send invite</Button> },
}
export const Error: Story = {
  args: {
    children: (
      <p role="alert" className="text-sm text-rose-600">
        That email address could not be invited.
      </p>
    ),
  },
}
export const Empty: Story = {
  args: {
    children: (
      <EmptyState
        title="No teammates yet"
        description="Invite a teammate to collaborate on customer insights."
      />
    ),
  },
}
export const DarkMode: Story = { name: 'Dark Mode' }
