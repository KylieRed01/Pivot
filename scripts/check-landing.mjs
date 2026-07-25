import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve } from 'node:path';

const landingDirectory = resolve('landing');
const html = await readFile(resolve(landingDirectory, 'index.html'), 'utf8');
const assetUrls = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
const localUrls = assetUrls.filter((url) => !/^(?:[a-z]+:|#|\/\/)/i.test(url));

for (const url of localUrls) {
  const pathname = url.split(/[?#]/, 1)[0];
  const path = url.startsWith('/')
    ? resolve(landingDirectory, `.${pathname}`)
    : resolve(landingDirectory, pathname);

  try {
    await access(path, constants.R_OK);
  } catch {
    throw new Error(`Landing page references a missing local asset: ${url}`);
  }
}

console.log(`Landing page links verified (${localUrls.length} local asset${localUrls.length === 1 ? '' : 's'}).`);
