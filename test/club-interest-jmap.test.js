import test from 'node:test';
import assert from 'node:assert/strict';
import { createFastmailJmapSender } from '../src/fastmail-jmap.js';

const submission = {
  contactName: 'Alex Smith',
  clubName: 'Bendigo Community Club',
  email: 'alex@example.com',
  sport: 'Basketball',
  association: 'Bendigo Basketball Association',
  locality: 'Bendigo',
  otherSport: '',
  otherAssociation: '',
  otherLocality: ''
};

test('Fastmail JMAP sender discovers the approved identity and submits a bounded message', async () => {
  const requests = [];
  const responses = [
    {
      apiUrl: 'https://api.fastmail.com/jmap/api/',
      primaryAccounts: { 'urn:ietf:params:jmap:mail': 'account-1' }
    },
    {
      methodResponses: [
        ['Identity/get', { list: [{ id: 'identity-1', email: 'website@pivotteamwear.com' }] }, 'identities'],
        ['Mailbox/get', { list: [{ id: 'drafts-1', role: 'drafts' }] }, 'mailboxes']
      ]
    },
    {
      methodResponses: [
        ['Email/set', { created: { draft: { id: 'email-1' } } }, 'createEmail'],
        ['EmailSubmission/set', { created: { submission: { id: 'submission-1' } } }, 'submitEmail']
      ]
    }
  ];
  const fetchImpl = async (url, options = {}) => {
    requests.push({ url, options });
    return { ok: true, json: async () => responses.shift() };
  };
  const send = createFastmailJmapSender({
    env: {
      FASTMAIL_JMAP_TOKEN: 'api-token',
      FASTMAIL_JMAP_SENDER: 'website@pivotteamwear.com',
      CLUB_INTEREST_RECIPIENT: 'hello@pivotteamwear.com'
    },
    fetchImpl
  });

  await send(submission);

  assert.equal(requests.length, 3);
  assert.equal(requests[0].url, 'https://api.fastmail.com/jmap/session');
  assert.equal(requests[0].options.headers.authorization, 'Bearer api-token');

  const discovery = JSON.parse(requests[1].options.body);
  assert.ok(discovery.using.includes('urn:ietf:params:jmap:submission'));
  assert.deepEqual(discovery.methodCalls.map(call => call[0]), ['Identity/get', 'Mailbox/get']);

  const delivery = JSON.parse(requests[2].options.body);
  assert.deepEqual(delivery.methodCalls.map(call => call[0]), ['Email/set', 'EmailSubmission/set']);
  const email = delivery.methodCalls[0][1].create.draft;
  assert.deepEqual(email.to, [{ email: 'hello@pivotteamwear.com' }]);
  assert.deepEqual(email.replyTo, [{ email: 'alex@example.com' }]);
  assert.equal(email.subject, 'Club interest — Bendigo Community Club');
  assert.match(email.bodyValues.body.value, /Contact name: Alex Smith/);
  assert.doesNotMatch(requests[2].options.body, /api-token/);
  assert.equal(delivery.methodCalls[1][1].create.submission.emailId, '#draft');
});

test('Fastmail JMAP sender never forwards its token to an untrusted session URL', async () => {
  const requests = [];
  const send = createFastmailJmapSender({
    env: {
      FASTMAIL_JMAP_TOKEN: 'api-token',
      FASTMAIL_JMAP_SENDER: 'website@pivotteamwear.com'
    },
    fetchImpl: async (url, options = {}) => {
      requests.push({ url, options });
      return {
        ok: true,
        json: async () => ({
          apiUrl: 'https://untrusted.example/jmap/api/',
          primaryAccounts: { 'urn:ietf:params:jmap:mail': 'account-1' }
        })
      };
    }
  });

  await assert.rejects(send(submission), /FASTMAIL_JMAP_DELIVERY_FAILED/);
  assert.equal(requests.length, 1);
});
