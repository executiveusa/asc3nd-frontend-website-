/**
 * Admin API — POST handles all admin actions via a JSON body action field.
 * Password-protected via ADMIN_PASSWORD env var (passed as ?p= or Authorization header).
 *
 * Actions:
 *   { action: "delete", id, confirmName }     — delete RSVP (double verification)
 *   { action: "status", id, status }           — update RSVP status
 *   { action: "notes", id, notes }             — update staff notes
 *   { action: "checkin-lookup", code }         — find RSVP by confirmation code
 *   { action: "checkin-name", name }           — search RSVPs by name
 *   { action: "checkin-mark", id }             — mark RSVP as ATTENDED
 */
import {
  deleteRsvp,
  updateRsvpStatus,
  updateRsvpNotes,
  findRsvpByConfirmationCode,
  findRsvpsByName,
  countByStatus,
} from '../../../lib/supabase-server.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function json(body, status) {
  return Response.json(body, { status, headers: { 'cache-control': 'no-store' } });
}

function checkAuth(request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  const url = new URL(request.url);
  if (url.searchParams.get('p') === adminPassword) return true;
  const auth = request.headers.get('authorization');
  if (auth === `Bearer ${adminPassword}`) return true;
  return false;
}

export async function POST(request) {
  if (!checkAuth(request)) return json({ ok: false, error: 'unauthorized' }, 401);

  let input;
  try {
    input = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  const { action } = input;

  try {
    switch (action) {
      // ── DELETE with double verification ──
      case 'delete': {
        if (!input.id || !input.confirmName) {
          return json({ ok: false, error: 'missing_fields' }, 400);
        }
        // First, fetch the RSVP to verify the name matches
        const { findRsvpById } = await import('../../../lib/supabase-server.js');
        const existing = await findRsvpById(input.id);
        if (!existing) return json({ ok: false, error: 'not_found' }, 404);

        // Double verification: typed name must match guardian_name (case-insensitive)
        if (input.confirmName.trim().toLowerCase() !== existing.guardian_name.trim().toLowerCase()) {
          return json({ ok: false, error: 'name_mismatch', message: 'The name you typed does not match.' }, 403);
        }

        const deleted = await deleteRsvp(input.id);
        return json({ ok: true, deleted: deleted });
      }

      // ── UPDATE STATUS ──
      case 'status': {
        if (!input.id || !input.status) {
          return json({ ok: false, error: 'missing_fields' }, 400);
        }
        const updated = await updateRsvpStatus(input.id, input.status);
        return json({ ok: true, rsvp: updated });
      }

      // ── UPDATE STAFF NOTES ──
      case 'notes': {
        if (!input.id) {
          return json({ ok: false, error: 'missing_fields' }, 400);
        }
        const updated = await updateRsvpNotes(input.id, input.notes || '');
        return json({ ok: true, rsvp: updated });
      }

      // ── CHECK-IN: lookup by confirmation code ──
      case 'checkin-lookup': {
        if (!input.code) return json({ ok: false, error: 'missing_code' }, 400);
        const rsvp = await findRsvpByConfirmationCode(input.code.trim());
        if (!rsvp) return json({ ok: false, error: 'not_found', message: 'No RSVP found with that code.' }, 404);
        return json({ ok: true, rsvp });
      }

      // ── CHECK-IN: search by name ──
      case 'checkin-name': {
        if (!input.name || input.name.trim().length < 2) {
          return json({ ok: false, error: 'name_too_short' }, 400);
        }
        const results = await findRsvpsByName(input.name.trim());
        return json({ ok: true, results });
      }

      // ── CHECK-IN: mark as attended ──
      case 'checkin-mark': {
        if (!input.id) return json({ ok: false, error: 'missing_id' }, 400);
        const updated = await updateRsvpStatus(input.id, 'ATTENDED');
        return json({ ok: true, rsvp: updated });
      }

      // ── STATS ──
      case 'stats': {
        const stats = await countByStatus();
        return json({ ok: true, stats });
      }

      default:
        return json({ ok: false, error: 'unknown_action' }, 400);
    }
  } catch (err) {
    return json({ ok: false, error: err.message || 'server_error' }, 500);
  }
}
