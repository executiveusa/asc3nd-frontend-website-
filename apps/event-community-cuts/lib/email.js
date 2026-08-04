function getEmailConfig() {
  return {
    token: process.env.RESEND_API_TOKEN || '',
    fromEmail: process.env.RSVP_FROM_EMAIL || 'no-reply@asc3nd.org',
    replyTo: process.env.RSVP_REPLY_TO || 'social@asc3nd.org',
    staffEmail: process.env.STAFF_NOTIFY_EMAIL || 'macsdigitalmedia@gmail.com',
  };
}

const EVENT_DETAILS = {
  date: 'Sunday, August 30, 2026',
  time: '12:00 PM - 3:00 PM',
  venue: 'Tangles & Locs',
  address: '7425 Hardeson Rd, Everett, WA 98203',
};

const ATTENDEE_SUBJECT = {
  en: 'RSVP Received — Community Cuts for Kids (Aug 30)',
  es: 'Confirmación recibida — Community Cuts for Kids (30 de agosto)',
};

function attendeeHtmlEN(submission, confirmationCode) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0b0a07;font-family:Barlow,Helvetica,Arial,sans-serif;color:#fff;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <div style="background:#000;border:1px solid #f5aa17;border-radius:8px;overflow:hidden;">
      <div style="background:#f5aa17;padding:16px 24px;">
        <h1 style="margin:0;font-size:18px;font-weight:900;color:#000;letter-spacing:0.05em;">ASC3ND COLLECTIVE</h1>
      </div>
      <div style="padding:32px 24px;">
        <h2 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#f5aa17;">RSVP Received</h2>
        <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#fff;">
          Thank you, ${submission.guardian_name}. We received your RSVP for <strong>Community Cuts for Kids — Fresh Fade, Fresh Grade</strong>.
        </p>
        <div style="background:#111;border-radius:6px;padding:16px 20px;margin:0 0 24px;">
          <p style="margin:0 0 8px;font-size:14px;color:#f5aa17;font-weight:700;">EVENT DETAILS</p>
          <p style="margin:0 0 4px;font-size:15px;color:#fff;"><strong>Date:</strong> ${EVENT_DETAILS.date}</p>
          <p style="margin:0 0 4px;font-size:15px;color:#fff;"><strong>Time:</strong> ${EVENT_DETAILS.time}</p>
          <p style="margin:0;font-size:15px;color:#fff;"><strong>Location:</strong> ${EVENT_DETAILS.venue}, ${EVENT_DETAILS.address}</p>
        </div>
        <div style="background:#111;border-radius:6px;padding:16px 20px;margin:0 0 24px;">
          <p style="margin:0 0 8px;font-size:14px;color:#f5aa17;font-weight:700;">YOUR CONFIRMATION CODE</p>
          <p style="margin:0;font-size:22px;font-weight:900;color:#fff;letter-spacing:0.1em;font-family:monospace;">${confirmationCode}</p>
        </div>
        <div style="background:#1a1500;border-left:4px solid #f5aa17;padding:16px 20px;margin:0 0 24px;border-radius:0 6px 6px 0;">
          <p style="margin:0 0 8px;font-size:14px;color:#f5aa17;font-weight:700;">IMPORTANT — PLEASE READ</p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#fff;">
            Your RSVP helps us prepare for everyone attending and ensures we're ready to serve as many families as possible.
            Free haircuts and school supplies will be provided on a <strong>first-come, first-served basis</strong> while
            supplies and appointment capacity last. We encourage you to arrive early to take full advantage of the event.
            An RSVP does not reserve a haircut, school supplies, or a specific arrival time.
          </p>
        </div>
        <p style="margin:0;font-size:13px;line-height:1.5;color:#999;">
          This confirmation was sent because someone submitted an RSVP at asc3nd.org. If you did not submit this, please
          reply to this email so we can remove your information.
        </p>
      </div>
      <div style="padding:16px 24px;background:#111;border-top:1px solid #222;">
        <p style="margin:0;font-size:12px;color:#666;text-align:center;">
          Asc3nd Collective &middot; EIN 99-1881891 &middot; Seattle / King County
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function attendeeTextEN(submission, confirmationCode) {
  return [
    'ASC3ND COLLECTIVE — RSVP RECEIVED',
    '',
    `Thank you, ${submission.guardian_name}. We received your RSVP for Community Cuts for Kids — Fresh Fade, Fresh Grade.`,
    '',
    'EVENT DETAILS',
    `Date: ${EVENT_DETAILS.date}`,
    `Time: ${EVENT_DETAILS.time}`,
    `Location: ${EVENT_DETAILS.venue}, ${EVENT_DETAILS.address}`,
    '',
    `Confirmation code: ${confirmationCode}`,
    '',
    'IMPORTANT:',
    'Your RSVP helps us prepare, but does not reserve a haircut, school supplies, or a specific arrival time.',
    'Free haircuts and school supplies are provided on a first-come, first-served basis while supplies last.',
    'We encourage you to arrive early.',
    '',
    'Asc3nd Collective - EIN 99-1881891 - Seattle / King County',
  ].join('\n');
}

