'use client';

import { useState } from 'react';
import styles from './holding.module.css';

export default function HoldingSignupForm() {
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const consent = data.get('consent') === 'on';

    if (!name || !email || !consent) {
      setStatus({ type: 'error', message: 'Please add your name and email, then confirm you want ASC3ND updates.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Joining…' });

    const idempotencyKey = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `holding-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    try {
      const response = await fetch('/api/participation', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: null,
          participation: 'general',
          updates: [],
          preferred_language: 'en',
          consent,
          company_website: String(data.get('companyWebsite') || ''),
          source_path: '/',
          idempotency_key: idempotencyKey,
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok === false) {
        throw new Error('submission_failed');
      }

      form.reset();
      setStatus({ type: 'success', message: 'You’re on the list. We’ll keep you posted.' });
    } catch {
      setStatus({ type: 'error', message: 'We couldn’t save your information. Please try again.' });
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <input
        className={styles.honeypot}
        type="text"
        name="companyWebsite"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />
      <div className={styles.fields}>
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label className={styles.consent}>
        <input name="consent" type="checkbox" required />
        <span>Keep me updated about ASC3ND programs, events, and opportunities.</span>
      </label>
      <button type="submit" disabled={status.type === 'loading'}>
        {status.type === 'loading' ? 'Joining…' : 'Keep Me Updated'}
      </button>
      {status.message ? (
        <p className={`${styles.status} ${styles[status.type] || ''}`} role={status.type === 'error' ? 'alert' : 'status'}>
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
