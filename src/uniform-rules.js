export const uniformRuleProfile = Object.freeze({
  id: 'basketball-bba-2021-adopted-baseline',
  status: 'adopted-baseline',
  adoptedDate: '2026-08-07',
  sourceDate: '2021-09',
  source: {
    authority: 'Bendigo Basketball Association',
    document: 'General By-Laws, September 2021',
    section: 'Section 20 — Player Uniforms',
    url: 'https://bendigobasketball.com.au/wp-content/uploads/2021/09/BBA_By-Laws-2021-September.pdf'
  },
  authorityOrder: [
    'Bendigo Basketball Association competition rules',
    'FIBA Official Basketball Rules where BBA has not made a local modification',
    'Applicable club restrictions captured for the jersey',
    'Supplier garment constraints'
  ],
  garment: {
    format: 'single-reversible-jersey',
    faces: ['light', 'dark'],
    lightFacePreference: 'white',
    samePlayerNumberAcrossFaces: true,
    eachFaceMustComply: true
  },
  number: {
    competitionAllowed: ['0', '00', ...Array.from({ length: 99 }, (_, index) => String(index + 1))],
    frontMinimumHeightCm: 10,
    backMinimumHeightCm: 20,
    minimumWidthCm: 2,
    widthMeaning: 'BBA wording: numbers shall be at least 2 cm wide; not interpreted as stroke width',
    minimumLogoAndAdvertisingClearanceCm: 5,
    plainSolidColourRequired: true,
    contrastingColourRequired: true,
    frontAndBackRequired: true,
    uniqueWithinTeamRequired: true
  },
  enforcement: {
    competitionAllowedNumber: 'enforced',
    clubNumberRestrictions: 'product-workflow-required',
    physicalDimensions: 'supplier-template-required',
    placement: 'manual-review-required',
    contrast: 'manual-review-required'
  },
  reviewTriggers: [
    'Bendigo Basketball Association publishes replacement competition or uniform rules',
    'FIBA changes a corresponding uniform requirement',
    'The approved jersey product or supplier template changes'
  ]
});

export function validateUniformNumber(value) {
  const number = String(value).trim();
  return {
    valid: uniformRuleProfile.number.competitionAllowed.includes(number),
    number,
    profileId: uniformRuleProfile.id
  };
}
