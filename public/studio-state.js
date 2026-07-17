import {
  createPlaceholderStudioConfig,
  PUBLIC_STUDIO_STORAGE_KEY,
  SURFACE_KEYS
} from './studio-config.js';

const clone = value => structuredClone(value);

export function createInitialStudioState() {
  return clone(createPlaceholderStudioConfig());
}

function safeLayer(layer) {
  const safe = {
    id: String(layer.id ?? ''),
    type: layer.type === 'image' ? 'image' : 'text',
    role: String(layer.role ?? 'artwork'),
    controlLevel: ['fixed', 'constrained', 'flexible'].includes(layer.controlLevel)
      ? layer.controlLevel
      : 'flexible',
    x: Number.isFinite(layer.x) ? layer.x : 50,
    y: Number.isFinite(layer.y) ? layer.y : 50,
    scale: Number.isFinite(layer.scale) ? layer.scale : 1,
    rotation: Number.isFinite(layer.rotation) ? layer.rotation : 0
  };
  if (layer.required) safe.required = true;
  if (layer.type === 'image') {
    safe.name = String(layer.name ?? 'Browser-local artwork');
    safe.cropZoom = Number.isFinite(layer.cropZoom) ? layer.cropZoom : 1;
    safe.cropX = Number.isFinite(layer.cropX) ? layer.cropX : 50;
    safe.cropY = Number.isFinite(layer.cropY) ? layer.cropY : 50;
    safe.opacity = Number.isFinite(layer.opacity) ? layer.opacity : 1;
    safe.flipX = Boolean(layer.flipX);
    safe.flipY = Boolean(layer.flipY);
  } else {
    safe.text = String(layer.text ?? '');
    safe.colour = String(layer.colour ?? '#FFFFFF');
  }
  return safe;
}

function normalize(candidate) {
  const initial = createInitialStudioState();
  if (!candidate || typeof candidate !== 'object') return initial;
  if (!candidate.surfaces || !SURFACE_KEYS.every(key => candidate.surfaces[key])) return initial;

  const state = {
    ...initial,
    designName: String(candidate.designName ?? initial.designName).slice(0, 60),
    setup: {
      ...initial.setup,
      ...(candidate.setup && typeof candidate.setup === 'object' ? candidate.setup : {})
    },
    view: {
      ...initial.view,
      ...(candidate.view && typeof candidate.view === 'object' ? candidate.view : {})
    },
    palette: {
      ...initial.palette,
      ...(candidate.palette && typeof candidate.palette === 'object' ? candidate.palette : {})
    },
    surfaces: {},
    meta: initial.meta
  };

  for (const key of SURFACE_KEYS) {
    const source = candidate.surfaces[key];
    state.surfaces[key] = {
      ...initial.surfaces[key],
      base: String(source.base ?? initial.surfaces[key].base),
      accent: String(source.accent ?? initial.surfaces[key].accent),
      pattern: String(source.pattern ?? initial.surfaces[key].pattern),
      layers: Array.isArray(source.layers) ? source.layers.map(safeLayer) : initial.surfaces[key].layers
    };
  }

  if (!SURFACE_KEYS.includes(state.view.surface)) state.view.surface = initial.view.surface;
  state.view.mode = state.view.mode === '3d' ? '3d' : '2d';
  return state;
}

export function serializePublicState(state) {
  return JSON.stringify(normalize(state));
}

export function restorePublicState(serialized) {
  try {
    return normalize(typeof serialized === 'string' ? JSON.parse(serialized) : serialized);
  } catch {
    return createInitialStudioState();
  }
}

export function resetStudioState() {
  return createInitialStudioState();
}

const failed = (state, code, message) => ({
  ok: false,
  state: clone(state),
  error: { code, message }
});

