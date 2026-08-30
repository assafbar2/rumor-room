import { expect, test } from '@playwright/test';
import { accuseAndContinue, openCase } from './helpers';

test('the complete three-case campaign is solvable', async ({ page }) => {
  await page.goto('/');

  await openCase(page);
  await page.getByRole('button', { name: /Claim B.*Legend of Zelda/i }).click();
  await page.getByRole('button', { name: /Fresh Cut/i }).click();
  await expect(page.getByText('High suspicion')).toBeVisible();
  await expect(page.getByText('Campaign score')).toBeVisible();
  await accuseAndContinue(page);

  await expect(page.getByRole('heading', { name: 'The Echo Chamber' })).toBeVisible();
  await openCase(page);
  await page.getByRole('button', { name: /Studio Line/i }).click();
  await accuseAndContinue(page);

  await expect(page.getByRole('heading', { name: 'The Director’s Cut' })).toBeVisible();
  await openCase(page);
  await page.getByRole('button', { name: /Studio Line/i }).click();
  await accuseAndContinue(page);

  await expect(page.getByRole('heading', { name: 'The Date That Lied' })).toBeVisible();
});

test('an unsupported accusation produces the incorrect receipt', async ({ page }) => {
  await page.goto('/');
  await openCase(page);
  await page.getByRole('button', { name: 'Accuse this claim' }).click();
  await expect(page.getByRole('heading', { name: 'The wrong claim took the fall.' })).toBeVisible();
  await expect(page.getByText('Misfiled', { exact: true })).toBeVisible();
});

test('audio initializes only after consent and stays error-free', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/');
  await page.getByRole('button', { name: 'Turn sound on' }).click();
  await expect(page.getByRole('button', { name: 'Mute sound' })).toBeVisible();
  await expect(page.getByText('Sound on — audio check.')).toBeVisible();
  await openCase(page);
  await page.getByRole('button', { name: /Fresh Cut/i }).click();
  await expect(page.locator('.evidence-slip').first()).toBeVisible();
  await page.waitForTimeout(300);
  expect(errors).toEqual([]);
});

test('start over returns to the first briefing and clears campaign progress', async ({ page }) => {
  await page.goto('/');
  await openCase(page);
  await page.getByRole('button', { name: /Claim B.*Legend of Zelda/i }).click();
  await page.getByRole('button', { name: /Fresh Cut/i }).click();
  await page.getByRole('button', { name: 'Accuse this claim' }).click();
  await expect(page.getByText('Campaign total', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: /Take the next case/i }).click();
  await page.getByRole('button', { name: 'Start over' }).click();
  await expect(page.getByRole('heading', { name: 'The Date That Lied' })).toBeVisible();
  await expect(page.getByText('Assignment 1 of 3')).toBeVisible();
});

test('reduced-motion preference disables the projector sweep', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await openCase(page);
  await page.getByRole('button', { name: /Fresh Cut/i }).click();
  await expect(page.locator('.projector-beam')).toHaveCSS('display', 'none');
});
