import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createApp } from '../src/server.js';

let app;
let base;

before(async () => {
  app = createApp();
  await new Promise(resolve => app.listen(0, resolve));
  base = `http://127.0.0.1:${app.address().port}`;
});

after(() => app.close());

test('serves an isolated Version 2 local review page', async () => {
  const response = await fetch(`${base}/website/version-2-review.html`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Pivot Version 2 — Local Review<\/title>/);
  assert.match(html, /Local review only — nothing is submitted, stored or sent/);
  assert.match(html, /Version 2 local review/);
  assert.match(html, /Review state:/);
  assert.match(html, /<meta name="robots" content="noindex,nofollow">/);
  assert.match(html, /href="\/website\/version-2-review\.css"/);
  assert.match(html, /src="\/website\/version-2-review\.js"/);
});

test('presents the approved interest journey and separate help areas for review', async () => {
  const response = await fetch(`${base}/website/version-2-review.html`);
  const html = await response.text();

  assert.match(html, /Be part of what comes next\./);
  assert.match(html, /Register Your Club’s Interest/);
  assert.match(html, /href="\/club-store\/version-2-club-store-review\.html"/);
  assert.match(html, /class="hero-logo" src="\/brand\/Pivot_Logo_Transparent\.svg"/);
  for (const name of ['contactName', 'clubName', 'email', 'sport', 'competition', 'location', 'consent']) {
    assert.match(html, new RegExp(`name="${name}"`));
  }

  const faq = html.indexOf('>FAQs<');
  const studioHelp = html.indexOf('>Pivot Design Studio Help<');
  const clubHelp = html.indexOf('>Club Help Centre<');
  assert.ok(faq > -1 && faq < studioHelp && studioHelp < clubHelp);
  assert.doesNotMatch(html, /demonstrator/i);
});

test('keeps the form flow local while previewing the approved confirmation', async () => {
  const { getReviewOutcome } = await import('../public/website/version-2-review.js');
  const outcome = getReviewOutcome(true);

  assert.equal(outcome.networkRequest, false);
  assert.equal(outcome.title, 'You’re in the game.');
  assert.equal(outcome.message, 'Thanks for registering your club’s interest. We’ve got your details and will be in touch when it’s time for the next play.');
});

test('cannot fall back to a browser form submission when scripts are unavailable', async () => {
  const response = await fetch(`${base}/website/version-2-review.html`);
  const html = await response.text();

  assert.match(html, /<form id="interest-review-form" data-local-only>/);
  assert.match(html, /<button type="button" id="preview-interest-flow">Register Your Club’s Interest<\/button>/);
  assert.doesNotMatch(html, /<form[^>]+(?:action|method)=/i);
});

