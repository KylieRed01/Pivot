export const SURFACE_KEYS = Object.freeze([
  'dark.front',
  'dark.back',
  'light.front',
  'light.back'
]);

export const PUBLIC_STUDIO_STORAGE_KEY = 'pivot-public-studio-session-v1';

const surface = (key, background, foreground, { basketball = true } = {}) => ({
  key,
  base: background,
  accent: key.startsWith('dark') ? '#0096D6' : '#092C71',
  pattern: key.endsWith('front') ? 'velocity' : 'clean',
  scale: 48,
  angle: key.endsWith('front') ? -28 : 0,
  density: 32,
  gradient: false,
  gradientColour: key.startsWith('dark') ? '#0096D6' : '#092C71',
  gradientAngle: 135,
  neck: key.startsWith('dark') ? '#FFFFFF' : '#092C71',
  armTrim: '#0096D6',
  layers: [
    {
      id: `${key}-wordmark`,
      type: 'text',
      role: 'wordmark',
      controlLevel: 'flexible',
      text: 'PIVOT',
      colour: foreground,
      x: 50,
      y: 38,
      scale: 1,
      rotation: 0,
      alignment: 'center',
      letterSpacing: 0,
      lineSpacing: 1
    },
    ...(basketball ? [{
      id: `${key}-number`,
      type: 'text',
      role: 'number',
      controlLevel: 'constrained',
      required: true,
      text: '24',
      colour: foreground,
      x: 50,
      y: key.endsWith('back') ? 58 : 62,
      scale: key.endsWith('back') ? 3 : 2.4,
      rotation: 0,
      alignment: 'center',
      letterSpacing: 0,
      lineSpacing: 1
    }] : [])
  ]
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
      primary: '#092C71',
      secondary: '#0096D6',
      accent: '#F4951D',
      light: '#FFFFFF'
    },
    surfaces: {
      'dark.front': surface('dark.front', '#092C71', '#FFFFFF', { basketball }),
      'dark.back': surface('dark.back', '#092C71', '#FFFFFF', { basketball }),
      'light.front': surface('light.front', '#FFFFFF', '#092C71', { basketball }),
      'light.back': surface('light.back', '#FFFFFF', '#092C71', { basketball })
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
