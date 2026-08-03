'use client';

import { useState } from 'react';
import {
  buildAttendancePayload,
  buildSupporterPayload,
  normalizeParticipation,
} from './event-form-contract.js';
import styles from './event.module.css';

const apiFieldToControl = Object.freeze({
  guardian_name: 'name',
  name: 'name',
  email: 'email',
  phone: 'phone',
  children_count: 'childrenCount',
  age_range: 'ageGroup',
  arrival_window: 'arrivalWindow',
  participation: 'participation',
  consent: 'consent',
});

function fieldErrorId(name) {
  return `${name}-error`;
}

function describedBy(...ids) {
  return ids.filter(Boolean).join(' ') || undefined;
}

function focusFirstInvalid(form, controlNames) {
  const firstName = controlNames.find(Boolean);
  if (!firstName) return;
  requestAnimationFrame(() => form.elements.namedItem(firstName)?.focus());
}

function mapServerErrors(fields, t) {
  const errors = {};
  for (const issue of fields || []) {
    const control = apiFieldToControl[issue?.field];
    if (!control || errors[control]) continue;
    if (control === 'name') errors[control] = t.errors.name;
    else if (control === 'email' && issue.code === 'invalid') errors[control] = t.errors.email;
    else if (control === 'phone' && issue.code === 'invalid') errors[control] = t.errors.phone;
    else if (control === 'email' || control === 'phone') errors[control] = t.errors.contact;
    else if (control === 'childrenCount') errors[control] = t.errors.children;
    else if (control === 'ageGroup') errors[control] = t.errors.ageGroup;
    else if (control === 'consent') errors[control] = t.errors.consent;
    else errors[control] = t.errors.generic;
  }
  return errors;
}

function FieldError({ name, message }) {
  if (!message) return null;
  return <span className={styles.fieldError} id={fieldErrorId(name)}>⚠ {message}</span>;
}

