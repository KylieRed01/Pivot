import { DEFAULT_BASKETBALL_NUMBER_FONT_ID } from './font-catalog.js';

export const SURFACE_KEYS = Object.freeze([
  'dark.front',
  'dark.back',
  'light.front',
  'light.back'
]);

export const PUBLIC_STUDIO_STORAGE_KEY = 'pivot-public-studio-session-v1';

// Indicative 2:1 visual ratio for the BBA 20 cm back / 10 cm front baseline.
// Exact physical dimensions remain blocked until supplier-template measurement.
const BBA_TRIAL_NUMBER_SCALE = Object.freeze({ front: 1.5, back: 3 });

const surface = (key, background, foreground, { basketball = true } = {}) => ({
  key,
  base: background,
  accent: key.startsWith('dark') ? '#F4951D' : '#0096D6',
  pattern: key.endsWith('front') ? 'velocity' : 'clean',
  scale: 48,
  angle: key.endsWith('front') ? -28 : 0,
  density: 100,
  gradient: false,
  gradientColour: key.startsWith('dark') ? '#F4951D' : '#0096D6',
  gradientAngle: 135,
  neck: '#092C71',
  armTrim: '#092C71',
  layers: basketball ? [{
      id: `${key}-number`,
      type: 'text',
      role: 'number',
      controlLevel: 'constrained',
      required: true,
      text: '24',
      colour: foreground,
      x: 50,
      y: key.endsWith('back') ? 58 : 62,
      scale: key.endsWith('back') ? BBA_TRIAL_NUMBER_SCALE.back : BBA_TRIAL_NUMBER_SCALE.front,
      rotation: 0,
      alignment: 'center',
      letterSpacing: 0,
      lineSpacing: 1,
      fontId: DEFAULT_BASKETBALL_NUMBER_FONT_ID
    }] : []
});

export function createPlaceholderStudioConfig(garment = 'basketball-jersey') {
  const basketball = garment === 'basketball-jersey';
  return {
    version: 1,
    designName: 'Untitled browser design',
    setup: {
      sport: 'basketball',
      competition: 'bendigo-basketball-association',
      garment
    },
    view: {
      surface: 'dark.front',
      mode: '2d',
      selectedLayerId: null,
      zoom: 1,
      panX: 0,
      panY: 0
    },
    palette: {
      primary: '#0096D6',
      secondary: '#F4951D',
      accent: '#092C71',
      light: '#FFFFFF'
    },
    surfaces: {
      'dark.front': surface('dark.front', '#0096D6', '#FFFFFF', { basketball }),
      'dark.back': surface('dark.back', '#0096D6', '#FFFFFF', { basketball }),
      'light.front': surface('light.front', '#F4951D', '#092C71', { basketball }),
      'light.back': surface('light.back', '#F4951D', '#092C71', { basketball })
    },
    meta: {
      persistence: 'browser-session-only',
      templateStatus: 'placeholder',
      artworkStatus: 'placeholder',
      geometryStatus: 'indicative',
      threeDStatus: 'indicative',
      productionStatus: 'not-production-ready'
    }
  };
}
