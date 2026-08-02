import Image from 'next/image';
import { EventInterestForm } from './EventInterestForm.jsx';
import { normalizeParticipation } from './event-form-contract.js';
import { getEventContent } from './event-content.js';
import styles from './event.module.css';
import premium from './premium.module.css';
import visualStyles from './visual-fixes.module.css';
import campaign from './customer-feedback.module.css';

const googleDirections = 'https://www.google.com/maps/dir/?api=1&destination=7425+Hardeson+Rd%2C+Everett%2C+WA+98203';
const appleDirections = 'https://maps.apple.com/?daddr=7425+Hardeson+Rd%2C+Everett%2C+WA+98203&dirflg=d';
const supplyLists = 'https://www.everettsd.org/families/school-supply-lists';

function EventIcon({ name }) {
  if (name === 'scissors') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="12" cy="34" r="6" />
        <circle cx="12" cy="14" r="6" />
        <path d="m17 18 23 14M17 30 40 16M21 24h9" />
      </svg>
    );
  }
  if (name === 'backpack') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M15 15a9 9 0 0 1 18 0v4M12 18h24v24H12zM17 25h14v10H17zM8 24v12M40 24v12" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="14" r="6" />
      <circle cx="10" cy="20" r="5" />
      <circle cx="38" cy="20" r="5" />
      <path d="M13 40v-5a11 11 0 0 1 22 0v5M3 40v-4a8 8 0 0 1 9-8M45 40v-4a8 8 0 0 0-9-8" />
    </svg>
  );
}

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

  return (
    <main className={`${styles.page} ${premium.pagePremium} ${campaign.page}`}>
      <header className={styles.header}>
        <a className={styles.brand} href="#event" aria-label={content.brandAria}>
          <Image
            className={styles.brandLogo}
            src="/images/asc3nd-client-logo-transparent.png"
            alt="The Asc3nd Collective"
            width={512}
            height={512}
          />
        </a>
        <nav className={styles.nav} aria-label={content.nav.aria}>
          <a href="#event">{content.nav.event}</a>
          <a href="#before">{content.nav.before}</a>
          <a href="#supplies">{content.nav.supplies}</a>
          <a className={`${styles.navCta} ${premium.navAction}`} href={interestHref(locale, 'attend')}>
            {content.nav.attend}
          </a>
          <a className={`${premium.languageLink} ${styles.languageToggle}`} href={content.languageHref} lang={locale === 'es' ? 'en' : 'es'}>
            {content.languageLabel}
          </a>
        </nav>
      </header>

      <section className={`${styles.hero} ${premium.heroPremium} ${campaign.hero}`} id="event" aria-labelledby="event-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
          <h1 className={campaign.campaignTitle} id="event-title">
            <Image
              className={campaign.campaignTitleArtwork}
              src={locale === 'es'
                ? '/images/cortes-comunitarios-para-ninos.png'
                : '/images/community-cuts-for-kids.png'}
              alt={locale === 'es' ? 'Cortes Comunitarios para Niños' : 'Community Cuts for Kids'}
              width={1200}
              height={896}
              sizes="(max-width: 720px) calc(100vw - 40px), 50vw"
              priority
              unoptimized
            />
          </h1>
          <p className={`${premium.heroPromise} ${campaign.campaignLine}`}>{content.hero.campaignLine}</p>
          <p className={styles.heroLead}>{content.hero.description}</p>

          <div className={campaign.featureStrip} role="list" aria-label={locale === 'es' ? 'Aspectos destacados del evento' : 'Event highlights'}>
            {content.hero.features.map((feature, index) => (
              <div className={campaign.feature} role="listitem" key={feature.label}>
                <span className={campaign[`featureIcon${index + 1}`]}><EventIcon name={feature.icon} /></span>
                <strong>{feature.label}</strong>
              </div>
            ))}
          </div>

          <div className={styles.eventFacts}>
            {content.hero.facts.map((fact) => (
              <div key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
                {fact.detail ? <small>{fact.detail}</small> : null}
              </div>
            ))}
          </div>

          <div className={styles.heroActions}>
            <a className={`${styles.primaryButton} ${premium.primaryAction}`} href={interestHref(locale, 'attend')}>
              {content.hero.primaryAction}
            </a>
            <a className={`${styles.secondaryButton} ${premium.secondaryAction}`} href="#join">
              {content.hero.secondaryAction}
            </a>
          </div>
          <p className={`${styles.pendingNote} ${campaign.goodToKnow}`}>
            <strong>{content.hero.goodToKnowTitle}</strong> {content.hero.goodToKnow}
          </p>
        </div>

        <figure className={visualStyles.heroFigure}>
          <div className={visualStyles.venuePhotoStack}>
            <Image
              src="/images/tangles-locs-exterior.jpg"
              alt={content.hero.venueAlt}
              width={815}
              height={1024}
              sizes="(max-width: 980px) 100vw, 42vw"
              preload
            />
          </div>
          <figcaption className={visualStyles.venueActions}>
            <a className={visualStyles.venuePrimary} href={googleDirections} target="_blank" rel="noreferrer">
              {content.hero.navigate}
            </a>
            <div className={visualStyles.venueSecondaryRow}>
              <a className={visualStyles.venueSecondary} href={googleDirections} target="_blank" rel="noreferrer">
                {content.hero.googleMaps}
              </a>
              <a className={visualStyles.venueSecondary} href={appleDirections} target="_blank" rel="noreferrer">
                {content.hero.appleMaps}
              </a>
            </div>
            <p className={visualStyles.venueAddress}>{content.hero.venueAddress}</p>
          </figcaption>
        </figure>
      </section>

      <section className={`${styles.section} ${premium.expectSection}`} aria-labelledby="expect-heading">
        <div className={`${styles.sectionIntro} ${premium.sectionHeading}`}>
          <p className={styles.eyebrow}>{content.expect.eyebrow}</p>
          <h2 id="expect-heading">{content.expect.headline}</h2>
          <p>{content.expect.body}</p>
        </div>
        <div className={premium.expectEditorial}>
          <div aria-hidden="true" />
          <div>
            {content.expect.items.map((item, index) => (
              <article className={premium.expectItem} key={item.title}>
                <span className={premium.expectNumber}>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{item.title}</h3><p>{item.body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${premium.beforeSection}`} id="before" aria-labelledby="before-heading">
        <div className={`${styles.sectionIntro} ${premium.sectionHeading}`}>
          <p className={styles.eyebrow}>{content.before.eyebrow}</p>
          <h2 id="before-heading">{content.before.headline}</h2>
          <p>{content.before.body}</p>
        </div>
        <div className={premium.beforeGrid}>
          {content.before.facts.map((fact) => (
            <div key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
              {fact.detail ? <small>{fact.detail}</small> : null}
            </div>
          ))}
        </div>
        <a className={`${styles.primaryButton} ${premium.directionAction}`} href={googleDirections} target="_blank" rel="noreferrer">
          {content.before.directionAction}
        </a>
      </section>

      <section className={premium.conversionBridge} aria-labelledby="family-heading">
        <div>
          <p className={styles.eyebrow}>{content.family.eyebrow}</p>
          <h2 id="family-heading">{content.family.headline}</h2>
          <p className={campaign.bridgeBody}>{content.family.body}</p>
        </div>
        <a className={`${styles.primaryButton} ${premium.primaryAction}`} href={interestHref(locale, 'attend')}>{content.family.action}</a>
      </section>

      <section className={styles.section} id="supplies" aria-labelledby="supplies-heading">
        <div className={`${styles.sectionIntro} ${premium.sectionHeading} ${premium.supplyIntro}`}>
          <p className={styles.eyebrow}>{content.supplies.eyebrow}</p>
          <h2 id="supplies-heading">{content.supplies.headline}</h2>
          {content.supplies.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p>
            <a className={premium.inlineLink} href={supplyLists} target="_blank" rel="noreferrer">
              {content.supplies.supplyLink}
            </a>
          </p>
        </div>
        <div className={premium.supplyGroups}>
          {content.supplies.groups.map((group) => (
            <article className={premium.supplyGroup} key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <aside className={`${styles.callout} ${campaign.helpCallout}`}>
          <div>
            <p className={styles.eyebrow}>{content.supplies.helpEyebrow}</p>
            <h3>{content.supplies.helpHeadline}</h3>
            <p>{content.supplies.helpBody}</p>
          </div>
          <a className={styles.primaryButton} href={interestHref(locale, 'general')}>{content.supplies.helpButton}</a>
        </aside>
      </section>

      <section className={`${styles.section} ${styles.why}`} id="mission" aria-labelledby="mission-heading">
        <div className={`${styles.sectionIntro} ${premium.sectionHeading}`}>
          <p className={styles.eyebrow}>{content.mission.eyebrow}</p>
          <h2 id="mission-heading">{content.mission.headline}</h2>
        </div>
        <div className={premium.missionEditorial}>
          {content.mission.items.map((item) => (
            <article className={premium.missionItem} key={item.title}>
              <h3>{item.title}</h3><p>{item.body}</p>
            </article>
          ))}
        </div>
        <p className={campaign.missionTie}>{content.mission.tie}</p>
        <blockquote className={`${styles.founderStory} ${premium.founderQuote}`}>
          <p>{content.mission.founderStory}</p>
        </blockquote>
      </section>

      <section className={styles.section} id="join" aria-labelledby="join-heading">
        <div className={`${styles.sectionIntro} ${premium.sectionHeading}`}>
          <p className={styles.eyebrow}>{content.join.eyebrow}</p>
          <h2 id="join-heading">{content.join.headline}</h2>
        </div>
        <div className={premium.joinEditorial}>
          {content.join.cards.map((card) => (
            <article className={premium.joinItem} key={card.title}>
              <p className={campaign.cardLabel}>{card.title}</p>
              <h3>{card.actionTitle}</h3>
              <p>{card.body}</p>
              <a className={premium.cardAction} href={interestHref(locale, card.intent)}>{card.button}</a>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.connect}`} id="connect" aria-labelledby="connect-heading">
        <div className={styles.connectCopy}>
          <p className={styles.eyebrow}>{content.formIntro.eyebrow}</p>
          <h2 id="connect-heading">{content.formIntro.headline}</h2>
          <p>{content.formIntro.body}</p>
          <div className={styles.privacyNote} data-surface="note">
            <strong>{content.formIntro.privacyTitle}</strong>
            <p>{content.formIntro.privacyBody}</p>
          </div>
        </div>
        <div className={premium.formSurface} data-surface="form">
          <EventInterestForm
            key={selectedInterest}
            copy={content.form}
            locale={locale}
            initialInterest={selectedInterest}
          />
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="faq-heading">
        <div className={`${styles.sectionIntro} ${premium.sectionHeading}`}>
          <p className={styles.eyebrow}>{content.faq.eyebrow}</p>
          <h2 id="faq-heading">{content.faq.headline}</h2>
        </div>
        <dl>
          {content.faq.items.map((item) => (
            <div key={item.question}>
              <dt>{item.question}</dt>
              <dd className={campaign.faqAnswer}>{renderFaqAnswer(item)}</dd>
            </div>
          ))}
        </dl>
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
        <span className={styles.footerNote}>{content.footer.note}</span>
      </footer>

      <a className={premium.mobileStickyCta} href={interestHref(locale, 'attend')}>{content.mobileAction}</a>
    </main>
  );
}
