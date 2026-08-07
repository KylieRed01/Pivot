import test from 'node:test';
import assert from 'node:assert/strict';
import { uniformRuleProfile, validateUniformNumber } from '../src/uniform-rules.js';

test('adopted BBA baseline records exact number dimensions without inventing a stroke-width rule', () => {
  assert.equal(uniformRuleProfile.id, 'basketball-bba-2021-adopted-baseline');
  assert.equal(uniformRuleProfile.number.frontMinimumHeightCm, 10);
  assert.equal(uniformRuleProfile.number.backMinimumHeightCm, 20);
  assert.equal(uniformRuleProfile.number.minimumWidthCm, 2);
  assert.match(uniformRuleProfile.number.widthMeaning, /not interpreted as stroke width/i);
  assert.equal(uniformRuleProfile.number.minimumLogoAndAdvertisingClearanceCm, 5);
  assert.equal(uniformRuleProfile.enforcement.physicalDimensions, 'supplier-template-required');
});

test('BBA product baseline uses one light/dark reversible jersey with one player number', () => {
  assert.equal(uniformRuleProfile.garment.format, 'single-reversible-jersey');
  assert.deepEqual(uniformRuleProfile.garment.faces, ['light', 'dark']);
  assert.equal(uniformRuleProfile.garment.samePlayerNumberAcrossFaces, true);
  assert.equal(uniformRuleProfile.garment.eachFaceMustComply, true);
});

test('BBA competition baseline accepts its maximum number set without imposing a club policy', () => {
  assert.equal(validateUniformNumber('0').valid, true);
  assert.equal(validateUniformNumber('00').valid, true);
  assert.equal(validateUniformNumber('99').valid, true);
  assert.equal(validateUniformNumber('100').valid, false);
  assert.equal(validateUniformNumber('PIVOT').valid, false);
  assert.equal(uniformRuleProfile.enforcement.clubNumberRestrictions, 'product-workflow-required');
});
