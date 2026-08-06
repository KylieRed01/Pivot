import nodemailer from 'nodemailer';

const line = (label, value) => `${label}: ${value || 'Not provided'}`;

export function createFastmailSender({ env = process.env, createTransport = nodemailer.createTransport } = {}) {
  const user = env.FASTMAIL_SMTP_USER?.trim();
  const password = env.FASTMAIL_SMTP_APP_PASSWORD;
  if (!user || !password) return undefined;
  const recipient = env.CLUB_INTEREST_RECIPIENT?.trim() || 'hello@pivotteamwear.com';
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
    replyTo: submission.email,
    subject: `Club interest — ${submission.clubName}`,
    text: [
      line('Contact name', submission.contactName),
      line('Club name', submission.clubName),
      line('Email address', submission.email),
      line('Sport', submission.sport),
      line('Other sport', submission.otherSport),
      line('League or association', submission.association),
      line('Other league or association', submission.otherAssociation),
      line('Club suburb or town', submission.locality),
      line('Other suburb or town', submission.otherLocality)
    ].join('\n')
  });
}
