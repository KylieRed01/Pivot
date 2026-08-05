import { renderHomePage } from './home-page.js';

const app = document.querySelector('#app');
const studioRoutes = new Set(['#studio', '#workflow-demo', '#admin']);

async function route() {
  if (studioRoutes.has(location.hash)) {
    window.removeEventListener('hashchange', route);
    await import('../app.js');
    return;
  }

  renderHomePage(app);
}

window.addEventListener('hashchange', route);
route();
