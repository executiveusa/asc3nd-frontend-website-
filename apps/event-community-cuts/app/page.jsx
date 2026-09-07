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
        <div className={styles.logoStage}>
          <Image
            className={styles.secondaryLogo}
            src="/images/asc3nd-logo-transparent-tight-v2.png"
            alt="ASC3ND Collective"
            width={1380}
            height={750}
            priority
            unoptimized
          />
        </div>
        <h1 className={styles.statementStack} id="holding-title">
          <span>Empower Youth</span>
          <span>Elevate Futures</span>
          <span>Build Community</span>
        </h1>
        <div className={styles.thankYouBlock}>
          <h2 className={styles.thankYouTitle}>Thank you for supporting ASC3ND.</h2>
          <p className={styles.thankYouCopy}>We’re building the next chapter now. Stay connected and we’ll keep you updated.</p>
        </div>
        <HoldingSignupForm />
      </section>
    </main>
  );
}
