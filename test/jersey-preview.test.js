import test from 'node:test';
import assert from 'node:assert/strict';
import { renderJerseyPreview } from '../public/studio/jersey-preview.js';

const palette = {
  colour: '#092C71',
  accent: '#0096D6',
  third: '#F4951D',
  fourth: '#FFFFFF'
};

const design = {
  base: '#092C71',
  accent: '#F4951D',
  pattern: 'velocity',
  scale: 48,
  angle: -28,
  density: 32,
  gradient: false,
  gradientColour: '#0096D6',
  gradientAngle: 135,
  neck: '#FFFFFF',
  armTrim: '#0096D6',
  layers: [
    { id: 'wordmark', type: 'text', text: 'A&B <Club>', fontId: 'graduate-regular', colour: '#FFFFFF', x: 50, y: 40, scale: 1, fontSize: 24, rotation: 0, alignment: 'center', letterSpacing: 0, lineSpacing: 1 },
    { id: 'crest', type: 'image', name: 'Club crest', src: '/brand/Pivot_Icon.svg', x: 50, y: 27, scale: 0.65, rotation: 0, cropZoom: 1, cropX: 50, cropY: 50, opacity: 1, flipX: false, flipY: false }
  ]
};

test('jersey preview renders the selected surface without exposing text as HTML', () => {
  const html = renderJerseyPreview(palette, design, 'wordmark');

  assert.match(html, /class="jersey garment-basketball-jersey pattern-velocity"/);
  assert.match(html, /--trim:#F4951D/);
  assert.match(html, /class="art-layer\s+ selected"/);
  assert.match(html, /--anchor-x:-50%/);
  assert.match(html, /A&amp;B &lt;Club&gt;/);
  assert.doesNotMatch(html, /A&B <Club>/);
  assert.match(html, /font-family:&quot;Pivot Graduate&quot;,Arial,sans-serif;font-weight:400/);
  assert.match(html, /font-size:24pt/);
  assert.doesNotMatch(html, /Preview only · placeholder template|placeholder-badge/);
});

test('canvas text layers, including basketball numbers, expose direct in-place editing', () => {
  const html = renderJerseyPreview(palette, {
    ...design,
    layers: [
      design.layers[0],
      { ...design.layers[0], id: 'number', role: 'number', text: '24', x: 50 },
      design.layers[1]
    ]
  }, null);

  assert.match(html, /class="art-layer number-layer [^"]*" data-layer-id="number"/);
  assert.match(html, /data-layer-id="wordmark"/);
  assert.match(html, /aria-label="Basketball number 24\. Press Enter to edit on the garment"/);
  assert.match(html, /data-inline-text="true"/);
  assert.match(html, /class="art-layer-text">24<\/span>/);
  assert.match(html, /--text-box-limit:100%/);
  assert.doesNotMatch(html, /data-canvas-text-edit|placeholder-badge/);
});

test('approved Pivot logos render without cropping or altering the wordmark', () => {
  const html = renderJerseyPreview(palette, {
    ...design,
    layers: [{
      id: 'pivot-logo', type: 'image', role: 'artwork', libraryAssetId: 'pivot-logo',
      name: 'Pivot Teamwear logo', src: '/brand/Pivot_Logo_Transparent.svg',
      x: 50, y: 28, scale: 1.35, rotation: 0
    }]
  }, null);

  assert.match(html, /class="art-layer\s+image-layer pivot-logo-layer\s+"/);
  assert.match(html, /src="\/brand\/Pivot_Logo_Transparent\.svg"/);
});

test('text alignment anchors content inside its selected position', () => {
  const left = renderJerseyPreview(palette, {
    ...design,
    layers: [{ ...design.layers[0], alignment: 'left', x: 12 }]
  }, null);
  const right = renderJerseyPreview(palette, {
    ...design,
    layers: [{ ...design.layers[0], alignment: 'right', x: 88 }]
  }, null);

  assert.match(left, /--x:12%;[^"]*--anchor-x:0%/);
  assert.match(right, /--x:88%;[^"]*--anchor-x:-100%/);
});

test('preview renders original generic trial garment silhouettes', () => {
  const shirt = renderJerseyPreview(palette, design, null, 'generic-t-shirt');
  const hoodie = renderJerseyPreview(palette, design, null, 'generic-hoodie');

  assert.match(shirt, /garment-generic-t-shirt/);
  assert.match(hoodie, /garment-generic-hoodie/);
  assert.match(hoodie, /class="garment-hood"/);
  assert.doesNotMatch(shirt, /class="armhole/);
  assert.doesNotMatch(hoodie, /class="armhole/);
});
