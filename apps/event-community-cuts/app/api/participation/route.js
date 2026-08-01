import { NextResponse } from 'next/server';
import {
  SUPPORTER_KIND_BY_PARTICIPATION,
  SUPPORTER_PARTICIPATION_VALUES,
  UPDATE_VALUES,
} from '../../event-form-contract.js';

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
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+().\-\s]{7,20}$/;

function json(body, status) {
  return NextResponse.json(body, {
    status,
    headers: { 'cache-control': 'no-store' },
  });
}

function readConfig() {
  const apiUrl = String(
    process.env.MISSION_API_URL
      || process.env.NEXT_PUBLIC_MISSION_API_URL
      || process.env.NEXT_PUBLIC_API_URL
      || '',
  ).replace(/\/$/, '');
  const tenant = String(
    process.env.MISSION_TENANT
      || process.env.NEXT_PUBLIC_MISSION_TENANT
      || process.env.DEFAULT_TENANT
      || 'asc3nd',
  ).trim();
  const publicKey = String(
    process.env.MISSION_PUBLIC_KEY || process.env.NEXT_PUBLIC_MISSION_PUBLIC_KEY || '',
  ).trim();

  if (!apiUrl || !tenant || !publicKey) return null;

  let parsed;
  try {
    parsed = new URL(apiUrl);
  } catch {
    return null;
  }

  const localDevelopment = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
  if (process.env.NODE_ENV === 'production' && parsed.protocol !== 'https:' && !localDevelopment) {
    return null;
  }

  return { apiUrl, tenant, publicKey };
}

function normalize(input) {
  const updates = Array.isArray(input.updates)
    ? input.updates.map(String).filter((value) => UPDATE_VALUES.includes(value))
    : [];

  return {
    name: String(input.name || '').trim().slice(0, 160),
    email: String(input.email || '').trim().toLowerCase().slice(0, 180),
    phone: String(input.phone || '').trim().slice(0, 40),
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

function resolveSourcePage(origin, sourcePath) {
  try {
    const requestedSource = new URL(sourcePath || '/', origin);
    return requestedSource.origin === origin ? requestedSource.toString() : `${origin}/`;
  } catch {
    return `${origin}/`;
  }
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

  // Silently accept honeypot traffic without creating a Mission OS record.
  if (submission.honeypot) return json({ ok: true }, 200);

  const fields = validate(submission);
  if (fields.length) {
    return json({ ok: false, error: 'validation_failed', fields }, 422);
  }

  const config = readConfig();
  if (!config) {
    return json({ ok: false, error: 'supporter_service_unavailable' }, 503);
  }

  const kind = SUPPORTER_KIND_BY_PARTICIPATION[submission.participation];
  const origin = request.nextUrl.origin;
  const sourcePage = resolveSourcePage(origin, submission.sourcePath);
  const payload = {
    name: submission.name,
    email: submission.email,
    phone: submission.phone,
    message: [
      `Community Cuts participation: ${submission.participation}`,
      `Requested updates: ${submission.updates.join(', ') || 'none'}`,
      `Preferred language: ${submission.preferredLanguage}`,
    ].join('\n'),
    sourcePage,
    consent: submission.consent,
    companyWebsite: '',
    metadata: {
      campaign: 'fresh-fade-fresh-grade-2026',
      participation: submission.participation,
      updates: submission.updates,
      preferredLanguage: submission.preferredLanguage,
    },
  };

  try {
    const upstream = await fetch(
      `${config.apiUrl}/api/public/${encodeURIComponent(config.tenant)}/${kind}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-mission-public-key': config.publicKey,
          'x-idempotency-key': crypto.randomUUID(),
          origin,
          referer: sourcePage,
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
        signal: AbortSignal.timeout(8000),
      },
    );
    const body = await upstream.json().catch(() => ({}));

    if (!upstream.ok || body.ok === false) {
      const status = upstream.status >= 400 && upstream.status < 500 ? upstream.status : 502;
      return json({ ok: false, error: 'supporter_submission_failed' }, status);
    }

    return json({
      ok: true,
      receipt_id: body.receipt?.id || null,
    }, 200);
  } catch {
    return json({ ok: false, error: 'supporter_service_unavailable' }, 502);
  }
}
