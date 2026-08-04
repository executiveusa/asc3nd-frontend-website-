/**
 * Health check endpoint — pinged by Vercel Cron daily to keep
 * the Supabase free-tier project awake (it pauses after 7 days
 * of inactivity). Also useful for uptime monitoring.
 *
 * Does a trivial DB query so the Supabase connection stays warm.
 */
import { countRsvps } from '../../../lib/supabase-server.js';
import { checkEventStatus } from '../../../lib/event-config.js';

export const runtime = 'nodejs';

export async function GET() {
  const started = Date.now();
  const status = {
    ok: true,
    timestamp: new Date().toISOString(),
    event: checkEventStatus(),
    uptime_check: true,
  };

  // Ping the database so Supabase doesn't sleep
  try {
    status.rsvpCount = await countRsvps();
    status.db = 'connected';
  } catch (err) {
    status.db = 'error';
    status.dbError = err.code || 'unknown';
    // Don't fail the health check on DB error — we still want the
    // cron to succeed so Vercel doesn't disable it. Just report it.
  }

  status.responseTimeMs = Date.now() - started;

  return Response.json(status, {
    headers: { 'cache-control': 'no-store' },
  });
}
