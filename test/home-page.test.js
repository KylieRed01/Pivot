import test from 'node:test';
import assert from 'node:assert/strict';
import { renderHomePage } from '../public/home-page.js';

test('public home page renders the approved website experience', () => {
  const root = { innerHTML: '' };

  renderHomePage(root);

  assert.match(root.innerHTML, /Built for action\.<br><em>Priced to play\.<\/em>/);
  assert.match(root.innerHTML, /Quality custom teamwear that helps clubs and players get in the game\./);
  assert.match(root.innerHTML, /href="#studio"/);
  assert.match(root.innerHTML, /data-help-category="faqs"/);
  assert.match(root.innerHTML, /data-help-category="studio"/);
  assert.match(root.innerHTML, /data-help-category="club"/);
});
