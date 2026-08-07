import test from 'node:test';
import assert from 'node:assert/strict';
import { availableTextWidth, pointInSafeArea, textFitsBox, textFitsSafeArea } from '../public/studio/safe-area.js';

test('centred text is constrained by the nearest edge of the editable safe area', () => {
  assert.equal(availableTextWidth({ boundaryWidth: 300, anchorPercent: 50, alignment: 'center' }), 300);
  assert.equal(availableTextWidth({ boundaryWidth: 300, anchorPercent: 25, alignment: 'center' }), 150);
  assert.equal(textFitsSafeArea({ contentWidth: 151, boundaryWidth: 300, anchorPercent: 25, alignment: 'center' }), false);
});

test('left- and right-aligned text use the remaining safe-area width', () => {
  assert.equal(availableTextWidth({ boundaryWidth: 300, anchorPercent: 20, alignment: 'left' }), 240);
  assert.equal(availableTextWidth({ boundaryWidth: 300, anchorPercent: 80, alignment: 'right' }), 240);
  assert.equal(textFitsSafeArea({ contentWidth: 240, boundaryWidth: 300, anchorPercent: 20, alignment: 'left' }), true);
});

test('invalid safe-area measurements fail closed', () => {
  assert.equal(textFitsSafeArea({ contentWidth: 10, boundaryWidth: 0, anchorPercent: 50 }), false);
  assert.equal(textFitsSafeArea({ contentWidth: Number.NaN, boundaryWidth: 300, anchorPercent: 50 }), false);
});

test('drag coordinates are measured in the editable safe area, not the garment', () => {
  const rect = { left: 100, top: 200, width: 300, height: 400 };
  assert.deepEqual(pointInSafeArea({ clientX: 250, clientY: 300, rect }), { x: 50, y: 25 });
  assert.deepEqual(pointInSafeArea({ clientX: 50, clientY: 700, rect }), { x: 0, y: 100 });
});

test('rendered text must fit its real text box', () => {
  assert.equal(textFitsBox({ contentWidth: 180, boxWidth: 180 }), true);
  assert.equal(textFitsBox({ contentWidth: 181, boxWidth: 180 }), false);
  assert.equal(textFitsBox({ contentWidth: 10, boxWidth: 0 }), false);
});
