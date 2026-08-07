import { DEFAULT_BASKETBALL_NUMBER_FONT_ID } from './font-catalog.js';

export const SURFACE_KEYS = Object.freeze([
  'dark.front',
  'dark.back',
  'light.front',
  'light.back'
]);

export const PUBLIC_STUDIO_STORAGE_KEY = 'pivot-public-studio-session-v1';

// The preview maps the adopted 10 cm front and 20 cm back minimums to an
// indicative 2:1 size on the jersey. Supplier-template measurement remains required.
const BBA_TRIAL_NUMBER_FONT_SIZE = Object.freeze({ front: 42, back: 84 });

const pivotLogoLayer = (key, garment) => ({
  id: `${key}-pivot-logo`,
  type: 'image',
  role: 'artwork',
  controlLevel: 'flexible',
  libraryAssetId: 'pivot-logo',
  name: 'Pivot Teamwear logo',
  mime: 'image/svg+xml',
  size: 0,
  src: '/brand/Pivot_Logo_Transparent.svg',
  x: 50,
  y: garment === 'basketball-jersey' ? (key.endsWith('back') ? 14 : 20) : (key.endsWith('back') ? 24 : 40),
  scale: garment === 'basketball-jersey' ? 1.1 : 1,
  rotation: 0,
  cropZoom: 1,
  cropX: 50,
  cropY: 50,
  opacity: 1,
  flipX: false,
  flipY: false
});

const surface = (key, background, foreground, garment) => {
  const basketball = garment === 'basketball-jersey';
  return {
    key,
    base: background,
    accent: '#0096D6',
    third: '#F4951D',
    fourth: '#FFFFFF',
    pattern: 'clean',
    scale: 48,
    angle: -28,
    density: 100,
    neck: '#092C71',
    armTrim: '#092C71',
    layers: [pivotLogoLayer(key, garment), ...(basketball ? [{
      id: `${key}-number`,
      type: 'text',
      role: 'number',
      controlLevel: 'constrained',
      required: true,
      text: '24',
      colour: foreground,
      x: 50,
      y: key.endsWith('back') ? 58 : 62,
      scale: 1,
      fontSize: key.endsWith('back') ? BBA_TRIAL_NUMBER_FONT_SIZE.back : BBA_TRIAL_NUMBER_FONT_SIZE.front,
      rotation: 0,
      alignment: 'center',
      letterSpacing: 0,
      lineSpacing: 1,
      fontId: DEFAULT_BASKETBALL_NUMBER_FONT_ID
    }] : [])]
  };
};

export function createPlaceholderStudioConfig(garment = 'basketball-jersey') {
  return {
    version: 10,
    designName: 'Untitled browser design',
    setup: {
      sport: 'basketball',
      competition: 'bendigo-basketball-association',
      garment,
      backDesignMode: 'linked'
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
      primary: '#092C71',
      secondary: '#F4951D',
      accent: '#092C71',
      light: '#FFFFFF'
    },
    surfaces: {
      'dark.front': surface('dark.front', '#092C71', '#FFFFFF', garment),
      'dark.back': surface('dark.back', '#092C71', '#FFFFFF', garment),
      'light.front': surface('light.front', '#FFFFFF', '#092C71', garment),
      'light.back': surface('light.back', '#FFFFFF', '#092C71', garment)
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
