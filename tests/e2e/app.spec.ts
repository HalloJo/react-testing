import { expect, test } from '@playwright/test'

test('a user creates feedback and sees its analyzed details', async ({
  page,
}) => {
  await page.goto('/feedback/new')
  await page
    .getByRole('textbox', { name: 'Feedback title' })
    .fill('Checkout crashes on submit')
  await page
    .getByRole('textbox', { name: 'Customer note' })
    .fill(
      'The checkout crashes every time I submit an order and I cannot complete my purchase.',
    )
  await page.getByRole('button', { name: 'Analyze feedback' }).click()

  await expect(
    page.getByRole('heading', { name: 'Checkout crashes on submit' }),
  ).toBeVisible()
  await expect(page.getByText('needs attention')).toBeVisible()
})

test('a user searches feedback', async ({ page }) => {
  await page.goto('/feedback')
  await page.getByRole('textbox', { name: 'Search feedback' }).fill('dark mode')

  await expect(
    page.getByRole('link', { name: 'Dark mode looks amazing' }),
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Export crashes on larger reports' }),
  ).toHaveCount(0)
})

test('a user opens feedback details', async ({ page }) => {
  await page.goto('/feedback')
  await page
    .getByRole('link', { name: 'Search slows down with large datasets' })
    .click()

  await expect(
    page.getByRole('heading', {
      name: 'Search slows down with large datasets',
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Customer note' }),
  ).toBeVisible()
  await expect(page.getByText('performance', { exact: true })).toBeVisible()
})

test('a user can recover from an API error', async ({ page }) => {
  await page.goto('/feedback?scenario=error')

  await expect(
    page.getByText('The feedback service is temporarily unavailable.'),
  ).toBeVisible()
  await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible()
})

test('a user sees the empty inbox state', async ({ page }) => {
  await page.goto('/feedback?scenario=empty')

  await expect(page.getByText('No feedback yet')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Add feedback' })).toBeVisible()
})
