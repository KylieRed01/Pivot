import test from 'node:test';
import assert from 'node:assert/strict';
import { uniformRuleProfile, validateUniformNumber } from '../src/uniform-rules.js';

test('FIBA baseline records number dimensions without pretending they are enforceable pixels', () => {
  assert.equal(uniformRuleProfile.number.frontMinimumHeightCm, 10);
  assert.equal(uniformRuleProfile.number.backMinimumHeightCm, 20);
  assert.equal(uniformRuleProfile.number.minimumStrokeWidthCm, 2);
  assert.equal(uniformRuleProfile.number.minimumLogoAndAdvertisingClearanceCm, 5);
  assert.equal(uniformRuleProfile.enforcement.physicalDimensions, 'supplier-template-required');
});

test('FIBA baseline accepts configured player numbers only', () => {
  assert.equal(validateUniformNumber('00').valid, true);
  assert.equal(validateUniformNumber('99').valid, true);
  assert.equal(validateUniformNumber('100').valid, false);
  assert.equal(validateUniformNumber('PIVOT').valid, false);
});
