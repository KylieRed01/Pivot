import { test, expect } from '@playwright/test';

async function openPublicEditor(page) {
  await page.goto('/#studio');
  await page.getByRole('radio', { name: /Basketball Available/ }).check({ force: true });
  await page.getByLabel('Competition').selectOption('bendigo-basketball-association');
  await page.getByRole('radio', { name: /Basketball jersey/ }).check({ force: true });
  await page.getByRole('checkbox', { name: /I understand this is a browser-local demonstrator/i }).check();
  await page.getByRole('button', { name: /Game On/ }).click();
  await expect(page.getByRole('heading', { name: 'Pivot Design Studio', exact: true })).toBeVisible();
}

test('all four authoritative 2D surfaces are reachable without 3D', async ({ page }) => {
  await openPublicEditor(page);

  await expect(page.getByText(/Front 2D view/)).toBeVisible();
  await page.locator('.face-tabs').getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page.getByText(/Back 2D view/)).toBeVisible();
  await page.locator('.side-tabs').getByRole('button', { name: 'Light', exact: true }).click();
  await expect(page.locator('.side-tabs').getByRole('button', { name: 'Light', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.locator('.face-tabs').getByRole('button', { name: 'Front', exact: true }).click();
  await expect(page.getByText(/Front 2D view/)).toBeVisible();
  await page.locator('.side-tabs').getByRole('button', { name: 'Dark', exact: true }).click();
  await expect(page.locator('[data-view-mode="2d"]')).toHaveClass(/active/);
});

test('undo and redo restore a text change on the selected 2D surface', async ({ page }) => {
  await openPublicEditor(page);
  await page.getByRole('button', { name: 'Text and artwork' }).click();
  await page.locator('[data-layer-select]').filter({ hasText: 'PIVOT' }).first().click();
  const text = page.getByLabel('Selected text');

  await text.fill('DARK ONLY');
  await expect(page.getByRole('button', { name: 'DARK ONLY layer', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Undo' }).click();
  await expect(page.getByRole('button', { name: 'PIVOT layer', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Redo' }).click();
  await expect(page.getByRole('button', { name: 'DARK ONLY layer', exact: true })).toBeVisible();
});

test('indicative 3D does not alter 2D state and offers a direct return', async ({ page }) => {
  await openPublicEditor(page);
  await page.getByLabel('Design name').fill('Keep this 2D state');

  await page.getByRole('button', { name: 'Indicative side / 3D' }).click();
  await expect(page.getByText(/Indicative side \/ 3D/).last()).toBeVisible();
  await expect(page.getByText(/not.*approval evidence/i).last()).toBeVisible();
  await page.getByRole('button', { name: '2D', exact: true }).click();

  await expect(page.getByLabel('Design name')).toHaveValue('Keep this 2D state');
  await expect(page.getByText(/Front 2D view/)).toBeVisible();
});

test('required basketball number is protected and player names are unavailable', async ({ page }) => {
  await openPublicEditor(page);
  await page.getByRole('button', { name: 'Text and artwork' }).click();
  await page.locator('[data-layer-select]').filter({ hasText: '24' }).first().click();

  await expect(page.getByRole('button', { name: 'Delete', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: '24 layer', exact: true }).click({ button: 'right' });
  await expect(page.locator('.layer-context-menu').getByRole('button', { name: 'Delete', exact: true })).toBeDisabled();
  await expect(page.getByText(/player name/i)).toHaveCount(0);
});

test('browser session restores the public design name after reload', async ({ page }) => {
  await openPublicEditor(page);
  await page.getByLabel('Design name').fill('Restored browser design');
  await page.reload();
  await openPublicEditor(page);

  await expect(page.getByLabel('Design name')).toHaveValue('Restored browser design');
});
