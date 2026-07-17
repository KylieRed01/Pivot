import { test, expect } from '@playwright/test';

const unresolved = [
  'supplier',
  'final Phoenix artwork',
  'production infrastructure',
  'accurate 3D',
  'manufacturing integration'
];

test('entry exposes only the basketball jersey and labels unavailable products truthfully', async ({ page }) => {
  await page.goto('/#studio');

  const basketball = page.getByRole('radio', { name: /Basketball Available/ });
  await expect(basketball).toBeEnabled();
  await basketball.check({ force: true });
  await page.getByLabel('Competition').selectOption('bendigo-basketball-association');

  await expect(page.getByRole('radio', { name: /Basketball jersey/ })).toBeEnabled();
  await expect(page.getByRole('radio', { name: /Basketball shorts.*Provisional/i })).toBeDisabled();
  await expect(page.getByRole('radio', { name: /^Men's club polo/i })).toBeDisabled();
  await expect(page.getByRole('radio', { name: /^Women's club polo/i })).toBeDisabled();
  await expect(page.getByText(/coach polo/i)).toHaveCount(0);
});

test('entry discloses local-only and unresolved boundaries before editing', async ({ page }) => {
  await page.goto('/#studio');

  await expect(page.getByText(/Pivot cannot save, submit, approve or recover it/i)).toBeVisible();
  for (const label of unresolved) {
    await expect(page.getByText(new RegExp(label, 'i')).first()).toBeVisible();
  }
  await expect(page.getByText(/not supplier-approved/i).first()).toBeVisible();
});

test('entry remains usable at phone width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#studio');

  await expect(page.getByText('Browser-local demonstrator', { exact: true })).toBeVisible();
  await expect(page.getByRole('radio', { name: /Basketball Available/ })).toBeVisible();
  await expect(page.getByText(/production infrastructure/i).first()).toBeVisible();
});

test('visitor must acknowledge the demonstrator boundary before opening the editor', async ({ page }) => {
  await page.goto('/#studio');
  await page.getByRole('radio', { name: /Basketball Available/ }).check({ force: true });
  await page.getByLabel('Competition').selectOption('bendigo-basketball-association');
  await page.getByRole('radio', { name: /Basketball jersey/ }).check({ force: true });

  const enter = page.getByRole('button', { name: /Game On/ });
  const acknowledgement = page.getByRole('checkbox', { name: /I understand this is a browser-local demonstrator/i });

  await expect(acknowledgement).not.toBeChecked();
  await expect(enter).toBeDisabled();
  await acknowledgement.check();
  await expect(enter).toBeEnabled();
  await enter.click();
  await expect(page.getByRole('heading', { name: 'Pivot Design Studio', exact: true })).toBeVisible();
});
