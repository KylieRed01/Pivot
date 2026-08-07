import test from 'node:test';
import assert from 'node:assert/strict';
import { describeDestructiveStudioAction } from '../public/studio/destructive-actions.js';

test('destructive Studio actions provide truthful in-product confirmation content', () => {
  assert.deepEqual(describeDestructiveStudioAction({ action: 'change-template', garmentName: 'T-shirt' }), {
    title: 'Change garment template?',
    message: 'Changing to the T-shirt template will remove all changes in this browser-session design and start a new design.',
    confirmLabel: 'Discard changes',
    cancelLabel: 'Keep editing'
  });

  assert.deepEqual(describeDestructiveStudioAction({ action: 'reset-design' }), {
    title: 'Reset this design?',
    message: 'Resetting will remove all changes in this browser-session design and restore the starting design.',
    confirmLabel: 'Discard changes',
    cancelLabel: 'Keep editing'
  });
});

test('unknown destructive Studio actions fail closed', () => {
  assert.equal(describeDestructiveStudioAction({ action: 'unknown' }), null);
});
