# Feedback Pulse

A React 19 product-feedback dashboard built with TypeScript, Vite, Tailwind,
React Router, TanStack Query, Recharts, and MSW. It includes a realistic mock
feedback API, accessible dashboard and inbox, and a tested feedback capture
flow.

## Getting started

```sh
npm install
npm run dev
```

The mock service worker is checked in at `public/mockServiceWorker.js`, so the
demo works without a separate backend. Use the sidebar to explore the dashboard
and inbox, or add feedback to see deterministic sentiment, priority, and tag
analysis.

## Commands

| Command             | Purpose                                    |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Start the Vite development server          |
| `npm run build`     | Type-check and create a production build   |
| `npm run test`      | Run Vitest and React Testing Library tests |
| `npm run coverage`  | Run tests with coverage thresholds         |
| `npm run storybook` | Open the component workbench               |
| `npm run test:e2e`  | Run Playwright browser tests               |
| `npm run lint`      | Check TypeScript and TSX with ESLint       |
| `npm run format`    | Format project files with Prettier         |

See [TESTING.md](./TESTING.md) for the testing strategy and tool roles.