function attendeeHtmlES(submission, confirmationCode) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0b0a07;font-family:Barlow,Helvetica,Arial,sans-serif;color:#fff;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <div style="background:#000;border:1px solid #f5aa17;border-radius:8px;overflow:hidden;">
      <div style="background:#f5aa17;padding:16px 24px;">
        <h1 style="margin:0;font-size:18px;font-weight:900;color:#000;letter-spacing:0.05em;">ASC3ND COLLECTIVE</h1>
      </div>
      <div style="padding:32px 24px;">
        <h2 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#f5aa17;">Confirmacion Recibida</h2>
        <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#fff;">
          Gracias, ${submission.guardian_name}. Hemos recibido tu confirmacion para <strong>Community Cuts for Kids — Fresh Fade, Fresh Grade</strong>.
        </p>
        <div style="background:#111;border-radius:6px;padding:16px 20px;margin:0 0 24px;">
          <p style="margin:0 0 8px;font-size:14px;color:#f5aa17;font-weight:700;">DETALLES DEL EVENTO</p>
          <p style="margin:0 0 4px;font-size:15px;color:#fff;"><strong>Fecha:</strong> ${EVENT_DETAILS.date}</p>
          <p style="margin:0 0 4px;font-size:15px;color:#fff;"><strong>Hora:</strong> ${EVENT_DETAILS.time}</p>
          <p style="margin:0;font-size:15px;color:#fff;"><strong>Lugar:</strong> ${EVENT_DETAILS.venue}, ${EVENT_DETAILS.address}</p>
        </div>
        <div style="background:#111;border-radius:6px;padding:16px 20px;margin:0 0 24px;">
          <p style="margin:0 0 8px;font-size:14px;color:#f5aa17;font-weight:700;">TU CODIGO DE CONFIRMACION</p>
          <p style="margin:0;font-size:22px;font-weight:900;color:#fff;letter-spacing:0.1em;font-family:monospace;">${confirmationCode}</p>
        </div>
        <div style="background:#1a1500;border-left:4px solid #f5aa17;padding:16px 20px;margin:0 0 24px;border-radius:0 6px 6px 0;">
          <p style="margin:0 0 8px;font-size:14px;color:#f5aa17;font-weight:700;">INFORMACION IMPORTANTE</p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#fff;">
            Tu confirmacion nos ayuda a prepararnos para todas las personas que asistiran y a servir a tantas familias
            como sea posible. Los cortes de cabello gratuitos y los utiles escolares se entregaran por
            <strong>orden de llegada</strong> mientras duren las existencias y haya citas disponibles.
            Te recomendamos llegar temprano. Una confirmacion no reserva un corte de cabello, utiles escolares
            ni una hora especifica de llegada.
          </p>
        </div>
        <p style="margin:0;font-size:13px;line-height:1.5;color:#999;">
          Esta confirmacion se envio porque alguien envio una confirmacion en asc3nd.org. Si no enviaste esto,
          responde a este correo para que podamos eliminar tu informacion.
        </p>
      </div>
      <div style="padding:16px 24px;background:#111;border-top:1px solid #222;">
        <p style="margin:0;font-size:12px;color:#666;text-align:center;">
          Asc3nd Collective &middot; EIN 99-1881891 &middot; Seattle / King County
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function attendeeTextES(submission, confirmationCode) {
  return [
    'ASC3ND COLLECTIVE - CONFIRMACION RECIBIDA',
    '',
    `Gracias, ${submission.guardian_name}. Hemos recibido tu confirmacion para Community Cuts for Kids - Fresh Fade, Fresh Grade.`,
    '',
    'DETALLES DEL EVENTO',
    `Fecha: ${EVENT_DETAILS.date}`,
    `Hora: ${EVENT_DETAILS.time}`,
    `Lugar: ${EVENT_DETAILS.venue}, ${EVENT_DETAILS.address}`,
    '',
    `Codigo de confirmacion: ${confirmationCode}`,
    '',
    'INFORMACION IMPORTANTE:',
    'Tu confirmacion nos ayuda a prepararnos, pero no reserva un corte de cabello, utiles escolares ni una hora especifica.',
    'Los cortes de cabello y utiles gratuitos se entregan por orden de llegada mientras duren las existencias.',
    'Te recomendamos llegar temprano.',
    '',
    'Asc3nd Collective - EIN 99-1881891 - Seattle / King County',
  ].join('\n');
}

