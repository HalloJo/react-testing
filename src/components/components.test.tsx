import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Badge } from './Badge'
import { Button } from './Button'
import { Card } from './Card'
import { EmptyState } from './EmptyState'
import { Input } from './Input'
import { LoadingSpinner } from './LoadingSpinner'
import { Modal } from './Modal'
import { Select } from './Select'

describe('shared components', () => {
  it('communicates button loading and disabled states', () => {
    const { rerender } = render(<Button>Save</Button>)
    expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled()

    rerender(<Button loading>Saving</Button>)
    expect(screen.getByRole('button', { name: 'Saving' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Saving' })).toHaveAttribute(
      'aria-busy',
      'true',
    )

    rerender(
      <Button variant="danger" disabled>
        Delete
      </Button>,
    )
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled()
  })

  it('associates input labels and validation messages accessibly', () => {
    const { rerender } = render(
      <Input label="Email address" hint="Use your work email." />,
    )
    expect(
      screen.getByRole('textbox', { name: 'Email address' }),
    ).toHaveAccessibleDescription('Use your work email.')

    rerender(<Input label="Email address" error="Enter a valid address." />)
    expect(
      screen.getByRole('textbox', { name: 'Email address' }),
    ).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('Enter a valid address.')).toBeInTheDocument()
  })

  it('exposes select labels and validation feedback', async () => {
    const user = userEvent.setup()
    render(
      <Select
        label="Sentiment"
        options={[
          { label: 'All sentiment', value: 'all' },
          { label: 'Positive', value: 'positive' },
        ]}
        error="Choose a sentiment."
      />,
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Sentiment' }),
      'positive',
    )
    expect(screen.getByRole('combobox', { name: 'Sentiment' })).toHaveValue(
      'positive',
    )
    expect(screen.getByText('Choose a sentiment.')).toBeInTheDocument()
  })

  it('renders labeled card content, badges, loading and empty states', () => {
    render(
      <>
        <Card
          title="Weekly summary"
          description="Customer highlights"
          action={<Button>Open</Button>}
        >
          <p>Five new notes this week.</p>
        </Card>
        <Badge tone="negative">negative</Badge>
        <LoadingSpinner label="Loading notes" />
        <EmptyState title="No notes" description="Notes will show up here." />
      </>,
    )

    expect(
      screen.getByRole('heading', { name: 'Weekly summary' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Five new notes this week.')).toBeInTheDocument()
    expect(screen.getByText('negative')).toBeInTheDocument()
    expect(
      screen.getByRole('status', { name: 'Loading notes' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'No notes' }),
    ).toBeInTheDocument()
  })

  it('closes the modal on Escape and backdrop interaction', () => {
    const onClose = vi.fn()
    const { rerender } = render(
      <Modal open title="Confirm update" onClose={onClose}>
        <p>Review the changes.</p>
      </Modal>,
    )

    expect(
      screen.getByRole('dialog', { name: 'Confirm update' }),
    ).toBeInTheDocument()
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)

    onClose.mockClear()
    fireEvent.mouseDown(screen.getByRole('dialog').parentElement!)
    expect(onClose).toHaveBeenCalledTimes(1)

    rerender(
      <Modal open={false} title="Confirm update" onClose={onClose}>
        <p>Review the changes.</p>
      </Modal>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
