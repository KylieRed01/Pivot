const finitePositive = value => Number.isFinite(value) && value > 0;

export function availableTextWidth({ boundaryWidth, anchorPercent, alignment = 'center' } = {}) {
  if (!finitePositive(boundaryWidth) || !Number.isFinite(anchorPercent)) return 0;
  const anchor = Math.max(0, Math.min(100, anchorPercent)) / 100;
  if (alignment === 'left') return boundaryWidth * (1 - anchor);
  if (alignment === 'right') return boundaryWidth * anchor;
  return boundaryWidth * 2 * Math.min(anchor, 1 - anchor);
}

export function textFitsSafeArea({ contentWidth, boundaryWidth, anchorPercent, alignment = 'center' } = {}) {
  if (!Number.isFinite(contentWidth) || contentWidth < 0) return false;
  const available = availableTextWidth({ boundaryWidth, anchorPercent, alignment });
  return available > 0 && contentWidth <= available + 0.5;
}

export function textFitsBox({ contentWidth, boxWidth } = {}) {
  if (!Number.isFinite(contentWidth) || contentWidth < 0 || !finitePositive(boxWidth)) return false;
  return contentWidth <= boxWidth + 0.5;
}

export function pointInSafeArea({ clientX, clientY, rect } = {}) {
  if (!Number.isFinite(clientX) || !Number.isFinite(clientY) || !finitePositive(rect?.width) || !finitePositive(rect?.height)) return null;
  const clampPercent = value => Math.max(0, Math.min(100, value));
  return {
    x: clampPercent((clientX - rect.left) / rect.width * 100),
    y: clampPercent((clientY - rect.top) / rect.height * 100)
  };
}

export function rectangleOverflow({ boundary, content } = {}) {
  const values = [boundary?.left, boundary?.top, boundary?.right, boundary?.bottom, content?.left, content?.top, content?.right, content?.bottom];
  if (!values.every(Number.isFinite)) return Number.POSITIVE_INFINITY;
  return Math.max(
    0,
    boundary.left - content.left,
    content.right - boundary.right,
    boundary.top - content.top,
    content.bottom - boundary.bottom
  );
}

export function positionAnchorPercent({ objectWidth, boundaryWidth, alignment = 'center', position } = {}) {
  if (!finitePositive(objectWidth) || !finitePositive(boundaryWidth) || objectWidth > boundaryWidth + 0.5) return null;
  if (position === 'centre') return 50;
  const widthPercent = objectWidth / boundaryWidth * 100;
  if (position === 'left') {
    if (alignment === 'left') return 0;
    if (alignment === 'right') return widthPercent;
    return widthPercent / 2;
  }
  if (position === 'right') {
    if (alignment === 'left') return 100 - widthPercent;
    if (alignment === 'right') return 100;
    return 100 - widthPercent / 2;
  }
  return null;
}
