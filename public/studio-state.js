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
    safe.mime = String(layer.mime ?? '');
    safe.size = Number.isFinite(layer.size) ? layer.size : 0;
    if (typeof layer.src === 'string') safe.src = layer.src;
    safe.cropZoom = Number.isFinite(layer.cropZoom) ? layer.cropZoom : 1;
    safe.cropX = Number.isFinite(layer.cropX) ? layer.cropX : 50;
    safe.cropY = Number.isFinite(layer.cropY) ? layer.cropY : 50;
    safe.opacity = Number.isFinite(layer.opacity) ? layer.opacity : 1;
    safe.flipX = Boolean(layer.flipX);
    safe.flipY = Boolean(layer.flipY);
  } else {
    safe.text = String(layer.text ?? '');
    safe.colour = String(layer.colour ?? '#FFFFFF');
    safe.alignment = ['left', 'center', 'right'].includes(layer.alignment) ? layer.alignment : 'center';
    safe.letterSpacing = Number.isFinite(layer.letterSpacing) ? layer.letterSpacing : 0;
    safe.lineSpacing = Number.isFinite(layer.lineSpacing) ? layer.lineSpacing : 1;
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
      scale: Number.isFinite(source.scale) ? source.scale : initial.surfaces[key].scale,
      angle: Number.isFinite(source.angle) ? source.angle : initial.surfaces[key].angle,
      density: Number.isFinite(source.density) ? source.density : initial.surfaces[key].density,
      neck: String(source.neck ?? initial.surfaces[key].neck),
      armTrim: String(source.armTrim ?? initial.surfaces[key].armTrim),
      gradient: Boolean(source.gradient),
      gradientColour: String(source.gradientColour ?? initial.surfaces[key].accent),
      gradientAngle: Number.isFinite(source.gradientAngle) ? source.gradientAngle : 135,
      layers: Array.isArray(source.layers) ? source.layers.map(safeLayer) : initial.surfaces[key].layers
    };
  }

  if (!SURFACE_KEYS.includes(state.view.surface)) state.view.surface = initial.view.surface;
  state.view.mode = state.view.mode === '3d' ? '3d' : '2d';
  return state;
}

export function serializePublicState(state) {
  const safe = normalize(state);
  for (const surface of Object.values(safe.surfaces)) {
    for (const layer of surface.layers) {
      delete layer.src;
      delete layer.file;
      delete layer.objectUrl;
    }
  }
  return JSON.stringify(safe);
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

const PUBLIC_ARTWORK_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp']);
const MAX_PUBLIC_ARTWORK_BYTES = 5 * 1024 * 1024;

export function validatePublicArtwork(file) {
  if (!file || !PUBLIC_ARTWORK_TYPES.has(file.type)) {
    return { ok: false, error: { code: 'UNSUPPORTED_UPLOAD', message: 'PNG, JPEG and WebP only in the public demonstrator. SVG, PDF, HEIC and specialist files need future reviewed handling or Pivot assistance.' } };
  }
  if (!Number.isFinite(file.size) || file.size > MAX_PUBLIC_ARTWORK_BYTES) {
    return { ok: false, error: { code: 'UPLOAD_TOO_LARGE', message: 'Choose a raster image no larger than 5 MB.' } };
  }
  return { ok: true };
}

const failed = (state, code, message) => ({
  ok: false,
  state: clone(state),
  error: { code, message }
});

export function reduceStudioState(current, action) {
  const state = normalize(current);
  if (!action || typeof action !== 'object') return failed(state, 'INVALID_ACTION', 'A Studio action is required.');

  if (action.type === 'setPalette') {
    const next = clone(state);
    const allowed = new Set(['primary', 'secondary', 'accent', 'light']);
    for (const [key, value] of Object.entries(action.patch ?? {})) if (allowed.has(key)) next.palette[key] = String(value);
    return { ok: true, state: next };
  }

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

  if (action.type === 'setViewport') {
    const next = clone(state);
    const patch = action.patch ?? {};
    if (Number.isFinite(patch.zoom)) next.view.zoom = Math.max(0.5, Math.min(2, patch.zoom));
    if (Number.isFinite(patch.panX)) next.view.panX = Math.max(-100, Math.min(100, patch.panX));
    if (Number.isFinite(patch.panY)) next.view.panY = Math.max(-100, Math.min(100, patch.panY));
    return { ok: true, state: next };
  }

  if (action.type === 'resetViewport') {
    const next = clone(state);
    next.view.zoom = 1;
    next.view.panX = 0;
    next.view.panY = 0;
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

  if (action.type === 'updateSurface') {
    const surfaceKey = action.surface ?? state.view.surface;
    const next = clone(state);
    const surface = next.surfaces[surfaceKey];
    if (!surface) return failed(state, 'INVALID_SURFACE', 'Choose an available 2D surface.');
    const allowed = new Set(['base', 'accent', 'pattern', 'scale', 'angle', 'density', 'neck', 'armTrim', 'gradient', 'gradientColour', 'gradientAngle']);
    for (const [key, value] of Object.entries(action.patch ?? {})) if (allowed.has(key)) surface[key] = value;
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

  if (action.type === 'addLayer') {
    const surfaceKey = action.surface ?? state.view.surface;
    const next = clone(state);
    const surface = next.surfaces[surfaceKey];
    if (!surface) return failed(state, 'INVALID_SURFACE', 'Choose an available 2D surface.');
    if (action.layer?.type === 'image') {
      const validation = validatePublicArtwork({ type: action.layer.mime, size: action.layer.size });
      if (!validation.ok) return { ...validation, state: clone(state) };
    }
    const layer = safeLayer(action.layer ?? {});
    if (!layer.id) return failed(state, 'INVALID_LAYER', 'The new layer needs an identifier.');
    surface.layers.push(layer);
    next.view.surface = surfaceKey;
    next.view.selectedLayerId = layer.id;
    return { ok: true, state: next };
  }

  if (action.type === 'duplicateLayer') {
    const surfaceKey = action.surface ?? state.view.surface;
    const next = clone(state);
    const surface = next.surfaces[surfaceKey];
    const source = surface?.layers.find(candidate => candidate.id === action.layerId);
    if (!source) return failed(state, 'LAYER_NOT_FOUND', 'The selected layer is no longer available.');
    if (source.controlLevel !== 'flexible') return failed(state, 'PROTECTED_LAYER', 'This required layer cannot be duplicated.');
    const copy = safeLayer({ ...source, id: action.newLayerId, x: Math.min(95, source.x + 5), y: Math.min(95, source.y + 5) });
    if (!copy.id) return failed(state, 'INVALID_LAYER', 'The duplicate layer needs an identifier.');
    surface.layers.push(copy);
    next.view.selectedLayerId = copy.id;
    return { ok: true, state: next };
  }

  if (action.type === 'reorderLayer') {
    const surfaceKey = action.surface ?? state.view.surface;
    const next = clone(state);
    const layers = next.surfaces[surfaceKey]?.layers;
    const index = layers?.findIndex(candidate => candidate.id === action.layerId) ?? -1;
    if (index < 0) return failed(state, 'LAYER_NOT_FOUND', 'The selected layer is no longer available.');
    const target = Math.max(0, Math.min(layers.length - 1, index + Math.sign(action.direction || 0)));
    if (target !== index) [layers[index], layers[target]] = [layers[target], layers[index]];
    next.view.selectedLayerId = action.layerId;
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
  const historyActions = new Set(['updateSurface', 'updateLayer', 'addLayer', 'duplicateLayer', 'reorderLayer', 'deleteLayer']);
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
