export function getStoreTheme(requestedTheme) {
  const theme = requestedTheme === 'dark' ? 'dark' : 'light';
  return {
    theme,
    lightPressed: theme === 'light',
    darkPressed: theme === 'dark'
  };
}

export function getReviewPalette(requestedPrimary, requestedAccent) {
  const validHex = value => /^#[0-9A-F]{6}$/i.test(String(value));
  return {
    primary: validHex(requestedPrimary) ? requestedPrimary.toUpperCase() : '#092C71',
    accent: validHex(requestedAccent) ? requestedAccent.toUpperCase() : '#0096D6'
  };
}

if (typeof document !== 'undefined') {
  const root = document.documentElement;
  const buttons = [...document.querySelectorAll('[data-theme]')];
  const colourInputs = [...document.querySelectorAll('[data-club-colour]')];

  for (const button of buttons) {
    button.addEventListener('click', () => {
      const state = getStoreTheme(button.dataset.theme);
      root.dataset.storeTheme = state.theme;
      for (const candidate of buttons) {
        candidate.setAttribute('aria-pressed', String(candidate.dataset.theme === state.theme));
      }
    });
  }

  for (const input of colourInputs) {
    input.addEventListener('input', () => {
      const requested = Object.fromEntries(colourInputs.map(candidate => [candidate.dataset.clubColour, candidate.value]));
      const palette = getReviewPalette(requested.primary, requested.accent);
      root.style.setProperty('--club-primary', palette.primary);
      root.style.setProperty('--club-accent', palette.accent);
    });
  }
}
