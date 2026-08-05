export function renderStudioSetup(root, { workflowDemo, ruleProfileId, onSubmit }) {
  root.innerHTML = `<div class="design-setup"><section class="garment-chooser" aria-labelledby="setup-title"><header class="chooser-header"><a href="#home" aria-label="Back to Pivot home"><img src="/brand/Pivot_Icon.svg" alt=""></a><div><span>Pivot Design Studio</span><h1 id="setup-title">What would you like to design?</h1><p>Choose an item and start exploring colours, patterns and artwork.</p></div></header><form id="design-setup-form"><div class="garment-starting-points"><label class="garment-start-card"><input type="radio" name="garment" value="basketball-jersey"><span class="garment-card-art jersey-card-art"><img src="/brand/Basketball_Jersey_Illustration.svg" alt=""></span><span class="garment-card-copy"><small>Basketball · Bendigo Basketball Association</small><strong>Basketball jersey</strong><span>Dark and light · front and back</span><b>Available to try</b></span><i aria-hidden="true">✓</i></label><label class="garment-start-card"><input type="radio" name="garment" value="generic-t-shirt"><span class="garment-card-art"><span class="trial-shirt" aria-hidden="true"></span></span><span class="garment-card-copy"><small>Generic testing template</small><strong>T-shirt concept</strong><span>Explore colours, patterns and artwork</span><b>Design Studio trial</b></span><i aria-hidden="true">✓</i></label><label class="garment-start-card"><input type="radio" name="garment" value="generic-hoodie"><span class="garment-card-art"><span class="trial-hoodie" aria-hidden="true"></span></span><span class="garment-card-copy"><small>Generic testing template</small><strong>Hoodie concept</strong><span>Explore colours, patterns and artwork</span><b>Design Studio trial</b></span><i aria-hidden="true">✓</i></label></div><div class="chooser-finish"><p><strong>${workflowDemo?'Workflow simulation':'Design Studio trial'}</strong><span>${workflowDemo?'No production approval or release is created.':'Generic testing templates. Work stays in this browser and is not an order or production-ready design.'}</span></p><button id="setup-submit" type="submit" disabled>Start designing <span>→</span></button></div></form></section></div>`;

  const setupForm = root.querySelector('#design-setup-form');
  const submit = root.querySelector('#setup-submit');

  setupForm.querySelectorAll('input[name="garment"]').forEach(input => {
    input.addEventListener('change', event => {
      root.querySelectorAll('.garment-start-card').forEach(choice => choice.classList.toggle('selected', choice.contains(event.target)));
      if (submit) submit.disabled = false;
    });
  });

  setupForm.onsubmit = event => {
    event.preventDefault();
    if (!setupForm.garment.value) return;
    onSubmit({
      sport: 'basketball',
      league: 'bendigo-basketball-association',
      garment: setupForm.garment.value,
      ruleProfile: ruleProfileId
    });
  };
}
