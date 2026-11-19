import { screen } from '@testing-library/react'
import { renderApp } from '../../test/renderApp'

describe('feedback details', () => {
  it('shows the complete customer note and generated insight', async () => {
    renderApp('/feedback/fb-1001')

    expect(
      await screen.findByRole('heading', {
        name: 'Export crashes on larger reports',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/application crashes when exporting reports/),
    ).toBeInTheDocument()
    expect(screen.getByText('reporting', { exact: true })).toBeInTheDocument()
    expect(screen.getByText('negative sentiment')).toBeInTheDocument()
  })

  it('provides a recovery path for unknown feedback ids', async () => {
    renderApp('/feedback/not-a-real-item')

    expect(await screen.findByText('Feedback not found.')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Back to inbox' }),
    ).toBeInTheDocument()
  })
})
