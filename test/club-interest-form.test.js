import test from 'node:test';
import assert from 'node:assert/strict';
import { bindClubInterestForm, getAssociationsForSport } from '../public/website/club-interest-form.js';

test('club-interest form expands inline and can be cancelled', () => {
  const openListeners = {};
  const cancelListeners = {};
  const open = {
    attributes: {},
    addEventListener: (name, handler) => { openListeners[name] = handler; },
    setAttribute(name, value) { this.attributes[name] = value; },
    focus() { this.focused = true; }
  };
  const cancel = { addEventListener: (name, handler) => { cancelListeners[name] = handler; } };
  const form = { hidden: true };
  const contactName = { focus() { this.focused = true; } };
  const controls = {
    '#open-club-interest': open,
    '#cancel-club-interest': cancel,
    '#club-interest-form': form,
    '#club-interest-contact-name': contactName
  };

  bindClubInterestForm({ querySelector: selector => controls[selector] });
  openListeners.click();
  assert.equal(form.hidden, false);
  assert.equal(open.attributes['aria-expanded'], 'true');
  assert.equal(open.hidden, true);
  assert.equal(contactName.focused, true);

  cancelListeners.click();
  assert.equal(form.hidden, true);
  assert.equal(open.attributes['aria-expanded'], 'false');
  assert.equal(open.hidden, false);
  assert.equal(open.focused, true);
});

test('club-interest associations are linked to the selected sport', () => {
  assert.deepEqual(getAssociationsForSport('Basketball'), ['Bendigo Basketball Association']);
  assert.ok(getAssociationsForSport('Netball').includes('Golden City Netball Association'));
  assert.deepEqual(getAssociationsForSport('Gridiron (American football)'), ['Gridiron Victoria']);
  assert.deepEqual(getAssociationsForSport('Rugby union'), ['Rugby Victoria']);
  assert.deepEqual(getAssociationsForSport('Soccer'), ['FV Greater Bendigo']);
});

test('club-interest form updates associations and reveals Other fields', () => {
  const sportListeners = {};
  const associationListeners = {};
  const sport = { value: '', addEventListener: (name, handler) => { sportListeners[name] = handler; } };
  const association = {
    value: '',
    disabled: false,
    options: [],
    ownerDocument: { createElement: () => ({ value: '', textContent: '' }) },
    addEventListener: (name, handler) => { associationListeners[name] = handler; },
    append(option) { this.options.push(option); },
    replaceChildren() { this.options = []; }
  };
  const otherSportField = { hidden: true };
  const otherSport = { required: false, value: '' };
  const otherAssociationField = { hidden: true };
  const otherAssociation = { required: false, value: '' };
  const controls = {
    '#club-interest-sport': sport,
    '#club-interest-association': association,
    '#club-interest-other-sport-field': otherSportField,
    '#club-interest-other-sport': otherSport,
    '#club-interest-other-association-field': otherAssociationField,
    '#club-interest-other-association': otherAssociation
  };

  bindClubInterestForm({ querySelector: selector => controls[selector] });
  assert.equal(association.disabled, true);

  sport.value = 'Basketball';
  sportListeners.change();
  assert.deepEqual(association.options.map(option => option.textContent), [
    'Choose a league or association',
    'Bendigo Basketball Association',
    'Other'
  ]);

  association.value = 'Other';
  associationListeners.change();
  assert.equal(otherAssociationField.hidden, false);
  assert.equal(otherAssociation.required, true);

  sport.value = 'Other';
  sportListeners.change();
  assert.equal(otherSportField.hidden, false);
  assert.equal(otherSport.required, true);
});
