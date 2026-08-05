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

test('website implementation guidance is required and records approved page patterns', async () => {
  const [agents, guide] = await Promise.all([
    readFile('AGENTS.md', 'utf8'),
    readFile('docs/website/Website Implementation Guide.md', 'utf8')
  ]);

  assert.match(agents, /`docs\/website\/Website Implementation Guide\.md`/);
  assert.match(guide, /Business Plan[\s\S]*Operating Model[\s\S]*Brand Kit/);
  assert.match(guide, /noindex,nofollow/);
  assert.match(guide, /skip link/i);
  assert.match(guide, /prefers-reduced-motion/);
  assert.match(guide, /Fastmail setup/);
  assert.match(guide, /web-font licensing/);
  assert.match(guide, /distributes no font files/);
  assert.match(guide, /Node test suite/);
  assert.match(guide, /manual HTTP verification/);
  assert.doesNotMatch(guide, /Playwright|axe-core/i);
});

test('local and testing pages apply the approved document and accessibility baseline', async () => {
  const paths = [
    'public/club-store/index.html',
    'public/club-store/pivot/index.html',
    'public/club-login/index.html',
    'public/website/version-2-review.html',
    'public/club-store/version-2-club-store-review.html'
  ];

  for (const path of paths) {
    const html = await readFile(path, 'utf8');
    assert.match(html, /<html\b[^>]*lang="en-AU"/, path);
    assert.match(html, /<meta name="robots" content="noindex,nofollow">/, path);
    assert.match(html, /<meta name="description" content="[^"]+">/, path);
    assert.match(html, /<link rel="icon" href="\/brand\/Pivot_Icon\.svg" type="image\/svg\+xml">/, path);
    assert.match(html, /class="skip-link" href="#(?:main|app)"/, path);
    assert.match(html, /<main\b[^>]*id="(?:main|app)"[^>]*tabindex="-1"/, path);
  }
});

test('future website navigation links to Club Stores between Products and FAQs', async () => {
  const html = await readFile('public/index.html', 'utf8');
  const products = html.indexOf('<a href="/#products">Products</a>');
  const clubStores = html.indexOf('<a href="/club-store/index.html">Club Stores</a>');
  const faqs = html.indexOf('<a href="/#faqs">FAQs</a>');

  assert.ok(products >= 0);
  assert.ok(clubStores > products);
  assert.ok(faqs > clubStores);
});

