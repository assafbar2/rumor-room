import { expect, test } from '@playwright/test';
import { openCase } from './helpers';

test('mobile layout keeps the accusation flow usable', async ({ page }) => {
  await page.goto('/');
  await openCase(page);
  await page.getByRole('button', { name: /Fresh Cut/i }).click();
  await expect(page.getByRole('button', { name: 'Accuse this claim' })).toBeVisible();
});
