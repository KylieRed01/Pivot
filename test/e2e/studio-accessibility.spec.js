import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function openPublicEditor(page) {
  await page.goto('/#studio');
  await page.getByRole('radio', { name: /Basketball Available/ }).check({ force: true });
  await page.getByLabel('Competition').selectOption('bendigo-basketball-association');
  await page.getByRole('radio', { name: /Basketball jersey/ }).check({ force: true });
  await page.getByRole('checkbox', { name: /I understand this is a browser-local demonstrator/i }).check();
  await page.getByRole('button', { name: /Game On/ }).click();
}

async function expectNoSeriousAxeViolations(page) {
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(violation => ['serious', 'critical'].includes(violation.impact));
  expect(serious, serious.map(item => `${item.id}: ${item.help}`).join('\n')).toEqual([]);
}

test('website and Studio entry have no serious automated accessibility violations', async ({ page }) => {
  await page.goto('/');
  await expectNoSeriousAxeViolations(page);

  await page.goto('/#studio');
  await expectNoSeriousAxeViolations(page);
});

test('2D editor has no serious automated accessibility violations', async ({ page }) => {
  await openPublicEditor(page);
  await expectNoSeriousAxeViolations(page);
});

test('phone editor retains access to required tool controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openPublicEditor(page);

  await expect(page.getByRole('button', { name: 'Colours' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Text and artwork' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Images' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Help' })).toBeVisible();
});
