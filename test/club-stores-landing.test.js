import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Club Stores landing reuses the website shell and provides a Pivot design entry', async () => {
  const [html, home] = await Promise.all([
    readFile('public/club-store/index.html', 'utf8'),
    readFile('public/index.html', 'utf8')
  ]);
  const footer = source => source.match(/<footer>.*?<\/footer>/s)?.[0];

  assert.equal(footer(html), footer(home));
  assert.match(html, /<a class="studio-nav-link" href="\/#studio">Pivot Design Studio<\/a><span class="club-login-link" aria-disabled="true">Club login<\/span>/);
  assert.doesNotMatch(home, /club-login-link/);
  assert.match(html, /href="\/website\/home\.css\?v=20260805-4"/);
  assert.doesNotMatch(html, /href="\/style\.css/);
  assert.match(html, /<meta name="robots" content="noindex,nofollow">/);
  assert.match(html, /<h1 id="club-stores-title">Explore an example club store\.<\/h1>/);
  assert.match(html, /The Pivot Club Store demonstrates how approved teamwear could be presented to club members\./);
  assert.doesNotMatch(html, /<aside class="club-login"|Pilot club access|Authorised club users|Sign-in is not available yet/);
  assert.doesNotMatch(html, /<form|type="password"/);
  assert.match(html, /class="sample-store-logo" src="\/brand\/Pivot_Logo_Transparent\.svg" alt="Pivot Teamwear"/);
  assert.match(html, /<h2 id="pivot-store-title">Pivot Club Store<\/h2>/);
  assert.match(html, /href="\/club-store\/version-2-club-store-review\.html"/);
  assert.match(html, /Example store/);
  assert.match(html, /View example store/);
  assert.doesNotMatch(html, /Design preview|Find your club store/i);
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
  assert.match(pageCss, /\.club-login-link\s*\{[^}]*font-size:\s*\.9rem;[^}]*font-weight:\s*700;/s);
  assert.match(pageCss, /\.sample-store-logo\s*\{[^}]*width:\s*min\(330px, 100%\);[^}]*height:\s*auto;/s);
  assert.doesNotMatch(pageCss, /\.sample-store-logo\s*\{[^}]*(?:transform|filter|clip-path):/s);
  assert.match(pageCss, /\.pivot-store-card:focus-visible\s*\{[^}]*outline:\s*3px solid #092C71/s);
  assert.match(pageCss, /:focus-visible/);
  assert.match(pageCss, /@media\s*\(max-width:/);
});
