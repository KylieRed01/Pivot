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
    required: Boolean(layer.required),
    x: Number.isFinite(layer.x) ? layer.x : 50,
    y: Number.isFinite(layer.y) ? layer.y : 50,
    scale: Number.isFinite(layer.scale) ? layer.scale : 1,
    rotation: Number.isFinite(layer.rotation) ? layer.rotation : 0
  };
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
