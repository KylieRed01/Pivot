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
  assert.match(html, /<a class="studio-nav-link" href="\/#studio">Pivot Design Studio<\/a><a class="club-login-link" href="\/club-store\/version-2-club-store-review\.html">Club login<\/a>/);
  assert.doesNotMatch(home, /club-login-link/);
  assert.match(html, /href="\/website\/home\.css\?v=20260805-4"/);
  assert.doesNotMatch(html, /href="\/style\.css/);
  assert.match(html, /<meta name="robots" content="noindex,nofollow">/);
  assert.match(html, /class="section club-stores-masthead"/);
  assert.match(html, /class="club-stores-logo" src="\/brand\/Pivot_Logo_Transparent\.svg" alt="Pivot Teamwear"/);
  assert.match(html, /<h1 id="club-stores-title">Club Stores<\/h1>/);
  assert.doesNotMatch(html, /Explore an example club store|demonstrates how approved teamwear could be presented/);
  assert.doesNotMatch(html, /<aside class="club-login"|Pilot club access|Authorised club users|Sign-in is not available yet/);
  assert.doesNotMatch(html, /<form|type="password"/);
  assert.match(html, /class="sample-store-logo" src="\/brand\/Pivot_Logo_Transparent\.svg" alt="Pivot Teamwear"/);
  assert.match(html, /<h2>Pivot Club Store<\/h2>/);
  assert.match(html, /href="\/club-store\/pivot\/index\.html"/);
  assert.equal(html.match(/<span class="store-status">Preview only<\/span>/g)?.length, 1);
  assert.doesNotMatch(html, /Example store/);
  assert.match(html, /Explore how approved teamwear could look in a dedicated club-branded store\./);
  assert.match(html, /Explore the store/);
  assert.doesNotMatch(html, /Preview a club-branded place|placeholder products|Take a tour/);
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
  assert.match(pageCss, /nav a\.club-login-link\s*\{[^}]*padding:\s*0;[^}]*border-radius:\s*0;[^}]*background:\s*transparent;[^}]*font-size:\s*\.9rem;[^}]*font-weight:\s*700;/s);
  assert.match(pageCss, /nav a\.club-login-link:hover,[\s\S]*nav a\.club-login-link:focus-visible/);
  assert.match(pageCss, /\.club-stores-masthead\s*\{[^}]*background:\s*#092C71;/s);
  assert.match(pageCss, /\.club-stores-logo\s*\{[^}]*width:\s*min\(150px, 30vw\);[^}]*height:\s*auto;/s);
  assert.match(pageCss, /\.club-stores-page\s*\{[^}]*min-height:\s*calc\(100vh - 145px\);/s);
  assert.match(pageCss, /\.sample-store-logo\s*\{[^}]*width:\s*min\(220px, 100%\);[^}]*height:\s*auto;/s);
  assert.doesNotMatch(pageCss, /\.sample-store-logo\s*\{[^}]*(?:transform|filter|clip-path):/s);
  assert.match(pageCss, /\.pivot-store-card:focus-visible\s*\{[^}]*outline:\s*3px solid #092C71/s);
  assert.match(pageCss, /:focus-visible/);
  assert.match(pageCss, /@media\s*\(max-width:/);
});

test('Club login page is a clearly unavailable passwordless sign-in gateway', async () => {
  const html = await readFile('public/club-login/index.html', 'utf8');
  const css = await readFile('public/club-login/club-login.css', 'utf8');

  assert.match(html, /<html lang="en-AU">/);
  assert.match(html, /<meta name="robots" content="noindex,nofollow">/);
  assert.match(html, /class="skip-link" href="#main"/);
  assert.match(html, /<main[^>]*id="main"[^>]*tabindex="-1"/);
  assert.match(html, /src="\/brand\/Pivot_Logo_Transparent\.svg" alt="Pivot Teamwear" width="330" height="145"/);
  assert.match(html, /<h1 id="club-login-title">Club login<\/h1>/);
  assert.match(html, /Sign in to access your club administration\./);
  assert.match(html, /<label for="club-login-email">Email address<\/label>/);
  assert.match(html, /<input[^>]*id="club-login-email"[^>]*type="email"[^>]*autocomplete="email"/);
  assert.match(html, /<button type="submit" disabled>Send sign-in link<\/button>/);
  assert.match(html, /Authentication is not yet connected/);
  assert.match(css, /#092C71/i);
  assert.match(css, /#0096D6/i);
  assert.match(css, /#F4951D/i);
  assert.match(css, /Century Gothic/);
  assert.match(css, /Calibri/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\s*\(max-width:/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});
