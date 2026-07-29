'use client';

import { useMemo, useState } from 'react';

// Fixture records intentionally mirror the verified redacted RSVP adapter.
// No email, phone, surname, child name, school, health data, volunteer,
// sponsor, partner, assignment, or private-note fields are represented here.
const registrations = [
  { id: 1, first_name: 'Maria', children_count: 2, age_range: '5-8', requested_service: 'haircut', arrival_window: '12-1', preferred_language: 'es', accessibility_contact: false, status: 'NEW', source: 'printed-flyer', created_at: '2026-07-28T18:20:00Z', updated_at: '2026-07-28T18:20:00Z' },
  { id: 2, first_name: 'Jordan', children_count: 3, age_range: '9-12', requested_service: 'haircut', arrival_window: '1-2', preferred_language: 'en', accessibility_contact: false, status: 'ATTENDANCE_CONFIRMED', source: 'website', created_at: '2026-07-27T16:10:00Z', updated_at: '2026-07-29T15:42:00Z' },
  { id: 3, first_name: 'Lucía', children_count: 1, age_range: '13-17', requested_service: 'trim', arrival_window: '2-3', preferred_language: 'es', accessibility_contact: true, status: 'FOLLOWUP_REQUIRED', source: 'qr-code', created_at: '2026-07-27T09:05:00Z', updated_at: '2026-07-29T14:18:00Z' },
  { id: 4, first_name: 'Tanya', children_count: 2, age_range: '5-8', requested_service: 'fade', arrival_window: '12-1', preferred_language: 'en', accessibility_contact: false, status: 'NEW', source: 'instagram', created_at: '2026-07-26T21:30:00Z', updated_at: '2026-07-26T21:30:00Z' },
  { id: 5, first_name: 'Andre', children_count: 1, age_range: '0-4', requested_service: 'unsure', arrival_window: 'unsure', preferred_language: 'en', accessibility_contact: false, status: 'NEEDS_REVIEW', source: 'website', created_at: '2026-07-26T17:44:00Z', updated_at: '2026-07-28T12:00:00Z' },
  { id: 6, first_name: 'Rosa', children_count: 2, age_range: '9-12', requested_service: 'lineup', arrival_window: '1-2', preferred_language: 'es', accessibility_contact: false, status: 'WAITLISTED', source: 'printed-flyer', created_at: '2026-07-25T20:15:00Z', updated_at: '2026-07-29T11:22:00Z' }
];

const filters = ['All', 'New', 'Confirmed', 'Needs attention', 'Waitlisted', 'Spanish'];

