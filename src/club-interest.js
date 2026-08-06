const requiredFields = ['contactName', 'clubName', 'email', 'sport', 'association', 'locality'];
const optionalFields = ['otherSport', 'otherAssociation', 'otherLocality'];
const limits = Object.freeze({ contactName: 100, clubName: 160, email: 254, sport: 100, association: 180, locality: 120, otherSport: 100, otherAssociation: 180, otherLocality: 120 });

const clean = (value, maximum) => typeof value === 'string' ? value.trim().slice(0, maximum + 1) : '';

export function validateClubInterest(input) {
  const submission = Object.fromEntries(
    [...requiredFields, ...optionalFields].map(field => [field, clean(input?.[field], limits[field])])
  );

  if (Object.values(submission).some(value => /[\u0000-\u001F\u007F]/.test(value))) {
    return { ok: false, code: 'INVALID_SUBMISSION' };
  }
  if (requiredFields.some(field => !submission[field]) || Object.entries(submission).some(([field, value]) => value.length > limits[field])) {
    return { ok: false, code: 'INVALID_SUBMISSION' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    return { ok: false, code: 'INVALID_SUBMISSION' };
  }
  for (const [choice, detail] of [['sport', 'otherSport'], ['association', 'otherAssociation'], ['locality', 'otherLocality']]) {
    if (submission[choice] === 'Other' && !submission[detail]) return { ok: false, code: 'INVALID_SUBMISSION' };
  }

  return { ok: true, submission };
}
