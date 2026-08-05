export function getCustomerStoreTheme(requestedTheme) {
  return requestedTheme === 'dark' ? 'dark' : 'light';
}

if (typeof document !== 'undefined') {
  const storageKey = 'pivot-customer-store-theme';
  const root = document.documentElement;
  const buttons = [...document.querySelectorAll('[data-theme]')];
  let storedTheme = 'light';

  try {
    storedTheme = localStorage.getItem(storageKey) ?? 'light';
  } catch {
    storedTheme = 'light';
  }

  const applyTheme = requestedTheme => {
    const theme = getCustomerStoreTheme(requestedTheme);
    root.dataset.storeTheme = theme;
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.theme === theme));
    }
    return theme;
  };

  applyTheme(storedTheme);

  for (const button of buttons) {
    button.addEventListener('click', () => {
      const theme = applyTheme(button.dataset.theme);
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // The selected theme still applies for the current page view.
      }
    });
  }
}
