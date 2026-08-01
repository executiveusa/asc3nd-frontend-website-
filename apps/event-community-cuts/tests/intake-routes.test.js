import { NextRequest } from 'next/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { POST as submitParticipation } from '../app/api/participation/route.js';
import { POST as submitRsvp } from '../app/api/rsvp/route.js';

function request(pathname, payload) {
  return new NextRequest(`https://event.asc3nd.test${pathname}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('family RSVP proxy', () => {
  it('forwards the customer-requested Mixed Ages value without lossy translation', async () => {
    const upstream = vi.fn(async () => Response.json({
      ok: true,
      confirmation_code: 'ASC3ND-TEST',
      is_duplicate: false,
    }));
    vi.stubGlobal('fetch', upstream);

    const response = await submitRsvp(request('/api/rsvp', {
      guardian_name: 'Jordan Parent',
      email: 'jordan@example.org',
      phone: null,
      children_count: 2,
      age_range: 'mixed-ages',
      requested_service: 'haircut',
      arrival_window: 'unsure',
      preferred_language: 'en',
      accessibility_contact: false,
      contact_privately: false,
      company_website: '',
    }));

    expect(response.status).toBe(200);
    const [, init] = upstream.mock.calls[0];
    expect(JSON.parse(init.body).age_range).toBe('mixed-ages');
  });

  it('rejects an age value that is not in the customer-approved list', async () => {
    const response = await submitRsvp(request('/api/rsvp', {
      guardian_name: 'Jordan Parent',
      email: 'jordan@example.org',
      children_count: 2,
      age_range: 'all-the-ages',
      requested_service: 'haircut',
      arrival_window: 'unsure',
      preferred_language: 'en',
    }));
    expect(response.status).toBe(422);
    expect((await response.json()).fields).toContainEqual({ field: 'age_range', code: 'invalid' });
  });
});

describe('supporter participation adapter', () => {
  const supporter = {
    name: 'Morgan Volunteer',
    email: 'morgan@example.org',
    phone: null,
    participation: 'volunteer',
    updates: ['volunteer'],
    preferred_language: 'en',
    consent: true,
    company_website: '',
    source_path: '/?intent=volunteer',
  };

  it('fails closed when Mission OS is not configured', async () => {
    vi.stubEnv('MISSION_API_URL', '');
    vi.stubEnv('NEXT_PUBLIC_MISSION_API_URL', '');
    vi.stubEnv('NEXT_PUBLIC_API_URL', '');
    vi.stubEnv('MISSION_PUBLIC_KEY', '');
    vi.stubEnv('NEXT_PUBLIC_MISSION_PUBLIC_KEY', '');

    const response = await submitParticipation(request('/api/participation', supporter));
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ ok: false, error: 'supporter_service_unavailable' });
  });

  it('returns success only after Mission OS accepts the record', async () => {
    vi.stubEnv('MISSION_API_URL', 'https://mission.asc3nd.test');
    vi.stubEnv('MISSION_TENANT', 'asc3nd');
    vi.stubEnv('MISSION_PUBLIC_KEY', 'pk_test');
    const upstream = vi.fn(async () => Response.json({
      ok: true,
      receipt: { id: 'receipt-1' },
    }, { status: 201 }));
    vi.stubGlobal('fetch', upstream);

    const response = await submitParticipation(request('/api/participation', {
      ...supporter,
      source_path: '//untrusted.example/redirect',
    }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, receipt_id: 'receipt-1' });
    const [url, init] = upstream.mock.calls[0];
    expect(url).toBe('https://mission.asc3nd.test/api/public/asc3nd/volunteer');
    expect(init.headers.referer).toBe('https://event.asc3nd.test/');
  });

  it.each([
    ['volunteer', 'volunteer'],
    ['supplies', 'donation-intent'],
    ['partner', 'donation-intent'],
    ['general', 'contact'],
  ])('routes %s interest to the %s Mission OS intake', async (participation, kind) => {
    vi.stubEnv('MISSION_API_URL', 'https://mission.asc3nd.test');
    vi.stubEnv('MISSION_TENANT', 'asc3nd');
    vi.stubEnv('MISSION_PUBLIC_KEY', 'pk_test');
    const upstream = vi.fn(async () => Response.json({ ok: true }, { status: 201 }));
    vi.stubGlobal('fetch', upstream);

    const response = await submitParticipation(request('/api/participation', {
      ...supporter,
      participation,
    }));

    expect(response.status).toBe(200);
    expect(upstream.mock.calls[0][0]).toBe(
      `https://mission.asc3nd.test/api/public/asc3nd/${kind}`,
    );
  });

  it('never converts an upstream rejection into a successful receipt', async () => {
    vi.stubEnv('MISSION_API_URL', 'https://mission.asc3nd.test');
    vi.stubEnv('MISSION_TENANT', 'asc3nd');
    vi.stubEnv('MISSION_PUBLIC_KEY', 'pk_test');
    vi.stubGlobal('fetch', vi.fn(async () => Response.json({ ok: false }, { status: 503 })));

    const response = await submitParticipation(request('/api/participation', supporter));
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ ok: false, error: 'supporter_submission_failed' });
  });
});
