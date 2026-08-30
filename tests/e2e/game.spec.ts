import { expect, test } from '@playwright/test';

test('player investigates and correctly closes the first case', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'The Date That Lied' })).toBeVisible();
  await expect(page.locator('.runtime-badge')).toContainText('Saved test evidence');
  await page.getByRole('button', { name: /Open the case/i }).click();

  await expect(page.getByRole('heading', { name: 'One cannot survive scrutiny' })).toBeVisible();
  await expect(page.getByLabel('4 research turns remaining')).toContainText('04');
  await page.getByRole('button', { name: /Claim B.*Legend of Zelda/i }).click();
  await page.getByRole('button', { name: /Fresh Cut/i }).click();

  await expect(page.getByText('The May 2026 update', { exact: false })).toBeVisible();
  await expect(page.getByText(/material contradiction found/i)).toBeVisible();
  await expect(page.getByLabel('3 research turns remaining')).toContainText('03');
  await page.getByRole('button', { name: 'Accuse this claim' }).click();

  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByText('You stopped the bad story.')).toBeVisible();
  await expect(page.getByText('Verified', { exact: true })).toBeVisible();
  await expect(page.getByText('Campaign total', { exact: true })).toBeVisible();
});

test('selected claim remains explicit when switching suspects', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Open the case/i }).click();

  const claimB = page.getByRole('button', { name: /Claim B.*Legend of Zelda/i });
  const claimC = page.getByRole('button', { name: /Claim C.*Beyond the Spider-Verse/i });
  await claimC.click();
  await expect(claimC).toHaveAttribute('aria-pressed', 'true');
  await expect(claimC.getByText('Selected', { exact: true })).toBeVisible();
  await expect(claimC).toHaveCSS('outline-style', 'solid');

  await claimB.click();
  await expect(claimB).toHaveAttribute('aria-pressed', 'true');
  await expect(claimB.getByText('Selected', { exact: true })).toBeVisible();
  await expect(claimC).toHaveAttribute('aria-pressed', 'false');
});

test('all four research moves are available and source links are external', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Open the case/i }).click();

  for (const move of ['Trace It', 'Second Source', 'Studio Line', 'Fresh Cut']) {
    await expect(page.getByRole('button', { name: new RegExp(move, 'i') })).toBeVisible();
  }

  await page.getByRole('button', { name: /Studio Line/i }).click();
  const sourceLink = page.getByRole('link', { name: /Open source/i }).first();
  await expect(sourceLink).toHaveAttribute('target', '_blank');
  await expect(sourceLink).toHaveAttribute('href', /^https:\/\//);
});
