import nodemailer from 'nodemailer';

const line = (label, value) => `${label}: ${value || 'Not provided'}`;

export function createStudioFeedbackSender({ env = process.env, createTransport = nodemailer.createTransport } = {}) {
  const user = env.FASTMAIL_SMTP_USER?.trim();
  const password = env.FASTMAIL_SMTP_APP_PASSWORD;
  if (!user || !password) return undefined;
  const recipient = env.STUDIO_FEEDBACK_RECIPIENT?.trim() || 'hello@pivotteamwear.com';
  const transport = createTransport({
    host: 'smtp.fastmail.com',
    port: 465,
    secure: true,
    auth: { user, pass: password },
    disableFileAccess: true,
    disableUrlAccess: true
  });

  return submission => transport.sendMail({
    from: `Pivot website <${user}>`,
    to: recipient,
    ...(submission.email ? { replyTo: submission.email } : {}),
    subject: 'Pivot Design Studio trial feedback',
    text: [
      line('Feedback', submission.message),
      line('Reply email', submission.email),
      line('Garment', submission.garment),
      line('View', submission.view),
      line('Browser', submission.browser)
    ].join('\n')
  });
}
