import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialStudioState,
  createSessionStore,
  createStudioHistory,
  reduceStudioState,
  resetStudioState,
  restorePublicState,
  serializePublicState,
  validatePublicArtwork
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

test('surface and view selection do not mutate independent 2D surfaces', () => {
  const initial = createInitialStudioState();
  const darkBefore = structuredClone(initial.surfaces['dark.front']);
  const lightBefore = structuredClone(initial.surfaces['light.front']);

  const selected = reduceStudioState(initial, { type: 'selectSurface', surface: 'light.back' });
  const previewed = reduceStudioState(selected.state, { type: 'setViewMode', mode: '3d' });

  assert.equal(selected.ok, true);
  assert.equal(selected.state.view.surface, 'light.back');
  assert.equal(previewed.state.view.mode, '3d');
  assert.deepEqual(previewed.state.surfaces['dark.front'], darkBefore);
  assert.deepEqual(previewed.state.surfaces['light.front'], lightBefore);
});

test('history updates one surface and provides deterministic undo and redo', () => {
  const history = createStudioHistory(createInitialStudioState(), { limit: 10 });
  const darkWordmark = history.getState().surfaces['dark.front'].layers.find(layer => layer.role === 'wordmark');
  const lightWordmarkBefore = structuredClone(history.getState().surfaces['light.front'].layers.find(layer => layer.role === 'wordmark'));

  const changed = history.dispatch({
    type: 'updateLayer',
    surface: 'dark.front',
    layerId: darkWordmark.id,
    patch: { text: 'DARK ONLY' }
  });

  assert.equal(changed.ok, true);
  assert.equal(history.canUndo(), true);
  assert.equal(history.getState().surfaces['dark.front'].layers.find(layer => layer.id === darkWordmark.id).text, 'DARK ONLY');
  assert.deepEqual(history.getState().surfaces['light.front'].layers.find(layer => layer.role === 'wordmark'), lightWordmarkBefore);

  assert.equal(history.undo().ok, true);
  assert.equal(history.getState().surfaces['dark.front'].layers.find(layer => layer.id === darkWordmark.id).text, 'PIVOT');
  assert.equal(history.canRedo(), true);

  assert.equal(history.redo().ok, true);
  assert.equal(history.getState().surfaces['dark.front'].layers.find(layer => layer.id === darkWordmark.id).text, 'DARK ONLY');
});

test('required number deletion is rejected through the state boundary', () => {
  const initial = createInitialStudioState();
  const number = initial.surfaces['dark.front'].layers.find(layer => layer.role === 'number');
  const result = reduceStudioState(initial, {
    type: 'deleteLayer',
    surface: 'dark.front',
    layerId: number.id
  });

  assert.equal(result.ok, false);
  assert.equal(result.error.code, 'REQUIRED_LAYER');
  assert.match(result.error.message, /required basketball number/i);
  assert.deepEqual(result.state, initial);
});

test('accepted history changes persist through the session store', () => {
  const values = new Map();
  const store = createSessionStore({
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: key => values.delete(key)
  }, 'history-store');
  const history = createStudioHistory(createInitialStudioState(), { store });
  const wordmark = history.getState().surfaces['dark.front'].layers.find(layer => layer.role === 'wordmark');

  history.dispatch({ type: 'updateLayer', surface: 'dark.front', layerId: wordmark.id, patch: { text: 'RESTORED' } });

  assert.equal(store.load().surfaces['dark.front'].layers.find(layer => layer.id === wordmark.id).text, 'RESTORED');
});

