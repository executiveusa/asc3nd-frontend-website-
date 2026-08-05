'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Staff login — Steve Krug simple. Email + password. One button.
 * Full error handling. Uses window.location for redirect (not router)
 * to ensure the cookie is picked up by the browser.
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

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
        }, 500);
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

  // Success screen
  if (success) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#050505', fontFamily:'system-ui,-apple-system,sans-serif' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ width:'48px', height:'48px', borderRadius:'50%', background:'#1a5c2e', margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#7eea9f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p style={{ color:'#F5F1E8', fontSize:'18px', fontWeight:'600' }}>Signing you in...</p>
          <p style={{ color:'#888', fontSize:'14px', marginTop:'8px' }}>Redirecting to dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#050505', fontFamily:'system-ui,-apple-system,sans-serif' }}>
      <div style={{ maxWidth:'360px', width:'90%', padding:'40px 32px' }}>
        <div style={{ textAlign:'center', marginBottom:'32px' }}>
          <img src="/images/asc3nd-client-logo-transparent.png" alt="ASC3ND" style={{ width:'64px', height:'64px', marginBottom:'16px' }} />
          <h1 style={{ color:'#F5A617', fontSize:'20px', fontWeight:'700', margin:'0 0 8px' }}>ASC3ND Staff</h1>
          <p style={{ color:'#888', fontSize:'14px', margin:0 }}>Sign in to manage events</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required autoFocus
            style={{ width:'100%', padding:'16px', border:'1px solid #333', borderRadius:'6px', fontSize:'16px', background:'#111', color:'#fff', marginBottom:'12px', outline:'none' }} />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required
            style={{ width:'100%', padding:'16px', border:'1px solid #333', borderRadius:'6px', fontSize:'16px', background:'#111', color:'#fff', marginBottom:'20px', outline:'none' }} />
          {error && (
            <div style={{ background:'#3a1515', border:'1px solid #5c1a1a', borderRadius:'6px', padding:'12px 16px', marginBottom:'16px' }}>
              <p style={{ color:'#e88', fontSize:'14px', margin:0, lineHeight:'1.4' }}>{error}</p>
            </div>
          )}
          <button type="submit" disabled={loading}
            style={{ width:'100%', padding:'16px', background:'#F5A617', color:'#050505', border:'none', borderRadius:'6px', fontSize:'16px', fontWeight:'700', cursor:loading?'wait':'pointer', opacity:loading?0.6:1 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p style={{ color:'#555', fontSize:'12px', textAlign:'center', marginTop:'24px' }}>
          Forgot your password? Contact social@asc3nd.org
        </p>
      </div>
    </div>
  );
}
