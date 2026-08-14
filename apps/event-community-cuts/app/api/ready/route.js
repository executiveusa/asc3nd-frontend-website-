import { countRsvps } from '../../../lib/supabase-server.js';
import { checkEventStatus } from '../../../lib/event-config.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const started = Date.now();

  try {
    await countRsvps();

    return Response.json(
      {
        ok: true,
        ready: true,
        timestamp: new Date().toISOString(),
        event: checkEventStatus(),
        db: 'connected',
        responseTimeMs: Date.now() - started,
      },
      {
        status: 200,
        headers: { 'cache-control': 'no-store' },
      },
    );
  } catch (err) {
    return Response.json(
      {
        ok: false,
        ready: false,
        timestamp: new Date().toISOString(),
        event: checkEventStatus(),
        db: 'error',
        dbError: err?.code || 'unknown',
        responseTimeMs: Date.now() - started,
      },
      {
        status: 503,
        headers: { 'cache-control': 'no-store' },
      },
    );
  }
}