const SUPPORTER_SUBJECT = {
  volunteer: 'Volunteer Interest Received — Community Cuts for Kids',
  supplies: 'Supply Donation Interest Received — Community Cuts for Kids',
  partner: 'Partner Interest Received — Community Cuts for Kids',
  general: 'Message Received — Asc3nd Collective',
};

function supporterHtmlEN(submission, confirmationCode) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0b0a07;font-family:Barlow,Helvetica,Arial,sans-serif;color:#fff;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <div style="background:#000;border:1px solid #f5aa17;border-radius:8px;overflow:hidden;">
      <div style="background:#f5aa17;padding:16px 24px;">
        <h1 style="margin:0;font-size:18px;font-weight:900;color:#000;">ASC3ND COLLECTIVE</h1>
      </div>
      <div style="padding:32px 24px;">
        <h2 style="margin:0 0 8px;font-size:24px;color:#f5aa17;">Thank You, ${submission.name}</h2>
        <p style="margin:0 0 20px;font-size:16px;line-height:1.6;">
          We received your response for <strong>${SUPPORTER_SUBJECT[submission.participation] || 'Community Cuts for Kids'}</strong>.
          The Asc3nd Collective will follow up using the contact information you provided.
        </p>
        <div style="background:#111;border-radius:6px;padding:16px 20px;margin:0 0 24px;">
          <p style="margin:0 0 8px;font-size:14px;color:#f5aa17;font-weight:700;">REFERENCE</p>
          <p style="margin:0;font-size:18px;font-weight:900;font-family:monospace;letter-spacing:0.1em;">${confirmationCode}</p>
        </div>
        <p style="margin:0;font-size:13px;color:#999;">This email was sent because someone submitted a response at asc3nd.org.</p>
      </div>
    </div>
  </div>
