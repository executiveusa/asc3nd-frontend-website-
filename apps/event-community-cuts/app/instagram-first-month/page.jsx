'use client';

import { useEffect, useMemo, useState } from 'react';

const FALLBACK = {
  title: 'ASC3ND — Your First Month on Instagram',
  version: 'v1',
  content: {
    eyebrow: 'ASC3ND INSTAGRAM PLAYBOOK',
    headline: 'Three posts a week. One story people can understand.',
    intro: 'The first month is designed as a simple weekly rhythm: Monday explains who ASC3ND is, Wednesday lets people hear and feel the story through video, and Friday turns that trust into community action.',
    weekRhythm: [
      { day: 'Monday', role: 'IDENTITY', purpose: 'Tell people who we are and what we believe.', format: 'Static post / brand statement', why: 'Monday creates clarity. Someone discovering ASC3ND should understand the mission before being asked to attend, donate, volunteer, or share.' },
      { day: 'Wednesday', role: 'STORY', purpose: 'Let a real voice carry the message.', format: 'Reel / documentary clip', why: 'Video creates human connection. The center post gives the week emotion, voice, movement, and proof that real people are behind the mission.' },
      { day: 'Friday', role: 'COMMUNITY', purpose: 'Show action, invitation, proof, or the next step.', format: 'Event / community / proof post', why: 'Friday converts understanding into participation: attend, share, support, volunteer, or see what happened in the community.' },
    ],
    calendar: [
      { week: 1, monday: 'ASC3ND is here to help young people rise.', wednesday: 'Why We Started', friday: 'Empower Youth. Elevate Futures.' },
      { week: 2, monday: 'Education. Mentorship. Leadership.', wednesday: 'What a Mentor Can Do', friday: 'Community Cuts for Kids' },
      { week: 3, monday: 'A fresh start builds confidence.', wednesday: 'Getting Ready', friday: 'This Sunday. Arrive early.' },
      { week: 4, monday: 'Thank you for showing up.', wednesday: 'Community in Action', friday: 'This is only the beginning.' },
    ],
    colors: [
      { name: 'Black', hex: '#050505', meaning: 'Strength, focus, seriousness, and structure. Black gives the mission authority and keeps important statements from feeling casual or disposable.' },
      { name: 'Cream', hex: '#F5F1E8', meaning: 'Humanity, warmth, possibility, and breathing room. Cream softens the system and makes the organization feel welcoming rather than institutional.' },
      { name: 'The alternation', hex: 'black + cream', meaning: 'The contrast creates visual rhythm. Instead of twelve posts competing for attention, the grid breathes: strong / open / strong / open. It makes the profile recognizable without turning it into a fragile puzzle.' },
    ],
    gridLogic: {
      headline: 'One Instagram grid. Three columns. Four campaign rows.',
      body: 'Instagram displays three posts across. We use that natural structure as a weekly system. Monday publishes first and ends up on the right, Wednesday becomes the center Reel, and Friday publishes last and becomes the left tile. Four weeks create four complete rows and twelve primary Feed posts.',
    },
    rules: [
      'Every post must make sense by itself.',
      'The grid should feel related, not like a single image cut into twelve pieces.',
      'Use real ASC3ND people and real community footage for documentary storytelling.',
      'Keep one dominant message per post.',
      'Consistency matters more than posting constantly.',
    ],
  },
  theme: { ink: '#050505', paper: '#F5F1E8', gold: '#F5A617', orange: '#F45B24', teal: '#0D6F78' },
};

