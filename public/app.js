const app = document.querySelector('#app');
let current = 'admin@phoenix.test';
let admin;

async function api(path, options = {}) {
  const response = await fetch(path, { ...options, headers: { 'content-type': 'application/json', 'x-demo-user': current, ...options.headers } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
}

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shirt = d => `<div class="garment"><div class="shirt" style="--colour:${d.colour};--accent:${d.accent}"><span>${esc(d.artwork)}</span></div></div>`;

async function store() {
  const { club, products } = await api('/api/store/phoenix');
  app.innerHTML = `<section class="hero"><div class="eyebrow">Official pilot club store</div><h1>${club.shortName} teamwear.</h1><p>Explore the approved U10 and coaching range. Sponsor-funded pilot products are shown without pricing or ordering.</p><a class="hero-link" href="#admin">Open design studio <span>→</span></a></section><section class="section"><div class="section-heading"><div><span class="eyebrow">The collection</span><h2>Approved range</h2></div><p>Purpose-built teamwear for every part of the club.</p></div><div class="grid">${products.map(d => `<article class="card">${shirt(d)}<div class="card-body"><span class="eyebrow">Approved design v${d.version}</span><h3>${d.name}</h3><p>Available through Phoenix's managed pilot program.</p></div></article>`).join('')}</div><h2>Coach polo size guide</h2><table class="sizes"><tr><th>Size</th><th>Chest (cm)</th><th>Length (cm)</th></tr><tr><td>XS</td><td>94</td><td>68</td></tr><tr><td>S</td><td>100</td><td>70</td></tr><tr><td>M</td><td>106</td><td>72</td></tr><tr><td>L</td><td>112</td><td>74</td></tr></table></section>`;
}

const patternCatalog={
  Gradients:[['fade','Two-colour fade'],['gradient-diagonal','Diagonal fade'],['gradient-centre','Radial glow'],['gradient-three','Three-colour fade']],
  Stripes:[['hoops','Horizontal stripes'],['pinstripe','Vertical pinstripes'],['stripes-wide','Wide vertical stripes'],['stripes-mixed','Mixed vertical stripes'],['bands','Chest bands']],
  Diagonals:[['velocity','Diagonal repeat'],['sash','Single sash'],['double-sash','Double sash']],
  Dots:[['halftone','Halftone dots'],['dots-fine','Fine dots'],['dots-large','Large dots'],['dot-fade','Fading dots']],
  Geometric:[['chevron','Chevron'],['burst','Court burst'],['split','Split panel'],['side-panels','Side panels'],['shoulders','Shoulder panel']],
  Plain:[['clean','Classic plain']]
};
const patternNames=Object.fromEntries(Object.values(patternCatalog).flat().map(([key,name])=>[key,name]));
const defaultSides = d => ({
  primary:{pattern:'velocity',scale:48,angle:-28,density:32,neck:'#FFFFFF',sleeves:'#0096D6',layers:[{id:'pivot-logo',type:'image',text:'Pivot logo',src:'/brand/Pivot_Icon.svg',x:50,y:27,scale:.65,rotation:0},{id:'wordmark',type:'text',text:'PIVOT',colour:'#FFFFFF',x:50,y:40,scale:1,rotation:0},{id:'number',type:'text',text:'24',colour:'#FFFFFF',x:50,y:60,scale:2.6,rotation:0}]},
  reverse:{pattern:'chevron',scale:42,angle:0,density:26,neck:'#092C71',sleeves:'#0096D6',layers:[{id:'reverse-logo',type:'image',text:'Pivot logo',src:'/brand/Pivot_Icon.svg',x:50,y:28,scale:.58,rotation:0},{id:'reverse-mark',type:'text',text:'PIVOT TEAMWEAR',colour:'#092C71',x:50,y:42,scale:.75,rotation:0},{id:'reverse-number',type:'text',text:'24',colour:'#092C71',x:50,y:61,scale:2.1,rotation:0}]}
});
function jersey(d, design, selectedId) {
  const layers=design.layers.map(layer=>`<button class="art-layer ${layer.type==='image'?'image-layer':''} ${selectedId===layer.id?'selected':''}" data-layer-id="${layer.id}" style="--x:${layer.x}%;--y:${layer.y}%;--layer-scale:${layer.scale};--rotation:${layer.rotation}deg;--layer-colour:${layer.colour||'#FFFFFF'}" aria-label="${esc(layer.text)} layer">${layer.type==='image'?`<img src="${layer.src}" alt="">`:esc(layer.text)}</button>`).join('');
  const fill=design.gradient?`linear-gradient(${design.gradientAngle??135}deg, ${d.colour}, ${design.gradientColour||d.accent})`:d.colour;
  return `<div class="jersey-wrap"><div class="jersey-shadow"></div><div class="jersey pattern-${design.pattern}" style="--base:${d.colour};--base-fill:${fill};--trim:${d.accent};--pattern-scale:${design.scale}px;--pattern-angle:${design.angle}deg;--density:${design.density}%;--pattern-opacity:${design.density/100}"><div class="sleeve-colour" style="--sleeve:${design.sleeves||d.accent}"></div><div class="neck" style="--neck:${design.neck||d.accent}"></div><div class="print-boundary" aria-label="Printable area">${layers}</div></div><span class="placeholder-badge">Preview only · placeholder template</span></div>`;
}

async function dashboard() {
  admin = await api('/api/admin');
  const d = admin.designs.find(x => x.id === 'concept') || admin.designs[0];
  let side = 'primary';
  let savedColours;
  try { savedColours=JSON.parse(localStorage.getItem('pivot-generic-colours')); } catch {}
  d.colour=savedColours?.colour||'#092C71';d.accent=savedColours?.accent||'#0096D6';
  let sides;
  try { sides=JSON.parse(localStorage.getItem('pivot-design-sides')) || defaultSides(d); } catch { sides=defaultSides(d); }
  for(const [sideName,design] of Object.entries(sides)) {for(const layer of design.layers) if(['PHOENIX','PU BASKETBALL','PU','TEAM NAME'].includes(layer.text)) layer.text=layer.id.includes('number')?'24':'PIVOT';if(!design.layers.some(layer=>layer.type==='image'))design.layers.unshift({id:sideName+'-pivot-logo',type:'image',text:'Pivot logo',src:'/brand/Pivot_Icon.svg',x:50,y:27,scale:.65,rotation:0});}
  let selectedId=sides.primary.layers[0].id;
  let colourTarget='colour';
  let viewMode='2d', modelAngle=-18, patternCategory='Gradients';
  const paletteFamilies={
    Blues:['#EAF4FF','#B9DFFF','#69BFFF','#0096D6','#1261A0','#092C71','#061A42'],
    Reds:['#FFE8E5','#FFB4AA','#F26B5B','#E53935','#C8102E','#8E0D21','#520713'],
    Oranges:['#FFF1D6','#FFD38A','#F4951D','#E66B00','#A94700'],
    Greens:['#E3F5E8','#9DDBAE','#39A85A','#00843D','#07552B','#173D31'],
    Purples:['#F1E8FA','#C9A7E8','#9254C8','#6A1B9A','#3D0E59'],
    Neutrals:['#FFFFFF','#E8EBED','#B9C0C5','#7C878E','#3F4549','#000000'],
    Yellows:['#FFF9CC','#FFE76A','#FFD100','#D9A900']
  }; 
  const palette=Object.values(paletteFamilies).flat();
  const persist=()=>{localStorage.setItem('pivot-design-sides',JSON.stringify(sides));localStorage.setItem('pivot-generic-colours',JSON.stringify({colour:d.colour,accent:d.accent}))};
  app.innerHTML = `<div class="workspace"><h1 class="sr-only">Pivot design studio</h1>
    <aside class="rail" aria-label="Design tools"><a class="rail-logo" href="#store"><img src="/brand/Pivot_Icon.svg" alt="Pivot"></a><button class="rail-item active" data-tool="colours" aria-label="Colours"><span>●</span><small>Colours</small></button><button class="rail-item" data-tool="patterns" aria-label="Designs"><span>▧</span><small>Designs</small></button><button class="rail-item" data-tool="artwork" aria-label="Text and artwork"><span>T</span><small>Text</small></button><button class="rail-item" data-tool="uploads" aria-label="Uploads"><span>↑</span><small>Uploads</small></button><button class="rail-item" data-tool="details" aria-label="Design details"><span>ⓘ</span><small>Details</small></button><div class="rail-spacer"></div><button class="rail-item" aria-label="Help"><span>?</span></button></aside>
    <section class="editor">
      <header class="editor-top"><div><a href="#store" class="back">← Back to projects</a><h1>Pivot Teamwear Design Tool</h1></div><div class="save-state"><span class="saved-dot"></span><span id="save-label">All changes saved</span><button class="preview-btn" data-action="save">Save design</button><button class="submit-btn" data-action="clubApprove">Submit design</button></div></header>
      <div class="editor-body">
        <aside class="tools open"><div class="tool-title"><div><span class="eyebrow">Pivot design studio</span><h2 id="tool-heading">Colours</h2></div><button id="close-tools" aria-label="Close tools">×</button></div>
          <section class="tool-section active" data-tool-panel="colours"><p class="panel-help">Use the swatches below the jersey, or enter an exact colour here.</p><label class="field">Edit colour for<select id="precise-colour-target"><option value="colour">Jersey base</option><option value="accent">Pattern</option><option value="neck">Neckline</option><option value="sleeves">Sleeves / side</option><option value="layer">Selected text or number</option></select></label><label class="field">HEX colour<div class="hex-editor"><span>#</span><input id="precise-hex" value="092C71" maxlength="6" spellcheck="false"><button id="apply-hex">Apply</button></div></label></section><section class="tool-section" data-tool-panel="patterns"><p class="panel-help">Choose a pattern family, then select a design.</p><div class="pattern-categories">${Object.keys(patternCatalog).map((name,i)=>`<button class="${i===0?'active':''}" data-pattern-category="${name}"><span>${name}</span><b>›</b></button>`).join('')}</div><button id="back-patterns" class="back-patterns">← Pattern families</button><div class="patterns">${Object.entries(patternCatalog).map(([category,items])=>items.map(([key,name],i)=>`<button class="pattern" data-pattern="${key}" data-category="${category}" aria-pressed="false"><i class="swatch-${key}"></i><span>${name}</span></button>`).join('')).join('')}</div><div class="pattern-controls"><label>Scale <output id="scale-out">48</output><input id="pattern-scale" type="range" min="18" max="90" value="48"></label><label>Angle <output id="angle-out">−28°</output><input id="pattern-angle" type="range" min="-90" max="90" value="-28"></label><label>Intensity <output id="density-out">32%</output><input id="pattern-density" type="range" min="5" max="80" value="32"></label></div><div class="gradient-controls"><label class="switch-row"><input id="gradient-enabled" type="checkbox"> Gradient jersey base</label><div id="gradient-options"><label>Second colour <input id="gradient-colour" type="color" value="${d.accent}"></label><label>Direction <select id="gradient-angle"><option value="0">Bottom to top</option><option value="90">Left to right</option><option value="135" selected>Diagonal</option><option value="180">Top to bottom</option></select></label></div></div></section>
          <section class="tool-section" data-tool-panel="artwork"><button class="section-toggle" aria-expanded="true"><span>Text and artwork</span><em>⌃</em></button><div id="layer-list" class="layer-list"></div><div class="layer-actions"><button id="add-text">＋ Add text</button><button id="duplicate-layer">Duplicate</button><button id="delete-layer">Delete</button></div><div class="transform-controls"><label>Size <input id="layer-scale" type="range" min="0.35" max="3" step="0.05"></label><label>Rotation <input id="layer-rotation" type="range" min="-180" max="180"></label><div class="placement-presets"><span>Quick position</span><button data-place="left">Left side</button><button data-place="centre">Centre</button><button data-place="right">Right side</button></div></div><label class="field">Selected text<input id="artwork" value="PIVOT" maxlength="24"></label></section><section class="tool-section" data-tool-panel="uploads"><p class="panel-help">Add your club logo, sponsor artwork or other approved graphics.</p><label class="upload upload-large"><input id="upload" type="file" accept="image/png,image/jpeg,image/svg+xml"><span>↑</span><b>Upload artwork</b><small>PNG, JPG or SVG · max 5 MB</small></label><h3>Your uploads</h3><div class="empty-uploads">Uploaded artwork will appear here.</div></section><section class="tool-section" data-tool-panel="details"><h3>Design details</h3><p>This is an untitled Pivot basketball design. Add club details when you are ready to save or submit it.</p><label class="field">Design name<input value="Pivot Teamwear Design Tool"></label><p class="colour-note">Visualisation only. Supplier-approved templates are required for production.</p></section>
        </aside>
        <main class="canvas"><div class="canvas-toolbar"><div class="toolbar-left"><button class="history-button" aria-label="Undo" title="Undo">↶</button><button class="history-button" aria-label="Redo" title="Redo">↷</button><span class="toolbar-divider"></span><div class="side-tabs" role="group" aria-label="Jersey side"><button class="active" data-side="primary" aria-pressed="true">Primary side</button><button data-side="reverse" aria-pressed="false">Light / reverse</button></div></div><div class="view-tools"><div class="mode-tabs"><button class="active" data-view-mode="2d">2D</button><button data-view-mode="3d">3D preview</button></div><button aria-label="Zoom out">−</button><b>82%</b><button aria-label="Zoom in">＋</button></div></div><div id="preview" class="design-stage">${jersey(d, sides[side], selectedId)}<div class="view-label"><span>Front view</span><small>Click artwork to select</small></div></div><div class="palette-dock" aria-label="Colour palette"><label class="palette-target"><span>Colour</span><select id="colour-target" aria-label="Apply colour to"><option value="colour">Jersey base</option><option value="accent">Pattern</option><option value="neck">Neckline</option><option value="sleeves">Sleeves / side</option><option value="layer">Selected text or number</option></select></label><div class="swatch-pack">${Object.entries(paletteFamilies).map(([name,colours])=>`<div class="swatch-family"><span>${name}</span><div class="swatch-list">${colours.map(colour=>`<button class="colour-swatch" data-swatch="${colour}" style="--swatch:${colour}" aria-label="Apply ${colour}" title="${colour}"></button>`).join('')}</div></div>`).join('')}</div><label class="custom-swatch" title="Choose another colour"><input id="dock-colour" type="color" value="${d.colour}"><span>＋</span></label><output id="dock-value">${d.colour.toUpperCase()}</output></div><div class="canvas-footer"><span><i class="warning-dot">!</i> Placeholder garment — not production ready</span><button>View design checks <b>2</b></button></div></main>
      </div>
    </section></div>`;
  const render = () => {
    const design=sides[side], selected=design.layers.find(x=>x.id===selectedId);
    document.querySelector('#preview').innerHTML = `${jersey(d, design, selectedId)}<div class="view-label"><span>Front view · ${patternNames[design.pattern]}</span><small>Drag artwork inside the dotted print boundary</small></div>`;
    document.querySelectorAll('[data-pattern]').forEach(x=>{const on=x.dataset.pattern===design.pattern;x.classList.toggle('selected',on);x.setAttribute('aria-pressed',on)});
    [['pattern-scale','scale',''],['pattern-angle','angle','°'],['pattern-density','density','%']].forEach(([id,key,suffix])=>{document.querySelector('#'+id).value=design[key];document.querySelector('#'+key+'-out').value=design[key]+suffix});
    document.querySelector('#preview').classList.toggle('mode-3d',viewMode==='3d');document.querySelector('.jersey-wrap').style.setProperty('--model-angle',modelAngle+'deg');
    document.querySelector('#gradient-enabled').checked=Boolean(design.gradient);document.querySelector('#gradient-colour').value=design.gradientColour||d.accent;document.querySelector('#gradient-angle').value=String(design.gradientAngle??135);document.querySelector('#gradient-options').classList.toggle('disabled',!design.gradient);
    document.querySelector('#layer-list').innerHTML=design.layers.map((l,i)=>`<button data-layer-select="${l.id}" class="${l.id===selectedId?'active':''}"><span>⠿</span><b>${esc(l.text)}</b><small>Layer ${i+1}</small></button>`).join('');
    if(selected){document.querySelector('#layer-scale').value=selected.scale;document.querySelector('#layer-rotation').value=selected.rotation;document.querySelector('#artwork').value=selected.type==='text'?selected.text:'';document.querySelector('#artwork').disabled=selected.type!=='text'}
    bindCanvas();
  };
  function bindCanvas(){
    document.querySelectorAll('[data-layer-select]').forEach(b=>b.onclick=()=>{selectedId=b.dataset.layerSelect;render()});
    document.querySelectorAll('.art-layer').forEach(el=>{
      el.onclick=()=>{selectedId=el.dataset.layerId;render()};
      el.onpointerdown=e=>{e.preventDefault();selectedId=el.dataset.layerId;el.setPointerCapture(e.pointerId);const jerseyEl=el.closest('.jersey'),layer=sides[side].layers.find(x=>x.id===selectedId);el.onpointermove=move=>{if(!el.hasPointerCapture(move.pointerId))return;const r=jerseyEl.getBoundingClientRect();layer.x=Math.max(5,Math.min(95,(move.clientX-r.left)/r.width*100));layer.y=Math.max(10,Math.min(92,(move.clientY-r.top)/r.height*100));el.style.setProperty('--x',layer.x+'%');el.style.setProperty('--y',layer.y+'%')};el.onpointerup=()=>{persist();render()}};
    });
  }
  document.querySelector('#artwork').oninput=e=>{const layer=sides[side].layers.find(x=>x.id===selectedId);if(layer?.type==='text'){layer.text=e.target.value;d.artwork=e.target.value;persist();render()}};
  const currentColour=()=>{if(['colour','accent'].includes(colourTarget))return d[colourTarget];if(colourTarget==='layer')return sides[side].layers.find(x=>x.id===selectedId)?.colour||'#FFFFFF';return sides[side][colourTarget]||'#FFFFFF'};
  const applyColour=value=>{if(['colour','accent'].includes(colourTarget))d[colourTarget]=value;else if(colourTarget==='layer'){const layer=sides[side].layers.find(x=>x.id===selectedId);if(layer)layer.colour=value}else sides[side][colourTarget]=value;persist();document.querySelector('#dock-value').value=value.toUpperCase();document.querySelector('#dock-colour').value=value;document.querySelector('#save-label').textContent='Unsaved changes';render()};
  document.querySelector('#colour-target').onchange=e=>{colourTarget=e.target.value;const value=currentColour();document.querySelector('#dock-value').value=value.toUpperCase();document.querySelector('#dock-colour').value=value};
  document.querySelectorAll('[data-swatch]').forEach(b=>b.onclick=()=>applyColour(b.dataset.swatch));
  document.querySelector('#dock-colour').oninput=e=>applyColour(e.target.value);
  const headings={patterns:'Designs',colours:'Colours',artwork:'Text and artwork',uploads:'Uploads',details:'Design details'};
  document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{document.querySelector('.tools').classList.add('open');document.querySelectorAll('[data-tool]').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('[data-tool-panel]').forEach(x=>x.classList.toggle('active',x.dataset.toolPanel===b.dataset.tool));document.querySelector('#tool-heading').textContent=headings[b.dataset.tool]});
  document.querySelector('#close-tools').onclick=()=>document.querySelector('.tools').classList.remove('open');
  document.querySelectorAll('[data-pattern-category]').forEach(b=>b.onclick=()=>{patternCategory=b.dataset.patternCategory;document.querySelector('.tools').classList.add('choosing-pattern');document.querySelectorAll('[data-pattern-category]').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('[data-category]').forEach(x=>x.hidden=x.dataset.category!==patternCategory);document.querySelector('#tool-heading').textContent=patternCategory});
  document.querySelector('#back-patterns').onclick=()=>{document.querySelector('.tools').classList.remove('choosing-pattern');document.querySelector('#tool-heading').textContent='Designs'};
  document.querySelector('#precise-colour-target').onchange=e=>{colourTarget=e.target.value;document.querySelector('#colour-target').value=colourTarget;document.querySelector('#precise-hex').value=currentColour().slice(1).toUpperCase()};
  document.querySelector('#apply-hex').onclick=()=>{const value='#'+document.querySelector('#precise-hex').value.trim().replace(/^#/,'');if(/^#[0-9a-f]{6}$/i.test(value))applyColour(value);else alert('Enter a six-character HEX colour, for example 092C71.')};
  document.querySelectorAll('[data-view-mode]').forEach(b=>b.onclick=()=>{viewMode=b.dataset.viewMode;document.querySelectorAll('[data-view-mode]').forEach(x=>x.classList.toggle('active',x===b));render()});
  const stage=document.querySelector('#preview');stage.onpointerdown=e=>{if(viewMode!=='3d'||e.target!==stage)return;stage.setPointerCapture(e.pointerId);let last=e.clientX;stage.onpointermove=m=>{if(!stage.hasPointerCapture(m.pointerId))return;modelAngle=Math.max(-70,Math.min(70,modelAngle+(m.clientX-last)*.5));last=m.clientX;document.querySelector('.jersey-wrap').style.setProperty('--model-angle',modelAngle+'deg')};stage.onpointerup=()=>stage.releasePointerCapture(e.pointerId)};
  document.querySelectorAll('[data-side]').forEach(b => b.onclick = () => { side=b.dataset.side; selectedId=sides[side].layers[0]?.id; document.querySelectorAll('[data-side]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)}); render(); });
  document.querySelectorAll('[data-pattern]').forEach(b => b.onclick = () => {
    const key=b.dataset.pattern;
    for(const design of Object.values(sides)){design.pattern=key;design.scale=sides[side].scale;design.angle=sides[side].angle;design.density=sides[side].density}
    persist();document.querySelector('#save-label').textContent='Pattern applied to whole jersey';render();
  });
  [['pattern-scale','scale'],['pattern-angle','angle'],['pattern-density','density']].forEach(([id,key])=>document.querySelector('#'+id).oninput=e=>{sides[side][key]=Number(e.target.value);persist();render()});
  document.querySelector('#gradient-enabled').onchange=e=>{sides[side].gradient=e.target.checked;persist();render()};
  document.querySelector('#gradient-colour').oninput=e=>{sides[side].gradientColour=e.target.value;persist();render()};
  document.querySelector('#gradient-angle').onchange=e=>{sides[side].gradientAngle=Number(e.target.value);persist();render()};
  [['layer-scale','scale'],['layer-rotation','rotation']].forEach(([id,key])=>document.querySelector('#'+id).oninput=e=>{const layer=sides[side].layers.find(x=>x.id===selectedId);if(layer){layer[key]=Number(e.target.value);persist();render()}});
  document.querySelector('#add-text').onclick=()=>{const layer={id:crypto.randomUUID(),type:'text',text:'NEW TEXT',colour:'#FFFFFF',x:50,y:50,scale:1,rotation:0};sides[side].layers.push(layer);selectedId=layer.id;persist();render()};
  document.querySelector('#duplicate-layer').onclick=()=>{const source=sides[side].layers.find(x=>x.id===selectedId);if(source){const copy={...source,id:crypto.randomUUID(),x:Math.min(82,source.x+5),y:Math.min(88,source.y+5)};sides[side].layers.push(copy);selectedId=copy.id;persist();render()}};
  document.querySelector('#delete-layer').onclick=()=>{const layers=sides[side].layers;if(layers.length<2)return alert('Each side needs at least one artwork layer.');sides[side].layers=layers.filter(x=>x.id!==selectedId);selectedId=sides[side].layers[0].id;persist();render()};
  document.querySelectorAll('[data-place]').forEach(b=>b.onclick=()=>{const layer=sides[side].layers.find(x=>x.id===selectedId);if(!layer)return;layer.x={left:12,centre:50,right:88}[b.dataset.place];persist();render()});
  render();
  document.querySelectorAll('[data-action]').forEach(b => b.onclick = async () => { try { b.disabled=true; const file=document.querySelector('#upload').files[0]; await api(`/api/designs/${d.id}/${b.dataset.action}`,{method:'POST',body:JSON.stringify({colour:d.colour,accent:d.accent,artwork:d.artwork,uploadedArtwork:file?file.name:null})}); await dashboard(); } catch(e) { alert(e.message); b.disabled=false; } });
}

function show(e) { app.innerHTML=`<section class="section error"><h1>Something went wrong</h1><p>${esc(e.message)}</p><button onclick="location.reload()">Try again</button></section>`; }
async function route(){ try { location.hash==='#admin' ? await dashboard() : await store(); } catch(e){ show(e); } }
window.addEventListener('hashchange',route); route();
