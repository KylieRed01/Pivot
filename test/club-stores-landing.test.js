import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Club Stores landing reuses the website shell and provides a Pivot design entry', async () => {
  const [html, home] = await Promise.all([
    readFile('public/club-store/index.html', 'utf8'),
    readFile('public/index.html', 'utf8')
  ]);
  const shell = source => ({
    header: source.match(/<header>.*?<\/header>/s)?.[0],
    footer: source.match(/<footer>.*?<\/footer>/s)?.[0]
  });

  assert.deepEqual(shell(html), shell(home));
  assert.match(html, /href="\/website\/home\.css\?v=20260805-2"/);
  assert.doesNotMatch(html, /href="\/style\.css/);
  assert.match(html, /<meta name="robots" content="noindex,nofollow">/);
  assert.match(html, /<h1 id="club-stores-title">Find your club store\.<\/h1>/);
  assert.match(html, /Club login/);
  assert.match(html, /<button type="button" disabled>Club login<\/button>/);
  assert.doesNotMatch(html, /<form|type="password"/);
  assert.match(html, /class="sample-store-logo" src="\/brand\/Pivot_Logo_Transparent\.svg" alt="Pivot Teamwear"/);
  assert.match(html, /<h2 id="pivot-store-title">Pivot Club Store<\/h2>/);
  assert.match(html, /href="\/club-store\/version-2-club-store-review\.html"/);
  assert.match(html, /Design preview/);
  assert.doesNotMatch(html, /Phoenix/i);
  assert.doesNotMatch(html, /buy now|add to cart|checkout|\$\d/i);
});

test('Club Stores styling preserves the approved logo and brand presentation', async () => {
  const [pageCss, sharedCss] = await Promise.all([
    readFile('public/club-store/club-stores.css', 'utf8'),
    readFile('public/website/home.css', 'utf8')
  ]);
  const css = sharedCss + pageCss;

  assert.match(css, /#092C71/i);
  assert.match(css, /#0096D6/i);
  assert.match(css, /#F4951D/i);
  assert.match(css, /Century Gothic/);
  assert.match(css, /Calibri/);
  assert.match(pageCss, /\.sample-store-logo\s*\{[^}]*width:\s*min\(330px, 100%\);[^}]*height:\s*auto;/s);
  assert.doesNotMatch(pageCss, /\.sample-store-logo\s*\{[^}]*(?:transform|filter|clip-path):/s);
  assert.match(pageCss, /\.pivot-store-card:focus-visible\s*\{[^}]*outline:\s*3px solid #092C71/s);
  assert.match(pageCss, /:focus-visible/);
  assert.match(pageCss, /@media\s*\(max-width:/);
});
