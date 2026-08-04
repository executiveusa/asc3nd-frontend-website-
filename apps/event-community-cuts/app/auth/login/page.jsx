'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Staff login — Steve Krug simple. Email + password. One button.
 * Uses raw fetch to our own /api/admin/login-supabase route (no client library).
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
      const data = await res.json();

      if (data.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error === 'invalid_credentials' ? 'Wrong email or password.' : 'Login failed.');
      }
    } catch {
      setError('Connection error.');
    }
    setLoading(false);
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
          {error && <p style={{ color:'#c55', fontSize:'14px', marginBottom:'12px' }}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{ width:'100%', padding:'16px', background:'#F5A617', color:'#050505', border:'none', borderRadius:'6px', fontSize:'16px', fontWeight:'700', cursor:loading?'wait':'pointer', opacity:loading?0.6:1 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
