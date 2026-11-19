import { render } from '@testing-library/react'
import { App } from '../App'

export function renderApp(path = '/') {
  window.history.replaceState({}, '', path)
  return render(<App />)
}
