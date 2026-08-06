import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/server.js';
import { validateStudioFeedback } from '../src/studio-feedback.js';
import { createStudioFeedbackSender } from '../src/studio-feedback-delivery.js';
import { describeStudioView, sendStudioFeedback } from '../public/studio/studio-feedback-form.js';

const validSubmission = {
  message: 'I could not tell which colour area I had selected.',
  email: 'tester@example.com',
  garment: 'basketball-jersey',
  view: 'front',
  browser: 'Example Browser',
  website: ''
};

test('Studio feedback describes the tester’s current 2D or indicative side view', () => {
  assert.equal(describeStudioView({ viewMode: '2d', garmentView: 'back', sideView: 'left' }), 'back');
  assert.equal(describeStudioView({ viewMode: '3d', garmentView: 'front', sideView: 'left' }), 'left-side preview');
  assert.equal(describeStudioView({ viewMode: '3d', garmentView: 'back', sideView: 'right' }), 'right-side preview');
});

test('Studio feedback browser helper sends only the easy tester form and troubleshooting context', async () => {
  const requests = [];
  await sendStudioFeedback({
    message: 'The colour control was easy to use.',
    email: '',
    website: '',
    garment: 'basketball-jersey',
    view: 'front',
    browser: 'Example Browser',
    designName: 'Must not be sent',
    category: 'Must not be sent'
  }, async (path, options) => {
    requests.push({ path, options });
    return { ok: true, json: async () => ({ ok: true }) };
  });

  assert.equal(requests[0].path, '/api/studio-feedback');
  assert.deepEqual(JSON.parse(requests[0].options.body), {
    message: 'The colour control was easy to use.',
    email: '',
    website: '',
    garment: 'basketball-jersey',
    view: 'front',
    browser: 'Example Browser'
  });
});

async function start(options = {}) {
  const app = createApp(options);
  await new Promise(resolve => app.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${app.address().port}`;
  return { app, base };
}

test('Studio feedback validation accepts useful bounded feedback and optional contact details', () => {
  assert.deepEqual(validateStudioFeedback(validSubmission), {
    ok: true,
    submission: {
      message: 'I could not tell which colour area I had selected.',
      email: 'tester@example.com',
      garment: 'basketball-jersey',
      view: 'front',
      browser: 'Example Browser'
    }
  });
  assert.equal(validateStudioFeedback({ ...validSubmission, message: '' }).ok, false);
  assert.equal(validateStudioFeedback({ ...validSubmission, email: 'not-an-email' }).ok, false);
  assert.equal(validateStudioFeedback({ ...validSubmission, message: 'Hello\r\nBcc: other@example.com' }).ok, false);
});

test('Studio feedback sender uses Fastmail without exposing configuration to the browser', async () => {
  const transports = [];
  const messages = [];
  const send = createStudioFeedbackSender({
    env: {
      FASTMAIL_SMTP_USER: 'website@pivotteamwear.com',
      FASTMAIL_SMTP_APP_PASSWORD: 'app-password',
      STUDIO_FEEDBACK_RECIPIENT: 'hello@pivotteamwear.com'
    },
    createTransport: options => {
      transports.push(options);
      return { sendMail: async message => messages.push(message) };
    }
  });

  await send(validSubmission);

  assert.equal(transports[0].host, 'smtp.fastmail.com');
  assert.equal(transports[0].secure, true);
  assert.equal(messages[0].to, 'hello@pivotteamwear.com');
  assert.equal(messages[0].replyTo, 'tester@example.com');
  assert.equal(messages[0].subject, 'Pivot Design Studio trial feedback');
  assert.doesNotMatch(messages[0].text, /Design name|Saturday trial/);
  assert.match(messages[0].text, /Example Browser/);
  assert.doesNotMatch(messages[0].text, /app-password/);
});

test('valid Studio feedback is delivered through its separate endpoint', async t => {
  const delivered = [];
  const { app, base } = await start({ sendStudioFeedback: async submission => delivered.push(submission) });
  t.after(() => app.close());

  const response = await fetch(`${base}/api/studio-feedback`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: base },
    body: JSON.stringify(validSubmission)
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(delivered.length, 1);
  assert.equal(delivered[0].message, validSubmission.message);
});

test('Studio feedback endpoint fails closed when delivery is unavailable', async t => {
  const { app, base } = await start({ sendStudioFeedback: null });
  t.after(() => app.close());

  const response = await fetch(`${base}/api/studio-feedback`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: base },
    body: JSON.stringify(validSubmission)
  });

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    error: 'Feedback delivery is not configured',
    code: 'DELIVERY_UNAVAILABLE'
  });
});

test('Studio feedback endpoint reports delivery failure without exposing provider details', async t => {
  const { app, base } = await start({
    sendStudioFeedback: async () => { throw new Error('SMTP authentication details'); }
  });
  t.after(() => app.close());

  const response = await fetch(`${base}/api/studio-feedback`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: base },
    body: JSON.stringify(validSubmission)
  });
  const result = await response.json();

  assert.equal(response.status, 502);
  assert.deepEqual(result, { error: 'We could not send your feedback', code: 'DELIVERY_FAILED' });
  assert.doesNotMatch(JSON.stringify(result), /SMTP|authentication/i);
});

test('Studio feedback endpoint limits repeated submissions from one client', async t => {
  let deliveries = 0;
  const { app, base } = await start({ sendStudioFeedback: async () => { deliveries += 1; } });
  t.after(() => app.close());
  const submit = () => fetch(`${base}/api/studio-feedback`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: base },
    body: JSON.stringify(validSubmission)
  });

  for (let attempt = 0; attempt < 10; attempt += 1) assert.equal((await submit()).status, 200);
  const limited = await submit();

  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('retry-after'), '900');
  assert.equal(deliveries, 10);
});

test('Studio feedback endpoint accepts only bounded JSON requests', async t => {
  const { app, base } = await start({ sendStudioFeedback: async () => {} });
  t.after(() => app.close());

  const wrongType = await fetch(`${base}/api/studio-feedback`, {
    method: 'POST',
    headers: { 'content-type': 'text/plain', origin: base },
    body: JSON.stringify(validSubmission)
  });
  const tooLarge = await fetch(`${base}/api/studio-feedback`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: base },
    body: JSON.stringify({ ...validSubmission, message: 'x'.repeat(17 * 1024) })
  });

  assert.equal(wrongType.status, 415);
  assert.equal(tooLarge.status, 400);
  assert.equal((await tooLarge.json()).code, 'REQUEST_TOO_LARGE');
});

test('Studio feedback endpoint rejects cross-origin and honeypot submissions', async t => {
  let deliveries = 0;
  const { app, base } = await start({ sendStudioFeedback: async () => { deliveries += 1; } });
  t.after(() => app.close());

  const crossOrigin = await fetch(`${base}/api/studio-feedback`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://untrusted.example' },
    body: JSON.stringify(validSubmission)
  });
  const honeypot = await fetch(`${base}/api/studio-feedback`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: base },
    body: JSON.stringify({ ...validSubmission, website: 'https://spam.example' })
  });

  assert.equal(crossOrigin.status, 403);
  assert.equal(honeypot.status, 200);
  assert.equal(deliveries, 0);
});
