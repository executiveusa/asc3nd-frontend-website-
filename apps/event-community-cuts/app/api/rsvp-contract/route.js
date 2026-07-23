import { NextResponse } from 'next/server';

const CANONICAL_RSVP_URL = 'https://asc3nd-interactive-document.vercel.app/api/rsvp';

export async function GET() {
  try {
    const response = await fetch(CANONICAL_RSVP_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
      cache: 'no-store',
    });

    const text = await response.text();
    let body;
    try { body = JSON.parse(text); } catch { body = { text: text.slice(0, 1000) }; }

    return NextResponse.json({ upstreamStatus: response.status, body }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'probe_failed', detail: error instanceof Error ? error.message : String(error) }, { status: 502 });
  }
}
