'use client';

import { useMemo, useState } from 'react';
import { MissionClient } from '@asc3nd/mission-sdk-js';
import styles from './event.module.css';

const apiBaseUrl = process.env.NEXT_PUBLIC_MISSION_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const tenant = process.env.NEXT_PUBLIC_MISSION_TENANT || 'asc3nd';
const publicKey = process.env.NEXT_PUBLIC_MISSION_PUBLIC_KEY || '';

const interestOptions = [
  ['attend', 'Attend with my family'],
  ['updates', 'Get event updates'],
  ['volunteer', 'Volunteer'],
  ['mentor', 'Learn about mentoring'],
  ['supplies', 'Donate school supplies'],
  ['sponsor', 'Sponsor or support the event'],
  ['partner', 'Become a community partner'],
];

export function EventInterestForm() {
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const client = useMemo(() => {
    if (!publicKey) return null;
    return new MissionClient({ apiBaseUrl, tenant, publicKey });
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const interest = data.get('interest');
    const groupSize = data.get('groupSize');
    const note = data.get('note');

    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      consent: data.get('consent') === 'on',
      companyWebsite: data.get('companyWebsite'),
      message: [
        `Community Cuts for Kids interest: ${interest}`,
        groupSize ? `Estimated group size: ${groupSize}` : '',
        note ? `Note: ${note}` : '',
      ].filter(Boolean).join('\n'),
      metadata: {
        eventSlug: 'community-cuts-for-kids-2026',
        interest,
        groupSize: groupSize || null,
      },
      sourcePage: typeof window !== 'undefined' ? window.location.href : '/',
    };

    if (!client) {
      setStatus({
        type: 'error',
        message: 'Event interest is not connected yet. This preview is waiting on the verified Asc3nd Mission OS public form configuration.',
      });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending…' });
    try {
      const result = await client.event.rsvp(payload);
      form.reset();
      setStatus({ type: 'success', message: result?.receipt?.message || 'Received. Asc3nd staff will follow up.' });
    } catch (error) {
      setStatus({ type: 'error', message: error?.message || 'We could not send this yet. Please try again.' });
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input className={styles.honeypot} type="text" name="companyWebsite" tabIndex="-1" autoComplete="off" aria-hidden="true" />

      <div className={styles.fieldGrid}>
        <label>
          Your name
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" />
        </label>
      </div>

      <div className={styles.fieldGrid}>
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
        </label>
        <label>
          I’m interested in
          <select name="interest" defaultValue="updates" required>
            {interestOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
      </div>

      <label>
        Estimated group size
        <input name="groupSize" inputMode="numeric" pattern="[0-9]*" placeholder="Optional — no names or ages needed" />
      </label>

      <label>
        Anything Asc3nd should know?
        <textarea name="note" rows="4" placeholder="Optional" />
      </label>

      <label className={styles.consent}>
        <input name="consent" type="checkbox" required />
        <span>I agree that Asc3nd Collective may contact me about this event and related ways to get involved.</span>
      </label>

      <button className={styles.primaryButton} type="submit" disabled={status.type === 'loading'}>
        {status.type === 'loading' ? 'Sending…' : 'Get event updates'}
      </button>

      <p className={styles.formNote}>This form does not ask for children’s names, ages, stories, or other sensitive youth information.</p>
      {status.message ? <p className={`${styles.status} ${styles[status.type] || ''}`} role="status">{status.message}</p> : null}
    </form>
  );
}
