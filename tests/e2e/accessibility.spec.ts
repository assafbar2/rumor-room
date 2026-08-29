import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { openCase } from './helpers';

test('briefing and game board have no detectable WCAG A/AA violations', async ({ page }) => {
  await page.goto('/');
  const briefingResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(briefingResults.violations).toEqual([]);

  await openCase(page);
  const boardResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(boardResults.violations).toEqual([]);
});
