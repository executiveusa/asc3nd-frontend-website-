'use client';

import { useMemo, useState } from 'react';
import { MissionClient } from '@asc3nd/mission-sdk-js';
import styles from './event.module.css';

const apiBaseUrl = process.env.NEXT_PUBLIC_MISSION_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const tenant = process.env.NEXT_PUBLIC_MISSION_TENANT || 'asc3nd';
const publicKey = process.env.NEXT_PUBLIC_MISSION_PUBLIC_KEY || '';

const interestOptions = [
  ['attend', 'I plan to attend with my family'],
  ['updates', 'Send me event updates'],
  ['volunteer', 'I want to volunteer'],
  ['mentor', 'I want to learn about mentoring'],
  ['supplies', 'I want to donate school supplies'],
  ['sponsor', 'I want to sponsor or support the event'],
  ['partner', 'I want to become a community partner'],
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
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const preferences = data.getAll('preferences');

    if (!email && !phone) {
      setStatus({
        type: 'error',
        message: 'Please provide an email address or phone number so Asc3nd can send event updates.',
      });
      return;
    }

    const payload = {
      name: data.get('name'),
      email: email || null,
      phone: phone || null,
      consent: data.get('consent') === 'on',
      companyWebsite: data.get('companyWebsite'),
      message: [
        `Community Cuts for Kids interest: ${interest}`,
        groupSize ? `Estimated group size: ${groupSize}` : '',
        preferences.length ? `Requested information: ${preferences.join(', ')}` : '',
      ].filter(Boolean).join('\n'),
      metadata: {
        eventSlug: 'community-cuts-for-kids-2026',
        interest,
        groupSize: groupSize || null,
        preferences,
        registrationType: 'demand-signal-only',
      },
      sourcePage: typeof window !== 'undefined' ? window.location.href : '/',
    };

    if (!client) {
      setStatus({
        type: 'error',
        message: 'The event form is temporarily unavailable. Please check back shortly.',
      });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending your response…' });
    try {
      const result = await client.event.rsvp(payload);
      form.reset();
      setStatus({
        type: 'success',
        message: result?.receipt?.message || 'Thank you. Asc3nd received your response and will send event updates using the contact information you provided.',
      });
    } catch (error) {
      setStatus({ type: 'error', message: error?.message || 'We could not send your response. Please try again.' });
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
          <input name="email" type="email" autoComplete="email" aria-describedby="contact-method-note" />
        </label>
      </div>

      <div className={styles.fieldGrid}>
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" placeholder="Optional if you provide email" aria-describedby="contact-method-note" />
        </label>
        <label>
          I’m interested in
          <select name="interest" defaultValue="attend" required>
            {interestOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
      </div>

      <p className={styles.formNote} id="contact-method-note">Provide at least one contact method: email or phone.</p>

      <label>
        Estimated group size
        <input name="groupSize" inputMode="numeric" pattern="[0-9]*" placeholder="Optional — no names or ages needed" />
      </label>

      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend style={{ fontSize: '0.88rem', fontWeight: 800, marginBottom: '10px' }}>Send me information about</legend>
        <div style={{ display: 'grid', gap: '10px' }}>
          <label className={styles.consent}>
            <input name="preferences" type="checkbox" value="accessibility" />
            <span>Accessibility and arrival information</span>
          </label>
          <label className={styles.consent}>
            <input name="preferences" type="checkbox" value="spanish" />
            <span>Spanish-language updates</span>
          </label>
          <label className={styles.consent}>
            <input name="preferences" type="checkbox" value="volunteer" />
            <span>Volunteer opportunities</span>
          </label>
          <label className={styles.consent}>
            <input name="preferences" type="checkbox" value="supplies" />
            <span>School-supply donation details</span>
          </label>
        </div>
      </fieldset>

      <div style={{ borderLeft: '3px solid #f5a617', padding: '14px 16px', background: '#fff8e9', color: '#3b3328', lineHeight: 1.55 }}>
        <strong>This is an interest form, not a reservation.</strong>
        <div>Haircuts, supplies, food, and giveaways are first come, first served and available while capacity and supplies last.</div>
      </div>

      <label className={styles.consent}>
        <input name="consent" type="checkbox" required />
        <span>I agree that Asc3nd Collective may contact me about this event and the participation option I selected.</span>
      </label>

      <button className={styles.primaryButton} type="submit" disabled={status.type === 'loading'}>
        {status.type === 'loading' ? 'Sending…' : 'Tell Asc3nd I’m interested'}
      </button>

      <p className={styles.formNote}>Do not enter a child’s name, age, school, health information, story, or other sensitive personal information. Youth participation and media consent are handled separately.</p>
      {status.message ? <p className={`${styles.status} ${styles[status.type] || ''}`} role="status" aria-live="polite">{status.message}</p> : null}
    </form>
  );
}
