'use client';

import { useMemo, useState } from 'react';

const people = [
  { id: 1, name: 'Maria R.', type: 'Family', tags: ['Spanish', '2 children'], status: 'New', source: 'Printed flyer', next: 'Confirm attendance details' },
  { id: 2, name: 'DeShawn T.', type: 'Volunteer', tags: ['Setup', 'English'], status: 'Needs follow-up', source: 'Instagram', next: 'Confirm arrival time' },
  { id: 3, name: 'Alicia M.', type: 'Partner', tags: ['Local business', 'Supplies'], status: 'New', source: 'Referral', next: 'Assign relationship owner' },
  { id: 4, name: 'Jordan K.', type: 'Family', tags: ['English', '3 children'], status: 'Confirmed', source: 'Website', next: 'No action needed' },
  { id: 5, name: 'Lucía P.', type: 'Family', tags: ['Spanish', '1 child'], status: 'Needs follow-up', source: 'Printed flyer', next: 'Send Spanish confirmation' },
  { id: 6, name: 'Marcus B.', type: 'Volunteer', tags: ['Barber', 'English'], status: 'Confirmed', source: 'Partner link', next: 'Confirm station assignment' },
  { id: 7, name: 'Northside Market', type: 'Sponsor', tags: ['Food donation'], status: 'Needs review', source: 'QR code', next: 'Clarify contribution' },
  { id: 8, name: 'Tanya S.', type: 'Family', tags: ['English', '2 children'], status: 'New', source: 'Instagram', next: 'Confirm attendance details' }
];

const filters = ['All', 'Family', 'Volunteer', 'Partner', 'Sponsor', 'Needs attention'];

export default function Page() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    return people.filter((person) => {
      const matchesFilter = filter === 'All'
        || person.type === filter
        || (filter === 'Needs attention' && ['Needs follow-up', 'Needs review'].includes(person.status));
      const matchesQuery = person.name.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const stats = {
    submissions: people.length,
    families: people.filter((p) => p.type === 'Family').length,
    volunteers: people.filter((p) => p.type === 'Volunteer').length,
    relationships: people.filter((p) => ['Partner', 'Sponsor'].includes(p.type)).length,
    attention: people.filter((p) => ['Needs follow-up', 'Needs review'].includes(p.status)).length
  };

  return (
    <main>
      <header className="topbar">
        <div>
          <p className="eyebrow">ASC3ND · PRIVATE OPERATIONS</p>
          <h1>Community Cuts</h1>
        </div>
        <button className="quietButton">Prototype data</button>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">RSVP ORGANIZER</p>
          <h2>See who is coming,<br />who wants to help,<br />and who needs attention.</h2>
        </div>
        <div className="heroNote">
          <span className="statusDot" />
          Read-only prototype<br />Last updated just now
        </div>
      </section>

      <section className="stats" aria-label="RSVP summary">
        <article><span>Total submissions</span><strong>{stats.submissions}</strong></article>
        <article><span>Families</span><strong>{stats.families}</strong></article>
        <article><span>Volunteers</span><strong>{stats.volunteers}</strong></article>
        <article><span>Partners + sponsors</span><strong>{stats.relationships}</strong></article>
        <article className="attentionStat"><span>Needs attention</span><strong>{stats.attention}</strong></article>
      </section>

      <section className="attentionPanel">
        <div>
          <p className="eyebrow">TODAY</p>
          <h3>Three people need a response.</h3>
          <p>One volunteer needs confirmation, one Spanish-speaking family needs follow-up, and one sponsor needs review.</p>
        </div>
        <button onClick={() => setFilter('Needs attention')}>Show follow-up queue</button>
      </section>

      <section className="workspace">
        <div className="listPanel">
          <div className="sectionHeading">
            <div>
              <p className="eyebrow">PEOPLE</p>
              <h3>Everyone in one place</h3>
            </div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search people" aria-label="Search people" />
          </div>

          <div className="filterRow">
            {filters.map((item) => (
              <button key={item} className={filter === item ? 'activeFilter' : ''} onClick={() => setFilter(item)}>{item}</button>
            ))}
          </div>

          <div className="peopleList">
            {visible.map((person) => (
              <button key={person.id} className={`personRow ${selected?.id === person.id ? 'selected' : ''}`} onClick={() => setSelected(person)}>
                <div className="avatar">{person.name.charAt(0)}</div>
                <div className="personMain">
                  <strong>{person.name}</strong>
                  <span>{person.type} · {person.tags.join(' · ')}</span>
                </div>
                <div className={`badge ${person.status.toLowerCase().replaceAll(' ', '-')}`}>{person.status}</div>
              </button>
            ))}
          </div>
        </div>

        <aside className="detailPanel">
          {selected && (
            <>
              <p className="eyebrow">PERSON DETAIL</p>
              <h3>{selected.name}</h3>
              <div className="detailMeta">
                <span>{selected.type}</span>
                {selected.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>

              <dl>
                <div><dt>Status</dt><dd>{selected.status}</dd></div>
                <div><dt>Source</dt><dd>{selected.source}</dd></div>
                <div><dt>Next step</dt><dd>{selected.next}</dd></div>
              </dl>

              <div className="nextAction">
                <span>Recommended action</span>
                <strong>{selected.next}</strong>
              </div>

              <button className="primaryAction">Open full record</button>
              <p className="privacyNote">Contact information is intentionally hidden in this prototype.</p>
            </>
          )}
        </aside>
      </section>
    </main>
  );
}
