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

test('text and layer controls are available without direct canvas dragging', async ({ page }) => {
  await openPublicEditor(page);
  await page.getByRole('button', { name: 'Text and artwork' }).click();
  await page.locator('[data-layer-select]').filter({ hasText: 'PIVOT' }).first().click();

  await page.getByLabel('Selected text').fill('TEAM');
  await page.getByLabel('Text alignment').selectOption('left');
  await page.getByLabel('Letter spacing').fill('2');
  await page.getByLabel('Line spacing').fill('1.2');
  await page.getByLabel('Position X').fill('35');
  await page.getByLabel('Position Y').fill('44');
  await page.getByLabel('Rotation').fill('12');

  await expect(page.getByRole('button', { name: 'TEAM layer', exact: true })).toBeVisible();
  await expect(page.getByLabel('Position X')).toHaveValue('35');
  await expect(page.getByRole('button', { name: 'Move layer up' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Move layer down' })).toBeEnabled();
});

test('raster artwork remains browser-local and unsupported active formats are rejected', async ({ page }) => {
  const requests = [];
  page.on('request', request => requests.push({ url: request.url(), method: request.method() }));
  await openPublicEditor(page);
  await page.getByRole('button', { name: 'Images' }).click();

  const upload = page.locator('#upload');
  await upload.setInputFiles({
    name: 'club-logo.png',
    mimeType: 'image/png',
    buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64')
  });
  await expect(page.getByText(/Added club-logo\.png.*browser-local/i)).toBeVisible();
  await expect(page.getByLabel('Image opacity')).toBeEnabled();
  await page.getByLabel('Flip image horizontally').check();
  await page.getByLabel('Flip image vertically').check();

  await upload.setInputFiles({
    name: 'active-logo.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"></svg>')
  });
  await expect(page.getByText(/PNG, JPEG and WebP only.*SVG.*future reviewed handling/i)).toBeVisible();
  expect(requests.filter(request => request.method === 'POST' && /upload|designs/.test(request.url))).toEqual([]);
});

test('viewport controls and keyboard movement provide structured alternatives', async ({ page }) => {
  await openPublicEditor(page);
  await page.getByRole('button', { name: 'Text and artwork' }).click();
  await page.locator('[data-layer-select]').filter({ hasText: 'PIVOT' }).first().click();

  await page.getByRole('button', { name: 'Zoom in' }).click();
  await expect(page.getByTestId('zoom-value')).toHaveText('110%');
  await page.getByRole('button', { name: 'Fit garment to view' }).click();
  await expect(page.getByTestId('zoom-value')).toHaveText('100%');

  const x = page.getByLabel('Position X');
  const before = Number(await x.inputValue());
  await page.getByRole('button', { name: 'PIVOT layer', exact: true }).press('ArrowRight');
  await expect(x).toHaveValue(String(before + 1));
});

test('browser session restores the public design name after reload', async ({ page }) => {
  await openPublicEditor(page);
  await page.getByLabel('Design name').fill('Restored browser design');
  await page.reload();
  await openPublicEditor(page);

  await expect(page.getByLabel('Design name')).toHaveValue('Restored browser design');
});
