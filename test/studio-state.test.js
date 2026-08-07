import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialStudioState,
  createSessionStore,
  createStudioHistory,
  getCustomerDesignChecks,
  reduceStudioState,
  resetStudioState,
  restorePublicState,
  runIndicativeChecks,
  serializePublicState,
  summariseIndicativeChecks,
  validatePublicArtwork
} from '../public/studio/studio-state.js';

const surfaceKeys = state => Object.keys(state.surfaces).sort();
const addTestText = (state, surface = 'dark.front', overrides = {}) => {
  const layer = {
    id: `test-text-${surface}`,
    type: 'text',
    role: 'artwork',
    controlLevel: 'flexible',
    text: 'PIVOT',
    colour: '#FFFFFF',
    x: 50,
    y: 40,
    scale: 1,
    fontSize: 14,
    rotation: 0,
    alignment: 'center',
    letterSpacing: 0,
    lineSpacing: 1,
    fontId: 'league-spartan-regular',
    ...overrides
  };
  state.surfaces[surface].layers.push(layer);
  return layer;
};

test('generic trial garments start as complete Pivot-branded previews without basketball requirements', () => {
  for (const garment of ['generic-t-shirt', 'generic-hoodie']) {
    const state = createInitialStudioState(garment);
    assert.equal(state.setup.garment, garment);
    for (const surface of Object.values(state.surfaces)) {
      assert.equal(surface.layers.length, 1);
      assert.equal(surface.layers[0].libraryAssetId, 'pivot-logo');
      assert.equal(surface.layers[0].src, '/brand/Pivot_Logo_Transparent.svg');
    }
    assert.equal(runIndicativeChecks(state).some(check => check.code === 'REQUIRED_NUMBER'), false);
  }
});

test('initial public Studio state contains four 2D surfaces and required numbers', () => {
  const state = createInitialStudioState();

  assert.deepEqual(surfaceKeys(state), ['dark.back', 'dark.front', 'light.back', 'light.front']);
  assert.deepEqual(state.palette, {
    primary: '#092C71',
    secondary: '#F4951D',
    accent: '#092C71',
    light: '#FFFFFF'
  });
  for (const [key, surface] of Object.entries(state.surfaces)) {
    assert.equal(surface.base, key.startsWith('dark') ? '#092C71' : '#FFFFFF', `${key} uses the adopted reversible dark/light baseline`);
    assert.equal(surface.pattern, 'clean', `${key} starts from a plain testing baseline rather than obscuring the branding`);
    assert.equal(surface.accent, '#0096D6');
    assert.equal(surface.neck, '#092C71');
    assert.equal(surface.armTrim, '#092C71');
    assert.equal(surface.density, 100, `${key} keeps the approved pattern colours at full intensity`);
    assert.equal(surface.layers.length, 2, `${key} starts as a complete branded basketball preview`);
    const logo = surface.layers.find(layer => layer.libraryAssetId === 'pivot-logo');
    assert.equal(logo.src, '/brand/Pivot_Logo_Transparent.svg');
    assert.equal(logo.controlLevel, 'flexible');
    assert.equal(logo.y, key.endsWith('back') ? 14 : 20);
    assert.equal(logo.scale, 1.1);
    assert.equal(logo.cropZoom, 1);
    const number = surface.layers.find(layer => layer.role === 'number');
    assert.equal(number.text, '24');
    assert.equal(number.controlLevel, 'constrained');
    assert.equal(number.required, true);
    assert.equal(number.x, 50, `${key} centres the required number horizontally`);
    assert.equal(number.y, key.endsWith('back') ? 58 : 62, `${key} keeps the number below the Pivot branding`);
    assert.equal(number.scale, 1, `${key} does not expose an internal text scale multiplier`);
    assert.equal(number.colour, key.startsWith('dark') ? '#FFFFFF' : '#092C71', `${key} starts with a contrasting solid number colour`);
    assert.equal(number.fontSize, key.endsWith('back') ? 84 : 42, `${key} maps the adopted 10 cm front and 20 cm back minimums to an indicative two-to-one preview`);
  }
  assert.equal(state.view.mode, '2d');
  assert.equal(state.meta.templateStatus, 'placeholder');
});

