import test from 'node:test';
import assert from 'node:assert/strict';
import { renderJerseyPreview } from '../public/jersey-preview.js';

const palette = {
  colour: '#092C71',
  accent: '#0096D6',
  third: '#F4951D',
  fourth: '#FFFFFF'
};

const design = {
  base: '#092C71',
  accent: '#0096D6',
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
    { id: 'wordmark', type: 'text', text: 'A&B <Club>', colour: '#FFFFFF', x: 50, y: 40, scale: 1, rotation: 0, alignment: 'center', letterSpacing: 0, lineSpacing: 1 },
    { id: 'crest', type: 'image', name: 'Club crest', src: '/brand/Pivot_Icon.svg', x: 50, y: 27, scale: 0.65, rotation: 0, cropZoom: 1, cropX: 50, cropY: 50, opacity: 1, flipX: false, flipY: false }
  ]
};

test('jersey preview renders the selected surface without exposing text as HTML', () => {
  const html = renderJerseyPreview(palette, design, 'wordmark');

  assert.match(html, /class="jersey pattern-velocity"/);
  assert.match(html, /class="art-layer\s+ selected"/);
  assert.match(html, /A&amp;B &lt;Club&gt;/);
  assert.doesNotMatch(html, /A&B <Club>/);
  assert.match(html, /Preview only · placeholder template/);
});
