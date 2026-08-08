'use client';

import { useEffect, useMemo, useState } from 'react';

const sections = ['intro', 'rhythm', 'colors', 'calendar', 'example', 'rules', 'handoff'];

const rhythm = [
  {
    day: 'Monday',
    role: 'IDENTITY',
    title: 'Introduce ASC3ND and who you are as a nonprofit.',
    body: 'Monday posts create clarity. Someone discovering ASC3ND should understand the mission before being asked to attend, donate, volunteer, or share.',
    format: 'Static post / brand statement',
  },
  {
    day: 'Wednesday',
    role: 'STORY',
    title: 'Let people hear and feel the story through video.',
    body: 'Wednesday is where the human story comes forward. Real voices and real footage help people understand why ASC3ND exists and who is behind the work.',
    format: 'Reel / documentary clip',
  },
  {
    day: 'Friday',
    role: 'COMMUNITY',
    title: 'Turn trust into community action.',
    body: 'Friday gives people a clear next step: attend, share, volunteer, support, learn more, or see what ASC3ND is doing in the community.',
    format: 'Community / event / proof post',
  },
];

const calendar = [
  ['01', 'ASC3ND is here to help young people rise.', 'Why We Started', 'Empower Youth. Elevate Futures.'],
  ['02', 'Education. Mentorship. Leadership.', 'What a Mentor Can Do', 'Community Cuts for Kids'],
  ['03', 'A fresh start builds confidence.', 'Getting Ready', 'This Sunday. Arrive early.'],
  ['04', 'Thank you for showing up.', 'Community in Action', 'This is only the beginning.'],
];

const rules = [
  'Every post should make sense by itself.',
  'The grid should feel related, not like one image cut into twelve pieces.',
  'Use real ASC3ND people and real community footage for documentary storytelling.',
  'Keep one dominant message per post. Clarity wins.',
  'Consistency matters more than posting constantly.',
];

