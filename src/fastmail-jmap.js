const MAIL_CAPABILITY = 'urn:ietf:params:jmap:mail';
const SUBMISSION_CAPABILITY = 'urn:ietf:params:jmap:submission';
const CORE_CAPABILITY = 'urn:ietf:params:jmap:core';
const SESSION_URL = 'https://api.fastmail.com/jmap/session';
const REQUEST_TIMEOUT_MS = 8_000;

const line = (label, value) => `${label}: ${value || 'Not provided'}`;
const validAddress = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value);
const fail = () => { throw new Error('FASTMAIL_JMAP_DELIVERY_FAILED'); };

function messageText(submission) {
  return [
    line('Contact name', submission.contactName),
    line('Club name', submission.clubName),
    line('Email address', submission.email),
    line('Sport', submission.sport),
    line('Other sport', submission.otherSport),
    line('League or association', submission.association),
    line('Other league or association', submission.otherAssociation),
    line('Club suburb or town', submission.locality),
    line('Other suburb or town', submission.otherLocality)
  ].join('\n');
}

async function requestJson(fetchImpl, url, options) {
  let response;
  try {
    response = await fetchImpl(url, { ...options, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  } catch {
    return fail();
  }
  if (!response.ok) return fail();
  try {
    return await response.json();
  } catch {
    return fail();
  }
}

function methodResult(response, name, callId) {
  const result = response?.methodResponses?.find(call => call[0] === name && call[2] === callId);
  if (!result) return fail();
  return result[1];
}

export function createFastmailJmapSender({ env = process.env, fetchImpl = fetch } = {}) {
  const token = env.FASTMAIL_JMAP_TOKEN;
  const sender = env.FASTMAIL_JMAP_SENDER?.trim();
  const recipient = env.CLUB_INTEREST_RECIPIENT?.trim() || 'hello@pivotteamwear.com';
  if (!token || !sender || !validAddress(sender) || !validAddress(recipient)) return undefined;

  const headers = { authorization: `Bearer ${token}`, 'content-type': 'application/json' };

  return async submission => {
    const session = await requestJson(fetchImpl, SESSION_URL, { headers });
    const accountId = session?.primaryAccounts?.[MAIL_CAPABILITY];
    const apiUrl = session?.apiUrl;
    let trustedApiUrl = false;
    try {
      trustedApiUrl = new URL(apiUrl).origin === 'https://api.fastmail.com';
    } catch {}
    if (!accountId || !trustedApiUrl) return fail();

    const discovery = await requestJson(fetchImpl, apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        using: [CORE_CAPABILITY, MAIL_CAPABILITY, SUBMISSION_CAPABILITY],
        methodCalls: [
          ['Identity/get', { accountId }, 'identities'],
          ['Mailbox/get', { accountId }, 'mailboxes']
        ]
      })
    });
    const identities = methodResult(discovery, 'Identity/get', 'identities').list;
    const mailboxes = methodResult(discovery, 'Mailbox/get', 'mailboxes').list;
    const identity = identities?.find(item => item.email?.toLowerCase() === sender.toLowerCase());
    const drafts = mailboxes?.find(mailbox => mailbox.role === 'drafts');
    if (!identity?.id || !drafts?.id) return fail();

    const delivery = await requestJson(fetchImpl, apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        using: [CORE_CAPABILITY, MAIL_CAPABILITY, SUBMISSION_CAPABILITY],
        methodCalls: [
          ['Email/set', {
            accountId,
            create: {
              draft: {
                mailboxIds: { [drafts.id]: true },
                keywords: { $draft: true },
                from: [{ email: sender }],
                to: [{ email: recipient }],
                replyTo: [{ email: submission.email }],
                subject: `Club interest — ${submission.clubName}`,
                textBody: [{ partId: 'body', type: 'text/plain' }],
                bodyValues: { body: { value: messageText(submission) } }
              }
            }
          }, 'createEmail'],
          ['EmailSubmission/set', {
            accountId,
            create: { submission: { emailId: '#draft', identityId: identity.id } },
            onSuccessUpdateEmail: { '#submission': { 'keywords/$draft': null } }
          }, 'submitEmail']
        ]
      })
    });
    const emailResult = methodResult(delivery, 'Email/set', 'createEmail');
    const submissionResult = methodResult(delivery, 'EmailSubmission/set', 'submitEmail');
    if (!emailResult.created?.draft?.id || !submissionResult.created?.submission?.id) return fail();
  };
}