test('new basketball jerseys carry approved Pivot artwork and required numbers on both views', () => {
  const state = createInitialStudioState();

  for (const surface of Object.values(state.surfaces)) {
    assert.equal(surface.layers.some(layer => layer.libraryAssetId === 'pivot-logo'), true);
    assert.equal(surface.layers.some(layer => layer.role === 'number'), true);
    assert.equal(surface.layers.some(layer => layer.role === 'wordmark'), false);
  }
});

test('serialized public state excludes workflow data while preserving browser-session artwork', () => {
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
  assert.equal(image.src, 'data:image/png;base64,private-bytes');
  assert.equal(image.file, undefined);
  assert.equal(image.name, 'logo.png');
  assert.equal(serialized.includes('admin@phoenix.test'), false);
});

test('legacy browser sessions migrate to the simpler branded template without the retired base gradient', () => {
  const legacy = createInitialStudioState();
  legacy.version = 1;
  legacy.setup.backDesignMode = undefined;
  legacy.surfaces['dark.back'].pattern = 'clean';
  for (const surface of Object.values(legacy.surfaces)) {
    surface.layers = surface.layers.filter(layer => layer.libraryAssetId !== 'pivot-logo');
    surface.gradient = true;
    surface.gradientColour = '#00FF00';
    surface.gradientAngle = 180;
  }
  legacy.surfaces['dark.front'].layers.unshift({
    id: 'legacy-wordmark', type: 'text', role: 'wordmark', controlLevel: 'flexible',
    text: 'PIVOT', colour: '#FFFFFF', x: 50, y: 38, scale: 1, rotation: 0
  });

  const restored = restorePublicState(legacy);

  assert.equal(restored.version, 10);
  assert.equal(restored.setup.backDesignMode, 'linked');
  assert.equal(restored.surfaces['dark.back'].pattern, restored.surfaces['dark.front'].pattern);
  for (const surface of Object.values(restored.surfaces)) {
    assert.equal(surface.layers.some(layer => layer.libraryAssetId === 'pivot-logo'), true);
    assert.equal(surface.layers.some(layer => layer.role === 'wordmark' && layer.text === 'PIVOT'), false);
    assert.equal('gradient' in surface, false);
    assert.equal('gradientColour' in surface, false);
    assert.equal('gradientAngle' in surface, false);
    const number = surface.layers.find(layer => layer.role === 'number');
    assert.equal(number.fontSize, surface.key.endsWith('back') ? 84 : 42);
    assert.equal(number.x, 50);
  }
});

test('version 6 sessions receive the adopted BBA reversible-colour and number-preview baseline', () => {
  const saved = createInitialStudioState();
  saved.version = 6;
  for (const surface of Object.values(saved.surfaces)) {
    surface.base = '#0096D6';
    surface.pattern = 'velocity';
    const number = surface.layers.find(layer => layer.role === 'number');
    number.fontSize = surface.key.endsWith('back') ? 84 : 42;
  }

  const restored = restorePublicState(saved);

  assert.equal(restored.version, 10);
  for (const surface of Object.values(restored.surfaces)) {
    assert.equal(surface.base, surface.key.startsWith('dark') ? '#092C71' : '#FFFFFF');
    assert.equal(surface.pattern, 'clean');
    const number = surface.layers.find(layer => layer.role === 'number');
    assert.equal(number.colour, surface.key.startsWith('dark') ? '#FFFFFF' : '#092C71');
    assert.equal(number.fontSize, surface.key.endsWith('back') ? 84 : 42);
  }
});

test('version 7 sessions restore the BBA-sized number preview without resetting design colours', () => {
  const saved = createInitialStudioState();
  saved.version = 7;
  saved.surfaces['dark.front'].base = '#520713';
  saved.surfaces['dark.front'].pattern = 'hoops';
  for (const surface of Object.values(saved.surfaces)) {
    surface.layers.find(layer => layer.role === 'number').fontSize = surface.key.endsWith('back') ? 48 : 24;
  }

  const restored = restorePublicState(saved);

  assert.equal(restored.version, 10);
  assert.equal(restored.surfaces['dark.front'].base, '#520713');
  assert.equal(restored.surfaces['dark.front'].pattern, 'hoops');
  for (const surface of Object.values(restored.surfaces)) {
    const number = surface.layers.find(layer => layer.role === 'number');
    assert.equal(number.fontSize, surface.key.endsWith('back') ? 84 : 42);
  }
});

