import { http, HttpResponse } from 'msw'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { server } from '../../api/server'
import { renderApp } from '../../test/renderApp'

async function fillValidFeedback() {
  const user = userEvent.setup()
  await user.type(
    screen.getByRole('textbox', { name: 'Feedback title' }),
    'Checkout crashes on submit',
  )
  await user.type(
    screen.getByRole('textbox', { name: 'Customer note' }),
    'The checkout crashes every time I submit an order and I cannot complete my purchase.',
  )
  return user
}

describe('new feedback form', () => {
  it('shows helpful validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    renderApp('/feedback/new')

    await user.click(screen.getByRole('button', { name: 'Analyze feedback' }))

    expect(
      await screen.findByText('Add a short title for this feedback.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Add the customer’s note.')).toBeInTheDocument()
  })

  it('creates analyzed feedback and navigates to its details', async () => {
    renderApp('/feedback/new')
    const user = await fillValidFeedback()
    await user.click(screen.getByRole('button', { name: 'Analyze feedback' }))

    expect(
      await screen.findByRole('heading', {
        name: 'Checkout crashes on submit',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'The checkout crashes every time I submit an order and I cannot complete my purchase.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('needs attention')).toBeInTheDocument()
  })

  it('communicates API failures and allows the form to be corrected', async () => {
    server.use(
      http.post('/feedback', () =>
        HttpResponse.json(
          { message: 'The service is temporarily unavailable.' },
          { status: 503 },
        ),
      ),
    )
    renderApp('/feedback/new')
    const user = await fillValidFeedback()
    await user.click(screen.getByRole('button', { name: 'Analyze feedback' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'The service is temporarily unavailable.',
    )
    await user.clear(screen.getByRole('textbox', { name: 'Feedback title' }))
    await user.type(
      screen.getByRole('textbox', { name: 'Feedback title' }),
      'Checkout error occurs',
    )
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
