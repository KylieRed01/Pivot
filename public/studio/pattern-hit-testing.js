const modulo = (value, divisor) => ((value % divisor) + divisor) % divisor;
const dotTarget = (point, cellSize, radiusRatio) => {
  const cell = Math.max(1, cellSize);
  const dx = modulo(point.x, cell) - cell / 2;
  const dy = modulo(point.y, cell) - cell / 2;
  return Math.hypot(dx, dy) <= cell * radiusRatio ? 'accent' : 'colour';
};

function rotatedPatternPoint({ x, y, width, height, angle }) {
  const radians = -(Number(angle) || 0) * Math.PI / 180;
  const dx = x - width / 2;
  const dy = y - height / 2;
  return {
    x: dx * Math.cos(radians) - dy * Math.sin(radians) + width / 2 + width * 0.3,
    y: dx * Math.sin(radians) + dy * Math.cos(radians) + height / 2 + height * 0.3
  };
}

export function resolvePatternColourTarget({ pattern, x, y, width, height, scale = 48, angle = 0 }) {
  if (![x, y, width, height].every(Number.isFinite) || width <= 0 || height <= 0) return 'colour';

  if (pattern === 'split') return x >= width * 0.5 ? 'accent' : 'colour';
  if (pattern === 'side-panels') return x < width * 0.18 || x > width * 0.82 ? 'accent' : 'colour';
  if (pattern === 'shoulders') return y < height * 0.22 ? 'accent' : 'colour';
  if (pattern === 'bands') {
    const ratio = y / height;
    if (ratio >= 0.28 && ratio < 0.36) return 'accent';
    if (ratio >= 0.42 && ratio < 0.46) return 'third';
    return 'colour';
  }

  if (pattern === 'dot-fade') return dotTarget({ x, y }, 14, 0.28);

  const point = rotatedPatternPoint({ x, y, width, height, angle });
  if (pattern === 'halftone') return dotTarget(point, scale, 0.32);
  if (pattern === 'dots-fine') return dotTarget(point, 8, 0.22);
  if (pattern === 'dots-large') return dotTarget(point, scale, 0.38);
  if (pattern === 'hoops') {
    const cycle = Math.max(1, scale) + 12;
    const distanceFromBottom = height * 1.6 - point.y;
    return modulo(distanceFromBottom, cycle) >= Math.max(1, scale) ? 'accent' : 'colour';
  }
  if (pattern === 'pinstripe') {
    const cycle = Math.max(1, scale) + 3;
    return modulo(point.x, cycle) >= Math.max(1, scale) ? 'accent' : 'colour';
  }
  if (pattern === 'stripes-wide') {
    const stripeWidth = Math.max(1, scale);
    return modulo(point.x, stripeWidth * 2) >= stripeWidth ? 'accent' : 'colour';
  }
  if (pattern === 'stripes-mixed') {
    const position = modulo(point.x, 42);
    if (position >= 8 && position < 12) return 'accent';
    if (position >= 28) return 'third';
  }
  return 'colour';
}
