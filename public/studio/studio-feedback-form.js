const acceptedFields = Object.freeze(['message', 'email', 'website', 'garment', 'view', 'browser']);
const failureMessages = Object.freeze({
  INVALID_SUBMISSION: 'Check your feedback and optional email, then try again.',
  RATE_LIMITED: 'Too many feedback attempts. Wait 15 minutes, then try again.',
  DELIVERY_UNAVAILABLE: 'Feedback cannot be sent right now. Your entries are still here; please try again later.',
  DELIVERY_FAILED: 'Feedback could not be delivered. Your entries are still here; please try again.'
});

export function feedbackFailureMessage(error) {
  return failureMessages[error?.code] || 'Something went wrong. Your entries are still here; please try again.';
}

export function describeStudioView({ viewMode, garmentView, sideView }) {
  return viewMode === '3d' ? `${sideView === 'right' ? 'right' : 'left'}-side preview` : garmentView === 'back' ? 'back' : 'front';
}

export async function sendStudioFeedback(fields, fetchImpl = fetch) {
  const payload = Object.fromEntries(acceptedFields.map(field => [field, fields?.[field] ?? '']));
  const response = await fetchImpl('/api/studio-feedback', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw Object.assign(new Error('We could not send your feedback. Please try again.'), { code: result.code });
  }
  return result;
}
