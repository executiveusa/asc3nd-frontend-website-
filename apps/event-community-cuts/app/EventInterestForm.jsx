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
  const [interest, setInterest] = useState('attend');
  const client = useMemo(() => {
    if (!publicKey) return null;
    return new MissionClient({ apiBaseUrl, tenant, publicKey });
  }, []);

  async function submitAttendance(data, form) {
    const preferences = data.getAll('preferences');
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        guardian_name: data.get('name'),
        email: String(data.get('email') || '').trim() || null,
        phone: String(data.get('phone') || '').trim() || null,
        children_count: Number(data.get('childrenCount') || 0),
        age_range: data.get('ageRange') || null,
        requested_service: 'haircut',
        arrival_window: data.get('arrivalWindow') || null,
        preferred_language: preferences.includes('spanish') ? 'es' : 'en',
        accessibility_contact: preferences.includes('accessibility'),
        contact_privately: false,
        company_website: data.get('companyWebsite'),
      }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok === false) {
      throw new Error(result.message || result.error || 'We could not record your attendance interest. Please try again.');
    }

    form.reset();
    setInterest('attend');
    setStatus({
      type: 'success',
      message: result.message || 'Thank you. Check your email or phone for the confirmation step. Your response now feeds the same event dashboard used by the Asc3nd workbook.',
    });
  }

  async function submitCommunityInterest(data, form) {
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const preferences = data.getAll('preferences');

    if (!client) throw new Error('This follow-up form is temporarily unavailable. Please check back shortly.');

    const result = await client.event.rsvp({
      name: data.get('name'),
      email: email || null,
      phone: phone || null,
      consent: data.get('consent') === 'on',
      companyWebsite: data.get('companyWebsite'),
      message: [
        `Community Cuts for Kids interest: ${interest}`,
        preferences.length ? `Requested information: ${preferences.join(', ')}` : '',
      ].filter(Boolean).join('\n'),
      metadata: {
        eventSlug: 'community-cuts-for-kids-2026',
        interest,
        preferences,
        registrationType: 'community-follow-up',
      },
      sourcePage: typeof window !== 'undefined' ? window.location.href : '/',
    });

    form.reset();
    setInterest('attend');
    setStatus({
      type: 'success',
      message: result?.receipt?.message || 'Thank you. Asc3nd received your response and will follow up using the contact information you provided.',
    });
  }

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();

    if (!email && !phone) {
      setStatus({ type: 'error', message: 'Please provide an email address or phone number so Asc3nd can contact you.' });
      return;
    }

    if (interest === 'attend' && Number(data.get('childrenCount') || 0) < 1) {
      setStatus({ type: 'error', message: 'Please enter the number of children you expect to bring.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending your response…' });
    try {
      if (interest === 'attend') await submitAttendance(data, form);
      else await submitCommunityInterest(data, form);
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
          <select name="interest" value={interest} onChange={(event) => setInterest(event.target.value)} required>
            {interestOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
      </div>

      <p className={styles.formNote} id="contact-method-note">Provide at least one contact method: email or phone.</p>

      {interest === 'attend' ? (
        <div className={styles.fieldGrid}>
          <label>
            Number of children attending
            <input name="childrenCount" type="number" inputMode="numeric" min="1" max="10" required />
          </label>
          <label>
            General age range
            <select name="ageRange" defaultValue="mixed">
              <option value="under-6">Under 6</option>
              <option value="6-9">6–9</option>
              <option value="10-13">10–13</option>
              <option value="14-plus">14+</option>
              <option value="mixed">Mixed ages</option>
            </select>
          </label>
          <label>
            Expected arrival
            <select name="arrivalWindow" defaultValue="12-1">
              <option value="12-1">12:00–1:00 PM</option>
              <option value="1-2">1:00–2:00 PM</option>
              <option value="2-3">2:00–3:00 PM</option>
              <option value="unsure">Not sure yet</option>
            </select>
          </label>
        </div>
      ) : null}

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
        {status.type === 'loading' ? 'Sending…' : interest === 'attend' ? 'Tell Asc3nd we plan to attend' : 'Tell Asc3nd I’m interested'}
      </button>

      <p className={styles.formNote}>Do not enter a child’s name, school, health information, story, or other sensitive personal information. Youth participation and media consent are handled separately.</p>
      {status.message ? <p className={`${styles.status} ${styles[status.type] || ''}`} role="status" aria-live="polite">{status.message}</p> : null}
    </form>
  );
}
