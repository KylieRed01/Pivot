import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { ensureHomePage, renderHomePage } from '../public/website/home-page.js';
import { createApp } from '../src/server.js';

test('homepage metadata describes Pivot while remaining excluded from indexing', async () => {
  const html = await readFile('public/index.html', 'utf8');

  assert.match(html, /<html lang="en-AU">/);
  assert.match(html, /<title>Custom Teamwear for Community Sport \| Pivot Teamwear<\/title>/);
  assert.match(html, /<meta name="description" content="Explore custom uniforms, club merchandise and club stores for community sport in Greater Bendigo, and register your club’s interest with Pivot Teamwear\.">/);
  assert.match(html, /<meta name="robots" content="noindex,nofollow">/);
  assert.match(html, /<meta property="og:type" content="website">/);
  assert.match(html, /<meta property="og:locale" content="en_AU">/);
  assert.match(html, /<meta property="og:site_name" content="Pivot Teamwear">/);
  assert.match(html, /<meta property="og:title" content="Custom Teamwear for Community Sport \| Pivot Teamwear">/);
  assert.match(html, /<meta property="og:description" content="Explore custom uniforms, club merchandise and club stores for community sport in Greater Bendigo, and register your club’s interest with Pivot Teamwear\.">/);
  assert.doesNotMatch(html, /property="og:image"/);
  assert.match(html, /<link rel="icon" href="\/brand\/Pivot_Icon\.svg" type="image\/svg\+xml">/);
});

