import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const exists = async path => access(path).then(() => true, () => false);

test('external vendors remain unallocated until the user explicitly approves provider and scope', async () => {
  const guardrails = await readFile('AGENTS.md', 'utf8');

  assert.match(guardrails, /coding assistant has no authority to select, allocate or assume approval/i);
  assert.match(guardrails, /provider-neutral until the user explicitly approves the named provider and its scope/i);
  assert.match(guardrails, /Tool availability, examples, conditional documentation, existing account access and prior use are not approval/i);
  assert.match(guardrails, /Fastmail is approved as Pivot's mail server across Pivot/i);
  assert.match(guardrails, /does not itself approve the purpose, recipients, content, personal-data handling or release of a particular email workflow/i);
  assert.match(guardrails, /Cloudflare is Pivot's approved web host and currently serves `pivotteamwear\.com` until the user explicitly approves a change/i);
  assert.match(guardrails, /Do not allocate or migrate to another web host because a requirement is unsupported or the incumbent platform is not yet understood/i);
});

test('hosting remains provider-neutral until Pivot approves a deployment platform', async () => {
  const [server, guide, audit, specification, summary] = await Promise.all([
    readFile('src/server.js', 'utf8'),
    readFile('docs/website/Website Implementation Guide.md', 'utf8'),
    readFile('docs/Club Onboarding Proportionality Audit.md', 'utf8'),
    readFile('specs/club-interest-fastmail-delivery/spec.md', 'utf8'),
    readFile('specs/club-interest-fastmail-delivery/IMPLEMENTATION_SUMMARY.md', 'utf8')
  ]);

  assert.match(server, /const clientKey=req=>req\.socket\.remoteAddress\|\|'unknown'/);
  for (const source of [guide, audit, specification, summary]) {
    assert.match(source, /approved deployment platform's secret manager/);
  }
});

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
  assert.match(guide, /OFL-1\.1 garment fonts[\s\S]*development-only exception/);
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
  assert.match(sources[2], /class="studio-logo-brand"[^>]*><img src="\/brand\/Pivot_Icon\.svg" alt="Pivot Teamwear">/);
  assert.doesNotMatch(sources[2], /Return to home|studio-home-disabled/);
  assert.match(sources[3], /<section class="pivot-hero" id="home">/);
});

test('Design Studio gives creation, canvas and guidance one distinct owner', async () => {
  const source = await readFile('public/app.js', 'utf8');

  assert.match(source, /<aside class="design-guidance" aria-labelledby="guidance-title"><header><div class="guidance-design-row"><label class="design-name guidance-design-name">[\s\S]*?id="design-name"[\s\S]*?id="save-design"[\s\S]*?class="save-icon-button locked-feature"[\s\S]*?aria-disabled="true"[\s\S]*?aria-label="Save design"[\s\S]*?title="Save design — club access required"[\s\S]*?class="lock-badge"[\s\S]*?<small>Trial changes are kept temporarily in this browser session<\/small>[\s\S]*?<h2 id="guidance-title">Design guidance<\/h2>/);
  assert.doesNotMatch(source, /id="save-browser-design"|publicStore\?\.save\(publicState\)/);
  assert.match(source, /class="studio-logo-brand"[^>]*><img src="\/brand\/Pivot_Icon\.svg" alt="Pivot Teamwear">/);
  assert.match(source, /id="guidance-view"/);
  assert.match(source, /id="guidance-selection"/);
  assert.match(source, /id="open-design-checks"/);
  assert.doesNotMatch(source, /data-tool="help"/);
  assert.doesNotMatch(source, /data-tool-panel="help"/);
  assert.doesNotMatch(source, /legacy-help-copy/);
  assert.doesNotMatch(source, /class="view-label"/);
  assert.doesNotMatch(source, /class="canvas-footer"/);
  assert.doesNotMatch(source, /renderStudioSetup/);
  assert.match(source, /class="rail-item active" data-tool="templates"[^>]*aria-label="Templates"/);
  assert.match(source, /<h2 id="tool-heading">Templates<\/h2>/);
  assert.match(source, /class="tool-section active" data-tool-panel="templates"><nav class="template-menu"/);
  assert.doesNotMatch(source, /class="rail-item active" data-tool="colours"/);
  assert.doesNotMatch(source, /class="tool-section active" data-tool-panel="colours"/);
  assert.match(source, /data-tool-panel="artwork"[\s\S]*?class="panel-help"[\s\S]*?id="add-text" class="add-text-primary"[\s\S]*?id="text-selection-empty"[\s\S]*?id="text-controls"[\s\S]*?<details class="text-more-options">/);
  assert.match(source, /<summary>More text options<\/summary>/);
  assert.match(source, /class="text-size-control"><span>Font size \(pt\)<\/span><input id="text-font-size-slider"[^>]*type="range"[^>]*min="5"[^>]*max="96"[^>]*step="1"[^>]*aria-label="Text size in points"><input id="text-font-size"[^>]*type="number"[^>]*min="5"[^>]*max="96"[^>]*step="1"/);
  assert.doesNotMatch(source, /Trial range/);
  assert.match(source, /class="placement-presets"><span>Move text across garment<\/span>/);
  assert.match(source, /<summary>More text options<\/summary>[\s\S]*?<label>Align text at its position <select id="text-alignment"/);
  assert.doesNotMatch(source, /id="layer-scale"|id="text-size-value"|id="text-size-down"|id="text-size-up"|adjustTextSize/);
  assert.match(source, />Remove selected text<\/button>[\s\S]*?<details class="text-more-options">[\s\S]*?>Duplicate selected text<\/button>[\s\S]*?>Send backward<\/button>[\s\S]*?>Bring forward<\/button>/);
  assert.doesNotMatch(source, /Text layers|id="layer-list"/);
  assert.doesNotMatch(source, /sideName\+'-pivot-text'|'back-'\+sideName\+'-pivot-text'/);
  assert.match(source, /if\(b\.dataset\.tool==='artwork'&&!sides\[side\]\.layers\.some\(layer=>layer\.id===selectedId&&layer\.type==='text'\)\)/);
  assert.doesNotMatch(source, /<aside class="design-guidance"[\s\S]*?<nav class="template-menu"/);
  assert.match(source, /data-template="basketball-jersey"/);
  assert.match(source, /data-template="generic-t-shirt"/);
  assert.match(source, /data-template="generic-hoodie"/);
  assert.match(source, /data-tool="library"/);
  assert.match(source, /libraryAssetId:'pivot-penguin'[\s\S]*?x:50,y:45,scale:1\.6,rotation:0/);
  assert.match(source, /data-tool="club-images"[^>]*aria-label="Club assets — locked"/);
  assert.match(source, /data-tool-panel="club-images"/);
  assert.match(source, /Club access is not connected in this trial/);
  assert.match(source, /data-tool="images"[^>]*aria-label="Upload image"/);
  assert.doesNotMatch(source, /href="\/club-login\/index\.html"/);
  assert.match(source, /authorised club users and club administrators/i);
  assert.doesNotMatch(source, /id="change-setup"/);
  assert.match(source, /el\.onpointerdown=e=>\{if\(viewMode==='3d'\)return;e\.preventDefault\(\);selectedId=el\.dataset\.layerId;if\(!workflowDemo\)dispatchPublic\(\{type:'selectLayer'/);
  assert.match(source, /el\.onpointerdown=e=>\{[\s\S]*?const layer=sides\[side\]\.layers\.find\(x=>x\.id===selectedId\);if\(layer\?\.type==='text'\)activateTool\('artwork'\)/);
});

test('public Studio presents one jersey with an explicit control for separating the back design', async () => {
  const source = await readFile('public/app.js', 'utf8');

  assert.doesNotMatch(source, /aria-label="Colourway"|data-side="primary"|data-side="reverse"/);
  assert.match(source, /id="separate-back-design"[\s\S]*Design back separately/);
});

test('public Studio prints a branded trial preview with current front and back views', async () => {
  const [source, styles] = await Promise.all([
    readFile('public/app.js', 'utf8'),
    readFile('public/style.css', 'utf8')
  ]);

  assert.match(source, /id="print-trial-preview"[^>]*>Print trial preview<\/button>/);
  assert.match(source, /class="trial-print-sheet"[\s\S]*?src="\/brand\/Pivot_Logo_Transparent\.svg"[\s\S]*?id="trial-print-name"[\s\S]*?id="trial-print-date"[\s\S]*?id="trial-print-front"[\s\S]*?id="trial-print-back"[\s\S]*?TRIAL PREVIEW — NOT AN ORDER OR PRODUCTION-READY DESIGN/);
  assert.match(source, /querySelector\('#trial-print-front'\)\.innerHTML=renderJerseyPreview\(d,frontSides\[side\],null,activeSetup\.garment\)/);
  assert.match(source, /querySelector\('#trial-print-back'\)\.innerHTML=renderJerseyPreview\(d,backSides\[side\],null,activeSetup\.garment\)/);
  assert.match(source, /const printTrialPreview=\(\)=>\{[\s\S]*?window\.print\(\)\};document\.querySelectorAll\('\.print-trial-trigger'\)\.forEach\(button=>button\.onclick=printTrialPreview\)/);
  assert.match(styles, /@media print\{[\s\S]*?\.trial-print-sheet\{display:block/);
});

test('public Studio reload restores temporary browser-session changes without calling it a saved design', async () => {
  const source = await readFile('public/app.js', 'utf8');

  assert.match(source, /createSessionStore\(sessionStorage\)/);
  assert.match(source, /publicState = freshDesign[\s\S]*?publicStore\?\.load\(\);\s*if\(!workflowDemo\)activeSetup=\{garment:publicState\.setup\.garment\}/);
  assert.match(source, /if \(location\.hash === '#studio'\) \{\s*await dashboard\(\);/);
  assert.match(source, /id="save-label"[^>]*>[\s\S]*?Browser-session changes · not saved to Pivot/);
  assert.match(source, /Trial changes are kept temporarily in this browser session/);
  assert.doesNotMatch(source, /Saved only in this browser|Saved in this browser/);
});

test('public trial identifies club assets as a visible locked feature', async () => {
  const [source, styles] = await Promise.all([
    readFile('public/app.js', 'utf8'),
    readFile('public/style.css', 'utf8')
  ]);

  assert.match(source, /class="rail-item locked-explainer" data-tool="club-images" aria-label="Club assets — locked" title="Club assets — locked; open for details"[\s\S]*?class="lock-badge"[\s\S]*?<small>Club assets <b class="locked-label">Locked<\/b><\/small>/);
  assert.match(source, /data-tool-panel="club-images"[\s\S]*?<strong>Club access required<\/strong>[\s\S]*?not connected in this trial/);
  assert.doesNotMatch(source, /href="\/club-login\/index\.html"/);
  assert.match(styles, /\.rail-item\.locked-explainer\{[^}]*cursor:pointer/);
  assert.doesNotMatch(styles, /\.rail-item\.locked-explainer\{[^}]*cursor:not-allowed/);
});

test('Studio text size controls share point values with canvas resizing', async () => {
  const source = await readFile('public/app.js', 'utf8');
  const styles = await readFile('public/style.css', 'utf8');

  assert.match(source, /const syncTextSizeControls=value=>\{document\.querySelector\('#text-font-size-slider'\)\.value=value;document\.querySelector\('#text-font-size'\)\.value=value\}/);
  assert.match(source, /if\(textSelected\)[\s\S]*?syncTextSizeControls\(selected\.fontSize/);
  assert.match(source, /document\.querySelector\('#text-font-size-slider'\)\.oninput=updateTextPointSize;document\.querySelector\('#text-font-size'\)\.onchange=updateTextPointSize/);
  assert.match(source, /if\(layer\.type==='text'\)\{layer\.fontSize=clampTrialTextSize\(Math\.round\(startSize\*ratio\)\);[\s\S]*?syncTextSizeControls\(layer\.fontSize\)/);
  assert.match(styles, /\.text-size-control input\[type=range\]\{grid-column:1;width:100%;accent-color:#0096D6\}/);
});

test('Studio viewport keeps clear useful actions without technical pan fields', async () => {
  const [source, styles] = await Promise.all([
    readFile('public/app.js', 'utf8'),
    readFile('public/style.css', 'utf8')
  ]);

  assert.match(source, /id="fit-view" class="fit-view-button" aria-label="Fit garment to view">Fit garment<\/button>/);
  assert.match(source, /id="reset-session" class="reset-design-button" aria-label="Reset design">Reset design<\/button>/);
  assert.match(styles, /\.view-tools \.fit-view-button,\.view-tools \.reset-design-button\{[^}]*border:1px solid #092C71[^}]*background:#fff[^}]*font-weight:900/);
  assert.doesNotMatch(source, /id="pan-[xy]"/);
  assert.doesNotMatch(source, /querySelector\('#pan-[xy]'\)/);
  assert.doesNotMatch(styles, /\.viewport-field/);
  assert.match(source, /class="studio-compact-actions"[\s\S]*?class="print-trial-button print-trial-trigger"[\s\S]*?class="save-icon-button locked-feature"/);
  assert.match(styles, /\.studio-compact-actions\{display:none/);
  assert.match(styles, /@media\(max-width:1050px\)\{[\s\S]*?\.studio-compact-actions\{display:flex/);
});

test('selected artwork explains deletion paths and required-number protection', async () => {
  const source = await readFile('public/app.js', 'utf8');
  const styles = await readFile('public/style.css', 'utf8');

  assert.match(source, /class="text-selection-heading"><span>Selected text<\/span><strong id="selected-text-name">PIVOT<\/strong>/);
  assert.match(source, /id="artwork"[^>]*><\/label><button id="text-colour-button"[\s\S]*?Choose text colour[\s\S]*?<button id="delete-layer" class="text-remove-button">Remove selected text<\/button><p id="text-delete-help"/);
  assert.match(source, /querySelector\('#text-colour-button'\)\.onclick=\(\)=>openColourPalette\('layer','artwork'\)/);
  assert.match(source, /el\.onclick=\(\)=>\{[\s\S]*?if\(layer\?\.type==='text'\)activateTool\('artwork'\)/);
  assert.match(source, /<details class="text-more-options">[\s\S]*?<div class="layer-actions text-secondary-actions"><button id="duplicate-layer">Duplicate selected text<\/button>/);
  assert.match(source, /id="image-delete-help" class="selection-delete-help" hidden>Press Delete or Backspace, right-click and choose Delete, or use Delete or Remove selected image\./);
  assert.match(source, /const requiredNumber=Boolean\(textSelected&&selected\.required&&selected\.role==='number'\)/);
  assert.match(source, /requiredNumber\?'Required basketball number'/);
  assert.match(source, /selectedTextName\.textContent=requiredNumber\?'Required number':selected\.text\|\|'Untitled text'/);
  assert.match(source, /deleteTextButton\.textContent=requiredNumber\?'Required number cannot be removed':'Remove selected text'/);
  assert.match(source, /textDeleteHelp\.textContent=requiredNumber\?'This required number cannot be removed\.':'Remove this selected text with the button, Delete or Backspace, or right-click\.'/);
  assert.match(source, /document\.querySelector\('#image-delete-help'\)\.hidden=!imageSelected/);
  assert.match(styles, /\.selection-delete-help\[hidden\]\{display:none\}/);
  assert.match(styles, /\.text-remove-button\{[^}]*width:100%[^}]*border:1px solid/);
});

test('Design guidance avoids a redundant section eyebrow', async () => {
  const source = await readFile('public/app.js', 'utf8');

  assert.match(source, /<h2 id="guidance-title">Design guidance<\/h2>/);
  assert.doesNotMatch(source, />Design support</);
  assert.doesNotMatch(source, /<aside class="design-guidance"[\s\S]*?<footer>/);
});

test('selected canvas text and images can be removed with the keyboard or visible actions', async () => {
  const source = await readFile('public/app.js', 'utf8');

  assert.match(source, /document\.onkeydown=e=>\{if\(!\['Delete','Backspace'\]\.includes\(e\.key\)/);
  assert.match(source, /\['INPUT','TEXTAREA','SELECT'\]\.includes\(document\.activeElement\?\.tagName\)/);
  assert.match(source, /const layer=sides\[side\]\.layers\.find\(item=>item\.id===selectedId\);if\(!layer\|\|layer\.required\|\|layer\.controlLevel==='fixed'\)return;e\.preventDefault\(\);deleteSelectedLayer\(\)/);
  assert.match(source, /data-context-action="delete" class="danger"/);
  assert.match(source, /id="delete-layer"[^>]*>Remove selected text<\/button>/);
  assert.match(source, /id="image-delete">Delete<\/button>/);
});

test('Pivot penguin library action is clear and provides visible removal', async () => {
  const [source, css] = await Promise.all([
    readFile('public/app.js', 'utf8'),
    readFile('public/style.css', 'utf8')
  ]);

  assert.match(source, /class="library-asset-preview"><img src="\/brand\/Pivot_Icon\.svg" alt=""><\/span><span><strong>Add Pivot penguin<\/strong>/);
  assert.doesNotMatch(source, /Play with the Pivot penguin/);
  assert.match(source, /id="library-image-delete"[^>]*>Remove selected image<\/button>/);
  assert.match(source, /document\.querySelector\('#library-image-delete'\)\.disabled=!imageSelected/);
  assert.match(source, /document\.querySelector\('#library-image-delete'\)\.onclick=deleteSelectedImage/);
  assert.match(source, /libraryAssetId:'pivot-penguin'[\s\S]*cropZoom:2\.15/);
  assert.match(css, /\.library-asset-preview\{[^}]*overflow:hidden/);
  assert.match(css, /\.library-asset-preview img\{width:88px;height:88px;[^}]*transform:scale\(2\.15\)/);
});

test('Design Studio upload instructions match the enforced one-megabyte limit', async () => {  const source = await readFile('public/app.js', 'utf8');

  assert.match(source, /Uploaded artwork stays in this browser\. Use PNG, JPEG or WebP up to 1 MB\./);
  assert.match(source, /PNG, JPEG or WebP · max 1 MB/);
  assert.doesNotMatch(source, /up to 5 MB|max 5 MB/);
});

test('Design Studio reports an upload rejected by the cumulative artwork limit', async () => {
  const source = await readFile('public/app.js', 'utf8');

  assert.match(source, /const result=dispatchPublic\(\{type:'addLayer',surface:currentSurfaceKey\(\),layer\}\);if\(!result\.ok\)\{message\.textContent=result\.error\.message;e\.target\.value='';return\}/);
});

test('Design Studio reports an image duplication rejected by the artwork limit', async () => {
  const source = await readFile('public/app.js', 'utf8');

  assert.match(source, /const result=dispatchPublic\(\{type:'duplicateLayer',surface:currentSurfaceKey\(\),layerId:selectedId,newLayerId\}\);if\(!result\.ok\)\{document\.querySelector\('#upload-message'\)\.textContent=result\.error\.message;return\}/);
});

test('choosing another pattern preserves the current design colours', async () => {
  const [source, css] = await Promise.all([
    readFile('public/app.js', 'utf8'),
    readFile('public/style.css', 'utf8')
  ]);
  const patternHandlerStart = source.lastIndexOf("document.querySelectorAll('[data-pattern]').forEach");
  const patternHandler = source.slice(patternHandlerStart, source.indexOf("[['pattern-scale','scale']", patternHandlerStart));
  const canvasPatternsStart = css.indexOf('.jersey.pattern-velocity:after');
  const canvasPatterns = css.slice(canvasPatternsStart, css.indexOf('.jersey:before', canvasPatternsStart));

  assert.match(patternHandler, /patch:\{pattern:key,scale:sides\[side\]\.scale,angle:sides\[side\]\.angle,density:100\}/);
  assert.doesNotMatch(patternHandler, /d\.colour=|d\.accent=|d\.third=|d\.fourth=|base:surface|setPalette/);
  assert.doesNotMatch(canvasPatterns, /#F4951D/i, 'canvas patterns must use selected colour variables rather than a Pivot default');
  assert.match(canvasPatterns, /pattern-chevron:after\{[^}]*var\(--third\)/);
  assert.match(canvasPatterns, /pattern-burst:after\{[^}]*var\(--third\)/);
});

test('canvas pattern clicks resolve the visible stripe or panel colour', async () => {
  const source = await readFile('public/app.js', 'utf8');

  assert.match(source, /import \{ resolvePatternColourTarget \} from '\.\/studio\/pattern-hit-testing\.js'/);
  assert.match(source, /resolvePatternColourTarget\(\{pattern:design\.pattern,x:e\.clientX-rect\.left,y:e\.clientY-rect\.top,width:rect\.width,height:rect\.height,scale:design\.scale,angle:design\.angle\}\)/);
});

test('pattern colour controls show only slots used by the selected pattern', async () => {
  const source = await readFile('public/app.js', 'utf8');

  assert.match(source, /const threeColourPatterns=new Set\(\['velocity','chevron','burst','gradient-three','stripes-mixed','bands','double-sash'\]\)/);
  assert.match(source, /const patternColourCount=pattern=>pattern==='clean'\?1:threeColourPatterns\.has\(pattern\)\?3:2/);
  assert.match(source, /data-pattern-colour-index="1"/);
  assert.match(source, /data-pattern-colour-index="4"/);
  assert.match(source, /data-pattern-colour-index="4"[\s\S]*class="pattern-controls"[\s\S]*id="pattern-scale"[\s\S]*id="pattern-angle"[\s\S]*id="pattern-density"[\s\S]*<\/fieldset>/);
  assert.match(source, /const scalablePatterns=new Set\(\[/);
  assert.match(source, /const rotatablePatterns=new Set\(\[/);
  assert.match(source, /document\.querySelector\('#pattern-scale'\)\.closest\('label'\)\.hidden=!scalablePatterns\.has\(design\.pattern\)/);
  assert.match(source, /document\.querySelector\('#pattern-angle'\)\.closest\('label'\)\.hidden=!rotatablePatterns\.has\(design\.pattern\)/);
  assert.match(source, /document\.querySelector\('#pattern-density'\)\.closest\('label'\)\.hidden=design\.pattern==='clean'/);
  assert.match(source, /button\.hidden=Number\(button\.dataset\.patternColourIndex\)>patternColourCount\(design\.pattern\)/);
  const css = await readFile('public/style.css', 'utf8');
  assert.match(css, /\.pattern-colours button\[hidden\]\{display:none\}/);
  assert.match(css, /\.pattern-controls label\[hidden\]\{display:none\}/);
});

test('pattern choices preview the colours selected for the current surface', async () => {  const [source, css] = await Promise.all([
    readFile('public/app.js', 'utf8'),
    readFile('public/style.css', 'utf8')
  ]);
  const swatchesStart = css.indexOf('.pattern i{');
  const swatches = css.slice(swatchesStart, css.indexOf('.pattern-colours{', swatchesStart));

  assert.match(source, /document\.querySelector\('\.patterns'\)\.style\.cssText=`--pattern-base:\$\{design\.base\};--pattern-accent:\$\{design\.accent\|\|d\.accent\};--pattern-third:\$\{design\.third\|\|d\.third\};--pattern-fourth:\$\{design\.fourth\|\|d\.fourth\}`/);
  assert.match(swatches, /var\(--pattern-base\)/);
  assert.match(swatches, /var\(--pattern-accent\)/);
  assert.match(swatches, /var\(--pattern-third\)/);
  assert.doesNotMatch(swatches, /#092C71|#0096D6|#F4951D/);
});

test('pattern colour choices open beside Patterns and return after selection', async () => {
  const [source, css] = await Promise.all([
    readFile('public/app.js', 'utf8'),
    readFile('public/style.css', 'utf8')
  ]);

  assert.match(source, /openColourPalette\(button\.dataset\.patternColourTarget,'patterns'\)/);
  assert.match(source, /if\(returnTool==='patterns'\)\{activateTool\('patterns'\);document\.querySelector\('\[data-tool-panel="colours"\]'\)\.classList\.add\('active','pattern-context-colour-picker'\)\}else activateTool\('colours'\)/);
  assert.match(source, /const restoreColourContext=\(\)=>\{if\(!colourReturnTool\)return;const tool=colourReturnTool;colourReturnTool=null;document\.querySelector\('\[data-tool-panel="colours"\]'\)\.classList\.remove\('pattern-context-colour-picker'\);activateTool\(tool\)\}/);
  assert.match(source, /document\.querySelectorAll\('\[data-swatch\]'\)\.forEach\(b=>b\.onclick=\(\)=>\{applyColour\(b\.dataset\.swatch\);restoreColourContext\(\)\}\)/);
  assert.match(source, /document\.querySelectorAll\('\[data-pattern\]'\)\.forEach\(b => b\.onclick = \(\) => \{\s*if\(colourReturnTool==='patterns'\)restoreColourContext\(\);/);
  assert.match(css, /\.pattern-context-colour-picker\{position:fixed/);
  assert.match(css, /\.pattern-context-colour-picker \.palette-target\{display:none\}/);
});

test('Colours tool prioritises controls without an introductory description', async () => {
  const source = await readFile('public/app.js', 'utf8');
  const coloursPanelStart = source.indexOf('<section class="tool-section" data-tool-panel="colours">');
  const coloursPanel = source.slice(coloursPanelStart, source.indexOf('</section>', coloursPanelStart));

  assert.doesNotMatch(coloursPanel, /class="panel-help"/);
  assert.doesNotMatch(coloursPanel, /Choose what to colour/);
});

test('Design Studio combines visible pattern colours with the exact HEX control', async () => {  const [source, css] = await Promise.all([
    readFile('public/app.js', 'utf8'),
    readFile('public/style.css', 'utf8')
  ]);

  assert.doesNotMatch(source, /class="custom-colour-row"/);
  assert.match(source, /class="pattern-colours pattern-colour-flyout"/);
  assert.match(css, /\.studio-status\{[^}]*position:absolute;[^}]*left:50%;[^}]*transform:translateX\(-50%\)/);
  assert.match(css, /\.pattern-colour-flyout\{position:fixed;z-index:30;left:416px;top:154px;width:270px/);
  assert.match(css, /@media\(max-width:720px\)\{\.pattern-colour-flyout\{position:static;width:auto/);
  assert.match(source, /class="hex-editor"><input id="dock-colour" type="color"[^>]*aria-label="Choose exact colour"[^>]*><span>#<\/span><input id="precise-hex"/);
  assert.match(source, /document\.querySelector\('#dock-colour'\)\.oninput=e=>applyColour\(e\.target\.value\)/);
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

test('public Studio lets invited testers submit feedback without leaving the Studio', async () => {
  const source = await readFile('public/app.js', 'utf8');

  assert.match(source, /data-tool="feedback" aria-label="Share feedback"[\s\S]*?<small>Feedback<\/small>/);
  assert.match(source, /data-tool-panel="feedback"[\s\S]*?<h3>Share feedback<\/h3>[\s\S]*?<form id="studio-feedback-form"[\s\S]*?id="studio-feedback-message"[\s\S]*?id="studio-feedback-email"[\s\S]*?type="submit"[\s\S]*?id="studio-feedback-status"/);
  assert.doesNotMatch(source, /name="category"|designName:publicState\.designName/);
  assert.match(source, /import \{ describeStudioView, feedbackFailureMessage, sendStudioFeedback \} from '\.\/studio\/studio-feedback-form\.js'/);
  assert.match(source, /await sendStudioFeedback\(\{[\s\S]*?navigator\.userAgent/);
  assert.match(source, /catch\(error\)\{status\.className='feedback-error';status\.textContent=feedbackFailureMessage\(error\)\}/);
  assert.match(source, /Your feedback will help us improve this trial\. Garment, current view and browser details are included automatically\. Add your email only if you’d like a reply\./);
  assert.doesNotMatch(source, /mailto:/i);
});

test('Studio feedback modules are included in the repository syntax gate', async () => {
  const manifest = JSON.parse(await readFile('package.json', 'utf8'));

  for (const module of [
    'src/studio-feedback.js',
    'src/studio-feedback-delivery.js',
    'public/studio/studio-feedback-form.js'
  ]) assert.match(manifest.scripts.check, new RegExp(`node --check ${module.replaceAll('.', '\\.')}`));
});

test('tester release exposes only the public Studio hash route', async () => {
  const [entry, studio] = await Promise.all([
    readFile('public/website/home-entry.js', 'utf8'),
    readFile('public/app.js', 'utf8')
  ]);

  assert.match(entry, /const studioRoutes = new Set\(\['#studio'\]\)/);
  assert.doesNotMatch(entry, /#workflow-demo|#admin/);
  assert.doesNotMatch(studio, /location\.hash[\s\S]{0,100}#workflow-demo|location\.hash[\s\S]{0,100}#admin/);
  assert.match(studio, /class="studio-logo-brand"[^>]*><img src="\/brand\/Pivot_Icon\.svg" alt="Pivot Teamwear">/);
  assert.doesNotMatch(studio, /Return to home|studio-home-disabled|class="studio-(?:logo-)?home"/);
});

test('homepage defers Design Studio code and styles until a Studio route is selected', async () => {
  const [html, entry, homeCss] = await Promise.all([
    readFile('public/index.html', 'utf8'),
    readFile('public/website/home-entry.js', 'utf8'),
    readFile('public/website/home.css', 'utf8')
  ]);

  assert.match(html, /href="\/website\/home\.css\?v=20260805-5"/);
  assert.doesNotMatch(html, /href="\/style\.css/);
  assert.match(html, /src="\/website\/home-entry\.js\?v=20260806-11"/);
  assert.match(homeCss, /#home\s*\{\s*scroll-margin-top:\s*72px;\s*\}/);
  assert.match(homeCss, /@media \(max-width: 720px\)[\s\S]*#home\s*\{\s*scroll-margin-top:\s*200px;\s*\}/);
  assert.doesNotMatch(html, /src="\/app\.js/);
  assert.match(entry, /studioRoutes\.has\(location\.hash\)/);
  assert.match(entry, /loadStylesheet\('\/style\.css\?v=20260807-1', 'data-studio-styles'\)/);
  assert.match(entry, /loadStylesheet\('\/studio\/fonts\.css\?v=20260805-1', 'data-studio-fonts'\)/);
  assert.match(entry, /await loadStudioStyles\(\)\.catch/);
  assert.match(entry, /await import\('\.\.\/app\.js\?v=20260807-1'\)/);
  assert.doesNotMatch(homeCss, /\.design-setup|\.workspace|\.editor-body/);
  assert.match(homeCss, /@media \(max-width: 720px\)[\s\S]*nav \{[\s\S]*flex-wrap: wrap;[\s\S]*justify-content: center;/);
  assert.doesNotMatch(homeCss, /overflow-x:\s*auto/);
});

test('customer-facing copy consistently names the Pivot Design Studio', async () => {
  const customerFacingFiles = [
    'public/website/home-page.js',
    'public/app.js',
    'public/studio/studio-state.js'
  ];

  for (const path of customerFacingFiles) {
    const source = await readFile(path, 'utf8');
    assert.doesNotMatch(source, /\bdemonstrator\b/i, path);
  }
});
