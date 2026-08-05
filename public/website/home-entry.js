import { ensureHomePage } from './home-page.js';

const app = document.querySelector('#app');
const studioRoutes = new Set(['#studio', '#workflow-demo', '#admin']);

function loadStylesheet(href, dataAttribute) {
  if (document.querySelector(`link[${dataAttribute}]`)) return Promise.resolve();
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.setAttribute(dataAttribute, '');
  return new Promise((resolve, reject) => {
    link.addEventListener('load', resolve, { once: true });
    link.addEventListener('error', reject, { once: true });
    document.head.append(link);
  });
}

function loadStudioStyles() {
  return Promise.all([
    loadStylesheet('/style.css?v=20260805-14', 'data-studio-styles'),
    loadStylesheet('/studio/fonts.css?v=20260805-1', 'data-studio-fonts')
  ]);
}

async function route() {
  if (studioRoutes.has(location.hash)) {
    window.removeEventListener('hashchange', route);
    await loadStudioStyles().catch(() => {});
    await import('../app.js?v=20260805-6');
    return;
  }

  ensureHomePage(app);
}

window.addEventListener('hashchange', route);
route();
