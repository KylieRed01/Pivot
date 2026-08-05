import { fontStyle } from './font-catalog.js';

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const supportedGarments = new Set(['basketball-jersey', 'generic-t-shirt', 'generic-hoodie']);

export function renderJerseyPreview(d, design, selectedId, garment = 'basketball-jersey') {
  const garmentType = supportedGarments.has(garment) ? garment : 'basketball-jersey';
  const layers = design.layers.map(layer => {
    const fontSize = Number.isFinite(layer.fontSize) ? layer.fontSize : Math.max(5, Math.round((layer.scale || 1) * 14));
    const typography = layer.type === 'text' ? `;${fontStyle(layer.fontId)};font-size:${fontSize}pt` : '';
    const anchorX = layer.type === 'text' && layer.alignment === 'left' ? '0%' : layer.type === 'text' && layer.alignment === 'right' ? '-100%' : '-50%';
    const layerScale = layer.type === 'text' ? 1 : layer.scale;
    return `<button class="art-layer ${layer.type==='image'?'image-layer':''} ${selectedId===layer.id?'selected':''}" data-layer-id="${layer.id}" style="--x:${layer.x}%;--anchor-x:${anchorX};--y:${layer.y}%;--layer-scale:${layerScale};--rotation:${layer.rotation}deg;--layer-colour:${layer.colour||'#FFFFFF'};--crop-zoom:${layer.cropZoom||1};--crop-x:${layer.cropX??50}%;--crop-y:${layer.cropY??50}%;--layer-opacity:${layer.opacity??1};--flip-x:${layer.flipX?-1:1};--flip-y:${layer.flipY?-1:1};--letter-spacing:${layer.letterSpacing??0}px;--line-height:${layer.lineSpacing??1};--text-align:${layer.alignment||'center'}${esc(typography)}" aria-label="${esc(layer.text||layer.name)} layer">${layer.type==='image'?`<span class="image-crop-frame"><img src="${layer.src}" alt=""></span>`:esc(layer.text)}${selectedId===layer.id?'<i class="resize-handle" aria-hidden="true">↘</i>':''}</button>`;
  }).join('');
  const base = design.base || d.colour;
  const fill = design.gradient ? `linear-gradient(${design.gradientAngle??135}deg, ${base}, ${design.gradientColour||d.accent})` : base;
  const jerseyDetails = garmentType === 'basketball-jersey' ? `<div class="armhole armhole-left" data-colour-area="armTrim" style="--arm-trim:${design.armTrim||design.sleeves||d.accent}" aria-hidden="true"></div><div class="armhole armhole-right" data-colour-area="armTrim" style="--arm-trim:${design.armTrim||design.sleeves||d.accent}" aria-hidden="true"></div><div class="neck" data-colour-area="neck" style="--neck:${design.neck||d.accent}" aria-hidden="true"></div>` : '';
  const hood = garmentType === 'generic-hoodie' ? `<div class="garment-hood" style="--hood-fill:${base}" aria-hidden="true"></div>` : '';

  return `<div class="jersey-wrap"><div class="jersey-shadow"></div>${hood}<div class="jersey garment-${garmentType} pattern-${design.pattern}" style="--base:${base};--base-fill:${fill};--trim:${design.accent||d.accent};--third:${d.third||'#F4951D'};--fourth:${d.fourth||'#FFFFFF'};--pattern-scale:${design.scale}px;--pattern-angle:${design.angle}deg;--density:${design.density}%;--pattern-opacity:${design.density/100}">${jerseyDetails}<div class="print-boundary">${layers}</div></div><span class="placeholder-badge">Preview only · placeholder template</span></div>`;
}
