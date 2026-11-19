import { http, HttpResponse, delay } from 'msw'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { server } from '../../api/server'
import { renderApp } from '../../test/renderApp'

describe('feedback inbox', () => {
  it('shows a loading state while the feedback request is pending', async () => {
    server.use(
      http.get('/feedback', async () => {
        await delay(80)
        return HttpResponse.json([])
      }),
    )

    renderApp('/feedback')

    expect(
      screen.getByRole('status', { name: 'Loading feedback' }),
    ).toBeInTheDocument()
    expect(await screen.findByText('No feedback yet')).toBeInTheDocument()
  })

  it('renders customer feedback returned by the API', async () => {
    renderApp('/feedback')

    expect(
      await screen.findByRole('link', {
        name: 'Export crashes on larger reports',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Search slows down with large datasets'),
    ).toBeInTheDocument()
    expect(screen.getByText('12 items')).toBeInTheDocument()
  })

  it('filters results as the customer searches', async () => {
    const user = userEvent.setup()
    renderApp('/feedback')

    const search = await screen.findByRole('textbox', {
      name: 'Search feedback',
    })
    await user.type(search, 'dark mode')

    expect(
      await screen.findByRole('link', { name: 'Dark mode looks amazing' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByText('Export crashes on larger reports'),
    ).not.toBeInTheDocument()
    expect(screen.getByText('1 item')).toBeInTheDocument()
  })

  it('sorts feedback by recency when requested', async () => {
    const user = userEvent.setup()
    renderApp('/feedback')

    await screen.findByRole('link', {
      name: 'Export crashes on larger reports',
    })
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Sort by' }),
      'newest',
    )

    const rows = screen.getAllByRole('row')
    expect(within(rows[2]!).getByRole('link')).toHaveTextContent(
      'Dark mode looks amazing',
    )
  })

  it('shows an empty state when no results match the search', async () => {
    const user = userEvent.setup()
    renderApp('/feedback')
    await screen.findByRole('link', {
      name: 'Export crashes on larger reports',
    })
    await user.type(
      screen.getByRole('textbox', { name: 'Search feedback' }),
      'nothing matches this',
    )

    expect(
      await screen.findByText('No feedback matches those filters'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Clear filters' }),
    ).toBeInTheDocument()
  })

  it('shows a recoverable error state when the service is unavailable', async () => {
    server.use(
      http.get('/feedback', () =>
        HttpResponse.json(
          { message: 'Please try again shortly.' },
          { status: 503 },
        ),
      ),
    )
    renderApp('/feedback')

    expect(
      await screen.findByText('Please try again shortly.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Try again' }),
    ).toBeInTheDocument()
  })
})
