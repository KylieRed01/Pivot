import {
  createPlaceholderStudioConfig,
  PUBLIC_STUDIO_STORAGE_KEY,
  SURFACE_KEYS
} from './studio-config.js';
import {
  DEFAULT_BASKETBALL_NUMBER_FONT_ID,
  DEFAULT_TEXT_FONT_ID,
  getFontChoice,
  listFontChoices
} from './font-catalog.js';

const FONT_IDS = new Set(listFontChoices().map(choice => choice.id));

const clone = value => structuredClone(value);

export function createInitialStudioState(garment = 'basketball-jersey') {
  return clone(createPlaceholderStudioConfig(garment));
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
    if (layer.libraryAssetId === 'pivot-penguin' && layer.src === '/brand/Pivot_Icon.svg') {
      safe.libraryAssetId = 'pivot-penguin';
      safe.src = '/brand/Pivot_Icon.svg';
    } else if (typeof layer.src === 'string' && /^data:image\/(?:png|jpeg|webp);base64,/i.test(layer.src)) safe.src = layer.src;
    safe.cropZoom = Number.isFinite(layer.cropZoom) ? layer.cropZoom : 1;
    safe.cropX = Number.isFinite(layer.cropX) ? layer.cropX : 50;
    safe.cropY = Number.isFinite(layer.cropY) ? layer.cropY : 50;
    safe.opacity = Number.isFinite(layer.opacity) ? layer.opacity : 1;
    safe.flipX = Boolean(layer.flipX);
    safe.flipY = Boolean(layer.flipY);
  } else {
    safe.scale = 1;
    safe.fontSize = Number.isFinite(layer.fontSize)
      ? Math.max(5, layer.fontSize)
      : Math.max(5, Math.round((Number.isFinite(layer.scale) ? layer.scale : 1) * 14));
    safe.text = String(layer.text ?? '');
    safe.colour = String(layer.colour ?? '#FFFFFF');
    safe.alignment = ['left', 'center', 'right'].includes(layer.alignment) ? layer.alignment : 'center';
    safe.letterSpacing = Number.isFinite(layer.letterSpacing) ? layer.letterSpacing : 0;
    safe.lineSpacing = Number.isFinite(layer.lineSpacing) ? layer.lineSpacing : 1;
    const fallbackFontId = safe.role === 'number' ? DEFAULT_BASKETBALL_NUMBER_FONT_ID : DEFAULT_TEXT_FONT_ID;
    safe.fontId = FONT_IDS.has(layer.fontId) ? layer.fontId : fallbackFontId;
  }
  return safe;
}

