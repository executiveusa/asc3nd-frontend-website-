import { NextResponse } from 'next/server';
import {
  SUPPORTER_KIND_BY_PARTICIPATION,
  SUPPORTER_PARTICIPATION_VALUES,
  UPDATE_VALUES,
} from '../../event-form-contract.js';
import {
  insertSupporter,
  findSupporterByIdempotencyKey,
  generateConfirmationCode,
} from '../../../lib/supabase-server.js';
import { sendAttendeeConfirmation, sendStaffNotification } from '../../../lib/email.js';

export const runtime = 'nodejs';

const allowedFields = new Set([
  'name',
  'email',
  'phone',
  'participation',
  'updates',
  'preferred_language',
  'consent',
  'company_website',
  'source_path',
  'idempotency_key',
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+().\-\s]{7,20}$/;

function json(body, status) {
  return NextResponse.json(body, {
    status,
    headers: { 'cache-control': 'no-store' },
  });
}

function normalize(input) {
  const updates = Array.isArray(input.updates)
    ? input.updates.map(String).filter((value) => UPDATE_VALUES.includes(value))
    : [];

  return {
    name: String(input.name || '').trim().slice(0, 160),
    email: String(input.email || '').trim().toLowerCase().slice(0, 180) || null,
    phone: String(input.phone || '').trim().slice(0, 40) || null,
    participation: String(input.participation || '').trim(),
    updates,
    preferredLanguage: input.preferred_language === 'es' ? 'es' : 'en',
    consent: input.consent === true,
    honeypot: String(input.company_website || '').trim(),
    sourcePath: String(input.source_path || '/').trim().slice(0, 500),
  };
}

function validate(submission) {
  const fields = [];
  if (!submission.name) fields.push({ field: 'name', code: 'required' });
  if (!submission.email && !submission.phone) {
    fields.push({ field: 'email', code: 'contact_required' });
    fields.push({ field: 'phone', code: 'contact_required' });
  }
  if (submission.email && !emailPattern.test(submission.email)) {
    fields.push({ field: 'email', code: 'invalid' });
  }
  if (submission.phone && !phonePattern.test(submission.phone)) {
    fields.push({ field: 'phone', code: 'invalid' });
  }
  if (!SUPPORTER_PARTICIPATION_VALUES.includes(submission.participation)) {
    fields.push({ field: 'participation', code: 'invalid' });
  }
  if (!submission.consent) fields.push({ field: 'consent', code: 'required' });
  return fields;
}

export async function POST(request) {
  let input;
  try {
    input = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return json({ ok: false, error: 'invalid_payload' }, 400);
  }

  const unknownFields = Object.keys(input).filter((key) => !allowedFields.has(key));
  if (unknownFields.length) {
    return json({ ok: false, error: 'unexpected_fields' }, 400);
  }

  const submission = normalize(input);

  if (submission.honeypot) return json({ ok: true }, 200);

  const fields = validate(submission);
  if (fields.length) {
    return json({ ok: false, error: 'validation_failed', fields }, 422);
  }

  const idempotencyKey = String(input.idempotency_key || '').trim() || null;
  const confirmationCode = generateConfirmationCode();

  const insertPayload = {
    name: submission.name,
    email: submission.email,
    phone: submission.phone,
    participation: submission.participation,
    updates: submission.updates,
    preferred_language: submission.preferredLanguage,
    consent: submission.consent,
    confirmation_code: confirmationCode,
    idempotency_key: idempotencyKey,
    source_path: submission.sourcePath,
    raw_payload: input,
  };

  try {
    const result = await insertSupporter(insertPayload);

    if (result.duplicate && idempotencyKey) {
      const existing = await findSupporterByIdempotencyKey(idempotencyKey);
      return json({
        ok: true,
        receipt_id: existing?.confirmation_code || confirmationCode,
        is_duplicate: true,
      }, 200);
    }

    const row = result.row;
    const fullSubmission = {
      ...submission,
      confirmation_code: row?.confirmation_code || confirmationCode,
    };

    const emailTo = submission.email;
    if (emailTo) {
      try {
        await sendAttendeeConfirmation({
          to: emailTo,
          locale: submission.preferredLanguage,
          submission: fullSubmission,
          confirmationCode: fullSubmission.confirmation_code,
          type: 'supporter',
        });
      } catch {
      }
    }

    try {
      await sendStaffNotification({ submission: fullSubmission, type: 'supporter' });
    } catch {
    }

    return json({
      ok: true,
      receipt_id: fullSubmission.confirmation_code,
    }, 200);
  } catch (err) {
    if (err.code === 'supabase_not_configured') {
      return json({ ok: false, error: 'supporter_service_unavailable' }, 503);
    }
    return json({ ok: false, error: 'supporter_submission_failed' }, 502);
  }
}