function makeClientKey() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `asc3nd-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function GuidePage() {
  const [activeDay, setActiveDay] = useState('Monday');
  const [step, setStep] = useState(0);
  const [saveState, setSaveState] = useState('Ready');
  const [clientKey, setClientKey] = useState('');

  useEffect(() => {
    let key = localStorage.getItem('asc3nd-instagram-guide-client-key');
    if (!key) {
      key = makeClientKey();
      localStorage.setItem('asc3nd-instagram-guide-client-key', key);
    }
    setClientKey(key);

    const local = localStorage.getItem('asc3nd-instagram-guide-step');
    if (local) setStep(Math.max(0, Math.min(Number(local) || 0, sections.length - 1)));

    fetch(`/api/client-guide/instagram-first-month?clientKey=${encodeURIComponent(key)}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        const saved = Number(data?.progress?.state?.step);
        if (Number.isFinite(saved)) setStep(Math.max(0, Math.min(saved, sections.length - 1)));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!clientKey) return;
    localStorage.setItem('asc3nd-instagram-guide-step', String(step));
    setSaveState('Saving…');
    const timer = setTimeout(() => {
      fetch('/api/client-guide/instagram-first-month', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ clientKey, state: { step } }),
      })
        .then(r => r.json())
        .then(data => setSaveState(data?.ok ? 'Progress saved' : 'Saved on this device'))
        .catch(() => setSaveState('Saved on this device'));
    }, 350);
    return () => clearTimeout(timer);
  }, [step, clientKey]);

  const active = useMemo(() => rhythm.find(item => item.day === activeDay) || rhythm[0], [activeDay]);
  const progress = Math.round((step / (sections.length - 1)) * 100);

  function goNext(currentId) {
    const currentIndex = sections.indexOf(currentId);
    const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
    setStep(prev => Math.max(prev, nextIndex));
    document.getElementById(sections[nextIndex])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <main className="guide-page">
      <style>{css}</style>

      <section id="intro" className="hero section-anchor">
        <div className="brand-top">
          <img src="/images/asc3nd-client-logo-transparent.png" alt="ASC3ND Collective" className="brand-logo" />
        </div>
        <div className="hero-inner">
          <div className="meta-row">
            <div>
              <div className="eyebrow">ASC3ND INSTAGRAM PLAYBOOK</div>
              <div className="version">FIRST MONTH · v1</div>
            </div>
            <div className="progress-box">
              <div className="progress-label">{progress}% viewed</div>
              <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
            </div>
          </div>

          <h1>Three posts a week. One story people can relate to.</h1>
          <p className="hero-copy">
            Hello Otha and Elisha. We hope this finds you well. Our first approach is designed as a simple weekly rhythm: Monday explains who ASC3ND is, Wednesday lets people hear and feel the story through video, and Friday turns that trust into community action.
          </p>

          <div className="day-strip">
            <div><strong>MON</strong><span>Identity</span></div>
            <div><strong>WED</strong><span>Story Reel</span></div>
            <div><strong>FRI</strong><span>Community</span></div>
          </div>

          <NextButton onClick={() => goNext('intro')} label="See the rhythm" />
        </div>
      </section>

      <section id="rhythm" className="content-section section-anchor">
        <SectionHead number="01" kicker="THE ASC3ND RHYTHM" title="Same cadence every week. Different parts of the story each time." />
        <div className="tabs" role="tablist" aria-label="ASC3ND weekly posting rhythm">
          {rhythm.map(item => (
            <button key={item.day} className={activeDay === item.day ? 'tab active' : 'tab'} onClick={() => setActiveDay(item.day)}>
              <strong>{item.day}</strong><span>{item.role}</span>
            </button>
          ))}
        </div>
        <div className="rhythm-card">
          <div className="display-day">{active.day}</div>
          <div>
            <div className="eyebrow orange">{active.role}</div>
            <h2>{active.title}</h2>
            <p>{active.body}</p>
            <span className="format-pill">{active.format}</span>
          </div>
        </div>
        <NextButton onClick={() => goNext('rhythm')} label="Why black + cream" />
      </section>

      <section id="colors" className="dark-section section-anchor">
        <div className="dark-inner">
          <SectionHead dark number="02" kicker="WHY BLACK + CREAM" title="We are building from the colors in your original flyer." />
          <p className="dark-intro">The color rhythm becomes part of the strategy and gives ASC3ND a recognizable visual language.</p>
          <div className="color-grid">
            <article className="black-card">
              <div className="swatch">BLACK · #050505</div>
              <h3>Strength + structure</h3>
              <p>Strength, focus, seriousness, and structure. Black gives the mission authority and keeps important statements from feeling casual or disposable.</p>
            </article>
            <article className="cream-card">
              <div className="swatch">CREAM · #F5F1E8</div>
              <h3>Warmth + possibility</h3>
              <p>Humanity, warmth, possibility, and breathing room. Cream softens the system and makes the organization feel welcoming rather than institutional.</p>
            </article>
          </div>
          <div className="alternate-card">
            <div className="pattern">{[0,1,2,3,4,5,6,7].map(i => <i key={i} className={i % 2 ? 'cream' : 'black'} />)}</div>
            <div><strong>WHY ALTERNATE?</strong><p>The contrast creates visual rhythm. Instead of twelve posts competing for attention, the grid breathes: strong / open / strong / open. It keeps the profile recognizable without turning it into a puzzle that becomes disjointed when posts do not follow a perfect schedule.</p></div>
          </div>
          <NextButton dark onClick={() => goNext('colors')} label="See the month" />
        </div>
      </section>

      <section id="calendar" className="content-section section-anchor">
        <SectionHead number="03" kicker="THE FIRST-MONTH CALENDAR" title="Four weeks. Twelve primary Feed posts." />
        <p className="section-copy">Instagram displays three posts across. We use that natural structure as a weekly system. Monday publishes first and ends up on the right, Wednesday becomes the center Reel, and Friday publishes last and becomes the left tile. Four weeks create four complete rows and twelve primary Feed posts.</p>
        <div className="calendar">
          <div className="calendar-head"><span>WEEK</span><span>MON · IDENTITY</span><span>WED · REEL</span><span>FRI · COMMUNITY</span></div>
          {calendar.map(row => (
            <div className="calendar-row" key={row[0]}>
              <div className="week-no">{row[0]}</div>
              <CalendarCell day="MON" text={row[1]} tone="cream" />
              <CalendarCell day="WED" text={row[2]} tone="reel" />
              <CalendarCell day="FRI" text={row[3]} tone="black" />
            </div>
          ))}
        </div>
        <NextButton onClick={() => goNext('calendar')} label="See one week" />
      </section>

      <section id="example" className="content-section section-anchor">
        <SectionHead number="04" kicker="WHAT ONE WEEK LOOKS LIKE" title="Each post works alone. Together, they tell one complete story." />
        <div className="post-grid">
          <PostMock label="MONDAY · IDENTITY" theme="cream" headline="ASC3ND IS HERE TO HELP YOUNG PEOPLE RISE." footer="Mission first. One clear idea." />
          <PostMock label="WEDNESDAY · REEL" theme="reel" headline="WHY WE STARTED" footer="Real voice. Real footage. Share your human story." />
          <PostMock label="FRIDAY · COMMUNITY" theme="black" headline="EMPOWER YOUTH. ELEVATE FUTURES." footer="Invitation, proof, or next step." />
        </div>
        <div className="point"><strong>THE POINT:</strong><span>Monday explains. Wednesday makes people feel it. Friday gives them somewhere to go with that feeling.</span></div>
        <NextButton onClick={() => goNext('example')} label="Five simple rules" />
      </section>

      <section id="rules" className="content-section section-anchor">
        <SectionHead number="05" kicker="THE FIVE RULES" title="Keep the system simple enough to operate without us." />
        <div className="rules">
          {rules.map((rule, i) => <div className="rule" key={rule}><span>{String(i + 1).padStart(2, '0')}</span><p>{rule}</p></div>)}
        </div>
        <NextButton onClick={() => goNext('rules')} label="Finish the guide" />
      </section>

      <section id="handoff" className="handoff section-anchor">
        <div className="eyebrow">ASC3ND · CLIENT HANDOFF</div>
        <h2>With your approval, this can become your repeatable system — not a one-time campaign.</h2>
        <p>The goal of this guide is to show what kind of story belongs on each day, why the grid looks the way it does, and how we can keep the rhythm going after the event.</p>
        <div className="save-state">{saveState}</div>
      </section>
    </main>
  );
}

