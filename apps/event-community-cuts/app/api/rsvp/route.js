import { NextResponse } from 'next/server';
import { AGE_GROUP_VALUES, ARRIVAL_WINDOW_VALUES } from '../../event-form-contract.js';
import {
  insertRsvp,
  findRsvpByIdempotencyKey,
  generateConfirmationCode,
} from '../../../lib/supabase-server.js';
import { sendAttendeeConfirmation, sendStaffNotification } from '../../../lib/email.js';

export const runtime = 'nodejs';

const allowedFields = new Set([
  'guardian_name',
  'email',
  'phone',
  'children_count',
  'age_range',
  'requested_service',
  'arrival_window',
  'preferred_language',
  'accessibility_contact',
  'contact_privately',
  'company_website',
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

  const honeypot = String(input.company_website || '').trim();
  if (honeypot) return json({ ok: true }, 200);

  const payload = {
    guardian_name: String(input.guardian_name || '').trim(),
    email: String(input.email || '').trim() || null,
    phone: String(input.phone || '').trim() || null,
    children_count: Number(input.children_count || 0),
    age_range: String(input.age_range || '').trim() || null,
    requested_service: String(input.requested_service || 'haircut').trim(),
    arrival_window: String(input.arrival_window || '').trim() || null,
    preferred_language: String(input.preferred_language || 'en').trim(),
    accessibility_contact: Boolean(input.accessibility_contact),
    contact_privately: Boolean(input.contact_privately),
    company_website: honeypot,
  };
  const idempotencyKey = String(input.idempotency_key || '').trim() || null;

  const fields = [];
  if (!payload.guardian_name || payload.guardian_name.length > 120) {
    fields.push({ field: 'guardian_name', code: payload.guardian_name ? 'too_long' : 'required' });
  }
  if (!payload.email && !payload.phone) {
    fields.push({ field: 'email', code: 'contact_required' });
    fields.push({ field: 'phone', code: 'contact_required' });
  }
  if (payload.email && !emailPattern.test(payload.email)) {
    fields.push({ field: 'email', code: 'invalid' });
  }
  if (payload.phone && !phonePattern.test(payload.phone)) {
    fields.push({ field: 'phone', code: 'invalid' });
  }
  if (!Number.isInteger(payload.children_count) || payload.children_count < 1 || payload.children_count > 10) {
    fields.push({ field: 'children_count', code: 'invalid' });
  }
  if (!payload.age_range || !AGE_GROUP_VALUES.includes(payload.age_range)) {
    fields.push({ field: 'age_range', code: 'invalid' });
  }
  if (payload.arrival_window && !ARRIVAL_WINDOW_VALUES.includes(payload.arrival_window)) {
    fields.push({ field: 'arrival_window', code: 'invalid' });
  }
  if (payload.requested_service !== 'haircut') {
    fields.push({ field: 'requested_service', code: 'invalid' });
  }
  if (!['en', 'es'].includes(payload.preferred_language)) {
    fields.push({ field: 'preferred_language', code: 'invalid' });
  }

  if (fields.length) {
    return json({
      ok: false,
      error: 'validation_failed',
      fields,
      message: 'Provide your name, at least one contact method, and the number of children attending.',
    }, 422);
  }

  const confirmationCode = generateConfirmationCode();

  const insertPayload = {
    guardian_name: payload.guardian_name,
    email: payload.email,
    phone: payload.phone,
    children_count: payload.children_count,
    age_range: payload.age_range,
    requested_service: payload.requested_service,
    arrival_window: payload.arrival_window,
    preferred_language: payload.preferred_language,
    accessibility_contact: payload.accessibility_contact,
    contact_privately: payload.contact_privately,
    confirmation_code: confirmationCode,
    idempotency_key: idempotencyKey,
    contact_consent: true,
    raw_payload: input,
  };

  try {
    const result = await insertRsvp(insertPayload);

    if (result.duplicate && idempotencyKey) {
      const existing = await findRsvpByIdempotencyKey(idempotencyKey);
      return json({
        ok: true,
        confirmation_code: existing?.confirmation_code || confirmationCode,
        is_duplicate: true,
      }, 200);
    }

    const row = result.row;
    const submission = {
      ...payload,
      confirmation_code: row?.confirmation_code || confirmationCode,
    };

    const emailTo = payload.email;
    if (emailTo) {
      try {
        await sendAttendeeConfirmation({
          to: emailTo,
          locale: payload.preferred_language,
          submission,
          confirmationCode: submission.confirmation_code,
          type: 'rsvp',
        });
      } catch {
      }
    }

    try {
      await sendStaffNotification({ submission, type: 'rsvp' });
    } catch {
    }

    return json({
      ok: true,
      confirmation_code: submission.confirmation_code,
      is_duplicate: false,
    }, 200);
  } catch (err) {
    if (err.code === 'supabase_not_configured') {
      return json({
        ok: false,
        error: 'rsvp_service_unavailable',
        message: 'The RSVP service is not configured. Please try again later.',
      }, 503);
    }
    return json({
      ok: false,
      error: 'rsvp_service_unavailable',
      message: 'The RSVP service is temporarily unavailable. Please try again shortly.',
    }, 502);
  }
}
