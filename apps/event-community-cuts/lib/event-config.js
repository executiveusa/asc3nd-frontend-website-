/**
 * Event configuration for Community Cuts for Kids.
 * Single source of truth for event status, capacity, and deadlines.
 * The RSVP route checks these before accepting a submission.
 */

export const EVENT_CONFIG = Object.freeze({
  slug: 'community-cuts-2026',
  title: 'Community Cuts for Kids — Fresh Fade, Fresh Grade',

  // Event date/time (used for auto-close). ISO format.
  eventStart: '2026-08-30T12:00:00-07:00', // 12 PM Pacific, Aug 30 2026
  eventEnd: '2026-08-30T15:00:00-07:00', // 3 PM Pacific

  // RSVP deadline: stop accepting new RSVPs after this time.
  // Set to 1 hour before event start so staff has time to prepare.
  rsvpDeadline: '2026-08-30T11:00:00-07:00',

  // Max total family RSVPs. null = unlimited (capacity tracked by venue, not us).
  // Tangles & Locs is a barbershop — capacity is limited. Set a sane ceiling.
  maxRsvps: 200,

  // Grace period: allow RSVPs even after deadline if capacity isn't met (minutes)
  lateGraceMinutes: 0,
});

/**
 * Check if RSVPs are still open.
 * Returns { open, reason } where reason explains why if closed.
 */
export function checkEventStatus(now = new Date()) {
  const deadline = new Date(EVENT_CONFIG.rsvpDeadline);

  if (now > deadline) {
    return {
      open: false,
      reason: 'event_closed',
      message: 'RSVP is closed for this event.',
    };
  }

  return { open: true, reason: null, message: null };
}

/**
 * Check if capacity has been reached.
 * @param {number} currentCount - current number of RSVPs in the DB
 */
export function checkCapacity(currentCount) {
  if (EVENT_CONFIG.maxRsvps === null) return { hasRoom: true, remaining: Infinity };
  const remaining = EVENT_CONFIG.maxRsvps - currentCount;
  return {
    hasRoom: remaining > 0,
    remaining: Math.max(0, remaining),
  };
}
