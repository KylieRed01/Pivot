import test from 'node:test';
import assert from 'node:assert/strict';
import { resolvePatternColourTarget } from '../public/studio/pattern-hit-testing.js';

const targetAt = (pattern, x, y, overrides = {}) => resolvePatternColourTarget({
  pattern,
  x,
  y,
  width: 330,
  height: 390,
  scale: 48,
  angle: 0,
  ...overrides
});

test('direct canvas selection distinguishes horizontal and vertical stripe colours', () => {
  assert.equal(targetAt('hoops', 165, 30), 'accent');
  assert.equal(targetAt('hoops', 165, 52), 'colour');
  assert.equal(targetAt('pinstripe', 20, 195, { scale: 18 }), 'colour');
  assert.equal(targetAt('pinstripe', 24, 195, { scale: 18 }), 'accent');
  assert.equal(targetAt('stripes-wide', 20, 195, { scale: 18 }), 'colour');
  assert.equal(targetAt('stripes-wide', 30, 195, { scale: 18 }), 'accent');
});

test('direct canvas selection distinguishes all mixed stripe and band colours', () => {
  assert.equal(targetAt('stripes-mixed', 10, 195), 'colour');
  assert.equal(targetAt('stripes-mixed', 35, 195), 'accent');
  assert.equal(targetAt('stripes-mixed', 17, 195), 'third');
  assert.equal(targetAt('bands', 165, 100), 'colour');
  assert.equal(targetAt('bands', 165, 125), 'accent');
  assert.equal(targetAt('bands', 165, 172), 'third');
});

test('direct canvas selection distinguishes dots from their background', () => {
  assert.equal(targetAt('halftone', 21, 3), 'accent');
  assert.equal(targetAt('halftone', 0, 0), 'colour');
  assert.equal(targetAt('dots-fine', 1, 7), 'accent');
  assert.equal(targetAt('dots-fine', 5, 3), 'colour');
  assert.equal(targetAt('dots-large', 21, 3), 'accent');
  assert.equal(targetAt('dots-large', 0, 0), 'colour');
  assert.equal(targetAt('dot-fade', 7, 7), 'accent');
  assert.equal(targetAt('dot-fade', 0, 0), 'colour');
});

test('direct canvas selection distinguishes simple panel pattern colours', () => {
  assert.equal(targetAt('split', 100, 195), 'colour');
  assert.equal(targetAt('split', 230, 195), 'accent');
  assert.equal(targetAt('side-panels', 30, 195), 'accent');
  assert.equal(targetAt('side-panels', 165, 195), 'colour');
  assert.equal(targetAt('shoulders', 165, 50), 'accent');
  assert.equal(targetAt('shoulders', 165, 195), 'colour');
});
