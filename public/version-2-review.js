export function getReviewOutcome(formValid) {
  if (!formValid) {
    return {
      networkRequest: false,
      title: '',
      message: 'Complete the required review fields to preview the confirmation.'
    };
  }

  return {
    networkRequest: false,
    title: 'You’re in the game.',
    message: 'Thanks for registering your club’s interest. We’ve got your details and will be in touch when it’s time for the next play.'
  };
}

if (typeof document !== 'undefined') {
  const form = document.querySelector('#interest-review-form');
  const status = document.querySelector('#review-form-status');
  const previewButton = document.querySelector('#preview-interest-flow');

  previewButton?.addEventListener('click', () => {
    const valid = form.reportValidity();
    const outcome = getReviewOutcome(valid);

    status.replaceChildren();
    if (!valid) {
      status.textContent = outcome.message;
      return;
    }

    const heading = document.createElement('strong');
    heading.textContent = outcome.title;
    const message = document.createElement('span');
    message.textContent = outcome.message;
    const boundary = document.createElement('small');
    boundary.textContent = 'Preview only — no details were submitted, stored or sent.';
    status.append(heading, message, boundary);
  });
}
