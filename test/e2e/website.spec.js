import { test, expect } from '@playwright/test';

test('website states pilot availability, service boundary and contact fallback', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('The Pivot Design Studio demonstrator is open to try. Teamwear and club stores are not yet available to other clubs.', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Pivot supplies and delivers teamwear only within Greater Bendigo.', { exact: true }).first()).toBeVisible();
  await expect(page.getByText(/does not commit your club to purchase, join a pilot or open a club store/i).first()).toBeVisible();

  const contact = page.getByRole('link', { name: 'hello@pivotteamwear.com' });
  await expect(contact).toHaveAttribute('href', 'mailto:hello@pivotteamwear.com');
  await expect(page.locator('form')).toHaveCount(0);
});

test('website exposes reconciled product descriptions and public Studio CTA', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Playing uniforms' })).toBeVisible();
  await expect(page.getByText(/Quality custom uniforms designed around your club's identity/)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Club apparel' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Club stores' })).toBeVisible();

  const cta = page.getByRole('link', { name: 'Start designing with the Pivot Design Studio' }).first();
  await expect(cta).toHaveAttribute('href', '#studio');
});

test('public section navigation remains available at phone width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('navigation').getByRole('link', { name: 'FAQs' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Contact us' })).toBeVisible();
});
