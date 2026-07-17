import { test, expect } from '@playwright/test';

const unresolved = [
  'supplier',
  'final Phoenix artwork',
  'production infrastructure',
  'accurate 3D',
  'manufacturing integration'
];

async function openPublicEditor(page) {
  await page.goto('/#studio');
  await page.getByRole('radio', { name: /Basketball Available/ }).check({ force: true });
  await page.getByLabel('Competition').selectOption('bendigo-basketball-association');
  await page.getByRole('radio', { name: /Basketball jersey/ }).check({ force: true });
  await page.getByRole('checkbox', { name: /I understand this is a browser-local demonstrator/i }).check();
  await page.getByRole('button', { name: /Game On/ }).click();
}

async function openWorkflowDemo(page) {
  await page.goto('/#workflow-demo');
  await page.getByRole('radio', { name: /Basketball Available/ }).check({ force: true });
  await page.getByLabel('Competition').selectOption('bendigo-basketball-association');
  await page.getByRole('radio', { name: /Basketball jersey/ }).check({ force: true });
  await page.getByRole('button', { name: /Game On/ }).click();
}

test('contextual Help states the authoritative view and all unresolved dependencies', async ({ page }) => {
  await openPublicEditor(page);
  await page.getByLabel('Design name').fill('Keep help state');
  await page.getByRole('button', { name: 'Help' }).click();

  await expect(page.getByText(/2D surfaces are the authoritative design views/i)).toBeVisible();
  for (const label of unresolved) {
    await expect(page.getByText(new RegExp(label, 'i')).last()).toBeVisible();
  }
  await expect(page.getByText(/not production ready/i).last()).toBeVisible();

  await page.getByRole('button', { name: 'Text and artwork' }).click();
  await expect(page.getByLabel('Design name')).toHaveValue('Keep help state');
});

test('design-check summary separates errors, warnings and guidance without production claims', async ({ page }) => {
  await openPublicEditor(page);
  await page.getByRole('button', { name: 'View design checks' }).click();

  const summary = page.getByRole('dialog', { name: 'Indicative design checks' });
  await expect(summary).toBeVisible();
  await expect(summary.getByText(/Guidance/i).first()).toBeVisible();
  await expect(summary.getByText(/supplier.*unresolved/i)).toBeVisible();
  await expect(summary.getByText(/production ready/i)).toHaveCount(0);
  await summary.getByRole('button', { name: 'Close design checks' }).click();
  await expect(summary).toBeHidden();
});

test('workflow identities and consequential actions remain clearly simulated', async ({ page }) => {
  await openWorkflowDemo(page);

  await expect(page.getByText('Workflow simulation', { exact: true }).first()).toBeVisible();
  await expect(page.getByText(/Fixture identities and actions only.*not production authentication/i)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Simulate save' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Simulate submission' })).toBeVisible();
  await expect(page.getByText(/No production proof, manufacture release or supplier acknowledgement is created/i)).toBeVisible();
  await expect(page.getByText(/secure authentication/i)).toHaveCount(0);
});
