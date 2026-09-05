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

        <div className={styles.logoStage}>
          <img
            className={styles.secondaryLogo}
            src="/images/asc3nd-secondary-logo-transparent.svg"
            alt="ASC3ND Collective logo"
            width="568"
            height="330"
          />
        </div>

        <h1 className={styles.statementStack} id="holding-title">
          <span>Empower Youth</span>
          <span>Elevate Futures</span>
          <span>Build Community</span>
        </h1>

        <div className={styles.thankYouBlock}>
          <h2 className={styles.thankYouTitle}>Thank you for supporting ASC3ND.</h2>
          <p className={styles.thankYouCopy}>
            Your support helps us create more opportunities, stronger connections, and better futures for young people in our community.
          </p>
          <p className={styles.thankYouCopy}>
            We’re building the next chapter now. Stay connected and we’ll keep you updated.
          </p>
        </div>

        <p className={styles.stay}>Stay connected.</p>

        <HoldingSignupForm />
      </section>
    </main>
  );
}
