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

function mockSupabaseInsert(payload) {
  const row = {
    id: 'row-1',
    confirmation_code: payload?.confirmation_code || 'ASC3ND-TEST',
    ...payload,
  };
  return {
    ok: true,
    status: 201,
    json: async () => [row],
    text: async () => JSON.stringify([row]),
  };
}

const supabaseSuccess = vi.fn(async (url, init) => {
  const body = init?.body ? JSON.parse(init.body) : {};
  return mockSupabaseInsert(body);
});

const resendSuccess = vi.fn(async () => ({
  ok: true,
  status: 200,
  json: async () => ({ id: 'resend-1' }),
  text: async () => '{"id":"resend-1"}',
}));

function stubEnv() {
  vi.stubEnv('SUPABASE_URL', 'https://test.supabase.co');
  vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-role-key');
  vi.stubEnv('RESEND_API_TOKEN', 'test-resend-token');
  vi.stubEnv('STAFF_NOTIFY_EMAIL', 'staff@example.test');
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('family RSVP — self-contained Supabase + Resend', () => {
  const validRsvp = {
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
    idempotency_key: 'idem-rsvp-001',
  };

  it('persists to Supabase and returns a confirmation code', async () => {
    stubEnv();
    const fetchMock = vi.fn(async (url) => {
      if (typeof url === 'string' && url.includes('supabase.co')) return supabaseSuccess(url, {});
      if (typeof url === 'string' && url.includes('resend.com')) return resendSuccess(url, {});
      return new Response('{}', { status: 404 });
    });
    vi.stubGlobal('fetch', fetchMock);

    const response = await submitRsvp(request('/api/rsvp', validRsvp));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.confirmation_code).toMatch(/^ASC3ND-/);
    expect(body.is_duplicate).toBe(false);

    const supabaseCalls = fetchMock.mock.calls.filter(([u]) => typeof u === 'string' && u.includes('supabase.co') && u.includes('/rest/v1/rsvps'));
    expect(supabaseCalls).toHaveLength(1);
    const insertBody = JSON.parse(supabaseCalls[0][1].body);
    expect(insertBody.guardian_name).toBe('Jordan Parent');
    expect(insertBody.age_range).toBe('mixed-ages');
    expect(insertBody.idempotency_key).toBe('idem-rsvp-001');
  });

  it('rejects an age value that is not in the customer-approved list', async () => {
    stubEnv();
    vi.stubGlobal('fetch', vi.fn());

    const response = await submitRsvp(request('/api/rsvp', {
      ...validRsvp,
      age_range: 'all-the-ages',
    }));
    expect(response.status).toBe(422);
    expect((await response.json()).fields).toContainEqual({ field: 'age_range', code: 'invalid' });
  });

  it('returns the existing confirmation code on duplicate idempotency key', async () => {
    stubEnv();
    const duplicateResponse = {
      ok: false,
      status: 409,
      json: async () => [],
      text: async () => '',
    };
    const existingResponse = {
      ok: true,
      status: 200,
      json: async () => [{ confirmation_code: 'ASC3ND-EXISTING' }],
      text: async () => '[]',
    };
    const fetchMock = vi.fn(async (url) => {
      const u = typeof url === 'string' ? url : '';
      if (u.includes('/rest/v1/rsvps') && u.includes('idempotency_key=eq')) return existingResponse;
      if (u.includes('/rest/v1/rsvps')) return duplicateResponse;
      if (u.includes('resend.com')) return resendSuccess(url, {});
      return new Response('{}', { status: 404 });
    });
    vi.stubGlobal('fetch', fetchMock);

    const response = await submitRsvp(request('/api/rsvp', validRsvp));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.confirmation_code).toBe('ASC3ND-EXISTING');
    expect(body.is_duplicate).toBe(true);
  });

  it('silently succeeds on honeypot fill without touching Supabase', async () => {
    stubEnv();
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await submitRsvp(request('/api/rsvp', {
      ...validRsvp,
      company_website: 'https://spam.example',
    }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('fails closed with 503 when Supabase is not configured', async () => {
    vi.stubEnv('SUPABASE_URL', '');
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', '');
    vi.stubGlobal('fetch', vi.fn());

    const response = await submitRsvp(request('/api/rsvp', validRsvp));
    expect(response.status).toBe(503);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.error).toBe('rsvp_service_unavailable');
  });
});

describe('supporter participation — self-contained Supabase + Resend', () => {
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
    idempotency_key: 'idem-supp-001',
  };

  it('persists to Supabase and returns a receipt_id', async () => {
    stubEnv();
    const fetchMock = vi.fn(async (url) => {
      if (typeof url === 'string' && url.includes('supabase.co')) return supabaseSuccess(url, {});
      if (typeof url === 'string' && url.includes('resend.com')) return resendSuccess(url, {});
      return new Response('{}', { status: 404 });
    });
    vi.stubGlobal('fetch', fetchMock);

    const response = await submitParticipation(request('/api/participation', supporter));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.receipt_id).toMatch(/^ASC3ND-/);

    const supabaseCalls = fetchMock.mock.calls.filter(([u]) => typeof u === 'string' && u.includes('supabase.co') && u.includes('/rest/v1/supporters'));
    expect(supabaseCalls).toHaveLength(1);
    const insertBody = JSON.parse(supabaseCalls[0][1].body);
    expect(insertBody.participation).toBe('volunteer');
    expect(insertBody.idempotency_key).toBe('idem-supp-001');
  });

  it('fails closed when Supabase is not configured', async () => {
    vi.stubEnv('SUPABASE_URL', '');
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', '');
    vi.stubEnv('MISSION_API_URL', '');
    vi.stubGlobal('fetch', vi.fn());

    const response = await submitParticipation(request('/api/participation', supporter));
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ ok: false, error: 'supporter_service_unavailable' });
  });

  it('rejects invalid participation value', async () => {
    stubEnv();
    vi.stubGlobal('fetch', vi.fn());

    const response = await submitParticipation(request('/api/participation', {
      ...supporter,
      participation: 'invalid-option',
    }));
    expect(response.status).toBe(422);
    const body = await response.json();
    expect(body.fields).toContainEqual({ field: 'participation', code: 'invalid' });
  });

  it('silently succeeds on honeypot fill without touching Supabase', async () => {
    stubEnv();
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await submitParticipation(request('/api/participation', {
      ...supporter,
      company_website: 'https://spam.example',
    }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