test('older sessions restore a balanced Pivot penguin default without changing custom sizes', () => {
  const saved = createInitialStudioState();
  saved.version = 8;
  saved.surfaces['dark.front'].layers.push(
    {
      id: 'old-penguin', type: 'image', role: 'artwork', controlLevel: 'flexible',
      libraryAssetId: 'pivot-penguin', name: 'Pivot penguin', mime: 'image/svg+xml', size: 0,
      src: '/brand/Pivot_Icon.svg', x: 50, y: 45, scale: 1.6, rotation: 0, cropZoom: 2.15
    },
    {
      id: 'resized-penguin', type: 'image', role: 'artwork', controlLevel: 'flexible',
      libraryAssetId: 'pivot-penguin', name: 'Pivot penguin', mime: 'image/svg+xml', size: 0,
      src: '/brand/Pivot_Icon.svg', x: 30, y: 35, scale: 1.2, rotation: 0, cropZoom: 2.15
    }
  );

  const restored = restorePublicState(saved);
  const layers = restored.surfaces['dark.front'].layers;

  assert.equal(restored.version, 10);
  assert.equal(layers.find(layer => layer.id === 'old-penguin').scale, 1.8);
  assert.equal(layers.find(layer => layer.id === 'resized-penguin').scale, 1.2);
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

test('starting another garment clears the previous browser design', () => {
  let cleared = false;
  const changed = createInitialStudioState();
  changed.designName = 'Previous design';
  changed.view.mode = '3d';
  changed.surfaces['dark.front'].base = '#123456';
  const history = createStudioHistory(changed, { store: { clear() { cleared = true; } } });

  const result = history.reset();

  assert.equal(result.ok, true);
  assert.deepEqual(history.getState(), createInitialStudioState());
  assert.equal(cleared, true);
});

test('jersey styling stays linked between front and back until the back is manually separated', () => {
  const initial = createInitialStudioState();

  assert.equal(initial.setup.backDesignMode, 'linked');
  assert.equal(initial.surfaces['dark.front'].pattern, initial.surfaces['dark.back'].pattern);

  const linked = reduceStudioState(initial, {
    type: 'updateSurface',
    surface: 'dark.front',
    patch: { pattern: 'hoops', base: '#123456', third: '#ABCDEF', scale: 60 }
  });

  assert.deepEqual(
    { pattern: linked.state.surfaces['dark.back'].pattern, base: linked.state.surfaces['dark.back'].base, third: linked.state.surfaces['dark.back'].third, scale: linked.state.surfaces['dark.back'].scale },
    { pattern: 'hoops', base: '#123456', third: '#ABCDEF', scale: 60 }
  );

  const separated = reduceStudioState(linked.state, { type: 'setBackDesignMode', mode: 'separate' });
  const frontOnly = reduceStudioState(separated.state, {
    type: 'updateSurface', surface: 'dark.front', patch: { pattern: 'clean' }
  });

  assert.equal(frontOnly.state.surfaces['dark.front'].pattern, 'clean');
  assert.equal(frontOnly.state.surfaces['dark.back'].pattern, 'hoops');
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
  const initial = createInitialStudioState();
  const darkWordmark = addTestText(initial);
  const lightWordmarkBefore = structuredClone(addTestText(initial, 'light.front'));
  const history = createStudioHistory(initial, { limit: 10 });

  const changed = history.dispatch({
    type: 'updateLayer',
    surface: 'dark.front',
    layerId: darkWordmark.id,
    patch: { text: 'DARK ONLY' }
  });

  assert.equal(changed.ok, true);
  assert.equal(history.canUndo(), true);
  assert.equal(history.getState().surfaces['dark.front'].layers.find(layer => layer.id === darkWordmark.id).text, 'DARK ONLY');
  assert.deepEqual(history.getState().surfaces['light.front'].layers.find(layer => layer.id === lightWordmarkBefore.id), lightWordmarkBefore);

  assert.equal(history.undo().ok, true);
  assert.equal(history.getState().surfaces['dark.front'].layers.find(layer => layer.id === darkWordmark.id).text, 'PIVOT');
  assert.equal(history.canRedo(), true);

  assert.equal(history.redo().ok, true);
  assert.equal(history.getState().surfaces['dark.front'].layers.find(layer => layer.id === darkWordmark.id).text, 'DARK ONLY');
});

test('basketball number value stays the same on front and back without duplicating other text edits', () => {
  const initial = createInitialStudioState();
  const frontNumber = initial.surfaces['dark.front'].layers.find(layer => layer.role === 'number');
  const frontText = addTestText(initial, 'dark.front', { text: 'FRONT START' });
  const backText = addTestText(initial, 'dark.back', { text: 'BACK ONLY' });

  const numbered = reduceStudioState(initial, {
    type: 'updateLayer', surface: 'dark.front', layerId: frontNumber.id, patch: { text: '7' }
  });
  const worded = reduceStudioState(numbered.state, {
    type: 'updateLayer', surface: 'dark.front', layerId: frontText.id, patch: { text: 'FRONT ONLY' }
  });

  assert.equal(worded.state.surfaces['dark.front'].layers.find(layer => layer.role === 'number').text, '7');
  assert.equal(worded.state.surfaces['dark.back'].layers.find(layer => layer.role === 'number').text, '7');
  assert.equal(worded.state.surfaces['dark.back'].layers.find(layer => layer.id === backText.id).text, 'BACK ONLY');
});

test('required basketball number rejects values outside the adopted BBA set', () => {
  const initial = createInitialStudioState();
  const number = initial.surfaces['dark.front'].layers.find(layer => layer.role === 'number');

  for (const text of ['', 'PLAYER', '01']) {
    const result = reduceStudioState(initial, {
      type: 'updateLayer',
      surface: 'dark.front',
      layerId: number.id,
      patch: { text }
    });

    assert.equal(result.ok, false);
    assert.equal(result.error.code, 'INVALID_REQUIRED_NUMBER');
    assert.deepEqual(result.state, initial);
  }
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
  const initial = createInitialStudioState();
  const wordmark = addTestText(initial);
  const history = createStudioHistory(initial, { store });

  history.dispatch({ type: 'updateLayer', surface: 'dark.front', layerId: wordmark.id, patch: { text: 'RESTORED' } });

  assert.equal(store.load().surfaces['dark.front'].layers.find(layer => layer.id === wordmark.id).text, 'RESTORED');
});

test('history reports persistence failure while retaining accepted in-memory edits', () => {
  const initial = createInitialStudioState();
  const layer = addTestText(initial);
  const history = createStudioHistory(initial, { store: { save: () => false } });

  const result = history.dispatch({
    type: 'updateLayer', surface: 'dark.front', layerId: layer.id, patch: { text: 'IN MEMORY' }
  });

  assert.equal(result.ok, true);
  assert.equal(result.persisted, false);
  assert.equal(history.getState().surfaces['dark.front'].layers.find(candidate => candidate.id === layer.id).text, 'IN MEMORY');
});

test('text point sizes stay within the approved trial range through the state boundary', () => {
  const initial = createInitialStudioState();
  const layer = addTestText(initial);

  const aboveMaximum = reduceStudioState(initial, {
    type: 'updateLayer', surface: 'dark.front', layerId: layer.id, patch: { fontSize: 120 }
  });
  const belowMinimum = reduceStudioState(aboveMaximum.state, {
    type: 'updateLayer', surface: 'dark.front', layerId: layer.id, patch: { fontSize: 2 }
  });

  assert.equal(aboveMaximum.state.surfaces['dark.front'].layers.at(-1).fontSize, 96);
  assert.equal(belowMinimum.state.surfaces['dark.front'].layers.at(-1).fontSize, 5);
});

test('text controls preserve supplier-independent properties through history', () => {
  const initial = createInitialStudioState();
  const layer = addTestText(initial);
  const history = createStudioHistory(initial);

  history.dispatch({
    type: 'updateLayer',
    surface: 'dark.front',
    layerId: layer.id,
    patch: {
      text: 'TEAM', colour: '#F4951D', fontSize: 42, x: 35, y: 44,
      rotation: 12, alignment: 'left', letterSpacing: 2, lineSpacing: 1.2
    }
  });
  history.dispatch({ type: 'selectSurface', surface: 'light.front' });
  history.dispatch({ type: 'selectSurface', surface: 'dark.front' });

  const updated = history.getState().surfaces['dark.front'].layers.find(candidate => candidate.id === layer.id);
  assert.deepEqual(
    {
      text: updated.text, colour: updated.colour, fontSize: updated.fontSize, x: updated.x,
      y: updated.y, rotation: updated.rotation, alignment: updated.alignment,
      letterSpacing: updated.letterSpacing, lineSpacing: updated.lineSpacing
    },
    {
      text: 'TEAM', colour: '#F4951D', fontSize: 42, x: 35,
      y: 44, rotation: 12, alignment: 'left', letterSpacing: 2, lineSpacing: 1.2
    }
  );
});

test('approved Pivot penguin can be added for Studio experimentation', () => {
  const history = createStudioHistory(createInitialStudioState());
  const result = history.dispatch({
    type: 'addLayer', surface: 'dark.front',
    layer: {
      id: 'penguin-test', type: 'image', role: 'artwork', controlLevel: 'flexible',
      libraryAssetId: 'pivot-penguin', name: 'Pivot penguin', mime: 'image/svg+xml', size: 0,
      src: '/brand/Pivot_Icon.svg', x: 50, y: 45, scale: 1, rotation: 0
    }
  });

  assert.equal(result.ok, true);
  const layer = history.getState().surfaces['dark.front'].layers.find(candidate => candidate.id === 'penguin-test');
  assert.equal(layer.src, '/brand/Pivot_Icon.svg');
  assert.equal(layer.libraryAssetId, 'pivot-penguin');
  assert.equal(runIndicativeChecks(history.getState()).some(check => check.code === 'UNSUPPORTED_UPLOAD' && check.layerId === layer.id), false);
});

test('public artwork validation permits raster formats and rejects active or oversized files', () => {
  assert.deepEqual(validatePublicArtwork({ name: 'logo.png', type: 'image/png', size: 1024 }), { ok: true });
  assert.deepEqual(validatePublicArtwork({ name: 'photo.webp', type: 'image/webp', size: 2048 }), { ok: true });
  assert.deepEqual(validatePublicArtwork({ name: 'limit.jpg', type: 'image/jpeg', size: 1024 * 1024 }), { ok: true });
  assert.equal(validatePublicArtwork({ name: 'over-limit.jpg', type: 'image/jpeg', size: 1024 * 1024 + 1 }).error.code, 'UPLOAD_TOO_LARGE');
  assert.equal(validatePublicArtwork({ name: 'logo.svg', type: 'image/svg+xml', size: 500 }).error.code, 'UNSUPPORTED_UPLOAD');
  assert.equal(validatePublicArtwork({ name: 'proof.pdf', type: 'application/pdf', size: 500 }).error.code, 'UNSUPPORTED_UPLOAD');
  assert.equal(validatePublicArtwork({ name: 'huge.jpg', type: 'image/jpeg', size: 6 * 1024 * 1024 }).error.code, 'UPLOAD_TOO_LARGE');
});

test('artwork persistence budget covers cumulative uploads and duplicates', () => {
  const history = createStudioHistory(createInitialStudioState());
  const first = history.dispatch({
    type: 'addLayer', surface: 'dark.front',
    layer: { id: 'large-image', type: 'image', role: 'artwork', controlLevel: 'flexible', name: 'large.png', mime: 'image/png', size: 700 * 1024, src: 'data:image/png;base64,AA', x: 50, y: 45 }
  });
  assert.equal(first.ok, true);

  const cumulative = history.dispatch({
    type: 'addLayer', surface: 'dark.front',
    layer: { id: 'second-image', type: 'image', role: 'artwork', controlLevel: 'flexible', name: 'second.png', mime: 'image/png', size: 400 * 1024, src: 'data:image/png;base64,AA', x: 50, y: 45 }
  });
  assert.equal(cumulative.ok, false);
  assert.equal(cumulative.error.code, 'UPLOAD_BUDGET_EXCEEDED');

  const duplicate = history.dispatch({ type: 'duplicateLayer', surface: 'dark.front', layerId: 'large-image', newLayerId: 'large-copy' });
  assert.equal(duplicate.ok, false);
  assert.equal(duplicate.error.code, 'UPLOAD_BUDGET_EXCEEDED');
  assert.equal(history.getState().surfaces['dark.front'].layers.some(layer => layer.id === 'second-image' || layer.id === 'large-copy'), false);
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

test('duplicating artwork keeps the copy inside the editable placement bounds', () => {
  const history = createStudioHistory(createInitialStudioState('generic-t-shirt'));
  history.dispatch({
    type: 'addLayer', surface: 'dark.front',
    layer: {
      id: 'edge-text', type: 'text', role: 'artwork', controlLevel: 'flexible',
      text: 'EDGE', x: 94, y: 90, fontSize: 14
    }
  });

  const result = history.dispatch({
    type: 'duplicateLayer', surface: 'dark.front', layerId: 'edge-text', newLayerId: 'edge-copy'
  });

  assert.equal(result.ok, true);
  const copy = history.getState().surfaces['dark.front'].layers.find(layer => layer.id === 'edge-copy');
  assert.equal(copy.x, 95);
  assert.equal(copy.y, 92);
});

test('palette edits are included in undo and redo history', () => {
  const history = createStudioHistory(createInitialStudioState());
  const original = history.getState().palette.accent;

  history.dispatch({ type: 'setPalette', patch: { accent: '#123456' } });
  assert.equal(history.getState().palette.accent, '#123456');
  assert.equal(history.undo().ok, true);
  assert.equal(history.getState().palette.accent, original);
  assert.equal(history.redo().ok, true);
  assert.equal(history.getState().palette.accent, '#123456');
});

test('compound design changes are one atomic undo and redo transaction', () => {
  const initial = createInitialStudioState();
  const history = createStudioHistory(initial);
  const actions = Object.keys(initial.surfaces).map(surface => ({
    type: 'updateSurface', surface, patch: { pattern: 'chevron', density: 100 }
  }));
  actions.push({ type: 'setPalette', patch: { accent: '#123456', light: '#ABCDEF' } });

  assert.equal(history.dispatch({ type: 'batch', actions }).ok, true);
  assert.equal(Object.values(history.getState().surfaces).every(surface => surface.pattern === 'chevron'), true);
  assert.equal(history.getState().palette.accent, '#123456');
  assert.equal(history.undo().ok, true);
  assert.deepEqual(history.getState(), initial);
  assert.equal(history.canUndo(), false);
  assert.equal(history.redo().ok, true);
  assert.equal(Object.values(history.getState().surfaces).every(surface => surface.pattern === 'chevron'), true);
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

test('indicative checks treat blank or invalid required numbers as blocking errors', () => {
  for (const text of ['', 'PLAYER']) {
    const state = createInitialStudioState();
    state.surfaces['dark.front'].layers.find(layer => layer.role === 'number').text = text;

    const checks = runIndicativeChecks(state);
    const requiredNumber = checks.find(check => check.code === 'REQUIRED_NUMBER' && check.surface === 'dark.front');

    assert.equal(requiredNumber?.severity, 'error');
    assert.equal(requiredNumber?.blocking, true);
    assert.equal(checks.some(check => check.code === 'EMPTY_TEXT' && check.layerId.includes('number')), false);
  }
});

test('indicative checks distinguish blocking errors, warnings and unresolved guidance', () => {
  const state = createInitialStudioState();
  state.surfaces['dark.front'].layers = state.surfaces['dark.front'].layers.filter(layer => layer.role !== 'number');
  addTestText(state, 'dark.front', { text: '' });
  addTestText(state, 'light.front', { x: 101 });

  const checks = runIndicativeChecks(state);

  assert.ok(checks.some(check => check.code === 'REQUIRED_NUMBER' && check.severity === 'error' && check.blocking));
  assert.ok(checks.some(check => check.code === 'EMPTY_TEXT' && check.severity === 'warning' && !check.blocking));
  assert.ok(checks.some(check => check.code === 'INDICATIVE_BOUNDARY' && check.severity === 'warning'));
  assert.ok(checks.some(check => check.code === 'UNRESOLVED_DEPENDENCIES' && check.severity === 'guidance'));
  assert.equal(JSON.stringify(checks).toLowerCase().includes('production ready'), false);
});

test('BBA checks explain identical reversible faces and numbers with no colour contrast', () => {
  const state = createInitialStudioState();
  state.surfaces['dark.front'].base = '#FFD100';
  state.surfaces['light.front'].base = '#FFD100';
  state.surfaces['dark.front'].layers.find(layer => layer.role === 'number').colour = '#FFD100';

  const checks = runIndicativeChecks(state);
  const alternative = checks.find(check => check.code === 'BBA_ALTERNATIVE_COLOUR');
  const numberContrast = checks.find(check => check.code === 'BBA_NUMBER_CONTRAST' && check.surface === 'dark.front');

  assert.equal(alternative.blocking, true);
  assert.match(alternative.message, /Both reversible sides use the same main colour\./);
  assert.match(alternative.message, /Keep it on the light side and choose a different, darker main colour for the dark side\./);
  assert.equal(numberContrast.blocking, true);
  assert.match(numberContrast.message, /number uses the same colour as the dark side of the jersey, so it blends into the background/i);
});

test('indicative check messages use clear customer language', () => {
  const state = createInitialStudioState();
  addTestText(state, 'dark.front', { x: 101 });
  state.surfaces['dark.front'].layers.find(layer => layer.role === 'number').colour = state.surfaces['dark.front'].base;
  const copy = runIndicativeChecks(state).map(check => check.message).join(' ');

  assert.doesNotMatch(copy, /production infrastructure|manufacturing integration|supplier geometry|adopted BBA baseline|dark\.front|light\.front|dark front view|light front view/i);
  assert.match(copy, /The number uses the same colour as the dark side of the jersey, so it blends into the background\. Choose a different number colour\./);
  assert.match(copy, /Move this item further inside the editable area\./);
  assert.match(copy, /Pivot still needs to confirm the number size and spacing/);
});

test('customer design checks exclude supplier, font and release gates from the trial experience', () => {
  assert.deepEqual(getCustomerDesignChecks(createInitialStudioState()), []);

  const state = createInitialStudioState();
  addTestText(state, 'dark.front', { text: '' });
  const visible = getCustomerDesignChecks(state);

  assert.equal(visible.length, 1);
  assert.equal(visible[0].code, 'EMPTY_TEXT');
  assert.equal(visible[0].item, 'Text');
});

test('checks identify the item a customer should review', () => {
  const state = createInitialStudioState();
  addTestText(state, 'dark.front', { text: '' });
  addTestText(state, 'light.front', { x: 101 });
  state.surfaces['light.front'].base = state.surfaces['dark.front'].base;

  const checks = runIndicativeChecks(state);

  assert.equal(checks.find(check => check.code === 'UNVALIDATED_BASKETBALL_FONT').item, 'Numbers');
  assert.equal(checks.find(check => check.code === 'EMPTY_TEXT').item, 'Text');
  assert.equal(checks.find(check => check.code === 'BBA_ALTERNATIVE_COLOUR').item, 'Jersey colours');
  assert.equal(checks.find(check => check.code === 'UNRESOLVED_DEPENDENCIES').item, 'Pivot review');
});

test('repeated checks are summarised once with their affected views', () => {
  const summary = summariseIndicativeChecks(runIndicativeChecks(createInitialStudioState()));
  const fontCheck = summary.find(check => check.code === 'UNVALIDATED_BASKETBALL_FONT');

  assert.equal(summary.filter(check => check.code === 'UNVALIDATED_BASKETBALL_FONT').length, 1);
  assert.equal(fontCheck.count, 4);
  assert.deepEqual(fontCheck.surfaces, ['dark.front', 'dark.back', 'light.front', 'light.back']);
  assert.equal(summary.find(check => check.code === 'BBA_PHYSICAL_MEASUREMENTS').count, 1);
});

test('clean basketball placeholder records adopted BBA checks without treating approved library art as an upload', () => {
  const checks = runIndicativeChecks(createInitialStudioState());
  assert.equal(checks.some(check => check.code === 'UNSUPPORTED_UPLOAD'), false);
  assert.equal(checks.some(check => check.code === 'UNVALIDATED_BASKETBALL_FONT' && check.severity === 'error' && check.blocking), true);
  assert.equal(checks.some(check => check.code === 'BBA_PHYSICAL_MEASUREMENTS' && check.severity === 'error' && check.blocking), true);
  assert.equal(checks.some(check => check.code === 'UNRESOLVED_DEPENDENCIES'), true);
  assert.equal(checks.some(check => check.code === 'INDICATIVE_ONLY'), true);
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
