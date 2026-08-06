const limits = Object.freeze({
  message: 3000,
  email: 254,
  garment: 40,
  view: 30,
  browser: 500
});

const clean = (value, maximum) => typeof value === 'string' ? value.trim().slice(0, maximum + 1) : '';

export function validateStudioFeedback(input) {
  const submission = {
    message: clean(input?.message, limits.message),
    email: clean(input?.email, limits.email),
    garment: clean(input?.garment, limits.garment),
    view: clean(input?.view, limits.view),
    browser: clean(input?.browser, limits.browser)
  };

  const invalidControlCharacter = Object.values(submission).some(value => /[\u0000-\u0009\u000B-\u001F\u007F]/.test(value));
  const overLimit = Object.entries(submission).some(([field, value]) => value.length > limits[field]);
  const invalidEmail = submission.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email);
  if (!submission.message || invalidControlCharacter || overLimit || invalidEmail) {
    return { ok: false, code: 'INVALID_SUBMISSION' };
  }

  return { ok: true, submission };
}
