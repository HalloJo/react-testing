import type { Preview } from '@storybook/react'
import { initialize, mswLoader } from 'msw-storybook-addon'
import '../src/styles.css'
import { handlers } from '../src/api/handlers'

initialize({ onUnhandledRequest: 'bypass' })

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    msw: { handlers },
  },
  loaders: [mswLoader],
}

export default preview
