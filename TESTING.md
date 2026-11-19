# Testing guide

Feedback Pulse uses a testing pyramid: a broad base of fast unit and component
tests, a smaller set of browser-level end-to-end flows, and Storybook stories for
reviewing component states. Every automated test uses the same deterministic
MSW handlers instead of relying on a live API.

## Vitest

Vitest is the test runner and coverage provider. It reuses Vite's TypeScript,
React, and CSS pipeline, keeping tests fast and close to the application build.
Run `npm run test` for a single CI-friendly run or `npm run test:watch` while
developing.

## React Testing Library

React Testing Library renders the application in jsdom and verifies behavior
through accessible roles, labels, and text. Tests exercise flows such as loading
feedback, filtering the inbox, submitting a note, and reading dashboard
statistics rather than checking component internals.

## MSW

Mock Service Worker intercepts requests at the network boundary. Shared
handlers implement the feedback list, detail, and create endpoints, including
deterministic analysis, error responses, and empty results. Unit tests use the
Node interceptor; the browser application, Storybook, and Playwright use the
service worker generated at `public/mockServiceWorker.js`.

## Storybook

Storybook is the component workbench. Stories cover the reusable component
library's default and relevant loading, disabled, error, empty, and dark-mode
states. Its preview loads the same MSW handlers as the application, so API-backed
stories can remain representative without a separate mock implementation.
Start it with `npm run storybook`.

## Playwright

Playwright runs a small set of high-value end-to-end flows in a real browser:
creating feedback, searching, opening a detail page, handling a service error,
and seeing an empty inbox. Run `npm run test:e2e`; install the Chromium browser
once with `npx playwright install chromium` if it is not already available.

## Coverage

`npm run coverage` reports line, function, branch, and statement coverage for
application code. The configured minimum is 80% for lines, functions, and
statements, and 75% for branches. Stories and test support are excluded from
application coverage.