function SectionHead({ number, kicker, title, dark = false }) {
  return <div className="section-head"><div className={dark ? 'section-no dark' : 'section-no'}>{number}</div><div><div className={dark ? 'eyebrow gold' : 'eyebrow orange'}>{kicker}</div><h2 className={dark ? 'dark-title' : ''}>{title}</h2></div></div>;
}

function NextButton({ onClick, label, dark = false }) {
  return <button className={dark ? 'next-btn dark-btn' : 'next-btn'} onClick={onClick}><span>{label}</span><span aria-hidden="true">→</span></button>;
}

function CalendarCell({ day, text, tone }) {
  return <div className={`calendar-cell ${tone}`}><small>{day}</small><strong>{text}</strong></div>;
}

function PostMock({ label, theme, headline, footer }) {
  return <article className={`post-card ${theme}`}><div className="post-top"><span>A3</span><small>{label}</small></div><h3>{headline}</h3><div className="post-footer">{footer}</div></article>;
}

const css = `
  :root { --ink:#050505; --paper:#F5F1E8; --gold:#F5A617; --orange:#F45B24; --teal:#0D6F78; }
  * { box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body { margin:0; background:#fffdf9; color:var(--ink); }
  .guide-page { font-family:var(--font-barlow), Arial, sans-serif; background:#fffdf9; overflow:hidden; }
  .section-anchor { scroll-margin-top:20px; }
  .brand-top { min-height:260px; background:var(--ink); display:grid; place-items:center; padding:36px 24px; }
  .brand-logo { width:min(360px,72vw); height:auto; object-fit:contain; }
  .hero-inner,.content-section,.dark-inner,.handoff { width:min(1120px,calc(100% - 40px)); margin:0 auto; }
  .hero-inner { min-height:78vh; display:flex; flex-direction:column; justify-content:center; padding:64px 0 80px; }
  .meta-row { display:flex; justify-content:space-between; gap:28px; align-items:flex-start; margin-bottom:48px; }
  .eyebrow { font-family:var(--font-barlow-condensed),Arial,sans-serif; font-size:13px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; }
  .orange { color:var(--orange); } .gold { color:var(--gold); }
  .version { margin-top:8px; color:#777; font-size:12px; letter-spacing:.1em; }
  .progress-box { width:190px; } .progress-label { text-align:right; color:#666; font-size:12px; margin-bottom:8px; }
  .progress-track { height:5px; background:#e8e2d9; overflow:hidden; border-radius:99px; } .progress-track span { display:block; height:100%; background:var(--gold); transition:width .3s ease; }
  h1,h2,h3,.display-day { font-family:var(--font-barlow-condensed),Arial,sans-serif; text-transform:uppercase; }
  h1 { font-size:clamp(54px,9.4vw,118px); line-height:.88; letter-spacing:-.045em; margin:0; max-width:1000px; font-weight:900; }
  .hero-copy { max-width:850px; font-size:clamp(18px,2vw,25px); line-height:1.5; color:#49453f; margin:32px 0 42px; }
  .day-strip { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid #cfc8bc; border-bottom:1px solid #cfc8bc; }
  .day-strip div { padding:20px 4px; display:flex; gap:12px; align-items:baseline; } .day-strip strong { font-family:var(--font-barlow-condensed); font-size:22px; } .day-strip span { color:#666; }
  .content-section { padding:92px 0; border-top:1px solid #ddd7cd; }
  .section-head { display:grid; grid-template-columns:58px 1fr; gap:20px; margin-bottom:34px; }
  .section-no { font-size:13px; color:#777; font-weight:700; padding-top:2px; } .section-no.dark { color:#8e8b84; }
  h2 { font-size:clamp(36px,5.2vw,66px); line-height:.95; letter-spacing:-.035em; margin:10px 0 0; max-width:900px; font-weight:800; }
  .section-copy,.dark-intro { max-width:840px; font-size:18px; line-height:1.65; }
  .tabs { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin:36px 0 16px; }
  .tab { border:1px solid #d6d0c7; background:#fffdf9; border-radius:16px; text-align:left; padding:18px; cursor:pointer; font-family:inherit; }
  .tab.active { background:var(--ink); color:var(--paper); border-color:var(--ink); }
  .tab strong { display:block; font-family:var(--font-barlow-condensed); font-size:22px; text-transform:uppercase; } .tab span { display:block; margin-top:3px; font-size:11px; letter-spacing:.12em; }
  .rhythm-card { display:grid; grid-template-columns:minmax(190px,.75fr) 1.5fr; gap:36px; background:var(--paper); border-radius:24px; padding:38px; align-items:center; }
  .display-day { font-size:clamp(50px,8vw,92px); font-weight:900; letter-spacing:-.05em; }
  .rhythm-card p { font-size:18px; line-height:1.6; max-width:760px; }
  .format-pill { display:inline-block; padding:9px 13px; border:1px solid #b8b0a5; border-radius:999px; font-size:12px; font-weight:700; }
  .next-btn { margin-top:28px; border:0; border-radius:999px; background:var(--gold); color:var(--ink); display:inline-flex; align-items:center; gap:28px; padding:14px 18px 14px 20px; font:700 15px var(--font-barlow); cursor:pointer; transition:transform .18s ease; }
  .next-btn:hover { transform:translateY(-2px); } .dark-btn { background:var(--paper); }
  .dark-section { background:var(--ink); color:var(--paper); } .dark-inner { padding:92px 0; } .dark-title { color:var(--paper); }
  .dark-intro { color:#cbc6bd; }
  .color-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:34px; }
  .black-card,.cream-card { min-height:360px; padding:32px; border-radius:24px; display:flex; flex-direction:column; justify-content:space-between; }
  .black-card { border:1px solid #2b2b2b; background:#050505; color:#F5F1E8; } .cream-card { background:#F5F1E8; color:#050505; }
  .swatch { font-size:12px; font-weight:800; letter-spacing:.12em; }
  .color-grid h3 { font-size:clamp(42px,5vw,66px); line-height:.9; letter-spacing:-.03em; margin:auto 0 22px; }
  .color-grid p { font-size:17px; line-height:1.6; opacity:.8; }
  .alternate-card { margin-top:14px; border:1px solid #333; border-radius:20px; padding:28px; display:grid; grid-template-columns:220px 1fr; gap:28px; background:#111; }
  .pattern { display:grid; grid-template-columns:repeat(4,1fr); gap:4px; min-height:96px; } .pattern i.black { background:#050505; border:1px solid #333; } .pattern i.cream { background:#F5F1E8; }
  .alternate-card p { color:#c8c3ba; line-height:1.6; margin-bottom:0; }
  .calendar { margin-top:34px; border-top:1px solid #d8d3ca; }
  .calendar-head,.calendar-row { display:grid; grid-template-columns:72px repeat(3,1fr); gap:10px; }
  .calendar-head { padding:14px 0; font-size:11px; font-weight:800; letter-spacing:.1em; color:#777; }
  .calendar-row { padding:10px 0; border-top:1px solid #ece7de; }
  .week-no { font:800 30px var(--font-barlow-condensed); display:flex; align-items:center; }
  .calendar-cell { min-height:136px; border-radius:16px; padding:18px; display:flex; flex-direction:column; justify-content:space-between; }
  .calendar-cell.cream { background:var(--paper); } .calendar-cell.reel { background:#dde8e8; } .calendar-cell.black { background:var(--ink); color:var(--paper); }
  .calendar-cell small { font-size:11px; letter-spacing:.1em; } .calendar-cell strong { font-size:17px; line-height:1.2; }
  .post-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:34px; }
  .post-card { aspect-ratio:4/5; border-radius:22px; padding:22px; display:flex; flex-direction:column; justify-content:space-between; }
  .post-card.cream { background:var(--paper); } .post-card.reel { background:#d7e4e4; } .post-card.black { background:var(--ink); color:var(--paper); }
  .post-top { display:flex; justify-content:space-between; gap:12px; align-items:center; font-weight:800; } .post-card h3 { font-size:clamp(30px,3vw,46px); line-height:.9; letter-spacing:-.03em; margin:auto 0; }
  .post-footer { font-size:13px; line-height:1.4; opacity:.72; }
  .point { margin-top:16px; background:var(--gold); border-radius:16px; padding:24px; display:flex; gap:20px; align-items:baseline; }
  .rules { border-top:1px solid #d8d3ca; } .rule { display:grid; grid-template-columns:58px 1fr; gap:20px; padding:24px 0; border-bottom:1px solid #d8d3ca; }
  .rule span { font:700 16px var(--font-barlow-condensed); } .rule p { margin:0; font-size:19px; }
  .handoff { padding:76px 0 100px; border-top:6px solid var(--gold); }
  .handoff h2 { margin-top:12px; max-width:960px; } .handoff p { max-width:840px; font-size:19px; line-height:1.6; color:#49453f; }
  .save-state { display:inline-block; margin-top:18px; padding:9px 13px; border-radius:999px; background:var(--paper); color:#555; font-size:12px; font-weight:700; }
  @media(max-width:760px){
    .brand-top{min-height:190px}.hero-inner{padding-top:46px}.meta-row{flex-direction:column}.progress-box{width:100%}.progress-label{text-align:left}
    .day-strip{grid-template-columns:1fr}.day-strip div{border-top:1px solid #e0dbd2}.tabs{grid-template-columns:1fr}.rhythm-card{grid-template-columns:1fr;padding:26px}
    .color-grid,.post-grid{grid-template-columns:1fr}.alternate-card{grid-template-columns:1fr}.calendar-head{display:none}.calendar-row{grid-template-columns:1fr;margin-bottom:18px}.week-no{padding-top:12px}
    .section-head{grid-template-columns:42px 1fr}.point{flex-direction:column;gap:8px}
  }
  @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.next-btn{transition:none}}
`;
