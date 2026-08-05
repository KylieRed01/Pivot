import test from 'node:test';
import assert from 'node:assert/strict';
import { renderStudioSetup } from '../public/studio/studio-setup.js';

function createSetupHarness(garment = 'generic-t-shirt') {
  const form = {
    garment: { value: garment },
    querySelectorAll() { return []; },
    onsubmit: null
  };
  const root = {
    innerHTML: '',
    querySelector(selector) {
      if (selector === '#design-setup-form') return form;
      return null;
    },
    querySelectorAll() { return []; }
  };
  return { form, root };
}

test('Studio chooser starts the selected trial item through one completion boundary', () => {
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
    garment: 'generic-t-shirt',
    ruleProfile: 'basketball-rules'
  });
});

test('Studio chooser presents only the three genuine starting choices', () => {
  const { root } = createSetupHarness();

  renderStudioSetup(root, {
    workflowDemo: false,
    ruleProfileId: 'basketball-rules',
    onSubmit() {}
  });

  assert.match(root.innerHTML, /What would you like to design\?/);
  assert.match(root.innerHTML, /value="basketball-jersey"/);
  assert.match(root.innerHTML, /<strong>Basketball jersey<\/strong>/);
  assert.match(root.innerHTML, /value="generic-t-shirt"/);
  assert.match(root.innerHTML, /<strong>T-shirt concept<\/strong>/);
  assert.match(root.innerHTML, /value="generic-hoodie"/);
  assert.match(root.innerHTML, /<strong>Hoodie concept<\/strong>/);
  assert.match(root.innerHTML, /Start designing/);
  assert.match(root.innerHTML, /Generic testing templates/);
  assert.doesNotMatch(root.innerHTML, /Not available yet|Choose your sport|Choose a competition|demo-acknowledgement|AS Colour/i);
});
