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

  const essentials = isSpanish
    ? [
      { label: 'Cuándo', value: 'Domingo, 30 de agosto', detail: '12:00–3:00 PM' },
      { label: 'Dónde', value: 'Tangles & Locs', detail: '7425 Hardeson Rd, Everett' },
      { label: 'Costo', value: 'Gratis', detail: 'Mientras haya cupo y existencias' },
    ]
    : [
      { label: 'When', value: 'Sunday, August 30', detail: '12:00–3:00 PM' },
      { label: 'Where', value: 'Tangles & Locs', detail: '7425 Hardeson Rd, Everett' },
      { label: 'Cost', value: 'Free', detail: 'While capacity and supplies last' },
    ];

  const heroLead = isSpanish
    ? 'Cortes de cabello, útiles escolares, comida y apoyo comunitario gratuitos para ayudar a los estudiantes a comenzar el año con confianza.'
    : 'Free haircuts, school supplies, food, and community support to help students start the school year with confidence.';

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
          <p className={styles.heroLead}>{heroLead}</p>

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
            {isSpanish
              ? 'Los servicios se ofrecen por orden de llegada. Tu confirmación nos ayuda a prepararnos, pero no reserva un lugar.'
              : 'Services are first come, first served. Your RSVP helps us prepare but does not reserve a place in line.'}
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

      <section className={styles.essentials} id="before" aria-labelledby="before-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{content.before.eyebrow}</p>
          <h2 id="before-heading">{isSpanish ? 'Lo esencial. Sin sorpresas.' : 'The essentials. No surprises.'}</h2>
          <p>{isSpanish
            ? 'Todo lo que necesitas para decidir, planificar tu llegada y disfrutar el evento.'
            : 'Everything you need to decide, plan your arrival, and enjoy the event.'}</p>
        </div>

        <div className={styles.essentialGrid}>
          {essentials.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>

        <div className={styles.arrivalPanel}>
          <div>
            <h3>{isSpanish ? 'Llega temprano' : 'Arrive early'}</h3>
            <p>{isSpanish
              ? 'Los cortes de cabello y los útiles se entregan por orden de llegada mientras haya capacidad y existencias.'
              : 'Haircuts and school supplies are available first come, first served while capacity and supplies last.'}</p>
          </div>
          <a className={styles.secondaryButton} href={googleDirections} target="_blank" rel="noreferrer">
            {content.before.directionAction}
          </a>
        </div>
      </section>

      <section className={styles.connect} id="connect" aria-labelledby="connect-heading">
        <div className={styles.connectCopy}>
          <p className={styles.eyebrow}>{isSpanish ? 'CONFIRMA TU ASISTENCIA' : 'RSVP FOR YOUR FAMILY'}</p>
          <h2 id="connect-heading">{isSpanish ? 'Avísanos que vienes.' : 'Let us know you’re coming.'}</h2>
          <p>{isSpanish
            ? 'Tu respuesta ayuda a The Asc3nd Collective a prepararse para servir a tantas familias como sea posible.'
            : 'Your response helps The Asc3nd Collective prepare to serve as many families as possible.'}</p>
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
          <p>{content.supplies.body[0]}</p>
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
        <p className={styles.eyebrow}>{content.mission.eyebrow}</p>
        <h2 id="mission-heading">{isSpanish ? 'Este evento es parte de algo más grande.' : 'This event is part of something bigger.'}</h2>
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