test('public home page renders the approved website experience', () => {
  const root = { innerHTML: '' };

  renderHomePage(root);

  assert.match(root.innerHTML, /<section class="pivot-hero" id="home">/);
  assert.match(root.innerHTML, /<img class="hero-logo"[^>]*width="670" height="295" fetchpriority="high">/);
  assert.match(root.innerHTML, /Built for action\.<br><em>Priced to play\.<\/em>/);
  assert.match(root.innerHTML, /Quality custom teamwear that helps clubs and players get in the game\./);
  assert.match(root.innerHTML, /href="#studio"/);
  assert.match(root.innerHTML, /aria-label="Game On\. Start designing with the interactive Pivot Design Studio"/);
  assert.match(root.innerHTML, />Game On\. /);
  assert.doesNotMatch(root.innerHTML, /Game On\. Start Designing/);
  assert.doesNotMatch(root.innerHTML, /Design Studio trial:/);
  assert.doesNotMatch(root.innerHTML, /Your kit\. Your identity\./);
  assert.doesNotMatch(root.innerHTML, /class="home-features"/);
  assert.doesNotMatch(root.innerHTML, /<span class="eyebrow">/);
  assert.doesNotMatch(root.innerHTML, /Quality teamwear made simple, affordable and reliable for community sport\./);
  assert.doesNotMatch(root.innerHTML, /class="home-strip"/);
  assert.doesNotMatch(root.innerHTML, /class="text-link"/);
  assert.doesNotMatch(root.innerHTML, /Working with our pilot club\./);
  assert.match(root.innerHTML, /<h3>Custom uniforms<\/h3>/);
  assert.doesNotMatch(root.innerHTML, /<h3>Playing uniforms<\/h3>/);
  assert.match(root.innerHTML, /<h3>Club merchandise<\/h3>/);
  assert.doesNotMatch(root.innerHTML, /<h3>Club apparel<\/h3>/);
  assert.doesNotMatch(root.innerHTML, /class="availability-note"/);
  assert.match(root.innerHTML, /data-help-category="faqs"/);
  assert.doesNotMatch(root.innerHTML, /<h3>FAQs<\/h3>/);
  assert.doesNotMatch(root.innerHTML, /data-help-category="studio"/);
  assert.doesNotMatch(root.innerHTML, /<h3>Pivot Design Studio Help<\/h3>/);
  assert.doesNotMatch(root.innerHTML, /data-help-category="club"/);
  assert.doesNotMatch(root.innerHTML, /<h3>Club Help Centre<\/h3>/);
  assert.doesNotMatch(root.innerHTML, /Who can access our club account\?/);
  assert.match(root.innerHTML, /What is currently available\?/);
  assert.match(root.innerHTML, /Pivot is currently working with one pilot club\. You can try the interactive Pivot Design Studio now/);
  assert.match(root.innerHTML, /What sports will Pivot support\?/);
  assert.match(root.innerHTML, /Pivot is starting with basketball, with more community sports planned as we grow\./);
  assert.match(root.innerHTML, /Clubs from any sport are welcome to <a href="#contact">register their interest<\/a>\./);
  assert.match(root.innerHTML, /Where does Pivot operate\?/);
  assert.match(root.innerHTML, /Pivot is local to Greater Bendigo and supplies and delivers teamwear across the region\./);
  assert.doesNotMatch(root.innerHTML, /teamwear only within Greater Bendigo/);
  assert.match(root.innerHTML, /How much will Pivot teamwear cost\?/);
  assert.match(root.innerHTML, /Pivot is committed to quality and fair pricing\. Confirmed prices will be published with each product when it becomes available\./);
  assert.doesNotMatch(root.innerHTML, /speculative batch rate|should be advertised/i);
  assert.match(root.innerHTML, /Is there any commitment\?/);
  assert.match(root.innerHTML, /You’re welcome to try the interactive Pivot Design Studio or register your interest without committing your club to a purchase\./);
  assert.doesNotMatch(root.innerHTML, /consent is governed|approved wording above/i);
  assert.doesNotMatch(root.innerHTML, /How can our club customise its teamwear\?/);
  assert.doesNotMatch(root.innerHTML, /Can our club have its own branded store\?/);
  assert.doesNotMatch(root.innerHTML, /What apparel will Pivot offer\?/);
  assert.doesNotMatch(root.innerHTML, /How do we register our club's interest\?/);
  assert.match(root.innerHTML, /Pivot is working with one pilot club to test a simpler teamwear experience/);
  assert.match(root.innerHTML, /our interactive Pivot Design Studio/);
  assert.doesNotMatch(root.innerHTML, />Contact us<\/span>/);
  assert.match(root.innerHTML, /id="open-club-interest"[^>]*aria-expanded="false"/);
  assert.match(root.innerHTML, /class="club-interest-form" id="club-interest-form"[^>]*hidden/);
  assert.match(root.innerHTML, /\*<\/span> Required fields/);
  assert.match(root.innerHTML, /Contact name <b class="required-mark"/);
  assert.match(root.innerHTML, /League or association <b class="required-mark"/);
  assert.match(root.innerHTML, /Club suburb or town <b class="required-mark"/);
  assert.match(root.innerHTML, /Register My Club’s Interest/);
  assert.match(root.innerHTML, /class="linked-interest-fields"/);
  assert.match(root.innerHTML, /mailto:hello@pivotteamwear\.com\?subject=Club%20Interest/);
  assert.match(root.innerHTML, /id="club-interest-sport"/);
  assert.match(root.innerHTML, /id="club-interest-association"/);
  assert.match(root.innerHTML, /id="club-interest-other-sport"/);
  assert.match(root.innerHTML, /id="club-interest-other-association"/);
  assert.match(root.innerHTML, /id="club-interest-locality"[^>]*required/);
  assert.match(root.innerHTML, /id="club-interest-other-locality-field"[^>]*hidden/);
  assert.match(root.innerHTML, /id="club-interest-other-locality"/);
  assert.doesNotMatch(root.innerHTML, /<optgroup/);
  assert.doesNotMatch(root.innerHTML, />Not sure</);
  assert.match(root.innerHTML, /Gridiron \(American football\)/);
  assert.match(root.innerHTML, /We’ll use your details to contact you about your club’s interest and relevant Pivot availability updates\./);
  assert.doesNotMatch(root.innerHTML, /name="Contact consent"|type="checkbox"|general marketing/i);
  assert.match(root.innerHTML, /Register Your Club’s Interest/);
  assert.doesNotMatch(root.innerHTML, /demonstrator/i);
});

test('existing homepage markup is enhanced without being rebuilt', () => {
  const home = {};
  const root = {
    innerHTML: 'preserve existing content and form state',
    querySelector: selector => selector === '#home' ? home : undefined
  };

  ensureHomePage(root);
  assert.equal(root.innerHTML, 'preserve existing content and form state');
});

test('server includes essential homepage content in the initial response', async t => {
  const server = createApp();
  await new Promise(resolve => server.listen(0, resolve));
  t.after(() => server.close());

  const response = await fetch(`http://127.0.0.1:${server.address().port}/`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-cache');
  assert.match(response.headers.get('content-security-policy'), /default-src 'self'/);
  assert.equal(response.headers.get('permissions-policy'), 'camera=(), geolocation=(), microphone=()');
  assert.equal(response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.match(html, /<body><a class="skip-link" href="#app">Skip to content<\/a><header>/);
  assert.match(html, /<main id="app" tabindex="-1"><section class="pivot-hero" id="home">/);
  assert.match(html, /Built for action\.<br><em>Priced to play\.<\/em>/);
  assert.match(html, /id="club-interest-form"/);
  assert.doesNotMatch(html, /<main id="app" tabindex="-1"><\/main>/);

  const stylesheet = await fetch(`http://127.0.0.1:${server.address().port}/website/home.css`, {
    headers: { 'accept-encoding': 'br' }
  });
  assert.equal(stylesheet.headers.get('content-encoding'), 'br');
  assert.equal(stylesheet.headers.get('cache-control'), 'public, max-age=3600');
  assert.equal(stylesheet.headers.get('vary'), 'Accept-Encoding');
  assert.match(await stylesheet.text(), /--pivot-midnight:\s*#092C71/);
});