test('serves responsive brand styling with visible keyboard focus', async () => {
  const response = await fetch(`${base}/website/version-2-review.css`);
  const css = await response.text();

  assert.equal(response.status, 200);
  assert.match(css, /#092C71/i);
  assert.match(css, /:focus-visible/);
  assert.match(css, /\.hero \.eyebrow\s*\{\s*color:\s*var\(--orange\)/);
  assert.match(css, /\.interest-section\s*\{[^}]*background:\s*var\(--cerulean-tint\)/s);
  assert.match(css, /form button:hover\s*\{[^}]*background:\s*var\(--midnight\)[^}]*color:\s*var\(--white\)/s);
  assert.match(css, /@media\s*\(max-width:/);
  assert.match(css, /prefers-reduced-motion/);
});

test('local review footers use the approved light wordmark on dark surfaces', async () => {
  const [websiteHtml, storeHtml, publicWordmark, approvedWordmark] = await Promise.all([
    readFile('public/website/version-2-review.html', 'utf8'),
    readFile('public/club-store/version-2-club-store-review.html', 'utf8'),
    readFile('public/brand/Pivot_Wordmark_White.svg', 'utf8'),
    readFile('docs/brand/Pivot Logo_Word Mark_White.svg', 'utf8')
  ]);

  assert.match(websiteHtml, /src="\/brand\/Pivot_Wordmark_White\.svg"/);
  assert.match(storeHtml, /src="\/brand\/Pivot_Wordmark_White\.svg"/);
  assert.equal(publicWordmark, approvedWordmark);
});

test('serves the Club Stores landing page from its navigation URL', async () => {
  const response = await fetch(`${base}/club-store/index.html`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Club Stores \| Pivot Teamwear<\/title>/);
  assert.match(html, /Pivot Club Store/);
});

test('serves an isolated non-transactional club-store concept', async () => {
  const response = await fetch(`${base}/club-store/version-2-club-store-review.html`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Club Store — Local Review/);
  assert.match(html, /Local concept only — no live store, ordering or checkout/);
  assert.match(html, /Controlled identity preview/);
  assert.match(html, /Local review palette/);
  assert.match(html, /Decision workspace/);
  assert.match(html, /<meta name="robots" content="noindex,nofollow">/);
  assert.match(html, /href="\/club-store\/index\.html"/);
  assert.match(html, /href="\/club-store\/version-2-club-store-review\.css"/);
  assert.match(html, /src="\/club-store\/version-2-club-store-review\.js"/);
  assert.match(html, /Light theme/);
  assert.match(html, /Dark theme/);
  assert.match(html, /Local review palette/);
  assert.match(html, /class="club-logo-preview" src="\/brand\/Pivot_Logo_Transparent\.svg"/);
  assert.doesNotMatch(html, /Club logo placeholder/);
  assert.equal((html.match(/type="color"/g) ?? []).length, 2);
  assert.doesNotMatch(html, /type="range"|opacity slider|club opacity/i);
  assert.match(html, />Jersey preview</);
  assert.match(html, />Dark basketball jersey</);
  assert.match(html, />Light basketball jersey</);
  assert.equal((html.match(/>Product placeholder</g) ?? []).length, 3);
  assert.match(html, />Club range preview</);
  assert.doesNotMatch(html, />Approved club range<|>Approved products only<|>Uniform preview<|>Playing uniform<|>Alternate uniform face<|FOR TESTING ONLY/i);
  assert.doesNotMatch(html, /<form|buy now|add to cart|class="price"|\$\d/i);
});

test('switches only between the two controlled local store themes', async () => {
  const { getStoreTheme, getReviewPalette } = await import('../public/club-store/version-2-club-store-review.js');

  assert.deepEqual(getStoreTheme('light'), { theme: 'light', lightPressed: true, darkPressed: false });
  assert.deepEqual(getStoreTheme('dark'), { theme: 'dark', lightPressed: false, darkPressed: true });
  assert.deepEqual(getStoreTheme('custom'), { theme: 'light', lightPressed: true, darkPressed: false });
  assert.deepEqual(getReviewPalette('#123456', '#ABCDEF'), { primary: '#123456', accent: '#ABCDEF' });
  assert.deepEqual(getReviewPalette('invalid', ''), { primary: '#092C71', accent: '#0096D6' });
});

test('uses theme-responsive high-contrast colours for the internal store review panel', async () => {
  const response = await fetch(`${base}/club-store/version-2-club-store-review.css`);
  const css = await response.text();

  assert.equal(response.status, 200);
  assert.match(css, /\.review-panel\s*\{[^}]*background:\s*var\(--muted-surface\)[^}]*color:\s*var\(--text\)/s);
  assert.match(css, /\.review-panel \.store-kicker\s*\{[^}]*color:\s*var\(--text\)/s);
  assert.match(css, /color-mix\(in srgb, var\(--club-primary\) 8%, var\(--white\)\)/);
  assert.match(css, /color-mix\(in srgb, var\(--club-primary\) 36%, var\(--black\)\)/);
});

test('keeps a visible persistence warning inside the vertical editor instead of pushing the workspace aside', async () => {
  const source = await readFile('public/app.js', 'utf8');

  assert.match(source, /<section class="editor">\$\{workflowDemo\?'':'<p id="local-persistence-warning"/);
  assert.doesNotMatch(source, /<\/span><\/div>\$\{workflowDemo\?'':'<p id="local-persistence-warning"/);
});

test('explains public Design Studio limits without internal technical language', async () => {
  const source = await readFile('public/app.js', 'utf8');

  assert.match(source, /Use the front and back views as the clearest record of your design\./);
  assert.match(source, /Pivot must review and approve a final 2D design showing exactly what will be made\./);
  assert.match(source, /These checks are a guide only\. Pivot must review any final design before it can be made\./);
  assert.doesNotMatch(source, /Partial profile:|production infrastructure|manufacturing integration|immutable 2D proof/);
});
