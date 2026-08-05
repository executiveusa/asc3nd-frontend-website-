'use client';

import { useState } from 'react';

/**
 * Staff login — Apple-level polish, Steve Krug simplicity.
 *
 * Design tokens (locked ASC3ND palette):
 *   Ink    #050505  (deep black background)
 *   Paper  #F5F1E8  (warm cream text)
 *   Gold   #F5A617  (primary accent / CTA)
 *
 * Patterns adapted from 21st.dev:
 *   - Icon-prefixed input fields (Mail, Lock glyphs)
 *   - Animated Lucide-style spinner on submit
 *   - Generous spacing, rounded card, focus rings
 *   - Subtle entrance animation, no jank
 *
 * Logic is unchanged from the working fix/login-errors build:
 *   POST /api/admin/login-supabase -> set cookie -> hard redirect to /admin.
 *   window.location is used (not router.push) so the new cookie is picked up.
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login-supabase', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Handle non-JSON responses
      let data;
      try {
        data = await res.json();
      } catch {
        setError('Server error. Please try again.');
        setLoading(false);
        return;
      }

      if (data.ok) {
        // Show success state
        setSuccess(true);
        setError('');
        // Use window.location for hard redirect — ensures cookie is picked up
        // (router.push doesn't always work with newly-set cookies in Next.js)
        setTimeout(() => {
          window.location.href = '/admin';
        }, 600);
      } else {
        // Detailed error messages
        const errorMessages = {
          'invalid_credentials': 'Wrong email or password. Please check and try again.',
          'not_staff': 'This account does not have staff access. Contact social@asc3nd.org.',
          'missing_fields': 'Please enter both email and password.',
          'rate_limited': 'Too many login attempts. Please wait a few minutes and try again.',
          'unauthorized': 'Access denied. Contact social@asc3nd.org if you believe this is an error.',
          'invalid_json': 'Server received invalid data. Please try again.',
        };
        setError(errorMessages[data.error] || 'Login failed: ' + (data.error || 'unknown error'));
        if (data.message && !errorMessages[data.error]) {
          setError(prev => prev + ' — ' + data.message);
        }
      }
    } catch (err) {
      setError('Connection error. Check your internet and try again.');
    }
    setLoading(false);
  }

  // ---------- Success screen ----------
  if (success) {
    return (
      <div style={styles.screen}>
        <style>{keyframes}</style>
        <div style={styles.successCard}>
          <div style={styles.successRing}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ animation: 'checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
              <path d="M5 13l4 4L19 7" stroke="#7eea9f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p style={styles.successTitle}>Welcome back</p>
          <p style={styles.successSub}>Opening your dashboard…</p>
          <div style={styles.successDots}>
            <span style={styles.dot} />
            <span style={{ ...styles.dot, animationDelay: '0.15s' }} />
            <span style={{ ...styles.dot, animationDelay: '0.3s' }} />
          </div>
        </div>
      </div>
    );
  }

  // ---------- Login form ----------
  return (
    <div style={styles.screen}>
      <style>{keyframes}</style>
      {/* Ambient gold glow — subtle, premium, never garish */}
      <div style={styles.ambientGlow} aria-hidden="true" />

      <div style={styles.card}>
        {/* Logo + heading */}
        <div style={styles.header}>
          <div style={styles.logoWrap}>
            <img
              src="/images/asc3nd-client-logo-transparent.png"
              alt="ASC3ND Collective"
              style={styles.logo}
            />
          </div>
          <h1 style={styles.heading}>Staff Sign In</h1>
          <p style={styles.subheading}>Manage events and check-ins</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email field with icon */}
          <label style={styles.fieldGroup}>
            <span style={styles.fieldLabel}>Email</span>
            <div style={styles.inputWrap}>
              <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input
                type="email"
                placeholder="you@asc3nd.org"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
                autoComplete="email"
                className="asc3nd-login-input"
                style={styles.input}
              />
            </div>
          </label>

          {/* Password field with icon + show toggle */}
          <label style={styles.fieldGroup}>
            <span style={styles.fieldLabel}>Password</span>
            <div style={styles.inputWrap}>
              <svg style={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="asc3nd-login-input"
                style={{ ...styles.input, paddingRight: '48px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="asc3nd-login-eye"
                style={styles.eyeBtn}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </label>

          {/* Error message */}
          {error && (
            <div style={styles.errorBox} role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span style={styles.errorText}>{error}</span>
            </div>
          )}

          {/* Submit button */}
          <button type="submit" disabled={loading} className="asc3nd-login-submit" style={styles.submitBtn(loading)}>
            {loading ? (
              <>
                <svg style={styles.spinner} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                <span>Signing in…</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Footer help */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Forgot your password?{' '}
            <a href="mailto:social@asc3nd.org" className="asc3nd-login-link" style={styles.footerLink}>social@asc3nd.org</a>
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Design tokens — locked ASC3ND palette
// ============================================================
const INK = '#050505';
const PAPER = '#F5F1E8';
const GOLD = '#F5A617';

// ============================================================
// Keyframe animations (injected once via <style>)
// ============================================================
const keyframes = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes checkPop {
    0%   { transform: scale(0); opacity: 0; }
    60%  { transform: scale(1.15); opacity: 1; }
    100% { transform: scale(1); }
  }
  @keyframes bounceDot {
    0%, 80%, 100% { transform: scale(0.5); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.08); }
  }
  /* Focus + interaction states (can't be done with inline styles) */
  .asc3nd-login-input:focus {
    border-color: ${GOLD} !important;
    box-shadow: 0 0 0 3px rgba(245, 166, 23, 0.15) !important;
    background: #0f0f0f !important;
  }
  .asc3nd-login-input:focus + .asc3nd-login-eye,
  .asc3nd-login-input:focus ~ .asc3nd-login-eye {
    color: #999;
  }
  .asc3nd-login-eye:hover { color: ${GOLD} !important; }
  .asc3nd-login-submit:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px -4px rgba(245, 166, 23, 0.5) !important;
  }
  .asc3nd-login-submit:active:not(:disabled) {
    transform: translateY(0);
  }
  .asc3nd-login-link:hover { text-decoration: underline; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// ============================================================
// Style definitions
// ============================================================
const styles = {
  screen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    minHeight: '100dvh', // dynamic viewport height for mobile
    background: INK,
    fontFamily: 'var(--font-barlow), -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    padding: '24px 16px',
    position: 'relative',
    overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased',
  },

  // Ambient gold glow behind the card
  ambientGlow: {
    position: 'absolute',
    top: '-20%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '600px',
    height: '600px',
    maxWidth: '120vw',
    background: `radial-gradient(circle, ${GOLD}22 0%, transparent 60%)`,
    pointerEvents: 'none',
    animation: 'glowPulse 8s ease-in-out infinite',
  },

  card: {
    position: 'relative',
    width: '100%',
    maxWidth: '380px',
    background: `linear-gradient(180deg, #0d0d0d 0%, #080808 100%)`,
    border: '1px solid rgba(245, 166, 23, 0.12)',
    borderRadius: '24px',
    padding: '40px 28px 28px',
    boxShadow: '0 24px 48px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.02) inset',
    animation: 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
    backdropFilter: 'blur(20px)',
  },

  // ---- Header ----
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logoWrap: {
    width: '72px',
    height: '72px',
    margin: '0 auto 20px',
    borderRadius: '18px',
    background: 'rgba(245, 166, 23, 0.06)',
    border: '1px solid rgba(245, 166, 23, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
  },
  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  heading: {
    color: PAPER,
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 6px',
    letterSpacing: '-0.02em',
  },
  subheading: {
    color: '#8a8a8a',
    fontSize: '15px',
    margin: 0,
    fontWeight: '400',
  },

  // ---- Form ----
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  fieldLabel: {
    color: '#a0a0a0',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    paddingLeft: '4px',
  },
  inputWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    color: '#666',
    pointerEvents: 'none',
    flexShrink: 0,
  },
  input: {
    width: '100%',
    padding: '16px 16px 16px 48px',
    border: '1px solid #2a2a2a',
    borderRadius: '14px',
    fontSize: '16px', // >=16px prevents iOS zoom
    fontFamily: 'inherit',
    background: '#0a0a0a',
    color: PAPER,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
    boxSizing: 'border-box',
  },
  eyeBtn: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    transition: 'color 0.2s',
  },

  // ---- Error box ----
  errorBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    background: 'rgba(220, 38, 38, 0.08)',
    border: '1px solid rgba(220, 38, 38, 0.25)',
    borderRadius: '12px',
    padding: '12px 14px',
    animation: 'fadeInUp 0.3s ease both',
  },
  errorText: {
    color: '#f87171',
    fontSize: '14px',
    lineHeight: '1.45',
    margin: 0,
  },

  // ---- Submit button ----
  submitBtn: (loading) => ({
    width: '100%',
    padding: '16px',
    background: loading ? '#c8860f' : GOLD,
    color: INK,
    border: 'none',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: '700',
    fontFamily: 'inherit',
    cursor: loading ? 'wait' : 'pointer',
    opacity: loading ? 0.8 : 1,
    marginTop: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'transform 0.15s, box-shadow 0.2s, opacity 0.2s',
    boxShadow: loading ? 'none' : '0 4px 16px -4px rgba(245, 166, 23, 0.4)',
    letterSpacing: '0.01em',
  }),
  spinner: {
    animation: 'spin 0.8s linear infinite',
  },

  // ---- Footer ----
  footer: {
    marginTop: '28px',
    textAlign: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #1a1a1a',
  },
  footerText: {
    color: '#666',
    fontSize: '13px',
    margin: 0,
  },
  footerLink: {
    color: GOLD,
    textDecoration: 'none',
    fontWeight: '500',
  },

  // ---- Success screen ----
  successCard: {
    textAlign: 'center',
    animation: 'fadeInUp 0.4s ease both',
  },
  successRing: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'rgba(30, 92, 46, 0.15)',
    border: '2px solid rgba(126, 234, 159, 0.3)',
    margin: '0 auto 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    color: PAPER,
    fontSize: '22px',
    fontWeight: '700',
    margin: '0 0 6px',
    letterSpacing: '-0.02em',
  },
  successSub: {
    color: '#8a8a8a',
    fontSize: '15px',
    margin: '0 0 28px',
  },
  successDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: GOLD,
    display: 'inline-block',
    animation: 'bounceDot 1.4s infinite ease-in-out both',
  },
};
