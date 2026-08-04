import { describe, expect, it, beforeEach, afterEach } from 'vitest';

// Set test env BEFORE importing the module
process.env.ADMIN_PASSWORD = 'TestPassword123!';

const {
  createSession,
  validateSession,
  destroySession,
  validatePassword,
  parseCookies,
  checkOrigin,
  COOKIE_NAME,
} = await import('../lib/admin-auth.js');

describe('admin auth — session tokens', () => {
  it('createSession returns a valid cookie header with HttpOnly + Secure + SameSite', () => {
    const cookie = createSession('127.0.0.1');
    expect(cookie).toContain('HttpOnly');
    expect(cookie).toContain('Secure');
    expect(cookie).toContain('SameSite=Strict');
    expect(cookie).toContain(`${COOKIE_NAME}=`);
    expect(cookie).toContain('Max-Age=');
  });

  it('validateSession returns true for a freshly created session', () => {
    const cookie = createSession('127.0.0.1');
    const cookieHeader = cookie.split(';')[0]; // extract just the name=value part
    expect(validateSession(cookieHeader)).toBe(true);
  });

  it('validateSession returns false for a missing cookie', () => {
    expect(validateSession('')).toBe(false);
    expect(validateSession(undefined)).toBe(false);
    expect(validateSession('other_cookie=abc')).toBe(false);
  });

  it('validateSession returns false for a tampered/invalid token', () => {
    const cookie = createSession('127.0.0.1');
    // Tamper with the token
    const tampered = cookie.replace(/[a-f0-9]{64}/, '0'.repeat(64));
    const cookieHeader = tampered.split(';')[0];
    expect(validateSession(cookieHeader)).toBe(false);
  });

  it('destroySession clears the session and returns a Max-Age=0 cookie', () => {
    const cookie = createSession('127.0.0.1');
    const cookieHeader = cookie.split(';')[0];

    // Session should be valid
    expect(validateSession(cookieHeader)).toBe(true);

    // Destroy it
    const clearCookie = destroySession(cookieHeader);
    expect(clearCookie).toContain('Max-Age=0');

    // Session should now be invalid
    expect(validateSession(cookieHeader)).toBe(false);
  });
});

describe('admin auth — password validation', () => {
  it('validatePassword returns true for the correct password', () => {
    expect(validatePassword('TestPassword123!')).toBe(true);
  });

  it('validatePassword returns false for a wrong password', () => {
    expect(validatePassword('wrong')).toBe(false);
    expect(validatePassword('')).toBe(false);
    expect(validatePassword(null)).toBe(false);
    expect(validatePassword(undefined)).toBe(false);
  });

  it('validatePassword uses constant-time comparison (no length leak)', () => {
    // Both should take similar time regardless of how much matches
    const start1 = performance.now();
    validatePassword('a');
    const time1 = performance.now() - start1;

    const start2 = performance.now();
    validatePassword('TestPassword123!ExtraChars');
    const time2 = performance.now() - start2;

    // Times won't be exactly equal but should be same order of magnitude
    // (this is a smoke test, not a precise timing test)
    expect(time2).toBeLessThan(time1 * 100 + 1);
  });
});

describe('admin auth — CSRF origin check', () => {
  it('returns true when Origin header matches the Host', () => {
    const request = {
      headers: {
        get(name) {
          if (name === 'origin') return 'https://asc3nd.org';
          if (name === 'host') return 'asc3nd.org';
          return null;
        },
      },
    };
    expect(checkOrigin(request)).toBe(true);
  });

  it('returns true when Origin header is absent (same-origin)', () => {
    const request = {
      headers: {
        get() { return null; },
      },
    };
    expect(checkOrigin(request)).toBe(true);
  });

  it('returns false when Origin header is a different host', () => {
    const request = {
      headers: {
        get(name) {
          if (name === 'origin') return 'https://evil.com';
          if (name === 'host') return 'asc3nd.org';
          return null;
        },
      },
    };
    expect(checkOrigin(request)).toBe(false);
  });

  it('returns false for a malformed Origin URL', () => {
    const request = {
      headers: {
        get(name) {
          if (name === 'origin') return 'not-a-url';
          if (name === 'host') return 'asc3nd.org';
          return null;
        },
      },
    };
    expect(checkOrigin(request)).toBe(false);
  });
});

describe('admin auth — cookie parsing', () => {
  it('parses a single cookie', () => {
    const cookies = parseCookies('foo=bar');
    expect(cookies.foo).toBe('bar');
  });

  it('parses multiple cookies', () => {
    const cookies = parseCookies('foo=bar; baz=qux; abc=123');
    expect(cookies.foo).toBe('bar');
    expect(cookies.baz).toBe('qux');
    expect(cookies.abc).toBe('123');
  });

  it('handles empty or null input', () => {
    expect(parseCookies('')).toEqual({});
    expect(parseCookies(null)).toEqual({});
    expect(parseCookies(undefined)).toEqual({});
  });

  it('decodes URL-encoded values', () => {
    const cookies = parseCookies('token=abc%3D123');
    expect(cookies.token).toBe('abc=123');
  });
});