export function reduceStudioState(current, action) {
  const state = normalize(current);
  if (!action || typeof action !== 'object') return failed(state, 'INVALID_ACTION', 'A Studio action is required.');

  if (action.type === 'setDesignName') {
    const next = clone(state);
    next.designName = String(action.name ?? '').slice(0, 60);
    return { ok: true, state: next };
  }

  if (action.type === 'selectSurface') {
    if (!SURFACE_KEYS.includes(action.surface)) return failed(state, 'INVALID_SURFACE', 'Choose an available 2D surface.');
    const next = clone(state);
    next.view.surface = action.surface;
    next.view.mode = '2d';
    next.view.selectedLayerId = null;
    return { ok: true, state: next };
  }

  if (action.type === 'setViewMode') {
    if (!['2d', '3d'].includes(action.mode)) return failed(state, 'INVALID_VIEW', 'Choose the 2D or indicative 3D view.');
    const next = clone(state);
    next.view.mode = action.mode;
    return { ok: true, state: next };
  }

  if (action.type === 'selectLayer') {
    const surface = state.surfaces[action.surface ?? state.view.surface];
    if (!surface?.layers.some(layer => layer.id === action.layerId)) return failed(state, 'LAYER_NOT_FOUND', 'The selected layer is no longer available.');
    const next = clone(state);
    next.view.surface = surface.key;
    next.view.selectedLayerId = action.layerId;
    return { ok: true, state: next };
  }

  if (action.type === 'updateLayer') {
    const surfaceKey = action.surface ?? state.view.surface;
    const next = clone(state);
    const layer = next.surfaces[surfaceKey]?.layers.find(candidate => candidate.id === action.layerId);
    if (!layer) return failed(state, 'LAYER_NOT_FOUND', 'The selected layer is no longer available.');
    const protectedKeys = new Set(['id', 'required', 'controlLevel', 'role', 'type']);
    for (const [key, value] of Object.entries(action.patch ?? {})) {
      if (!protectedKeys.has(key)) layer[key] = value;
    }
    next.view.surface = surfaceKey;
    next.view.selectedLayerId = layer.id;
    return { ok: true, state: next };
  }

  if (action.type === 'deleteLayer') {
    const surfaceKey = action.surface ?? state.view.surface;
    const next = clone(state);
    const surface = next.surfaces[surfaceKey];
    const layer = surface?.layers.find(candidate => candidate.id === action.layerId);
    if (!layer) return failed(state, 'LAYER_NOT_FOUND', 'The selected layer is no longer available.');
    if (layer.required || layer.controlLevel === 'fixed') {
      return failed(state, 'REQUIRED_LAYER', 'The required basketball number cannot be deleted.');
    }
    surface.layers = surface.layers.filter(candidate => candidate.id !== layer.id);
    next.view.selectedLayerId = null;
    return { ok: true, state: next };
  }

  return failed(state, 'INVALID_ACTION', `Unsupported Studio action: ${String(action.type ?? '')}`);
}

export function createStudioHistory(initialState = createInitialStudioState(), options = {}) {
  const limit = Math.max(1, Number(options.limit) || 50);
  const store = options.store;
  let state = normalize(initialState);
  let past = [];
  let future = [];
  const historyActions = new Set(['updateLayer', 'deleteLayer']);
  const persist = () => store?.save?.(state);

  return {
    getState: () => clone(state),
    canUndo: () => past.length > 0,
    canRedo: () => future.length > 0,
    dispatch(action) {
      const before = clone(state);
      const result = reduceStudioState(state, action);
      if (!result.ok) return result;
      if (historyActions.has(action.type)) {
        past.push(before);
        if (past.length > limit) past = past.slice(-limit);
        future = [];
      }
      state = result.state;
      persist();
      return { ok: true, state: clone(state) };
    },
    undo() {
      if (!past.length) return failed(state, 'NOTHING_TO_UNDO', 'There are no changes to undo.');
      future.push(clone(state));
      state = past.pop();
      persist();
      return { ok: true, state: clone(state) };
    },
    redo() {
      if (!future.length) return failed(state, 'NOTHING_TO_REDO', 'There are no changes to redo.');
      past.push(clone(state));
      state = future.pop();
      persist();
      return { ok: true, state: clone(state) };
    },
    reset() {
      state = createInitialStudioState();
      past = [];
      future = [];
      store?.clear?.();
      return { ok: true, state: clone(state) };
    }
  };
}

export function createSessionStore(storage, key = PUBLIC_STUDIO_STORAGE_KEY) {
  return {
    load() {
      try {
        const saved = storage?.getItem?.(key);
        return saved ? restorePublicState(saved) : createInitialStudioState();
      } catch {
        return createInitialStudioState();
      }
    },
    save(state) {
      try {
        storage?.setItem?.(key, serializePublicState(state));
        return true;
      } catch {
        return false;
      }
    },
    clear() {
      try {
        storage?.removeItem?.(key);
        return true;
      } catch {
        return false;
      }
    }
  };
}