test('text controls preserve supplier-independent properties through history', () => {
  const history = createStudioHistory(createInitialStudioState());
  const layer = history.getState().surfaces['dark.front'].layers.find(candidate => candidate.role === 'wordmark');

  history.dispatch({
    type: 'updateLayer',
    surface: 'dark.front',
    layerId: layer.id,
    patch: {
      text: 'TEAM', colour: '#F4951D', scale: 1.4, x: 35, y: 44,
      rotation: 12, alignment: 'left', letterSpacing: 2, lineSpacing: 1.2
    }
  });
  history.dispatch({ type: 'selectSurface', surface: 'light.front' });
  history.dispatch({ type: 'selectSurface', surface: 'dark.front' });

  const updated = history.getState().surfaces['dark.front'].layers.find(candidate => candidate.id === layer.id);
  assert.deepEqual(
    {
      text: updated.text, colour: updated.colour, scale: updated.scale, x: updated.x,
      y: updated.y, rotation: updated.rotation, alignment: updated.alignment,
      letterSpacing: updated.letterSpacing, lineSpacing: updated.lineSpacing
    },
    {
      text: 'TEAM', colour: '#F4951D', scale: 1.4, x: 35,
      y: 44, rotation: 12, alignment: 'left', letterSpacing: 2, lineSpacing: 1.2
    }
  );
});

test('public artwork validation permits raster formats and rejects active or oversized files', () => {
  assert.deepEqual(validatePublicArtwork({ name: 'logo.png', type: 'image/png', size: 1024 }), { ok: true });
  assert.deepEqual(validatePublicArtwork({ name: 'photo.webp', type: 'image/webp', size: 2048 }), { ok: true });
  assert.equal(validatePublicArtwork({ name: 'logo.svg', type: 'image/svg+xml', size: 500 }).error.code, 'UNSUPPORTED_UPLOAD');
  assert.equal(validatePublicArtwork({ name: 'proof.pdf', type: 'application/pdf', size: 500 }).error.code, 'UNSUPPORTED_UPLOAD');
  assert.equal(validatePublicArtwork({ name: 'huge.jpg', type: 'image/jpeg', size: 6 * 1024 * 1024 }).error.code, 'UPLOAD_TOO_LARGE');
});

test('flexible image layers can be added, transformed, duplicated and reordered', () => {
  const history = createStudioHistory(createInitialStudioState());
  const added = history.dispatch({
    type: 'addLayer',
    surface: 'dark.front',
    layer: {
      id: 'image-test', type: 'image', role: 'artwork', controlLevel: 'flexible',
      name: 'logo.png', mime: 'image/png', size: 1024, src: 'blob:browser-only',
      x: 50, y: 45, scale: 1, rotation: 0, cropZoom: 1, cropX: 50, cropY: 50,
      opacity: 1, flipX: false, flipY: false
    }
  });
  assert.equal(added.ok, true);

  history.dispatch({
    type: 'updateLayer', surface: 'dark.front', layerId: 'image-test',
    patch: { x: 30, y: 35, scale: 1.5, rotation: 20, cropZoom: 1.4, cropX: 40, cropY: 60, opacity: 0.7, flipX: true, flipY: true }
  });
  const duplicated = history.dispatch({ type: 'duplicateLayer', surface: 'dark.front', layerId: 'image-test', newLayerId: 'image-copy' });
  assert.equal(duplicated.ok, true);
  assert.equal(history.dispatch({ type: 'reorderLayer', surface: 'dark.front', layerId: 'image-copy', direction: -1 }).ok, true);

  const image = history.getState().surfaces['dark.front'].layers.find(layer => layer.id === 'image-test');
  assert.equal(image.opacity, 0.7);
  assert.equal(image.flipX, true);
  assert.equal(image.flipY, true);
  assert.equal(history.getState().surfaces['dark.front'].layers.some(layer => layer.id === 'image-copy'), true);
  assert.equal(serializePublicState(history.getState()).includes('blob:browser-only'), false);
});

test('viewport controls are bounded and persisted in public state', () => {
  let result = reduceStudioState(createInitialStudioState(), { type: 'setViewport', patch: { zoom: 9, panX: 500, panY: -500 } });
  assert.equal(result.ok, true);
  assert.deepEqual(
    { zoom: result.state.view.zoom, panX: result.state.view.panX, panY: result.state.view.panY },
    { zoom: 2, panX: 100, panY: -100 }
  );
  result = reduceStudioState(result.state, { type: 'resetViewport' });
  assert.deepEqual(
    { zoom: result.state.view.zoom, panX: result.state.view.panX, panY: result.state.view.panY },
    { zoom: 1, panX: 0, panY: 0 }
  );
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
