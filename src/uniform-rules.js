export const uniformRuleProfile = Object.freeze({
  id: 'basketball-fiba-2024-baseline',
  status: 'partial',
  effectiveDate: '2024-10-01',
  source: {
    authority: 'FIBA',
    document: 'Official Basketball Rules 2024',
    section: 'Article 4.3.3 — Uniforms',
    url: 'https://www.fiba.basketball/documents'
  },
  authorityOrder: [
    'Bendigo Basketball Association competition rules',
    'Basketball Victoria requirements',
    'Basketball Australia rules',
    'FIBA Official Basketball Rules',
    'Supplier garment constraints'
  ],
  number: {
    allowed: ['0', '00', ...Array.from({ length: 99 }, (_, index) => String(index + 1))],
    frontMinimumHeightCm: 10,
    backMinimumHeightCm: 20,
    minimumStrokeWidthCm: 2,
    minimumLogoAndAdvertisingClearanceCm: 5,
    contrastingColourRequired: true,
    frontAndBackRequired: true
  },
  enforcement: {
    allowedNumber: 'enforced',
    physicalDimensions: 'supplier-template-required',
    placement: 'manual-review-required',
    contrast: 'manual-review-required'
  },
  missingAuthorities: [
    'Current Bendigo Basketball Association competition bylaws and uniform policy',
    'Current Basketball Victoria uniform requirements',
    'Current Basketball Australia uniform requirements',
    'Supplier template dimensions, print scale and number-safe zones'
  ]
});

export function validateUniformNumber(value) {
  const number = String(value).trim();
  return {
    valid: uniformRuleProfile.number.allowed.includes(number),
    number,
    profileId: uniformRuleProfile.id
  };
}
