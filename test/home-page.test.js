import test from 'node:test';
import assert from 'node:assert/strict';
import { renderHomePage } from '../public/website/home-page.js';

test('public home page renders the approved website experience', () => {
  const root = { innerHTML: '' };

  renderHomePage(root);

  assert.match(root.innerHTML, /Built for action\.<br><em>Priced to play\.<\/em>/);
  assert.match(root.innerHTML, /Quality custom teamwear that helps clubs and players get in the game\./);
  assert.match(root.innerHTML, /href="#studio"/);
  assert.match(root.innerHTML, />Game On\. /);
  assert.doesNotMatch(root.innerHTML, /Game On\. Start Designing/);
  assert.doesNotMatch(root.innerHTML, /Design Studio trial:/);
  assert.doesNotMatch(root.innerHTML, /Your kit\. Your identity\./);
  assert.match(root.innerHTML, /Quality teamwear made simple, affordable and reliable for community sport\./);
  assert.match(root.innerHTML, /data-help-category="faqs"/);
  assert.match(root.innerHTML, /data-help-category="studio"/);
  assert.match(root.innerHTML, /data-help-category="club"/);
  assert.match(root.innerHTML, /Pivot is currently in pilot to test a simpler teamwear experience/);
  assert.match(root.innerHTML, /our interactive Pivot Design Studio/);
  assert.match(root.innerHTML, /<span class="eyebrow">Contact us<\/span>/);
  assert.match(root.innerHTML, /id="open-club-interest"[^>]*aria-expanded="false"/);
  assert.match(root.innerHTML, /class="club-interest-form" id="club-interest-form"[^>]*hidden/);
  assert.match(root.innerHTML, /\*<\/span> Required fields/);
  assert.match(root.innerHTML, /Contact name <b class="required-mark"/);
  assert.match(root.innerHTML, /League or association <b class="required-mark"/);
  assert.match(root.innerHTML, /Club suburb or postcode <b class="required-mark"/);
  assert.match(root.innerHTML, /Register My Club’s Interest/);
  assert.match(root.innerHTML, /class="linked-interest-fields"/);
  assert.match(root.innerHTML, /mailto:hello@pivotteamwear\.com\?subject=Club%20Interest/);
  assert.match(root.innerHTML, /id="club-interest-sport"/);
  assert.match(root.innerHTML, /id="club-interest-association"/);
  assert.match(root.innerHTML, /id="club-interest-other-sport"/);
  assert.match(root.innerHTML, /id="club-interest-other-association"/);
  assert.doesNotMatch(root.innerHTML, /<optgroup/);
  assert.doesNotMatch(root.innerHTML, />Not sure</);
  assert.match(root.innerHTML, /Gridiron \(American football\)/);
  assert.match(root.innerHTML, /I agree to receive Pivot Teamwear news and updates by email\. I can unsubscribe at any time\./);
  assert.doesNotMatch(root.innerHTML, /does not commit your club/);
  assert.match(root.innerHTML, /Register Your Club’s Interest/);
  assert.doesNotMatch(root.innerHTML, /demonstrator/i);
});