export function EventInterestForm({ copy: t, locale = 'en', initialInterest = 'attend' }) {
  const [participation, setParticipation] = useState(() => normalizeParticipation(initialInterest));
  const [status, setStatus] = useState({ type: 'idle', message: '', confirmationCode: null });
  const [fieldErrors, setFieldErrors] = useState({});
  const [idempotencyKey] = useState(() => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `k-${Date.now()}-${Math.random().toString(36).slice(2)}`));
  const isAttendance = participation === 'attend';

  function selectParticipation(event) {
    setParticipation(normalizeParticipation(event.target.value));
    setStatus({ type: 'idle', message: '', confirmationCode: null });
    setFieldErrors({});
  }

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = {};
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();

    if (!String(data.get('name') || '').trim()) nextErrors.name = t.errors.name;
    if (!email && !phone) {
      nextErrors.email = t.errors.contact;
      nextErrors.phone = t.errors.contact;
    }
    if (isAttendance && Number(data.get('childrenCount') || 0) < 1) {
      nextErrors.childrenCount = t.errors.children;
    }
    if (isAttendance && !data.get('ageGroup')) nextErrors.ageGroup = t.errors.ageGroup;
    if (data.get('consent') !== 'on') nextErrors.consent = t.errors.consent;

    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      setStatus({ type: 'error', message: t.errors.review, confirmationCode: null });
      focusFirstInvalid(form, Object.keys(nextErrors));
      return;
    }

    setFieldErrors({});
    setStatus({ type: 'loading', message: t.sending, confirmationCode: null });

    const endpoint = isAttendance ? '/api/rsvp' : '/api/participation';
    const payload = isAttendance
      ? buildAttendancePayload(data, locale, idempotencyKey)
      : buildSupporterPayload(
        data,
        locale,
        `${window.location.pathname}${window.location.search}`,
        idempotencyKey,
      );

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.ok === false) {
        const serverErrors = mapServerErrors(result.fields, t);
        setFieldErrors(serverErrors);
        if (Object.keys(serverErrors).length) {
          focusFirstInvalid(form, Object.keys(serverErrors));
        }
        const unavailable = ['supporter_service_unavailable', 'supporter_submission_failed'].includes(result.error);
        setStatus({
          type: 'error',
          message: unavailable ? t.errors.unavailable : t.errors.generic,
          confirmationCode: null,
        });
        return;
      }

      form.reset();
      setParticipation(isAttendance ? 'attend' : participation);
      setFieldErrors({});
      setStatus({
        type: 'success',
        message: isAttendance ? t.success.attendance : t.success.supporter,
        confirmationCode: isAttendance ? result.confirmation_code || null : null,
      });
    } catch {
      setStatus({
        type: 'error',
        message: isAttendance ? t.errors.generic : t.errors.unavailable,
        confirmationCode: null,
      });
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

      <div className={styles.fieldGrid}>
        <label>
          {t.name}
          <input
            name="name"
            required
            autoComplete="name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? fieldErrorId('name') : undefined}
          />
          <FieldError name="name" message={fieldErrors.name} />
        </label>
        <label>
          {t.email}
          <input
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={describedBy('contact-method-note', fieldErrors.email && fieldErrorId('email'))}
          />
          <FieldError name="email" message={fieldErrors.email} />
        </label>
      </div>

      <div className={styles.fieldGrid}>
        <label>
          {t.phone}
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t.phonePlaceholder}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={describedBy('contact-method-note', fieldErrors.phone && fieldErrorId('phone'))}
          />
          <FieldError name="phone" message={fieldErrors.phone} />
        </label>
        <label>
          {t.participation}
          <select name="participation" value={participation} onChange={selectParticipation}>
            {t.participationOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>
      <p className={styles.formNote} id="contact-method-note">{t.contactHelp}</p>

      {isAttendance ? (
        <fieldset className={styles.formGroup}>
          <legend className={styles.srOnly}>{t.familyGroupLegend}</legend>
          <div className={styles.fieldGrid}>
            <label>
              {t.children}
              <input
                name="childrenCount"
                type="number"
                inputMode="numeric"
                min="1"
                max="10"
                required
                aria-invalid={Boolean(fieldErrors.childrenCount)}
                aria-describedby={fieldErrors.childrenCount ? fieldErrorId('childrenCount') : undefined}
              />
              <FieldError name="childrenCount" message={fieldErrors.childrenCount} />
            </label>
            <label>
              {t.ageGroup}
              <select
                name="ageGroup"
                defaultValue="mixed-ages"
                required
                aria-invalid={Boolean(fieldErrors.ageGroup)}
                aria-describedby={fieldErrors.ageGroup ? fieldErrorId('ageGroup') : undefined}
              >
                {t.ageGroupOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <FieldError name="ageGroup" message={fieldErrors.ageGroup} />
            </label>
          </div>
          <label>
            {t.arrival}
            <select name="arrivalWindow" defaultValue="12-1" aria-describedby="arrival-help">
              {t.arrivalOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <p className={styles.formNote} id="arrival-help">{t.arrivalHelp}</p>
        </fieldset>
      ) : null}

      <fieldset className={styles.formGroup}>
        <legend>{t.updates}</legend>
        <div className={styles.checkboxGrid}>
          {t.updateOptions.map((option) => (
            <label className={styles.consent} key={option.value}>
              <input name="updates" type="checkbox" value={option.value} />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.formNotice}>
        <strong>{t.reservationTitle}</strong>
        <p>{t.reservationBody}</p>
      </div>

      <label className={styles.consent}>
        <input
          name="consent"
          type="checkbox"
          required
          aria-invalid={Boolean(fieldErrors.consent)}
          aria-describedby={fieldErrors.consent ? fieldErrorId('consent') : undefined}
        />
        <span>
          {t.consent}
          <FieldError name="consent" message={fieldErrors.consent} />
        </span>
      </label>

      <button className={styles.primaryButton} type="submit" disabled={status.type === 'loading'}>
        {status.type === 'loading' ? t.sending : t.submitLabels[participation]}
      </button>

      <p className={styles.formNote}>{t.privacyFooter}</p>
      {status.message ? (
        <div
          className={`${styles.status} ${styles[status.type] || ''}`}
          role={status.type === 'error' ? 'alert' : 'status'}
          aria-live={status.type === 'error' ? 'assertive' : 'polite'}
          tabIndex={status.type === 'success' ? '-1' : undefined}
        >
          <strong>{status.message}</strong>
          {status.confirmationCode ? (
            <span className={styles.confirmationCode}>
              {t.success.confirmationCode}: {status.confirmationCode}
            </span>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
