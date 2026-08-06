const acceptedFields = Object.freeze(['message', 'email', 'website', 'garment', 'view', 'browser']);

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