test('website navigation consistently uses the home route name', async () => {
  const sources = await Promise.all([
    readFile('public/index.html', 'utf8'),
    readFile('public/club-store/index.html', 'utf8'),
    readFile('public/app.js', 'utf8'),
    readFile('public/website/home-page.js', 'utf8')
  ]);

  for (const source of sources) assert.doesNotMatch(source, /#store/);
  assert.match(sources[0], /href="\/#home">Home<\/a>/);
  assert.match(sources[1], /href="\/#home">Home<\/a>/);
  assert.match(sources[2], /href="#home" class="back">← Back to home<\/a>/);
  assert.match(sources[3], /<section class="pivot-hero" id="home">/);
});

test('homepage navigation provides accessible pointer and keyboard feedback', async () => {
  const css = await readFile('public/website/home.css', 'utf8');

  assert.match(css, /nav a:not\(:last-child\):hover,\s*nav a:not\(:last-child\):focus-visible\s*\{[^}]*color:\s*#092C71;[^}]*text-decoration:\s*underline;[^}]*text-underline-offset:\s*4px;/);
  assert.match(css, /nav a:focus-visible\s*\{\s*outline-color:\s*#092C71;/);
  assert.match(css, /nav a:last-child:hover\s*\{\s*background:\s*#F4951D;\s*color:\s*#092C71;/);
  assert.match(css, /summary:focus-visible,[\s\S]*select:focus-visible\s*\{[^}]*outline:\s*3px solid #092C71;[^}]*outline-offset:\s*3px;/);
  assert.match(css, /\.pivot-hero a:focus-visible\s*\{\s*outline-color:\s*#FFFFFF;/);
});

test('homepage mobile navigation and primary actions remain easy to tap', async () => {
  const css = await readFile('public/website/home.css', 'utf8');
  const mobile = css.slice(
    css.indexOf('@media (max-width: 720px)'),
    css.indexOf('@media (prefers-reduced-motion: reduce)')
  );

  assert.match(mobile, /nav a\s*\{[^}]*flex:\s*1 1 calc\(33\.333% - 8px\);[^}]*min-height:\s*44px;[^}]*font-size:\s*14px;/);
  assert.match(mobile, /nav a:last-child\s*\{[^}]*flex-basis:\s*100%;[^}]*min-height:\s*48px;/);
  assert.match(mobile, /\.pivot-hero \.hero-link,[\s\S]*\.contact-section > #open-club-interest\s*\{[^}]*width:\s*100%;[^}]*min-width:\s*0;/);
});

test('homepage required-field indicators use a readable brand colour', async () => {
  const css = await readFile('public/website/home.css', 'utf8');

  assert.match(css, /\.required-note span,\s*\.required-mark\s*\{\s*color:\s*#092C71;/);
});

test('local and testing page styles keep responsive navigation and reduced-motion safeguards', async () => {
  const styles = await Promise.all([
    readFile('public/website/home.css', 'utf8'),
    readFile('public/website/version-2-review.css', 'utf8'),
    readFile('public/club-store/version-2-club-store-review.css', 'utf8'),
    readFile('public/club-store/pivot/pivot-store.css', 'utf8')
  ]);

  for (const css of styles) {
    assert.match(css, /:focus-visible/);
    assert.match(css, /prefers-reduced-motion:\s*reduce/);
    assert.match(css, /flex-wrap:\s*wrap/);
    assert.doesNotMatch(css, /overflow-x:\s*auto/);
  }
});

test('local review pages keep skip navigation first and focus indicators readable by surface', async () => {
  const [websiteHtml, storeHtml, websiteCss, storeCss] = await Promise.all([
    readFile('public/website/version-2-review.html', 'utf8'),
    readFile('public/club-store/version-2-club-store-review.html', 'utf8'),
    readFile('public/website/version-2-review.css', 'utf8'),
    readFile('public/club-store/version-2-club-store-review.css', 'utf8')
  ]);

  for (const html of [websiteHtml, storeHtml]) {
    const body = html.slice(html.indexOf('<body>'));
    assert.match(body, /<body>\s*<a class="skip-link"/);
  }

  assert.match(websiteCss, /:focus-visible\s*\{\s*outline:\s*3px solid var\(--midnight\)/);
  assert.match(websiteCss, /\.hero :focus-visible\s*\{\s*outline-color:\s*var\(--white\)/);
  assert.match(storeCss, /:focus-visible\s*\{\s*outline:\s*3px solid var\(--midnight\)/);
  assert.match(storeCss, /:root\[data-store-theme="dark"\] :focus-visible\s*\{\s*outline-color:\s*var\(--orange\)/);
  assert.match(storeCss, /\.store-nav a:focus-visible\s*\{[^}]*outline-color:\s*var\(--white\)/);
  assert.doesNotMatch(storeCss, /\.muted-card\s*\{[^}]*opacity:/);
});

test('future website footer uses a left-aligned copyright notice without repeating homepage messaging', async () => {
  const [html, css] = await Promise.all([
    readFile('public/index.html', 'utf8'),
    readFile('public/website/home.css', 'utf8')
  ]);

  assert.match(html, /<footer>© 2026 Pivot Teamwear<\/footer>/);
  assert.doesNotMatch(html, /<footer>[^<]*Quality teamwear/);
  assert.match(css, /footer\s*\{[^}]*padding:\s*25px 7vw;[^}]*text-align:\s*left;/);
});

test('future homepage avoids redundant section labels and decorative card differences', async () => {
  const [source, css] = await Promise.all([
    readFile('public/website/home-page.js', 'utf8'),
    readFile('public/website/home.css', 'utf8')
  ]);

  assert.doesNotMatch(source, /class="eyebrow"/);
  assert.doesNotMatch(source, /<h3>FAQs<\/h3>/);
  assert.doesNotMatch(css, /\.home-features|\.energy-card/);
  assert.doesNotMatch(css, /\.info-grid article:nth-child/);
  assert.match(css, /\.hero-logo\s*\{[^}]*width:\s*min\(670px, 88vw\);[^}]*height:\s*295px;/);
});

test('future homepage colours use approved bases and traceable supporting variations', async () => {
  const homepageStyles = await readFile('public/website/home.css', 'utf8');
  const approvedColours = new Set([
    '#000',
    '#000000',
    '#0096d6',
    '#092c71',
    '#f4951d',
    '#fff',
    '#ffffff'
  ]);
  const usedColours = [...homepageStyles.matchAll(/#[0-9a-f]{3,8}\b/gi)]
    .map(match => match[0].toLowerCase());
  const unapprovedColours = [...new Set(usedColours.filter(colour => !approvedColours.has(colour)))];

  assert.deepEqual(unapprovedColours, []);
  assert.doesNotMatch(homepageStyles, /\b(?:rgb|hsl)a?\(/i);
  assert.match(homepageStyles, /--pivot-midnight-tint:\s*color-mix\(in srgb, var\(--pivot-midnight\) 6%, var\(--pivot-white\)\)/);
  assert.match(homepageStyles, /--pivot-cerulean-tint:\s*color-mix\(in srgb, var\(--pivot-cerulean\) 12%, var\(--pivot-white\)\)/);
  assert.match(homepageStyles, /--pivot-orange-tint:\s*color-mix\(in srgb, var\(--pivot-orange\) 14%, var\(--pivot-white\)\)/);
  assert.match(homepageStyles, /\.faq-section\s*\{\s*background:\s*var\(--pivot-orange-tint\);/);
  assert.match(homepageStyles, /\.contact-section\s*\{[^}]*background:\s*var\(--pivot-cerulean-tint\);[^}]*color:\s*#092C71;/);
  assert.match(homepageStyles, /\.faq-section p a\s*\{[^}]*text-decoration:\s*underline/);
  assert.match(homepageStyles, /\.faq-section details\s*\{[^}]*width:\s*100%;/);
  assert.match(homepageStyles, /\.faq-section details p\s*\{\s*max-width:\s*75ch;/);
  assert.doesNotMatch(homepageStyles, /\.faq-section details\s*\{[^}]*max-width:/);
  assert.match(homepageStyles, /\.contact-section\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\) auto;/);
  assert.match(homepageStyles, /\.contact-section:has\(\.club-interest-form:not\(\[hidden\]\)\)\s*\{\s*grid-template-columns:\s*minmax\(0, \.8fr\) minmax\(520px, 1\.2fr\);/);
  assert.match(homepageStyles, /\.interest-copy p\s*\{[^}]*max-width:\s*75ch;/);
});

test('homepage defers Design Studio code and styles until a Studio route is selected', async () => {
  const [html, entry, homeCss] = await Promise.all([
    readFile('public/index.html', 'utf8'),
    readFile('public/website/home-entry.js', 'utf8'),
    readFile('public/website/home.css', 'utf8')
  ]);

  assert.match(html, /href="\/website\/home\.css\?v=20260805-5"/);
  assert.doesNotMatch(html, /href="\/style\.css/);
  assert.match(html, /src="\/website\/home-entry\.js\?v=20260805-2"/);
  assert.match(homeCss, /#home\s*\{\s*scroll-margin-top:\s*72px;\s*\}/);
  assert.match(homeCss, /@media \(max-width: 720px\)[\s\S]*#home\s*\{\s*scroll-margin-top:\s*200px;\s*\}/);
  assert.doesNotMatch(html, /src="\/app\.js/);
  assert.match(entry, /studioRoutes\.has\(location\.hash\)/);
  assert.match(entry, /href = '\/style\.css\?v=20260805-9'/);
  assert.match(entry, /await loadStudioStyles\(\)\.catch/);
  assert.match(entry, /await import\('\.\.\/app\.js'\)/);
  assert.doesNotMatch(homeCss, /\.design-setup|\.workspace|\.editor-body/);
  assert.match(homeCss, /@media \(max-width: 720px\)[\s\S]*nav \{[\s\S]*flex-wrap: wrap;[\s\S]*justify-content: center;/);
  assert.doesNotMatch(homeCss, /overflow-x:\s*auto/);
});

test('customer-facing copy consistently names the Pivot Design Studio', async () => {
  const customerFacingFiles = [
    'public/website/home-page.js',
    'public/app.js',
    'public/studio/studio-setup.js',
    'public/studio/studio-state.js'
  ];

  for (const path of customerFacingFiles) {
    const source = await readFile(path, 'utf8');
    assert.doesNotMatch(source, /\bdemonstrator\b/i, path);
  }
});
