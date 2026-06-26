'use client';

import { useMemo, useState } from 'react';
import { MissionClient } from '@asc3nd/mission-sdk-js';

const apiBaseUrl = process.env.NEXT_PUBLIC_MISSION_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const tenant = process.env.NEXT_PUBLIC_MISSION_TENANT || 'asc3nd';
const publicKey = process.env.NEXT_PUBLIC_MISSION_PUBLIC_KEY || '';

const forms = {
  volunteer: {
    title: 'Volunteer with us',
    eyebrow: 'Give time',
    body: 'Tell us how you want to support youth. The Mission OS bridge routes this into the volunteer pipeline for staff follow-up.',
    button: 'Send volunteer interest',
    consent: false,
    fields: ['name', 'email', 'phone', 'organization', 'message']
  },
  'program-application': {
    title: 'Ask about programs',
    eyebrow: 'Youth + families',
    body: 'Parents, guardians, schools, and partners can ask about education support, mentorship, wellness, and youth leadership pathways.',
    button: 'Request program info',
    consent: true,
    fields: ['name', 'email', 'phone', 'organization', 'message']
  },
  'donation-intent': {
    title: 'Support the mission',
    eyebrow: 'Donors + sponsors',
    body: 'Start a donor, sponsor, or community partner conversation. Staff will follow up before any commitment is made.',
    button: 'Start donor conversation',
    consent: false,
    fields: ['name', 'email', 'phone', 'organization', 'message']
  }
};

export function Asc3ndPublicForms({ defaultKind = 'volunteer' }) {
  const [kind, setKind] = useState(defaultKind);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const current = forms[kind] || forms.volunteer;
  const client = useMemo(() => {
    if (!publicKey) return null;
    return new MissionClient({ apiBaseUrl, tenant, publicKey });
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    payload.consent = payload.consent === 'on';
    payload.sourcePage = typeof window !== 'undefined' ? window.location.href : 'asc3nd-public-landing';

    if (!client) {
      setStatus({ type: 'error', message: 'This public form is designed for Mission OS. Add NEXT_PUBLIC_MISSION_PUBLIC_KEY to enable live submissions.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending to Asc3nd Mission OS…' });
    try {
      const res = await client.submit(kind, payload);
      form.reset();
      setStatus({ type: 'success', message: res?.receipt?.message || 'Received. Asc3nd staff will review this.' });
    } catch (error) {
      setStatus({ type: 'error', message: error?.message || 'Submission failed. Please try again.' });
    }
  }

  return (
    <div className="a3-form-card" id="volunteer">
      <div className="a3-form-tabs" role="tablist" aria-label="Ways to connect with Asc3nd">
        {Object.entries(forms).map(([value, item]) => (
          <button key={value} type="button" className={kind === value ? 'active' : ''} onClick={() => setKind(value)}>
            {item.eyebrow}
          </button>
        ))}
      </div>
      <div className="a3-form-copy">
        <span className="a3-kicker">{current.eyebrow}</span>
        <h3>{current.title}</h3>
        <p>{current.body}</p>
      </div>
      <form className="a3-public-form" onSubmit={onSubmit}>
        <input type="text" name="companyWebsite" tabIndex="-1" autoComplete="off" aria-hidden="true" className="a3-honeypot" />
        <div className="a3-field-grid">
          <label>Name<input required name="name" placeholder="Your name" /></label>
          <label>Email<input name="email" type="email" placeholder="you@example.org" /></label>
        </div>
        <div className="a3-field-grid">
          <label>Phone<input name="phone" placeholder="Optional" /></label>
          <label>Organization<input name="organization" placeholder="School, company, church, team…" /></label>
        </div>
        <label>How can we help?<textarea required name="message" placeholder="Tell us what you are interested in." /></label>
        {current.consent ? (
          <label className="a3-check"><input name="consent" type="checkbox" required /> I understand Asc3nd staff will review this inquiry and follow up before any youth participation details are confirmed.</label>
        ) : null}
        <button className="a3-button a3-button-gold" type="submit" disabled={status.type === 'loading'}>{status.type === 'loading' ? 'Sending…' : current.button}</button>
        {status.message ? <p className={`a3-form-status ${status.type}`}>{status.message}</p> : null}
      </form>
    </div>
  );
}