function makeClientKey() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `asc3nd-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function InstagramFirstMonthPage() {
  const [guide, setGuide] = useState(FALLBACK);
  const [activeDay, setActiveDay] = useState('Monday');
  const [checked, setChecked] = useState({ rhythm: false, colors: false, calendar: false, rules: false });
  const [saveState, setSaveState] = useState('idle');
  const [clientKey, setClientKey] = useState('');

  useEffect(() => {
    let key = localStorage.getItem('asc3nd-instagram-guide-client-key');
    if (!key) {
      key = makeClientKey();
      localStorage.setItem('asc3nd-instagram-guide-client-key', key);
    }
    setClientKey(key);

    const local = localStorage.getItem('asc3nd-instagram-guide-progress');
    if (local) {
      try { setChecked(JSON.parse(local)); } catch {}
    }

    fetch('/api/client-guide/instagram-first-month', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => { if (data?.ok && data.guide) setGuide(data.guide); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!clientKey) return;
    localStorage.setItem('asc3nd-instagram-guide-progress', JSON.stringify(checked));
    setSaveState('saving');
    const timer = setTimeout(() => {
      fetch('/api/client-guide/instagram-first-month', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ clientKey, state: checked }),
      })
        .then(r => r.json())
        .then(data => setSaveState(data?.ok ? 'saved' : 'local'))
        .catch(() => setSaveState('local'));
    }, 450);
    return () => clearTimeout(timer);
  }, [checked, clientKey]);

  const content = guide.content || FALLBACK.content;
  const theme = { ...FALLBACK.theme, ...(guide.theme || {}) };
  const active = content.weekRhythm.find(item => item.day === activeDay) || content.weekRhythm[0];
  const progress = useMemo(() => Math.round((Object.values(checked).filter(Boolean).length / 4) * 100), [checked]);

  const toggle = key => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <main style={{ ...styles.page, '--ink': theme.ink, '--paper': theme.paper, '--gold': theme.gold, '--orange': theme.orange, '--teal': theme.teal }}>
      <style>{css}</style>

      <header style={styles.hero}>
        <div style={styles.heroTop}>
          <div>
            <div style={styles.eyebrow}>{content.eyebrow}</div>
            <div style={styles.version}>FIRST MONTH · {guide.version || 'v1'}</div>
          </div>
          <div style={styles.progressWrap} aria-label={`${progress}% reviewed`}>
            <span style={styles.progressLabel}>{progress}% reviewed</span>
            <div style={styles.progressTrack}><div style={{ ...styles.progressFill, width: `${progress}%` }} /></div>
          </div>
        </div>

        <h1 style={styles.h1}>{content.headline}</h1>
        <p style={styles.lead}>{content.intro}</p>

        <div style={styles.quickSummary}>
          <div><strong>MON</strong><span>Identity</span></div>
          <div><strong>WED</strong><span>Story Reel</span></div>
          <div><strong>FRI</strong><span>Community</span></div>
        </div>
      </header>

      <section style={styles.section}>
        <SectionHeader number="01" label="THE WEEKLY RHYTHM" title="Same cadence every week. Different story every time." />
        <div style={styles.tabs} role="tablist" aria-label="Weekly posting rhythm">
          {content.weekRhythm.map(item => (
            <button key={item.day} onClick={() => setActiveDay(item.day)} className="day-tab" style={activeDay === item.day ? styles.tabActive : styles.tab}>
              <span>{item.day}</span><small>{item.role}</small>
            </button>
          ))}
        </div>
        <div style={styles.rhythmPanel}>
          <div style={styles.bigDay}>{active.day}</div>
          <div>
            <div style={styles.role}>{active.role}</div>
            <h2 style={styles.h2}>{active.purpose}</h2>
            <p style={styles.body}>{active.why}</p>
            <div style={styles.formatChip}>{active.format}</div>
          </div>
        </div>
        <ReviewCheck checked={checked.rhythm} onClick={() => toggle('rhythm')} label="I understand the Monday / Wednesday / Friday rhythm" />
      </section>

      <section style={{ ...styles.section, background: 'var(--ink)', color: 'var(--paper)', marginInline: '-24px', paddingInline: '24px', paddingBlock: '72px' }}>
        <SectionHeader dark number="02" label="WHY BLACK + CREAM" title="The color rhythm is part of the strategy." />
        <div style={styles.colorGrid}>
          <article style={{ ...styles.colorCard, background: '#050505', color: '#F5F1E8', borderColor: '#2a2a2a' }}>
            <div style={styles.swatchLabel}>BLACK · #050505</div>
            <h3 style={styles.colorTitle}>Strength + structure</h3>
            <p style={{ ...styles.body, color: '#c7c2b8' }}>{content.colors[0]?.meaning}</p>
          </article>
          <article style={{ ...styles.colorCard, background: '#F5F1E8', color: '#050505' }}>
            <div style={styles.swatchLabel}>CREAM · #F5F1E8</div>
            <h3 style={styles.colorTitle}>Warmth + possibility</h3>
            <p style={{ ...styles.body, color: '#3d3a35' }}>{content.colors[1]?.meaning}</p>
          </article>
        </div>
        <div style={styles.alternationCard}>
          <div style={styles.miniPattern}>{[0,1,2,3,4,5,6,7].map(i => <span key={i} style={{ background: i % 2 ? '#F5F1E8' : '#050505' }} />)}</div>
          <div><strong>WHY ALTERNATE?</strong><p>{content.colors[2]?.meaning}</p></div>
        </div>
        <ReviewCheck dark checked={checked.colors} onClick={() => toggle('colors')} label="I understand what the black / cream alternation is doing" />
      </section>

      <section style={styles.section}>
        <SectionHeader number="03" label="THE FIRST-MONTH CALENDAR" title="Four weeks. Twelve primary Feed posts." />
        <p style={styles.body}>{content.gridLogic.body}</p>
        <div style={styles.calendar}>
          <div style={styles.calendarHead}><span>WEEK</span><span>MON · IDENTITY</span><span>WED · REEL</span><span>FRI · COMMUNITY</span></div>
          {content.calendar.map(row => (
            <div style={styles.calendarRow} key={row.week}>
              <div style={styles.weekNo}>0{row.week}</div>
              <CalendarCell day="MON" text={row.monday} tone="cream" />
              <CalendarCell day="WED" text={row.wednesday} tone="video" />
              <CalendarCell day="FRI" text={row.friday} tone="black" />
            </div>
          ))}
        </div>
        <ReviewCheck checked={checked.calendar} onClick={() => toggle('calendar')} label="I can see how the month builds week by week" />
      </section>

      <section style={styles.section}>
        <SectionHeader number="04" label="WHAT ONE WEEK LOOKS LIKE" title="Each post works alone. Together, they tell one complete story." />
        <div style={styles.postExampleGrid}>
          <PostMock label="MONDAY · IDENTITY" theme="cream" headline="ASC3ND IS HERE TO HELP YOUNG PEOPLE RISE." footer="Mission first. One clear idea." />
          <PostMock label="WEDNESDAY · REEL" theme="video" headline="WHY WE STARTED" footer="Real voice. Real footage. Human story." />
          <PostMock label="FRIDAY · COMMUNITY" theme="black" headline="EMPOWER YOUTH. ELEVATE FUTURES." footer="Invitation, proof, or next step." />
        </div>
        <div style={styles.callout}><strong>THE POINT:</strong><span>Monday explains. Wednesday makes people feel it. Friday gives them somewhere to go with that feeling.</span></div>
      </section>

      <section style={styles.section}>
        <SectionHeader number="05" label="THE FIVE RULES" title="Keep the system simple enough to operate without us." />
        <div style={styles.rules}>
          {content.rules.map((rule, i) => <div key={rule} style={styles.rule}><span>{String(i + 1).padStart(2, '0')}</span><p>{rule}</p></div>)}
        </div>
        <ReviewCheck checked={checked.rules} onClick={() => toggle('rules')} label="I understand the first-month posting system" />
      </section>

      <footer style={styles.footer}>
        <div>
          <div style={styles.eyebrow}>ASC3ND · CLIENT HANDOFF</div>
          <h2 style={{ ...styles.h2, marginTop: 8 }}>This is a repeatable system, not a one-time campaign.</h2>
          <p style={styles.body}>The goal is for ASC3ND to know what kind of story belongs on each day, why the grid looks the way it does, and how to keep going after Month One.</p>
        </div>
        <div style={styles.savePill}>{saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Progress saved' : saveState === 'local' ? 'Saved on this device' : 'Ready'}</div>
      </footer>
    </main>
  );
}

function SectionHeader({ number, label, title, dark = false }) {
  return <div style={styles.sectionHead}><div style={{ ...styles.sectionNo, color: dark ? '#8b867d' : '#777' }}>{number}</div><div><div style={{ ...styles.eyebrow, color: dark ? '#F5A617' : 'var(--orange)' }}>{label}</div><h2 style={{ ...styles.h2, color: dark ? '#F5F1E8' : '#050505' }}>{title}</h2></div></div>;
}

function ReviewCheck({ checked, onClick, label, dark = false }) {
  return <button className="review-check" onClick={onClick} style={{ ...styles.review, color: dark ? '#F5F1E8' : '#050505', borderColor: dark ? '#3a3a3a' : '#d8d3ca' }}><span style={{ ...styles.checkBox, background: checked ? '#F5A617' : 'transparent', borderColor: checked ? '#F5A617' : dark ? '#777' : '#aaa' }}>{checked ? '✓' : ''}</span><span>{label}</span></button>;
}

function CalendarCell({ day, text, tone }) {
  const bg = tone === 'black' ? '#050505' : tone === 'cream' ? '#F5F1E8' : '#E8EFEF';
  const color = tone === 'black' ? '#F5F1E8' : '#050505';
  return <div style={{ ...styles.calendarCell, background: bg, color }}><small>{day}</small><strong>{text}</strong></div>;
}

function PostMock({ label, theme, headline, footer }) {
  const bg = theme === 'black' ? '#050505' : theme === 'cream' ? '#F5F1E8' : '#D7E4E4';
  const color = theme === 'black' ? '#F5F1E8' : '#050505';
  return <article className="post-mock" style={{ ...styles.postMock, background: bg, color }}><div style={styles.postTop}><span>A3</span><small>{label}</small></div><h3 style={styles.postHeadline}>{headline}</h3><div style={styles.postFooter}>{footer}</div></article>;
}

const styles = {
  page: { maxWidth: 1180, margin: '0 auto', padding: '0 24px', background: '#fffdf9', color: '#050505', fontFamily: 'var(--font-barlow), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', WebkitFontSmoothing: 'antialiased' },
  hero: { minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '54px 0 72px' },
  heroTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, marginBottom: 54 },
  eyebrow: { color: 'var(--orange)', fontSize: 12, fontWeight: 800, letterSpacing: '.16em', textTransform: 'uppercase' },
  version: { marginTop: 8, color: '#777', fontSize: 12, letterSpacing: '.12em' },
  progressWrap: { width: 180 }, progressLabel: { display: 'block', textAlign: 'right', fontSize: 12, color: '#666', marginBottom: 8 },
  progressTrack: { height: 5, background: '#e9e4db', borderRadius: 99, overflow: 'hidden' }, progressFill: { height: '100%', background: 'var(--gold)', transition: 'width .35s ease' },
  h1: { fontSize: 'clamp(52px, 9vw, 112px)', lineHeight: .9, letterSpacing: '-.055em', maxWidth: 980, margin: 0, fontWeight: 800, textTransform: 'uppercase' },
  lead: { fontSize: 'clamp(19px, 2.2vw, 28px)', lineHeight: 1.4, maxWidth: 820, margin: '32px 0 44px', color: '#49453f' },
  quickSummary: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', borderTop: '1px solid #cfc8bc', borderBottom: '1px solid #cfc8bc' },
  section: { padding: '86px 0', borderTop: '1px solid #ddd7cd' },
  sectionHead: { display: 'grid', gridTemplateColumns: '56px 1fr', gap: 22, marginBottom: 34 }, sectionNo: { fontSize: 13, fontWeight: 700, paddingTop: 3 },
  h2: { fontSize: 'clamp(34px, 5vw, 62px)', letterSpacing: '-.045em', lineHeight: .98, margin: '10px 0 0', maxWidth: 860 }, body: { fontSize: 18, lineHeight: 1.6, maxWidth: 820 },
  tabs: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, margin: '36px 0 18px' }, tab: { border: '1px solid #d8d3ca', background: '#fffdf9', padding: '18px 20px', textAlign: 'left', cursor: 'pointer', borderRadius: 16 }, tabActive: { border: '1px solid #050505', background: '#050505', color: '#F5F1E8', padding: '18px 20px', textAlign: 'left', cursor: 'pointer', borderRadius: 16 },
  rhythmPanel: { display: 'grid', gridTemplateColumns: 'minmax(180px,.7fr) 1.6fr', gap: 36, padding: 36, background: '#F5F1E8', borderRadius: 24, alignItems: 'center' }, bigDay: { fontSize: 'clamp(46px,8vw,92px)', fontWeight: 900, letterSpacing: '-.06em', textTransform: 'uppercase' }, role: { fontSize: 12, fontWeight: 800, letterSpacing: '.15em', color: '#F45B24' }, formatChip: { display: 'inline-block', marginTop: 16, padding: '9px 12px', border: '1px solid #b8b0a4', borderRadius: 999, fontSize: 12, fontWeight: 700 },
  colorGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }, colorCard: { minHeight: 360, padding: 32, border: '1px solid #d5d0c7', borderRadius: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }, swatchLabel: { fontSize: 12, fontWeight: 800, letterSpacing: '.13em' }, colorTitle: { fontSize: 'clamp(38px,5vw,64px)', letterSpacing: '-.05em', lineHeight: .95, margin: 'auto 0 20px' },
  alternationCard: { marginTop: 14, padding: 26, border: '1px solid #333', borderRadius: 20, display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28, alignItems: 'center', background: '#111' }, miniPattern: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4 },
  calendar: { marginTop: 34, borderTop: '1px solid #d8d3ca' }, calendarHead: { display: 'grid', gridTemplateColumns: '72px repeat(3,1fr)', gap: 10, padding: '14px 0', fontSize: 11, fontWeight: 800, letterSpacing: '.1em', color: '#777' }, calendarRow: { display: 'grid', gridTemplateColumns: '72px repeat(3,1fr)', gap: 10, padding: '10px 0', borderTop: '1px solid #ece7de', alignItems: 'stretch' }, weekNo: { fontSize: 28, fontWeight: 800, display: 'flex', alignItems: 'center' }, calendarCell: { minHeight: 132, borderRadius: 16, padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  postExampleGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 34 }, postMock: { aspectRatio: '4 / 5', borderRadius: 22, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform .2s ease' }, postTop: { display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', fontWeight: 800 }, postHeadline: { fontSize: 'clamp(28px,3vw,44px)', lineHeight: .92, letterSpacing: '-.045em', margin: 'auto 0' }, postFooter: { fontSize: 13, lineHeight: 1.4, opacity: .72 },
  callout: { marginTop: 16, padding: 24, background: '#F5A617', display: 'flex', gap: 20, borderRadius: 16, alignItems: 'baseline' }, rules: { borderTop: '1px solid #d8d3ca' }, rule: { display: 'grid', gridTemplateColumns: '58px 1fr', gap: 20, borderBottom: '1px solid #d8d3ca', padding: '24px 0', fontSize: 18 },
  review: { marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 12, padding: '13px 16px', border: '1px solid', borderRadius: 999, background: 'transparent', cursor: 'pointer', fontWeight: 700 }, checkBox: { width: 24, height: 24, border: '1px solid', borderRadius: 7, display: 'grid', placeItems: 'center', color: '#050505', fontSize: 16 },
  footer: { padding: '72px 0 100px', borderTop: '6px solid #F5A617', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'end' }, savePill: { padding: '10px 14px', borderRadius: 999, background: '#F5F1E8', color: '#4a4640', fontSize: 12, fontWeight: 700 },
};

const css = `
  * { box-sizing: border-box; }
  body { margin: 0; background: #fffdf9; }
  .day-tab span { display:block; font-weight:800; font-size:18px; }
  .day-tab small { display:block; margin-top:4px; font-size:10px; letter-spacing:.12em; opacity:.65; }
  .review-check:hover { transform: translateY(-1px); }
  .post-mock:hover { transform: translateY(-4px); }
  @media (max-width: 760px) {
    main { padding-inline: 18px !important; }
    header { min-height: auto !important; padding-top: 36px !important; }
    .day-tab { padding: 14px 12px !important; }
  }
  @media (max-width: 720px) {
    section > div[style*="grid-template-columns: minmax(180px"] { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 680px) {
    main > header > div:first-child { flex-direction: column; }
    main > header > div:last-child { grid-template-columns: 1fr; }
    section > div[role="tablist"] { grid-template-columns: 1fr !important; }
    section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
    section > div[style*="grid-template-columns: repeat(3,1fr)"] { grid-template-columns: 1fr !important; }
    section > div[style*="grid-template-columns: 220px 1fr"] { grid-template-columns: 1fr !important; }
    div[style*="grid-template-columns: 72px repeat(3,1fr)"] { grid-template-columns: 1fr !important; }
    div[style*="grid-template-columns: 72px repeat(3,1fr)"] > div:first-child { margin-top: 18px; }
    main > footer { grid-template-columns: 1fr !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; }
  }
`;
