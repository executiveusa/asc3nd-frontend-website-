/**
 * Session-token auth for the admin portal.
 *
 * Architecture:
 * - Staff POSTs password to /api/admin/login
 * - Server validates against ADMIN_PASSWORD env var
 * - On success, generates a random session token, stores it in-memory,
 *   and sets it as an HttpOnly cookie
 * - All subsequent admin route checks verify the cookie against the store
 * - The password is NEVER sent to the browser
 *
 * The session store is in-memory (resets on cold start, which is fine —
 * staff just logs in again). For persistence across instances, this would
 * need Redis/Upstash, but for a small staff team on one event day, this is
 * sufficient and secure.
 */

import crypto from 'node:crypto';

// In-memory session store: Map<token, { createdAt, ip }>
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const sessions = new Map();

// Clean expired sessions periodically
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of sessions) {
    if (now - session.createdAt > SESSION_TTL_MS) {
      sessions.delete(token);
    }
  }
}, 60 * 60 * 1000); // hourly cleanup

const COOKIE_NAME = 'asc3nd_session';
const COOKIE_TTL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Parse cookies from a request's cookie header.
 */
export function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  for (const part of cookieHeader.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key) cookies[key] = decodeURIComponent(rest.join('='));
  }
  return cookies;
}

/**
 * Create a new session for a validated login.
 * Returns the cookie header value to set.
 */
export function createSession(ip) {
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, {
    createdAt: Date.now(),
    ip: ip || null,
  });
  return `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${Math.floor(COOKIE_TTL / 1000)}; Path=/`;
}

/**
 * Validate a session from a request's cookies.
 * Returns true if the session is valid and not expired.
 */
export function validateSession(cookieHeader) {
  const cookies = parseCookies(cookieHeader);
  const token = cookies[COOKIE_NAME];
  if (!token) return false;

  const session = sessions.get(token);
  if (!session) return false;

  if (Date.now() - session.createdAt > SESSION_TTL_MS) {
    sessions.delete(token);
    return false;
  }

  return true;
}

/**
 * Destroy a session (logout).
 * Returns the cookie header to clear the cookie.
 */
export function destroySession(cookieHeader) {
  const cookies = parseCookies(cookieHeader);
  const token = cookies[COOKIE_NAME];
  if (token) {
    sessions.delete(token);
  }
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/`;
}

/**
 * Check if a password matches the admin password.
 * Uses a constant-time comparison to prevent timing attacks.
 */
export function validatePassword(input) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  if (typeof input !== 'string') return false;

  // Constant-time comparison
  const a = Buffer.from(input);
  const b = Buffer.from(adminPassword);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/**
 * CSRF defense: check that the request Origin matches the expected host.
 * Returns true if the request is from the same origin.
 */
export function checkOrigin(request) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin) return true; // Same-origin requests may omit Origin
  try {
    const url = new URL(origin);
    return url.hostname === host;
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
