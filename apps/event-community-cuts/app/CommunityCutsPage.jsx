import Image from 'next/image';
import { EventInterestForm } from './EventInterestForm.jsx';
import { normalizeParticipation } from './event-form-contract.js';
import { getEventContent } from './event-content.js';
import styles from './event-page.module.css';

const googleDirections = 'https://www.google.com/maps/dir/?api=1&destination=7425+Hardeson+Rd%2C+Everett%2C+WA+98203';
const supplyLists = 'https://www.everettsd.org/families/school-supply-lists';

function interestHref(locale, intent) {
  const pathname = locale === 'es' ? '/es' : '/';
  return `${pathname}?intent=${encodeURIComponent(intent)}#connect`;
}

function renderFaqAnswer(item) {
  if (!item.emphasis) return item.answer;

  const emphasisStart = item.answer.indexOf(item.emphasis);
  if (emphasisStart === -1) return item.answer;

  const emphasisEnd = emphasisStart + item.emphasis.length;
  return (
    <>
      {item.answer.slice(0, emphasisStart)}
      <strong>{item.answer.slice(emphasisStart, emphasisEnd)}</strong>
      {item.answer.slice(emphasisEnd)}
    </>
  );
}

export function CommunityCutsPage({ locale = 'en', initialInterest = 'attend' }) {
  const content = getEventContent(locale);
  const selectedInterest = normalizeParticipation(initialInterest);
  const isSpanish = locale === 'es';

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="#event" aria-label={content.brandAria}>
          <Image
            className={styles.brandLogo}
            src="/images/asc3nd-client-logo-transparent.png"
            alt="The Asc3nd Collective"
            width={512}
            height={512}
            priority
          />
        </a>
        <nav className={styles.nav} aria-label={content.nav.aria}>
          <a href="#event">{content.nav.event}</a>
          <a href="#before">{content.nav.before}</a>
          <a href="#supplies">{content.nav.supplies}</a>
          <a className={styles.navCta} href={interestHref(locale, 'attend')}>
            {content.nav.attend}
          </a>
          <a className={styles.languageToggle} href={content.languageHref} lang={isSpanish ? 'en' : 'es'}>
            {content.languageLabel}
          </a>
        </nav>
      </header>

      <section className={styles.hero} id="event" aria-labelledby="event-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
          <h1 id="event-title">
            <span>{content.hero.titleCommunity}</span>
            <span className={styles.titleCuts}>{content.hero.titleCuts}</span>
            <span className={styles.titleBottom}>{content.hero.titleBottom}</span>
          </h1>
          <p className={styles.campaignLine}>{content.hero.campaignLine}</p>
          <p className={styles.heroLead}>{content.hero.description}</p>

          <div className={styles.heroFacts}>
            {content.hero.facts.map((fact) => (
              <div key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
                {fact.detail ? <small>{fact.detail}</small> : null}
              </div>
            ))}
          </div>

          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href={interestHref(locale, 'attend')}>
              {content.hero.primaryAction}
            </a>
            <a className={styles.textAction} href={googleDirections} target="_blank" rel="noreferrer">
              {content.hero.navigate} <span aria-hidden="true">↗</span>
            </a>
          </div>

          <p className={styles.availabilityNote}>
            <strong>{content.hero.goodToKnowTitle}</strong>{' '}
            {content.hero.goodToKnow}
          </p>
        </div>

        <figure className={styles.venueFigure}>
          <Image
            src="/images/tangles-locs-exterior.jpg"
            alt={content.hero.venueAlt}
            width={815}
            height={1024}
            sizes="(max-width: 900px) 100vw, 42vw"
            priority
          />
          <figcaption className={styles.venueCaption}>
            <span>{isSpanish ? 'Lugar del evento' : 'Event venue'}</span>
            <strong>Tangles & Locs</strong>
            <small>7425 Hardeson Rd · Everett, WA</small>
          </figcaption>
        </figure>
      </section>

      <div className={styles.serviceStrip} role="list" aria-label={isSpanish ? 'Servicios del evento' : 'Event services'}>
        {content.hero.features.map((feature) => (
          <p role="listitem" key={feature.label}>{feature.label}</p>
        ))}
      </div>

      <section className={styles.expect} aria-labelledby="expect-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{content.expect.eyebrow}</p>
          <h2 id="expect-heading">{content.expect.headline}</h2>
          <p>{content.expect.body}</p>
        </div>
        <div className={styles.expectGrid}>
          {content.expect.items.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.essentials} id="before" aria-labelledby="before-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{content.before.eyebrow}</p>
          <h2 id="before-heading">{content.before.headline}</h2>
          <p>{content.before.body}</p>
        </div>

        <div className={styles.detailGrid}>
          {content.before.facts.map((fact) => (
            <article key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
              {fact.detail ? <p>{fact.detail}</p> : null}
            </article>
          ))}
        </div>

        <a className={styles.secondaryButton} href={googleDirections} target="_blank" rel="noreferrer">
          {content.before.directionAction}
        </a>
      </section>

      <section className={styles.familyBridge} aria-labelledby="family-heading">
        <div>
          <p className={styles.eyebrow}>{content.family.eyebrow}</p>
          <h2 id="family-heading">{content.family.headline}</h2>
          <p>{content.family.body}</p>
        </div>
        <a className={styles.primaryButton} href={interestHref(locale, 'attend')}>{content.family.action}</a>
      </section>

      <section className={styles.join} id="join" aria-labelledby="join-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{content.join.eyebrow}</p>
          <h2 id="join-heading">{content.join.headline}</h2>
        </div>
        <div className={styles.joinGrid}>
          {content.join.cards.map((card) => (
            <article key={card.title}>
              <span>{card.title}</span>
              <h3>{card.actionTitle}</h3>
              <p>{card.body}</p>
              <a href={interestHref(locale, card.intent)}>{card.button}</a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.connect} id="connect" aria-labelledby="connect-heading">
        <div className={styles.connectCopy}>
          <p className={styles.eyebrow}>{content.formIntro.eyebrow}</p>
          <h2 id="connect-heading">{content.formIntro.headline}</h2>
          <p>{content.formIntro.body}</p>
          <div className={styles.privacyNote}>
            <strong>{content.formIntro.privacyTitle}</strong>
            <p>{content.formIntro.privacyBody}</p>
          </div>
        </div>
        <div className={styles.formSurface}>
          <EventInterestForm
            key={selectedInterest}
            copy={content.form}
            locale={locale}
            initialInterest={selectedInterest}
          />
        </div>
      </section>

      <section className={styles.support} id="supplies" aria-labelledby="supplies-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{content.supplies.eyebrow}</p>
          <h2 id="supplies-heading">{content.supplies.headline}</h2>
          {content.supplies.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <div className={styles.supportGrid}>
          <div className={styles.supplyList}>
            {content.supplies.groups.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.items.join(' · ')}</p>
              </article>
            ))}
            <a className={styles.textActionDark} href={supplyLists} target="_blank" rel="noreferrer">
              {content.supplies.supplyLink} <span aria-hidden="true">↗</span>
            </a>
          </div>

          <aside className={styles.helpPanel}>
            <p className={styles.eyebrow}>{content.supplies.helpEyebrow}</p>
            <h3>{content.supplies.helpHeadline}</h3>
            <p>{content.supplies.helpBody}</p>
            <a className={styles.lightButton} href={interestHref(locale, 'general')}>
              {content.supplies.helpButton}
            </a>
          </aside>
        </div>
      </section>

      <section className={styles.mission} aria-labelledby="mission-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{content.mission.eyebrow}</p>
          <h2 id="mission-heading">{content.mission.headline}</h2>
        </div>
        <div className={styles.missionGrid}>
          {content.mission.items.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <p className={styles.missionTie}>{content.mission.tie}</p>
        <blockquote>{content.mission.founderStory}</blockquote>
      </section>

      <section className={styles.faq} aria-labelledby="faq-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{content.faq.eyebrow}</p>
          <h2 id="faq-heading">{content.faq.headline}</h2>
        </div>
        <div className={styles.faqList}>
          {content.faq.items.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}</summary>
              <p>{renderFaqAnswer(item)}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <Image
            className={styles.footerLogo}
            src="/images/asc3nd-client-logo-transparent.png"
            alt="The Asc3nd Collective"
            width={512}
            height={512}
          />
          <p>{content.footer.tagline}</p>
        </div>
        <span>{content.footer.note}</span>
      </footer>

      <a className={styles.mobileStickyCta} href={interestHref(locale, 'attend')}>
        {content.mobileAction}
      </a>
    </main>
  );
}
