import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const exists = async path => access(path).then(() => true, () => false);

test('Playwright remains prohibited from the repository toolchain', async () => {
  const manifest = JSON.parse(await readFile('package.json', 'utf8'));
  const packages = {
    ...manifest.dependencies,
    ...manifest.devDependencies,
    ...manifest.optionalDependencies
  };

  assert.equal(Object.keys(packages).some(name => name.toLowerCase().includes('playwright')), false);
  assert.equal(Object.values(manifest.scripts ?? {}).some(command => /playwright/i.test(command)), false);
  assert.equal(await exists('playwright.config.js'), false);
  assert.equal(await exists('playwright.config.ts'), false);
  assert.equal(await exists('test/e2e'), false);
});

test('customer-facing copy consistently names the Pivot Design Studio', async () => {
  const customerFacingFiles = [
    'public/home-page.js',
    'public/app.js',
    'public/studio/studio-setup.js',
    'public/studio/studio-state.js'
  ];

  for (const path of customerFacingFiles) {
    const source = await readFile(path, 'utf8');
    assert.doesNotMatch(source, /\bdemonstrator\b/i, path);
  }
});
