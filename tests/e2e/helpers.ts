import { expect, type Page } from '@playwright/test';

export async function openCase(page: Page) {
  await page.getByRole('button', { name: /Open the case/i }).click();
  await expect(page.getByRole('heading', { name: 'One cannot survive scrutiny' })).toBeVisible();
}

export async function accuseAndContinue(page: Page) {
  await page.getByRole('button', { name: 'Accuse this claim' }).click();
  await expect(page.getByText('You stopped the bad story.')).toBeVisible();
  await page.getByRole('button', { name: /Take the next case|Return to case one/i }).click();
}