</body></html>`;
}

function supporterTextEN(submission, confirmationCode) {
  return [
    'ASC3ND COLLECTIVE — RESPONSE RECEIVED',
    '',
    `Thank you, ${submission.name}.`,
    `We received your response: ${SUPPORTER_SUBJECT[submission.participation] || 'Community Cuts for Kids'}.`,
    'The Asc3nd Collective will follow up using the contact information you provided.',
    '',
    `Reference: ${confirmationCode}`,
    '',
    'Asc3nd Collective - EIN 99-1881891 - Seattle / King County',
  ].join('\n');
}

function staffNotificationText(submission, type) {
  const lines = [
    `NEW ${type.toUpperCase()} SUBMISSION — asc3nd.org`,
    `Received: ${new Date().toISOString()}`,
    '',
  ];
  if (type === 'rsvp') {
    lines.push(
      `Name: ${submission.guardian_name}`,
      `Email: ${submission.email || '(none)'}`,
      `Phone: ${submission.phone || '(none)'}`,
      `Children: ${submission.children_count}`,
      `Age range: ${submission.age_range}`,
      `Arrival window: ${submission.arrival_window || '(not specified)'}`,
      `Preferred language: ${submission.preferred_language}`,
      `Updates requested: ${(submission.updates || []).join(', ') || 'none'}`,
      `Accessibility contact requested: ${submission.accessibility_contact ? 'YES' : 'no'}`,
      `Confirmation code: ${submission.confirmation_code}`,
    );
    if (submission._email_delivery_failed) {
      lines.push('', `⚠ ATTENDEE EMAIL DELIVERY FAILED: ${submission._email_delivery_failed}`, '  The attendee did NOT receive their confirmation. Please contact them manually.');
    }
  } else {
    lines.push(
      `Name: ${submission.name}`,
      `Email: ${submission.email || '(none)'}`,
      `Phone: ${submission.phone || '(none)'}`,
      `Participation: ${submission.participation}`,
      `Updates requested: ${(submission.updates || []).join(', ') || 'none'}`,
      `Preferred language: ${submission.preferred_language}`,
      `Reference: ${submission.confirmation_code}`,
    );
  }
  lines.push('', 'View all submissions in the Supabase dashboard.');
  return lines.join('\n');
}

async function sendResendEmail({ to, subject, html, text }) {
  const { token, fromEmail, replyTo } = getEmailConfig();
  if (!token) {
    const err = new Error('resend_not_configured');
    err.code = 'resend_not_configured';
    throw err;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: Array.isArray(to) ? to : [to],
      reply_to: replyTo,
      subject,
      html,
      text,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    const err = new Error(`resend_send_failed:${res.status}`);
    err.code = 'resend_send_failed';
    err.detail = body;
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export async function sendAttendeeConfirmation({ to, locale, submission, confirmationCode, type = 'rsvp' }) {
  if (!to) return null;
  const isEs = locale === 'es';
  if (type === 'rsvp') {
    const subject = ATTENDEE_SUBJECT[isEs ? 'es' : 'en'];
    const html = isEs ? attendeeHtmlES(submission, confirmationCode) : attendeeHtmlEN(submission, confirmationCode);
    const text = isEs ? attendeeTextES(submission, confirmationCode) : attendeeTextEN(submission, confirmationCode);
    return sendResendEmail({ to, subject, html, text });
  }
  const subject = SUPPORTER_SUBJECT[submission.participation] || 'Response Received — Asc3nd Collective';
  return sendResendEmail({
    to,
    subject,
    html: supporterHtmlEN(submission, confirmationCode),
    text: supporterTextEN(submission, confirmationCode),
  });
}

export async function sendStaffNotification({ submission, type }) {
  const { staffEmail } = getEmailConfig();
  const subject = type === 'rsvp'
    ? `[RSVP] ${submission.guardian_name} — ${submission.confirmation_code}`
    : `[${submission.participation?.toUpperCase()}] ${submission.name} — ${submission.confirmation_code}`;
  const text = staffNotificationText(submission, type);
  return sendResendEmail({
    to: staffEmail.split(',').map((s) => s.trim()).filter(Boolean),
    subject,
    html: `<pre style="font-family:monospace;font-size:14px;white-space:pre-wrap;">${text.replace(/</g, '&lt;')}</pre>`,
    text,
  });
}

export function isResendConfigured() {
  return Boolean(getEmailConfig().token);
}
