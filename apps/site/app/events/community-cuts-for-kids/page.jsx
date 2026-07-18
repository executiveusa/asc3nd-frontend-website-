import Link from 'next/link';
import { EventInterestForm } from './EventInterestForm';
import styles from './event.module.css';

export const metadata = {
  title: 'Community Cuts for Kids | Asc3nd Collective',
  description:
    'Community Cuts for Kids is Asc3nd Collective’s back-to-school community event in Everett, Washington, with free haircuts for kids, school supplies, giveaways, food, and community connection.',
};

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
    body: 'Come connect with Asc3nd and the Everett community. Event timing, eligibility, and participation details will be posted here as they are confirmed.',
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
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Asc3nd Collective home">
          <span className={styles.brandMain}>ASC<span>3</span>ND</span>
          <span className={styles.brandSub}>COLLECTIVE</span>
        </Link>
        <nav className={styles.nav} aria-label="Event navigation">
          <a href="#event">Event</a>
          <a href="#supplies">Supplies</a>
          <a href="#why">Why Asc3nd</a>
          <a className={styles.navCta} href="#connect">Get updates</a>
        </nav>
      </header>

      <section className={styles.hero} id="event">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Asc3nd Collective presents</p>
          <h1>Community Cuts<br />for Kids</h1>
          <p className={styles.heroLead}>A back-to-school community day built around confidence, preparation, and connection.</p>

          <div className={styles.eventFacts}>
            <div>
              <span>Date</span>
              <strong>Sunday, August 30, 2026</strong>
            </div>
            <div>
              <span>Location</span>
              <strong>Tangles &amp; Locs</strong>
              <small>7425 Hardeson Rd, Everett, WA 98203</small>
            </div>
          </div>

          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#connect">Get event updates</a>
            <a className={styles.secondaryButton} href="#supplies">Help equip a student</a>
          </div>

          <p className={styles.pendingNote}>Start/end time, participation details, and capacity are still being confirmed. We will not guess or publish them early.</p>
        </div>

        <div className={styles.heroPanel} aria-label="What families can expect">
          <p className={styles.panelLabel}>What families can expect</p>
          <div className={styles.featureList}>
            <article>
              <span>01</span>
              <div><h2>Free haircuts for kids</h2><p>A fresh start for the school year.</p></div>
            </article>
            <article>
              <span>02</span>
              <div><h2>School supplies + giveaways</h2><p>Practical support for a prepared first day.</p></div>
            </article>
            <article>
              <span>03</span>
              <div><h2>Food, fun + community</h2><p>A day to meet people, connect, and build together.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section} id="supplies">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Supplies for Success</p>
          <h2>Help a student start the year ready.</h2>
          <p>
            Asc3nd’s school-supply collection runs July 15–August 15, 2026. The goal is simple: gather useful school essentials and put them into the hands of local students and families through the back-to-school campaign.
          </p>
        </div>

        <div className={styles.supplyGrid}>
          {supplies.map((item) => <div key={item}>{item}</div>)}
        </div>

        <div className={styles.callout}>
          <div>
            <p className={styles.eyebrow}>Want to help?</p>
            <h3>Donate supplies, volunteer, sponsor, or partner.</h3>
          </div>
          <a className={styles.primaryButton} href="#connect">Tell Asc3nd how you want to help</a>
        </div>
      </section>

      <section className={`${styles.section} ${styles.why}`} id="why">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Beyond one event</p>
          <h2>A haircut and backpack can help someone start school with confidence. Asc3nd’s work is meant to continue after that day.</h2>
        </div>

        <div className={styles.missionGrid}>
          <div>
            <h3>Mentorship</h3>
            <p>Consistent adults who listen, guide, and help young people see more possibilities.</p>
          </div>
          <div>
            <h3>Leadership</h3>
            <p>Opportunities for youth to build confidence, responsibility, and a sense of purpose.</p>
          </div>
          <div>
            <h3>Life skills + athletics</h3>
            <p>Practical experiences that support growth, wellness, teamwork, and resilience.</p>
          </div>
          <div>
            <h3>Community connection</h3>
            <p>Families, mentors, schools, churches, businesses, and neighbors working around young people together.</p>
          </div>
        </div>

        <blockquote className={styles.founderStory}>
          <p>Asc3nd Collective was founded by Otha and Elisha Minnifield from a belief that one caring mentor or one positive opportunity can change the direction of a young person’s life.</p>
        </blockquote>
      </section>

      <section className={styles.section} aria-labelledby="join-heading">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Find your place</p>
          <h2 id="join-heading">There is more than one way to show up.</h2>
        </div>
        <div className={styles.joinGrid}>
          {waysToJoin.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.connect}`} id="connect">
        <div className={styles.connectCopy}>
          <p className={styles.eyebrow}>Stay connected</p>
          <h2>Get the confirmed event details when they are ready.</h2>
          <p>
            Tell Asc3nd whether you plan to attend, want to volunteer, can donate supplies, or want to support as a sponsor or community partner. We only ask for the contact information needed to follow up.
          </p>
          <div className={styles.privacyNote}>
            <strong>Youth privacy matters.</strong>
            <p>This public form does not ask for a child’s name, age, story, or sensitive personal information. Photo, video, testimonial, and youth participation consent are separate processes.</p>
          </div>
        </div>
        <EventInterestForm />
      </section>

      <section className={styles.faq} aria-labelledby="faq-heading">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>What we know today</p>
          <h2 id="faq-heading">Clear facts. No filler.</h2>
        </div>
        <dl>
          <div><dt>When is the event?</dt><dd>Sunday, August 30, 2026. The start and end time still need confirmation.</dd></div>
          <div><dt>Where is it?</dt><dd>Tangles &amp; Locs, 7425 Hardeson Rd, Everett, WA 98203.</dd></div>
          <div><dt>What is confirmed?</dt><dd>Free haircuts for kids, school supplies and giveaways, food, fun, and community.</dd></div>
          <div><dt>Do families need to RSVP?</dt><dd>The participation model is still being finalized. Use the update form so Asc3nd can send confirmed details instead of guessing.</dd></div>
          <div><dt>Who can donate supplies?</dt><dd>Community members, businesses, churches, schools, teams, and organizations can express interest now. Drop-off details still need confirmation.</dd></div>
        </dl>
      </section>

      <footer className={styles.footer}>
        <div>
          <span className={styles.brandMain}>ASC<span>3</span>ND</span>
          <p>Empower youth. Elevate futures. Build community.</p>
        </div>
        <Link href="/">Back to Asc3nd Collective</Link>
      </footer>
    </main>
  );
}