function displayStatus(status) {
  return status.toLowerCase().replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function nextAction(record) {
  if (record.status === 'FOLLOWUP_REQUIRED') return 'Complete the required follow-up.';
  if (record.status === 'NEEDS_REVIEW') return 'Review the registration details.';
  if (record.status === 'WAITLISTED') return 'Keep the family informed about capacity.';
  if (record.status === 'NEW') return 'Review and confirm attendance status.';
  return 'No immediate action required.';
}

export default function Page() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(registrations[0]);
  const [query, setQuery] = useState('');

  const visible = useMemo(() => registrations.filter((record) => {
    const matchesFilter = filter === 'All'
      || (filter === 'New' && record.status === 'NEW')
      || (filter === 'Confirmed' && record.status === 'ATTENDANCE_CONFIRMED')
      || (filter === 'Needs attention' && ['FOLLOWUP_REQUIRED', 'NEEDS_REVIEW'].includes(record.status))
      || (filter === 'Waitlisted' && record.status === 'WAITLISTED')
      || (filter === 'Spanish' && record.preferred_language === 'es');
    return matchesFilter && record.first_name.toLowerCase().includes(query.toLowerCase());
  }), [filter, query]);

  const stats = {
    registrations: registrations.length,
    children: registrations.reduce((sum, record) => sum + record.children_count, 0),
    confirmed: registrations.filter((record) => record.status === 'ATTENDANCE_CONFIRMED').length,
    waitlisted: registrations.filter((record) => record.status === 'WAITLISTED').length,
    attention: registrations.filter((record) => ['FOLLOWUP_REQUIRED', 'NEEDS_REVIEW'].includes(record.status)).length
  };

  return (
    <main>
      <header className="topbar">
        <div>
          <p className="eyebrow">ASC3ND · PRIVATE OPERATIONS</p>
          <h1>Community Cuts</h1>
        </div>
        <button className="quietButton" type="button">Redacted fixture data</button>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">RSVP ORGANIZER</p>
          <h2>See family registrations,<br />attendance demand,<br />and what needs attention.</h2>
        </div>
        <div className="heroNote">
          <span className="statusDot" />
          Read-only prototype<br />Adapter-shaped fixtures
        </div>
      </section>

      <section className="stats" aria-label="RSVP summary">
        <article><span>Registrations</span><strong>{stats.registrations}</strong></article>
        <article><span>Children expected</span><strong>{stats.children}</strong></article>
        <article><span>Confirmed</span><strong>{stats.confirmed}</strong></article>
        <article><span>Waitlisted</span><strong>{stats.waitlisted}</strong></article>
        <article className="attentionStat"><span>Needs attention</span><strong>{stats.attention}</strong></article>
      </section>

      <section className="attentionPanel">
        <div>
          <p className="eyebrow">FOLLOW-UP QUEUE</p>
          <h3>{stats.attention} registrations need attention.</h3>
          <p>This queue is derived only from verified RSVP lifecycle statuses. It does not infer volunteer, sponsor, donor, or partner relationships.</p>
        </div>
        <button type="button" onClick={() => setFilter('Needs attention')}>Show attention queue</button>
      </section>

      <section className="workspace">
        <div className="listPanel">
          <div className="sectionHeading">
            <div>
              <p className="eyebrow">REGISTRATIONS</p>
              <h3>Families in one place</h3>
            </div>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search first name" aria-label="Search first name" />
          </div>

          <div className="filterRow">
            {filters.map((item) => (
              <button type="button" key={item} className={filter === item ? 'activeFilter' : ''} onClick={() => setFilter(item)}>{item}</button>
            ))}
          </div>

          <div className="peopleList">
            {visible.map((record) => (
              <button type="button" key={record.id} className={`personRow ${selected?.id === record.id ? 'selected' : ''}`} onClick={() => setSelected(record)}>
                <div className="avatar">{record.first_name.charAt(0)}</div>
                <div className="personMain">
                  <strong>{record.first_name}</strong>
                  <span>{record.children_count} {record.children_count === 1 ? 'child' : 'children'} · Ages {record.age_range} · {record.preferred_language.toUpperCase()}</span>
                </div>
                <div className={`badge ${displayStatus(record.status).toLowerCase().replaceAll(' ', '-')}`}>{displayStatus(record.status)}</div>
              </button>
            ))}
          </div>
        </div>

        <aside className="detailPanel">
          {selected && (
            <>
              <p className="eyebrow">REDACTED REGISTRATION</p>
              <h3>{selected.first_name}</h3>
              <div className="detailMeta">
                <span>{selected.preferred_language === 'es' ? 'Spanish' : 'English'}</span>
                <span>{selected.children_count} {selected.children_count === 1 ? 'child' : 'children'}</span>
                {selected.accessibility_contact && <span>Accessibility follow-up</span>}
              </div>

              <dl>
                <div><dt>Status</dt><dd>{displayStatus(selected.status)}</dd></div>
                <div><dt>Age range</dt><dd>{selected.age_range}</dd></div>
                <div><dt>Requested service</dt><dd>{selected.requested_service}</dd></div>
                <div><dt>Arrival window</dt><dd>{selected.arrival_window}</dd></div>
                <div><dt>Source</dt><dd>{selected.source}</dd></div>
                <div><dt>Last updated</dt><dd>{new Date(selected.updated_at).toLocaleString()}</dd></div>
              </dl>

              <div className="nextAction">
                <span>Recommended action</span>
                <strong>{nextAction(selected)}</strong>
              </div>

              <button className="primaryAction" type="button" disabled>Read-only prototype</button>
              <p className="privacyNote">Email, phone, surname, child names, schools, health information, and private notes are intentionally excluded.</p>
            </>
          )}
        </aside>
      </section>
    </main>
  );
}
