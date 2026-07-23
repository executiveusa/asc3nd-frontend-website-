import { EventInterestForm } from './EventInterestForm';
import { ThemeToggle } from './ThemeToggle';
import styles from './event.module.css';

const supplies = [
  'Backpacks',
  'Notebooks',
  'Pencils and pens',
  'Markers and crayons',
  'Folders',
  'Rulers',
  'Glue sticks',
  'Scissors',
  'Highlighters',
  'Erasers',
  'Calculators',
  'Other school essentials',
];

const waysToJoin = [
  {
    title: 'Families',
    body: 'Tell Asc3nd you plan to attend so the team can estimate demand and prepare responsibly. This does not reserve a haircut or supplies.',
  },
  {
    title: 'Volunteers and mentors',
    body: 'Help create a welcoming day for local youth and families, then stay connected to Asc3nd’s longer-term mentorship and leadership work.',
  },
  {
    title: 'Businesses and community partners',
    body: 'Support school supplies, event needs, future youth opportunities, or a longer-term partnership with Asc3nd Collective.',
  },
];

export default function CommunityCutsForKidsPage() {
  return (
    <main className={`${styles.page} event-theme-root`}>
      <header className={styles.header}>
        <div className={styles.brand} aria-label="Asc3nd Collective">
          <span className={styles.brandMain}>ASC<span>3</span>ND</span>
          <span className={styles.brandSub}>COLLECTIVE</span>
        </div>
        <nav className={styles.nav} aria-label="Event navigation">
          <a href="#event">Event</a>
          <a href="#supplies">Supplies</a>
          <a href="#why">Why Asc3nd</a>
          <a className={styles.navCta} href="#connect">Plan to attend</a>
          <ThemeToggle />
        </nav>
      </header>

      <section className={styles.hero} id="event">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Asc3nd Collective presents</p>
          <h1>Community Cuts<br />for Kids</h1>
          <p className={styles.heroLead}>Fresh Fade, Fresh Grade — a free back-to-school community day built around confidence, preparation, and connection.</p>

          <div className={styles.eventFacts}>
            <div><span>Date</span><strong>Sunday, August 30, 2026</strong></div>
            <div><span>Time</span><strong>12:00 PM–3:00 PM</strong></div>
            <div><span>Location</span><strong>Tangles &amp; Locs</strong><small>7425 Hardeson Rd, Everett, WA 98203</small></div>
          </div>

          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#connect">Tell us you plan to attend</a>
            <a className={styles.secondaryButton} href="#supplies">Help equip a student</a>
          </div>

          <p className={styles.pendingNote}><strong>Planning notice:</strong> This form helps Asc3nd estimate attendance. It does not reserve a haircut, supplies, food, or giveaways. Everything is first come, first served and available while capacity and supplies last.</p>
        </div>

        <figure className={styles.heroPanel} aria-label="Tangles and Locs, the Community Cuts for Kids event venue" style={{ padding: 0, overflow: 'hidden', background: '#111' }}>
          <img
            src="https://asc3nd-interactive-document.vercel.app/images/community-cuts/tangles-locs-exterior.webp"
            alt="Exterior of Tangles and Locs, the Everett venue for Community Cuts for Kids"
            style={{ width: '100%', minHeight: '420px', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <figcaption style={{ padding: '18px 22px', color: 'rgba(255,255,255,.78)', fontSize: '.9rem', lineHeight: 1.5 }}>
            Community Cuts for Kids will take place at Tangles &amp; Locs in Everett, Washington.
          </figcaption>
        </figure>
      </section>

      <section className={styles.section} aria-labelledby="expect-heading">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>What to expect</p>
          <h2 id="expect-heading">A practical day of care, preparation, and community.</h2>
          <p>Asc3nd is bringing families, barbers, volunteers, and community supporters together to help young people begin the school year feeling prepared and seen.</p>
        </div>
        <div className={styles.missionGrid} style={{ marginTop: '40px' }}>
          <div><h3>Free haircuts for kids</h3><p>A fresh start for the school year, provided first come, first served while event capacity lasts.</p></div>
          <div><h3>School supplies + giveaways</h3><p>Useful school essentials distributed while donated supplies last.</p></div>
          <div><h3>Food, fun + community</h3><p>A welcoming place to meet neighbors, volunteers, mentors, and Asc3nd supporters.</p></div>
          <div><h3>No reservation promise</h3><p>Sharing your interest helps the team plan. It does not guarantee a service, item, or arrival time.</p></div>
        </div>
      </section>

      <section className={styles.section} id="supplies">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Supplies for Success</p>
          <h2>Help a student start the year ready.</h2>
          <p>Asc3nd’s school-supply collection runs July 15–August 15, 2026. The goal is simple: gather useful school essentials and place them directly into the hands of local students and families through the back-to-school campaign.</p>
        </div>

        <div className={styles.supplyGrid} data-surface="card-grid">{supplies.map((item) => <div key={item}>{item}</div>)}</div>

        <div className={styles.callout}>
          <div><p className={styles.eyebrow}>Want to help?</p><h3>Donate supplies, volunteer, sponsor, or partner.</h3></div>
          <a className={styles.primaryButton} href="#connect">Tell Asc3nd how you want to help</a>
        </div>
      </section>

      <section className={`${styles.section} ${styles.why}`} id="why">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Beyond one event</p>
          <h2>A haircut and backpack can help someone start school with confidence. Asc3nd’s work is meant to continue after that day.</h2>
        </div>

        <div className={styles.missionGrid}>
          <div><h3>Mentorship</h3><p>Consistent adults who listen, guide, and help young people see more possibilities.</p></div>
          <div><h3>Leadership</h3><p>Opportunities for youth to build confidence, responsibility, and a sense of purpose.</p></div>
          <div><h3>Life skills + athletics</h3><p>Practical experiences that support growth, wellness, teamwork, and resilience.</p></div>
          <div><h3>Community connection</h3><p>Families, mentors, schools, churches, businesses, and neighbors working around young people together.</p></div>
        </div>

        <blockquote className={styles.founderStory}>
          <p>Asc3nd Collective was founded by Otha and Elisha Minnifield from a belief that one caring mentor or one positive opportunity can change the direction of a young person’s life.</p>
        </blockquote>
      </section>

      <section className={styles.section} data-theme-section="join" aria-labelledby="join-heading">
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>Find your place</p><h2 id="join-heading">There is more than one way to show up.</h2></div>
        <div className={styles.joinGrid} data-surface="card-grid">{waysToJoin.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.connect}`} id="connect">
        <div className={styles.connectCopy}>
          <p className={styles.eyebrow}>Plan with Asc3nd</p>
          <h2>Tell us whether you expect to attend or want to help.</h2>
          <p>Your response gives the team a better demand signal for haircuts, supplies, food, volunteers, and community support. It is not a reservation or guarantee.</p>
          <div className={styles.privacyNote} data-surface="note"><strong>Youth privacy matters.</strong><p>This public form does not ask for a child’s name, age, school, story, health information, or other sensitive personal information. Photo, video, testimonial, and youth participation consent are separate processes.</p></div>
        </div>
        <div data-surface="form"><EventInterestForm /></div>
      </section>

      <section className={styles.faq} data-theme-section="faq" aria-labelledby="faq-heading">
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>Event details</p><h2 id="faq-heading">What families and supporters should know.</h2></div>
        <dl>
          <div><dt>When is the event?</dt><dd>Sunday, August 30, 2026, from 12:00 PM to 3:00 PM.</dd></div>
          <div><dt>Where is it?</dt><dd>Tangles &amp; Locs, 7425 Hardeson Rd, Everett, WA 98203.</dd></div>
          <div><dt>What is confirmed?</dt><dd>Free haircuts for kids, school supplies and giveaways, food, fun, and community.</dd></div>
          <div><dt>Does this form reserve a haircut?</dt><dd>No. The form helps Asc3nd estimate interest and prepare. Haircuts and all event items are first come, first served and available while capacity and supplies last.</dd></div>
          <div><dt>Should I enter information about my child?</dt><dd>No. Do not enter child names, ages, schools, health information, family stories, or other sensitive details. Any participation or media consent will be handled separately.</dd></div>
          <div><dt>Who can donate supplies?</dt><dd>Community members, businesses, churches, schools, teams, and organizations can express interest now. Verified drop-off instructions will be shared directly when finalized.</dd></div>
        </dl>
      </section>

      <footer className={styles.footer}>
        <div><span className={styles.brandMain}>ASC<span>3</span>ND</span><p>Empower youth. Elevate futures. Build community.</p></div>
        <span className={styles.footerNote}>Community Cuts for Kids · Everett, Washington</span>
      </footer>
    </main>
  );
}