function normalize(candidate) {
  const garment = ['basketball-jersey', 'generic-t-shirt', 'generic-hoodie'].includes(candidate?.setup?.garment)
    ? candidate.setup.garment
    : 'basketball-jersey';
  const initial = createInitialStudioState(garment);
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

export function resetStudioState(garment = 'basketball-jersey') {
  return createInitialStudioState(garment);
}

const PUBLIC_ARTWORK_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp']);
const MAX_PUBLIC_ARTWORK_BYTES = 1 * 1024 * 1024;
const MAX_PUBLIC_ARTWORK_SESSION_BYTES = 1 * 1024 * 1024;

const publicArtworkBytes = state => Object.values(state.surfaces).reduce(
  (total, surface) => total + surface.layers.reduce(
    (surfaceTotal, layer) => surfaceTotal + (layer.type === 'image' && Number.isFinite(layer.size) ? layer.size : 0),
    0
  ),
  0
);

export function runIndicativeChecks(candidate) {
  const state = normalize(candidate);
  const checks = [];
  for (const [surfaceKey, surface] of Object.entries(state.surfaces)) {
    if (state.setup.garment === 'basketball-jersey') {
      const requiredNumber = surface.layers.find(layer => layer.role === 'number' && layer.required);
      if (!requiredNumber || !/^\d{1,2}$/.test(requiredNumber.text.trim())) {
        checks.push({ code: 'REQUIRED_NUMBER', severity: 'error', blocking: true, surface: surfaceKey, layerId: requiredNumber?.id, message: `A required one- or two-digit basketball number is needed on ${surfaceKey}.` });
      }
      if (requiredNumber) {
        const font = getFontChoice(requiredNumber.fontId);
        if (!font.productionApproved) {
          checks.push({ code: 'UNVALIDATED_BASKETBALL_FONT', severity: 'error', blocking: true, surface: surfaceKey, layerId: requiredNumber.id, message: `${font.familyLabel} ${font.label} is available for development preview only. Basketball production validation is still required before release.` });
        }
      }
    }
    for (const layer of surface.layers) {
      if (layer.type === 'text' && layer.role !== 'number' && !layer.text.trim()) {
        checks.push({ code: 'EMPTY_TEXT', severity: 'warning', blocking: false, surface: surfaceKey, layerId: layer.id, message: 'A text layer is empty. Add wording or remove the optional layer.' });
      }
      if (layer.x < 5 || layer.x > 95 || layer.y < 10 || layer.y > 92) {
        checks.push({ code: 'INDICATIVE_BOUNDARY', severity: 'warning', blocking: false, surface: surfaceKey, layerId: layer.id, message: 'An element sits outside the Design Studio trial boundary. Supplier geometry is still unresolved.' });
      }
      if (layer.type === 'image' && layer.libraryAssetId !== 'pivot-penguin') {
        const validation = validatePublicArtwork({ type: layer.mime, size: layer.size });
        if (!validation.ok) checks.push({ code: validation.error.code, severity: 'error', blocking: true, surface: surfaceKey, layerId: layer.id, message: validation.error.message });
      }
    }
  }
  checks.push({ code: 'UNRESOLVED_DEPENDENCIES', severity: 'guidance', blocking: false, message: 'Supplier, final Phoenix artwork, production infrastructure, accurate 3D and manufacturing integration remain unresolved.' });
  checks.push({ code: 'INDICATIVE_ONLY', severity: 'guidance', blocking: false, message: 'These checks use placeholder geometry and do not establish manufacturing readiness.' });
  return checks;
}

export function validatePublicArtwork(file, existingArtworkBytes = 0) {
  if (!file || !PUBLIC_ARTWORK_TYPES.has(file.type)) {
    return { ok: false, error: { code: 'UNSUPPORTED_UPLOAD', message: 'PNG, JPEG and WebP only in the public Design Studio trial. SVG, PDF, HEIC and specialist files need future reviewed handling or Pivot assistance.' } };
  }
  if (!Number.isFinite(file.size) || file.size > MAX_PUBLIC_ARTWORK_BYTES) {
    return { ok: false, error: { code: 'UPLOAD_TOO_LARGE', message: 'Choose a raster image no larger than 1 MB.' } };
  }
  if (existingArtworkBytes + file.size > MAX_PUBLIC_ARTWORK_SESSION_BYTES) {
    return { ok: false, error: { code: 'UPLOAD_BUDGET_EXCEEDED', message: 'Browser-session artwork must total no more than 1 MB so it can be restored after reload. Remove an image or choose a smaller file.' } };
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

  if (action.type === 'batch') {
    if (!Array.isArray(action.actions) || !action.actions.length || action.actions.some(item => item?.type === 'batch')) {
      return failed(state, 'INVALID_BATCH', 'A compound Studio action needs one or more non-nested actions.');
    }
    let next = state;
    for (const item of action.actions) {
      const result = reduceStudioState(next, item);
      if (!result.ok) return failed(state, result.error.code, result.error.message);
      next = result.state;
    }
    return { ok: true, state: next };
  }

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
    const patch = action.patch ?? {};
    if (layer.role === 'number' && Object.hasOwn(patch, 'text') && !/^\d{1,2}$/.test(String(patch.text))) {
      return failed(state, 'INVALID_REQUIRED_NUMBER', 'Enter a required basketball number using one or two digits.');
    }
    const protectedKeys = new Set(['id', 'required', 'controlLevel', 'role', 'type']);
    for (const [key, value] of Object.entries(patch)) {
      if (protectedKeys.has(key) || (layer.type === 'text' && key === 'scale')) continue;
      if (layer.type === 'text' && key === 'fontSize') {
        if (Number.isFinite(value)) layer.fontSize = Math.max(5, value);
        continue;
      }
      layer[key] = value;
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
    if (action.layer?.type === 'image' && action.layer.libraryAssetId !== 'pivot-penguin') {
      const validation = validatePublicArtwork({ type: action.layer.mime, size: action.layer.size }, publicArtworkBytes(state));
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
    if (source.type === 'image' && source.libraryAssetId !== 'pivot-penguin') {
      const validation = validatePublicArtwork({ type: source.mime, size: source.size }, publicArtworkBytes(state));
      if (!validation.ok) return { ...validation, state: clone(state) };
    }
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
  const historyActions = new Set(['batch', 'setPalette', 'updateSurface', 'updateLayer', 'addLayer', 'duplicateLayer', 'reorderLayer', 'deleteLayer']);
  const persist = () => {
    try {
      return store?.save ? store.save(state) !== false : true;
    } catch {
      return false;
    }
  };

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
      const persisted = persist();
      return { ok: true, state: clone(state), persisted };
    },
    undo() {
      if (!past.length) return failed(state, 'NOTHING_TO_UNDO', 'There are no changes to undo.');
      future.push(clone(state));
      state = past.pop();
      const persisted = persist();
      return { ok: true, state: clone(state), persisted };
    },
    redo() {
      if (!future.length) return failed(state, 'NOTHING_TO_REDO', 'There are no changes to redo.');
      past.push(clone(state));
      state = future.pop();
      const persisted = persist();
      return { ok: true, state: clone(state), persisted };
    },
    reset(garment = 'basketball-jersey') {
      state = createInitialStudioState(garment);
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
