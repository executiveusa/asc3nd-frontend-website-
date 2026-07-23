import { NextResponse } from 'next/server';

const CANONICAL_RSVP_URL = process.env.ASC3ND_WORKBOOK_RSVP_URL || 'https://asc3nd-interactive-document.vercel.app/api/rsvp';
const WORKBOOK_ORIGIN = 'https://asc3nd-interactive-document.vercel.app';

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
]);

export async function POST(request) {
  let input;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const unknownFields = Object.keys(input || {}).filter((key) => !allowedFields.has(key));
  if (unknownFields.length) {
    return NextResponse.json({ ok: false, error: 'unexpected_fields' }, { status: 400 });
  }

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
    company_website: String(input.company_website || '').trim(),
  };

  if (!payload.guardian_name || (!payload.email && !payload.phone) || !Number.isInteger(payload.children_count) || payload.children_count < 1) {
    return NextResponse.json({
      ok: false,
      error: 'validation_failed',
      message: 'Provide your name, at least one contact method, and the number of children attending.',
    }, { status: 422 });
  }

  try {
    const upstream = await fetch(CANONICAL_RSVP_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: WORKBOOK_ORIGIN,
        referer: `${WORKBOOK_ORIGIN}/event/community-cuts`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const text = await upstream.text();
    let body;
    try { body = JSON.parse(text); } catch { body = { ok: false, error: 'invalid_upstream_response' }; }

    return NextResponse.json(body, {
      status: upstream.status,
      headers: { 'cache-control': 'no-store' },
    });
  } catch {
    return NextResponse.json({
      ok: false,
      error: 'rsvp_service_unavailable',
      message: 'The RSVP service is temporarily unavailable. Please try again shortly.',
    }, { status: 502 });
  }
}
