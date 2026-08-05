export function renderStudioSetup(root, { workflowDemo, ruleProfileId, onSubmit }) {
  root.innerHTML = `<div class="design-setup"><div class="mode-notice" role="status"><strong>${workflowDemo?'Workflow simulation':'Design Studio trial'}</strong><span>${workflowDemo?'Fixture identities and actions only. This is not production authentication, approval or storage. No production proof, manufacture release or supplier acknowledgement is created.':'Your work stays in this browser. Pivot cannot save, submit, approve or recover it. This trial uses placeholder garment artwork and guides. Pivot will confirm final colours, sizing and placement before anything can be made.'}</span></div><section class="setup-card"><header class="setup-header"><img src="/brand/Pivot_Logo_Transparent.svg" alt="Pivot Teamwear"><div><h1>Design your teamwear</h1><p>Choose a sport, competition and garment to see the available design options and guidance.</p></div></header><form id="design-setup-form"><fieldset><legend><b>01</b> Choose your sport</legend><div class="sport-choices"><label class="sport-choice"><input type="radio" name="sport" value="basketball"><img src="/images/pilot-basketball.jpg" alt="A basketball hoop and ball during play"><span><strong>Basketball</strong><small>Available to try</small></span><i>✓</i></label><label class="sport-choice unavailable"><input type="radio" name="sport" value="netball" disabled><span class="sport-icon" aria-hidden="true">◉</span><span><strong>Netball</strong><small>Not available yet</small></span></label><label class="sport-choice unavailable"><input type="radio" name="sport" value="australian-rules" disabled><span class="sport-icon" aria-hidden="true">⬭</span><span><strong>Australian rules football</strong><small>Not available yet</small></span></label><label class="sport-choice unavailable"><input type="radio" name="sport" value="soccer" disabled><span class="sport-icon" aria-hidden="true">⬡</span><span><strong>Soccer</strong><small>Not available yet</small></span></label><label class="sport-choice unavailable"><input type="radio" name="sport" value="gridiron" disabled><span class="sport-icon" aria-hidden="true">⬭</span><span><strong>Gridiron</strong><small>Not available yet</small></span></label><label class="sport-choice unavailable"><input type="radio" name="sport" value="cricket" disabled><span class="sport-icon" aria-hidden="true">●</span><span><strong>Cricket</strong><small>Not available yet</small></span></label><label class="sport-choice unavailable"><input type="radio" name="sport" value="rugby-league" disabled><span class="sport-icon" aria-hidden="true">⬭</span><span><strong>Rugby league</strong><small>Not available yet</small></span></label><label class="sport-choice unavailable"><input type="radio" name="sport" value="rugby-union" disabled><span class="sport-icon" aria-hidden="true">⬭</span><span><strong>Rugby union</strong><small>Not available yet</small></span></label><label class="sport-choice unavailable"><input type="radio" name="sport" value="hockey" disabled><span class="sport-icon" aria-hidden="true">⌁</span><span><strong>Hockey</strong><small>Not available yet</small></span></label><label class="sport-choice unavailable"><input type="radio" name="sport" value="volleyball" disabled><span class="sport-icon" aria-hidden="true">◉</span><span><strong>Volleyball</strong><small>Not available yet</small></span></label><label class="sport-choice unavailable"><input type="radio" name="sport" value="baseball" disabled><span class="sport-icon" aria-hidden="true">●</span><span><strong>Baseball</strong><small>Not available yet</small></span></label></div></fieldset><fieldset id="competition-step" class="setup-dependent" hidden><legend><b>02</b> Choose your competition</legend><label class="setup-select"><span>Competition</span><select name="league" required><option value="">Choose a competition</option><option value="bendigo-basketball-association">Bendigo Basketball Association</option></select><small>Bendigo Basketball Association is the only competition available to try.</small></label></fieldset><fieldset id="apparel-step" class="setup-dependent" hidden><legend><b>03</b> Choose an apparel item</legend><div class="apparel-choices"><label class="compact-choice garment-choice"><input type="radio" name="garment" value="basketball-jersey"><img src="/brand/Basketball_Jersey_Illustration.svg" alt="Basketball jersey"><span><strong>Basketball jersey</strong><small>Dark and light · front and back</small></span></label><label class="compact-choice unavailable"><input type="radio" name="garment" value="basketball-shorts" disabled><span class="apparel-icon" aria-hidden="true">SHORTS</span><span><strong>Basketball shorts</strong><small>Not available yet</small></span></label><label class="compact-choice unavailable"><input type="radio" name="garment" value="coach-polo-male" disabled><span class="apparel-icon" aria-hidden="true">POLO</span><span><strong>Men's club polo</strong><small>Not available yet</small></span></label><label class="compact-choice unavailable"><input type="radio" name="garment" value="coach-polo-female" disabled><span class="apparel-icon" aria-hidden="true">POLO</span><span><strong>Women's club polo</strong><small>Not available yet</small></span></label></div></fieldset>${workflowDemo?'':'<label class="setup-ack setup-dependent" hidden><input id="demo-acknowledgement" type="checkbox"><span><b>I understand this is a Design Studio trial.</b> My work is not saved by Pivot, submitted for approval or ready to be made.</span></label>'}<div class="setup-governance setup-dependent" hidden><b>Before you begin</b><span>Colours, sizing and placement are a guide only. Pivot will confirm final colours, sizing and placement before anything can be made.</span></div><button id="setup-submit" type="submit" hidden>Game On. <span>→</span></button></form></section></div>`;

  const setupForm = root.querySelector('#design-setup-form');
  const demoAcknowledgement = root.querySelector('#demo-acknowledgement');
  const sportChoices = root.querySelector('.sport-choices');

  [...sportChoices.children]
    .sort((left, right) => left.querySelector('strong').textContent.localeCompare(right.querySelector('strong').textContent))
    .forEach(choice => sportChoices.append(choice));

  setupForm.querySelectorAll('input[name="sport"]').forEach(input => {
    input.addEventListener('change', event => {
      root.querySelectorAll('.sport-choice').forEach(choice => choice.classList.toggle('selected', choice.contains(event.target)));
      root.querySelector('#competition-step').hidden = false;
    });
  });

  setupForm.league.addEventListener('change', () => {
    root.querySelector('#apparel-step').hidden = !setupForm.league.value;
  });

  setupForm.querySelectorAll('input[name="garment"]').forEach(input => {
    input.addEventListener('change', event => {
      root.querySelectorAll('.apparel-choices .compact-choice').forEach(choice => choice.classList.toggle('selected', choice.contains(event.target)));
      root.querySelector('.setup-governance').hidden = false;
      if (demoAcknowledgement) demoAcknowledgement.closest('.setup-ack').hidden = false;
      const submit = root.querySelector('#setup-submit');
      submit.hidden = false;
      submit.disabled = Boolean(demoAcknowledgement && !demoAcknowledgement.checked);
    });
  });

  if (demoAcknowledgement) {
    demoAcknowledgement.addEventListener('change', () => {
      root.querySelector('#setup-submit').disabled = !demoAcknowledgement.checked;
    });
  }

  setupForm.onsubmit = event => {
    event.preventDefault();
    if (demoAcknowledgement && !demoAcknowledgement.checked) return;
    onSubmit({
      sport: setupForm.sport.value,
      league: setupForm.league.value,
      garment: setupForm.garment.value,
      ruleProfile: ruleProfileId
    });
  };
}
