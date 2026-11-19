import { screen, waitFor } from '@testing-library/react'
import { http, HttpResponse, delay } from 'msw'
import { server } from '../../api/server'
import { renderApp } from '../../test/renderApp'

describe('dashboard', () => {
  it('renders feedback statistics from the API', async () => {
    renderApp('/')

    expect(
      await screen.findByRole('heading', { name: /Good afternoon, Jorik/ }),
    ).toBeInTheDocument()
    const statistics = screen.getByRole('region', {
      name: 'Feedback statistics',
    })
    expect(statistics).toHaveTextContent('12')
    expect(statistics).toHaveTextContent('Positive sentiment5')
    expect(statistics).toHaveTextContent('Negative sentiment5')
    expect(statistics).toHaveTextContent('3')
  })

  it('renders accessible sentiment and priority charts', async () => {
    renderApp('/')

    const sentimentChart = await screen.findByRole('img', {
      name: 'Feedback by sentiment chart',
    })
    const priorityChart = screen.getByRole('img', {
      name: 'Feedback by priority chart',
    })

    await waitFor(() => {
      expect(sentimentChart.querySelector('svg')).toBeInTheDocument()
      expect(priorityChart.querySelector('svg')).toBeInTheDocument()
    })
  })

  it('shows a loading state while the dashboard is fetched', async () => {
    server.use(
      http.get('/feedback', async () => {
        await delay(80)
        return HttpResponse.json([])
      }),
    )
    renderApp('/')

    expect(
      screen.getByRole('status', { name: 'Loading your dashboard' }),
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Your dashboard is ready'),
    ).toBeInTheDocument()
  })

  it('offers recovery when dashboard data cannot be loaded', async () => {
    server.use(
      http.get('/feedback', () =>
        HttpResponse.json(
          { message: 'Dashboard service is unavailable.' },
          { status: 503 },
        ),
      ),
    )
    renderApp('/')

    expect(
      await screen.findByText('Dashboard service is unavailable.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Try again' }),
    ).toBeInTheDocument()
  })
})
