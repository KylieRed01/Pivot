const family = (id, label, cssFamily, version, styles) => Object.freeze({
  id,
  label,
  cssFamily,
  version,
  developmentOnly: true,
  productionApproved: false,
  styles: Object.freeze(styles.map(style => Object.freeze({ ...style })))
});

export const DEVELOPMENT_FONT_FAMILIES = Object.freeze([
  family('anton', 'Anton', 'Pivot Anton', '2.116', [
    { id: 'anton-regular', label: 'Regular', weight: 400, basketballCandidate: true }
  ]),
  family('bebas-neue', 'Bebas Neue', 'Pivot Bebas Neue', '2.000', [
    { id: 'bebas-neue-regular', label: 'Regular · all caps', weight: 400 }
  ]),
  family('oswald', 'Oswald', 'Pivot Oswald', '4.103', [
    { id: 'oswald-regular', label: 'Regular', weight: 400 },
    { id: 'oswald-semibold', label: 'SemiBold', weight: 600 }
  ]),
  family('league-spartan', 'League Spartan', 'Pivot League Spartan', '2.220', [
    { id: 'league-spartan-regular', label: 'Regular', weight: 400 },
    { id: 'league-spartan-bold', label: 'Bold', weight: 700 }
  ]),
  family('barlow-condensed', 'Barlow Condensed', 'Pivot Barlow Condensed', '1.408', [
    { id: 'barlow-condensed-regular', label: 'Regular', weight: 400 },
    { id: 'barlow-condensed-semibold', label: 'SemiBold', weight: 600 },
    { id: 'barlow-condensed-bold', label: 'Bold', weight: 700 }
  ]),
  family('montserrat', 'Montserrat', 'Pivot Montserrat', '9.000', [
    { id: 'montserrat-medium', label: 'Medium', weight: 500 },
    { id: 'montserrat-bold', label: 'Bold', weight: 700 }
  ]),
  family('archivo-black', 'Archivo Black', 'Pivot Archivo Black', '1.006', [
    { id: 'archivo-black-regular', label: 'Regular', weight: 400 }
  ]),
  family('bitter', 'Bitter', 'Pivot Bitter', '3.021', [
    { id: 'bitter-regular', label: 'Regular', weight: 400 },
    { id: 'bitter-bold', label: 'Bold', weight: 700 }
  ]),
  family('graduate', 'Graduate', 'Pivot Graduate', '1.100', [
    { id: 'graduate-regular', label: 'Regular', weight: 400 }
  ]),
  family('pacifico', 'Pacifico', 'Pivot Pacifico', '3.001', [
    { id: 'pacifico-regular', label: 'Regular', weight: 400 }
  ])
]);

const choices = Object.freeze(DEVELOPMENT_FONT_FAMILIES.flatMap(font => font.styles.map(style => Object.freeze({
  ...style,
  familyId: font.id,
  familyLabel: font.label,
  cssFamily: font.cssFamily,
  version: font.version,
  developmentOnly: font.developmentOnly,
  productionApproved: font.productionApproved,
  basketballCandidate: Boolean(style.basketballCandidate)
}))));

const byId = new Map(choices.map(choice => [choice.id, choice]));

export const DEFAULT_TEXT_FONT_ID = 'league-spartan-regular';
export const DEFAULT_BASKETBALL_NUMBER_FONT_ID = 'anton-regular';

export function listFontChoices() {
  return choices;
}

export function getFontChoice(id) {
  return byId.get(id) ?? byId.get(DEFAULT_TEXT_FONT_ID);
}

export function fontStyle(id) {
  const choice = getFontChoice(id);
  return `font-family:${JSON.stringify(choice.cssFamily)},Arial,sans-serif;font-weight:${choice.weight}`;
}

export function renderDevelopmentFontOptions(selectedId) {
  return DEVELOPMENT_FONT_FAMILIES.map(font => {
    const options = font.styles.map(style => `<option value="${style.id}"${style.id === selectedId ? ' selected' : ''}>${font.label} — ${style.label} · Not production validated</option>`).join('');
    return `<optgroup label="${font.label}">${options}</optgroup>`;
  }).join('');
}
