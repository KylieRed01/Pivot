import test from 'node:test';
import assert from 'node:assert/strict';
import { handleClubInterestRequest } from '../functions/api/club-interest.js';

const validSubmission = {
  contactName: 'Alex Smith',
  clubName: 'Bendigo Community Club',
  email: 'alex@example.com',
  sport: 'Basketball',
  association: 'Bendigo Basketball Association',
  locality: 'Bendigo',
  website: ''
};

test('Pages Function validates and delivers a same-origin club-interest request', async () => {
  const delivered = [];
  const request = new Request('https://preview.example/api/club-interest', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://preview.example' },
    body: JSON.stringify(validSubmission)
  });

  const response = await handleClubInterestRequest(
    { request, env: {} },
    { sendClubInterest: async submission => delivered.push(submission) }
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(response.headers.get('cache-control'), 'no-store');
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

test('Pages Function rejects cross-origin requests before delivery', async () => {
  let deliveries = 0;
  const request = new Request('https://preview.example/api/club-interest', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://untrusted.example' },
    body: JSON.stringify(validSubmission)
  });

  const response = await handleClubInterestRequest(
    { request, env: {} },
    { sendClubInterest: async () => { deliveries += 1; } }
  );

  assert.equal(response.status, 403);
  assert.equal(deliveries, 0);
});

test('Pages Function gives honeypot submissions a neutral response without delivery', async () => {
  let deliveries = 0;
  const request = new Request('https://preview.example/api/club-interest', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://preview.example' },
    body: JSON.stringify({ ...validSubmission, website: 'https://spam.example' })
  });

  const response = await handleClubInterestRequest(
    { request, env: {} },
    { sendClubInterest: async () => { deliveries += 1; } }
  );

  assert.equal(response.status, 200);
  assert.equal(deliveries, 0);
});

test('Pages Function fails closed when JMAP configuration is absent', async () => {
  const request = new Request('https://preview.example/api/club-interest', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://preview.example' },
    body: JSON.stringify(validSubmission)
  });

  const response = await handleClubInterestRequest({ request, env: {} });

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    error: 'Form delivery is not configured',
    code: 'DELIVERY_UNAVAILABLE'
  });
});

test('Pages Function rejects an oversized body before delivery', async () => {
  let deliveries = 0;
  let cancelled = false;
  const request = {
    url: 'https://preview.example/api/club-interest',
    headers: new Headers({ 'content-type': 'application/json', origin: 'https://preview.example' }),
    body: {
      getReader: () => ({
        read: async () => ({ done: false, value: new Uint8Array(17 * 1024) }),
        cancel: async () => { cancelled = true; }
      })
    },
    arrayBuffer: async () => { throw new Error('the full request body must not be buffered'); }
  };

  const response = await handleClubInterestRequest(
    { request, env: {} },
    { sendClubInterest: async () => { deliveries += 1; } }
  );

  assert.equal(response.status, 413);
  assert.equal(deliveries, 0);
  assert.equal(cancelled, true);
});

test('Pages Function hides JMAP delivery failures', async () => {
  const request = new Request('https://preview.example/api/club-interest', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://preview.example' },
    body: JSON.stringify(validSubmission)
  });

  const response = await handleClubInterestRequest(
    { request, env: {} },
    { sendClubInterest: async () => { throw new Error('provider API token secret-value'); } }
  );
  const result = await response.json();

  assert.equal(response.status, 502);
  assert.deepEqual(result, { error: 'We could not send your details', code: 'DELIVERY_FAILED' });
  assert.doesNotMatch(JSON.stringify(result), /provider|secret-value/);
});
