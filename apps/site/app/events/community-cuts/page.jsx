import Link from 'next/link';
import { PublicNav } from '../../../components/PublicNav';
import styles from './page.module.css';

export const metadata = {
  title: 'Community Cuts for Kids | Asc3nd Collective',
  description: 'Asc3nd Collective’s 2026 back-to-school Community Cuts for Kids event in Everett, Washington.'
};

const confirmedHighlights = [
  'Free haircuts for kids',
  'School supplies and giveaways',
  'Food and community participation'
];

const pendingDetails = [
  'Event start and end time',
  'Registration and walk-in rules',
  'Age, grade, residency, and capacity requirements',
  'School-supply eligibility and distribution rules',
  'Volunteer and barber participation details',
  'Accessibility accommodations and event-day procedures'
];

export default function CommunityCutsPage() {
  return (
    <>
      <PublicNav />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="event-title">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>ASC3ND BACK-TO-SCHOOL 2026</p>
            <h1 id="event-title">Community Cuts for Kids</h1>
            <p className={styles.lead}>
              A back-to-school community event supporting local students and families through haircuts,
              school supplies, giveaways, food, and community participation.
            </p>

            <dl className={styles.facts}>
              <div>
                <dt>Date</dt>
                <dd>Sunday, August 30, 2026</dd>
              </div>
              <div>
                <dt>Venue</dt>
                <dd>Tangles &amp; Locs</dd>
              </div>
              <div>
                <dt>Flyer address</dt>
                <dd>7425 Hardeson Rd, Everett, WA 98203</dd>
              </div>
            </dl>

            <div className={styles.notice} role="status">
              <strong>Registration details are being confirmed.</strong>
              <span>
                We will publish the event time, eligibility, capacity, registration, volunteer, and accessibility
                details after they are verified. No registration is open from this page yet.
              </span>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="expect-heading">
          <div className={styles.contentGrid}>
            <div>
              <p className={styles.kicker}>WHAT IS CONFIRMED</p>
              <h2 id="expect-heading">What families can expect</h2>
              <p>
                The current event materials identify the following activities. Final eligibility, quantities, and
                availability are still being verified before public registration opens.
              </p>
            </div>
            <ul className={styles.cardList}>
              {confirmedHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.section} ${styles.darkSection}`} aria-labelledby="pending-heading">
          <div className={styles.contentGrid}>
            <div>
              <p className={styles.kicker}>BEFORE REGISTRATION OPENS</p>
              <h2 id="pending-heading">Details still being verified</h2>
              <p>
                Asc3nd will not publish guessed event information. These details must be confirmed before the page
                becomes a registration or participation destination.
              </p>
            </div>
            <ul className={styles.pendingList}>
              {pendingDetails.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="participate-heading">
          <div className={styles.participate}>
            <p className={styles.kicker}>GET INVOLVED</p>
            <h2 id="participate-heading">Attend, volunteer, serve, sponsor, or support</h2>
            <p>
              Separate participation paths will be activated after the corresponding signup and contact destinations
              are verified. This prevents families, volunteers, barbers, and sponsors from being sent to broken or
              unapproved forms.
            </p>
            <div className={styles.actionGrid} aria-label="Participation paths pending verification">
              {['Attend / Register', 'Volunteer', 'Barber / Service Provider', 'Sponsor / Partner', 'Donate'].map((label) => (
                <div className={styles.actionCard} key={label}>
                  <strong>{label}</strong>
                  <span>Destination pending verification</span>
                </div>
              ))}
            </div>
            <Link className={styles.backLink} href="/">← Back to Asc3nd Collective</Link>
          </div>
        </section>
      </main>
    </>
  );
}
