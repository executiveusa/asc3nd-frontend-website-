/**
 * Simple in-memory rate limiter.
 * Tracks requests per IP in a sliding window. No external dependencies.
 * Suitable for a single-server Vercel deployment with low-to-moderate traffic.
 * For high traffic, replace with Upstash Redis.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // 5 submissions per IP per window

const store = new Map(); // ip -> array of timestamps

// Periodically clean old entries to prevent memory growth
setInterval(() => {
  const cutoff = Date.now() - WINDOW_MS;
  for (const [ip, timestamps] of store) {
    const fresh = timestamps.filter((t) => t > cutoff);
    if (fresh.length === 0) {
      store.delete(ip);
    } else {
      store.set(ip, fresh);
    }
  }
}, 5 * 60 * 1000); // clean every 5 minutes

/**
 * Check if an IP is allowed to submit. Returns { allowed, remaining, retryAfterMs }.
 * Call this BEFORE processing the request body.
 */
export function checkRateLimit(ip) {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const key = ip || 'unknown';

  const existing = (store.get(key) || []).filter((t) => t > cutoff);

  if (existing.length >= MAX_REQUESTS) {
    const oldest = Math.min(...existing);
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: oldest + WINDOW_MS - now,
    };
  }

  existing.push(now);
  store.set(key, existing);

  return {
    allowed: true,
    remaining: MAX_REQUESTS - existing.length,
    retryAfterMs: 0,
  };
}

/** Extract the client IP from a Next.js request */
export function getClientIp(request) {
  const headers = request.headers;
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') ||
    null
  );
}
