import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialStudioState,
  createSessionStore,
  resetStudioState,
  restorePublicState,
  serializePublicState
} from '../public/studio-state.js';

const surfaceKeys = state => Object.keys(state.surfaces).sort();

test('initial public Studio state contains four 2D surfaces and required numbers', () => {
  const state = createInitialStudioState();

  assert.deepEqual(surfaceKeys(state), ['dark.back', 'dark.front', 'light.back', 'light.front']);
  for (const surface of Object.values(state.surfaces)) {
    const number = surface.layers.find(layer => layer.role === 'number');
    assert.ok(number, 'each surface has a representative number');
    assert.equal(number.controlLevel, 'constrained');
    assert.equal(number.required, true);
  }
  assert.equal(state.view.mode, '2d');
  assert.equal(state.meta.templateStatus, 'placeholder');
});

test('serialized public state excludes workflow identity, server IDs and transient upload bytes', () => {
  const state = createInitialStudioState();
  state.workflowIdentity = { email: 'admin@phoenix.test' };
  state.serverId = 'concept';
  state.surfaces['dark.front'].layers.push({
    id: 'image-1',
    type: 'image',
    role: 'artwork',
    src: 'data:image/png;base64,private-bytes',
    file: { name: 'logo.png' },
    name: 'logo.png',
    x: 40,
    y: 40
  });

  const serialized = serializePublicState(state);
  const saved = JSON.parse(serialized);
  const image = saved.surfaces['dark.front'].layers.find(layer => layer.id === 'image-1');

  assert.equal(saved.workflowIdentity, undefined);
  assert.equal(saved.serverId, undefined);
  assert.equal(image.src, undefined);
  assert.equal(image.file, undefined);
  assert.equal(image.name, 'logo.png');
  assert.equal(serialized.includes('private-bytes'), false);
});

test('session store restores valid state and fails closed to a clean placeholder', () => {
  const values = new Map();
  const storage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: key => values.delete(key)
  };
  const store = createSessionStore(storage, 'test-studio');
  const initial = createInitialStudioState();
  initial.designName = 'Browser draft';

  store.save(initial);
  assert.equal(store.load().designName, 'Browser draft');

  values.set('test-studio', '{bad json');
  assert.deepEqual(store.load(), createInitialStudioState());

  store.clear();
  assert.deepEqual(store.load(), createInitialStudioState());
});

test('restore and reset never carry production or Phoenix artwork claims', () => {
  const unsafe = JSON.stringify({
    ...createInitialStudioState(),
    productionReady: true,
    supplierApproved: true,
    finalPhoenixArtwork: true
  });

  const restored = restorePublicState(unsafe);
  const reset = resetStudioState(restored);

  for (const state of [restored, reset]) {
    assert.equal(state.productionReady, undefined);
    assert.equal(state.supplierApproved, undefined);
    assert.equal(state.finalPhoenixArtwork, undefined);
    assert.equal(state.meta.templateStatus, 'placeholder');
    assert.equal(state.meta.artworkStatus, 'placeholder');
  }
});
