import Image from 'next/image';
import HoldingSignupForm from './HoldingSignupForm.jsx';
import styles from './holding.module.css';

export const metadata = {
  title: 'ASC3ND Collective',
  description: 'ASC3ND is building the next chapter. Stay connected for programs, events, and opportunities for young people and the community.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'ASC3ND Collective',
    description: 'Empower Youth. Elevate Futures. Build Community.',
    url: '/',
  },
  twitter: {
    card: 'summary',
    title: 'ASC3ND Collective',
    description: 'Empower Youth. Elevate Futures. Build Community.',
  },
};

export default function Asc3ndHoldingPage() {
  return (
    <main className={styles.page}>
      <section className={styles.shell} aria-labelledby="holding-title">
        <Image
          className={styles.anchor}
          src="/images/asc3nd-anchor.webp"
          alt="ASC3ND Collective"
          width={800}
          height={896}
          priority
          sizes="(max-width: 640px) calc(100vw - 32px), 560px"
        />

        <h1 className={styles.tagline} id="holding-title">
          Empower Youth. Elevate Futures. Build Community.
        </h1>

        <p className={styles.note}>
          We’re building the next chapter of ASC3ND. Our new website is on the way.
        </p>

        <p className={styles.stay}>Stay connected.</p>

        <HoldingSignupForm />
      </section>
    </main>
  );
}
