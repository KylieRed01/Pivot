import test from 'node:test';
import assert from 'node:assert/strict';
import { renderStudioSetup } from '../public/studio/studio-setup.js';

function createSetupHarness({ acknowledged = true } = {}) {
  const acknowledgement = {
    checked: acknowledged,
    addEventListener() {}
  };
  const form = {
    sport: { value: 'basketball' },
    league: { value: 'bendigo-basketball-association', addEventListener() {} },
    garment: { value: 'basketball-jersey' },
    querySelectorAll() { return []; },
    onsubmit: null
  };
  const elements = {
    '#design-setup-form': form,
    '#demo-acknowledgement': acknowledgement,
    '.sport-choices': { children: [], append() {} }
  };
  const root = {
    innerHTML: '',
    querySelector(selector) { return elements[selector] ?? null; },
    querySelectorAll() { return []; }
  };
  return { acknowledgement, form, root };
}

test('Studio setup returns the selected setup through one completion boundary', () => {
  const { form, root } = createSetupHarness();
  let submitted;

  renderStudioSetup(root, {
    workflowDemo: false,
    ruleProfileId: 'basketball-rules',
    onSubmit(setup) { submitted = setup; }
  });
  form.onsubmit({ preventDefault() {} });

  assert.deepEqual(submitted, {
    sport: 'basketball',
    league: 'bendigo-basketball-association',
    garment: 'basketball-jersey',
    ruleProfile: 'basketball-rules'
  });
  assert.match(root.innerHTML, /Design Studio trial/);
  assert.match(root.innerHTML, /Your work stays in this browser/);
  assert.match(root.innerHTML, /Pivot will confirm final colours, sizing and placement before anything can be made\./);
  assert.match(root.innerHTML, /<strong>Basketball<\/strong><small>Available to try<\/small>/);
  assert.match(root.innerHTML, /<strong>Netball<\/strong><small>Not available yet<\/small>/);
  assert.match(root.innerHTML, /Bendigo Basketball Association is the only competition available to try\./);
  assert.doesNotMatch(root.innerHTML, /Unavailable in pilot|Only the pilot competition|Provisional · cost confirmation pending/);
  assert.match(root.innerHTML, /id="demo-acknowledgement"/);
  assert.doesNotMatch(root.innerHTML, /browser-local|production infrastructure|manufacturing integration|supplier-approved/i);
  assert.doesNotMatch(root.innerHTML, /demonstrator/i);
});

test('public Studio setup requires acknowledgement of the browser-local trial', () => {
  const { acknowledgement, form, root } = createSetupHarness({ acknowledged: false });
  let submissions = 0;

  renderStudioSetup(root, {
    workflowDemo: false,
    ruleProfileId: 'basketball-rules',
    onSubmit() { submissions += 1; }
  });
  form.onsubmit({ preventDefault() {} });
  assert.equal(submissions, 0);

  acknowledgement.checked = true;
  form.onsubmit({ preventDefault() {} });
  assert.equal(submissions, 1);
});
