import { ensureHomePage } from './home-page.js';

const app = document.querySelector('#app');
const studioRoutes = new Set(['#studio', '#workflow-demo', '#admin']);

function loadStudioStyles() {
  const existing = document.querySelector('link[data-studio-styles]');
  if (existing) return Promise.resolve();

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/style.css?v=20260805-9';
  link.dataset.studioStyles = '';

  return new Promise((resolve, reject) => {
    link.addEventListener('load', resolve, { once: true });
    link.addEventListener('error', reject, { once: true });
    document.head.append(link);
  });
}

async function route() {
  if (studioRoutes.has(location.hash)) {
    window.removeEventListener('hashchange', route);
    await loadStudioStyles().catch(() => {});
    await import('../app.js');
    return;
  }

  ensureHomePage(app);
}

window.addEventListener('hashchange', route);
route();
