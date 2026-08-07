import { validateClubInterest } from '../../src/club-interest.js';
import { createFastmailJmapSender } from '../../src/fastmail-jmap.js';

const MAX_BODY_BYTES = 16 * 1024;
const responseHeaders = {
  'cache-control': 'no-store',
  'content-type': 'application/json; charset=utf-8',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-content-type-options': 'nosniff'
};

const json = (status, value, headers = {}) => new Response(JSON.stringify(value), {
  status,
  headers: { ...responseHeaders, ...headers }
});

async function readJson(request) {
  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return { error: json(413, { error: 'Request too large', code: 'REQUEST_TOO_LARGE' }) };
  }

  const reader = request.body?.getReader();
  const chunks = [];
  let total = 0;
  try {
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        total += value.byteLength;
        if (total > MAX_BODY_BYTES) {
          try { await reader.cancel(); } catch {}
          return { error: json(413, { error: 'Request too large', code: 'REQUEST_TOO_LARGE' }) };
        }
        chunks.push(value);
      }
    }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return { value: JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)) };
  } catch {
    return { error: json(400, { error: 'Check the required details', code: 'INVALID_JSON' }) };
  }
}

export async function handleClubInterestRequest(
  { request, env },
  { sendClubInterest = createFastmailJmapSender({ env }) } = {}
) {
  if (!/^application\/json\b/i.test(request.headers.get('content-type') || '')) {
    return json(415, { error: 'JSON required', code: 'UNSUPPORTED_MEDIA_TYPE' });
  }

  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return json(403, { error: 'Request not permitted', code: 'ORIGIN_NOT_PERMITTED' });
  }

  const parsed = await readJson(request);
  if (parsed.error) return parsed.error;
  if (typeof parsed.value?.website === 'string' && parsed.value.website.trim()) {
    return json(200, { ok: true });
  }

  const result = validateClubInterest(parsed.value);
  if (!result.ok) return json(400, { error: 'Check the required details', code: result.code });
  if (typeof sendClubInterest !== 'function') {
    return json(503, { error: 'Form delivery is not configured', code: 'DELIVERY_UNAVAILABLE' });
  }

  try {
    await sendClubInterest(result.submission);
  } catch {
    return json(502, { error: 'We could not send your details', code: 'DELIVERY_FAILED' });
  }
  return json(200, { ok: true });
}

export const onRequestPost = context => handleClubInterestRequest(context);
