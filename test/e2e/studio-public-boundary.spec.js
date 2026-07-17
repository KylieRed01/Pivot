import { test, expect } from '@playwright/test';

const protectedRequest = url => /\/api\/(admin|designs(?:\/|$))/.test(new URL(url).pathname);

test('public Studio is browser-local and never calls protected design APIs', async ({ page }) => {
  const protectedRequests = [];
  page.on('request', request => {
    if (protectedRequest(request.url())) protectedRequests.push(request.url());
  });

  await page.goto('/');
  await page.getByRole('link', { name: 'Start designing with the Pivot Design Studio' }).first().click();

  await expect(page).toHaveURL(/#studio$/);
  await expect(page.getByText('Browser-local demonstrator', { exact: true }).first()).toBeVisible();

  await page.getByRole('radio', { name: /Basketball Available/ }).check({ force: true });
  await page.getByLabel('Competition').selectOption('bendigo-basketball-association');
  await page.getByRole('radio', { name: /Basketball jersey/ }).check({ force: true });
  await page.getByRole('button', { name: /Game On/ }).click();

  await expect(page.getByRole('heading', { name: 'Pivot Design Studio', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Apply #EAF4FF' }).click();
  await expect(page.getByText('Browser-local changes', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /submit|approve/i })).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => sessionStorage.length)).toBeGreaterThan(0);
  expect(protectedRequests).toEqual([]);
});

test('workflow route is separate and persistently identified as a simulation', async ({ page }) => {
  await page.goto('/#workflow-demo');

  await expect(page.getByText(/workflow simulation/i).first()).toBeVisible();
  await expect(page.getByText(/not production authentication/i).first()).toBeVisible();
});
