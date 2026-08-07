import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/server.js';

const validSubmission = {
  contactName: 'Alex Smith',
  clubName: 'Bendigo Community Club',
  email: 'alex@example.com',
  sport: 'Basketball',
  association: 'Bendigo Basketball Association',
  locality: 'Bendigo',
  website: ''
};

async function start(options = {}) {
  const app = createApp(options);
  await new Promise(resolve => app.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${app.address().port}`;
  return { app, base };
}

test('valid club-interest details are delivered through the injected mail transport', async t => {
  const delivered = [];
  const { app, base } = await start({
    sendClubInterest: async submission => delivered.push(submission)
  });
  t.after(() => app.close());

  const response = await fetch(`${base}/api/club-interest`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: base },
    body: JSON.stringify(validSubmission)
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.deepEqual(delivered, [{
    contactName: 'Alex Smith',
    clubName: 'Bendigo Community Club',
    email: 'alex@example.com',
    sport: 'Basketball',
    association: 'Bendigo Basketball Association',
    locality: 'Bendigo',
    otherSport: '',
    otherAssociation: '',
    otherLocality: ''
  }]);
});

test('honeypot submissions receive a neutral response without sending mail', async t => {
  let deliveries = 0;
  const { app, base } = await start({ sendClubInterest: async () => { deliveries += 1; } });
  t.after(() => app.close());

  const response = await fetch(`${base}/api/club-interest`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: base },
    body: JSON.stringify({ ...validSubmission, website: 'https://spam.example' })
  });

  assert.equal(response.status, 200);
  assert.equal(deliveries, 0);
});

test('cross-origin browser submissions are rejected before delivery', async t => {
  let deliveries = 0;
  const { app, base } = await start({ sendClubInterest: async () => { deliveries += 1; } });
  t.after(() => app.close());

  const response = await fetch(`${base}/api/club-interest`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://untrusted.example' },
    body: JSON.stringify(validSubmission)
  });

  assert.equal(response.status, 403);
  assert.equal(deliveries, 0);
});

test('malformed JSON returns a safe validation error', async t => {
  const { app, base } = await start({ sendClubInterest: async () => {} });
  t.after(() => app.close());

  const response = await fetch(`${base}/api/club-interest`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: base },
    body: 'secret-personal-value'
  });
  const result = await response.json();

  assert.equal(response.status, 400);
  assert.equal(result.code, 'INVALID_JSON');
  assert.doesNotMatch(JSON.stringify(result), /secret-personal-value/);
});

test('control characters in submitted fields are rejected before delivery', async t => {
  let deliveries = 0;
  const { app, base } = await start({ sendClubInterest: async () => { deliveries += 1; } });
  t.after(() => app.close());

  const response = await fetch(`${base}/api/club-interest`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: base },
    body: JSON.stringify({ ...validSubmission, clubName: 'Bendigo Club\r\nBcc: other@example.com' })
  });

  assert.equal(response.status, 400);
  assert.equal(deliveries, 0);
});

test('club-interest submissions are rate limited per client', async t => {
  const { app, base } = await start({ sendClubInterest: async () => {} });
  t.after(() => app.close());

  const submit = () => fetch(`${base}/api/club-interest`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: base },
    body: JSON.stringify(validSubmission)
  });
  for (let attempt = 0; attempt < 5; attempt += 1) assert.equal((await submit()).status, 200);

  const limited = await submit();
  assert.equal(limited.status, 429);
  assert.equal((await limited.json()).code, 'RATE_LIMITED');
});

test('mail transport failures return a safe error without exposing provider details', async t => {
  const { app, base } = await start({
    sendClubInterest: async () => { throw new Error('JMAP authentication failed for secret-value'); }
  });
  t.after(() => app.close());

  const response = await fetch(`${base}/api/club-interest`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: base },
    body: JSON.stringify(validSubmission)
  });
  const result = await response.json();

  assert.equal(response.status, 502);
  assert.deepEqual(result, { error: 'We could not send your details', code: 'DELIVERY_FAILED' });
  assert.doesNotMatch(JSON.stringify(result), /JMAP|secret-value/);
});
