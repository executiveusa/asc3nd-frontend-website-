'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Asc3ndPublicForms } from '../components/Asc3ndPublicForms';
import { PublicNav } from '../components/PublicNav';
import { tenantSite } from '../tenant.config';

// ─── Animation primitives ────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const stagger = {
  show: { transition: { staggerChildren: 0.11 } },
};

function Reveal({ children, className, delay = 0, variants = fadeUp }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.62, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.div>
  );
}

function RevealList({ children, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={stagger}
    >
      {children}
    </motion.div>
  );
}

function RevealItem({ children, className }) {
  return (
    <motion.div className={className} variants={fadeUp} transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

// ─── Static data ─────────────────────────────────────────────────────────────

const impactStats = [
  ['5', 'core program lanes'],
  ['4', 'community pillars'],
  ['100%', 'human-reviewed youth workflows'],
];

const storyCards = [
  ['For youth', 'Confidence, mentorship, leadership, wellness, and academic support in one community-centered pathway.'],
  ['For families', 'A trusted team that communicates clearly, follows up, and helps young people access positive opportunities.'],
  ['For partners', 'A Seattle youth development nonprofit ready for schools, sponsors, volunteers, donors, and civic allies.'],
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const schema = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: tenantSite.orgName,
  slogan: tenantSite.tagline,
  areaServed: tenantSite.region,
  taxID: tenantSite.ein,
  description: tenantSite.heroLead,
  url: typeof window !== 'undefined' ? window.location.origin : 'https://asc3ndcollective.org',
  knowsAbout: ['youth mentorship', 'education support', 'leadership development', 'community engagement', 'life skills', 'wellness'],
};

export default function HomePage() {
  return (
    <>
      <PublicNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="a3-page" id="home">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="a3-hero">
          <motion.div
            className="a3-hero-bg"
            aria-hidden="true"
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
          <div className="a3-container a3-hero-grid">
            <div className="a3-hero-copy">
              <motion.span
                className="a3-kicker"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                {tenantSite.heroEyebrow}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Empowering <em>youth.</em>
                <br />
                Elevating <em>futures.</em>
                <br />
                Building <em>community.</em>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.52 }}
              >
                {tenantSite.heroLead}
              </motion.p>
              <motion.div
                className="a3-hero-actions"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.66 }}
              >
                <a className="a3-button a3-button-gold" href={tenantSite.donationUrl}>
                  Donate today
                </a>
                <a className="a3-button a3-button-outline" href="#volunteer">
                  Volunteer with us
                </a>
              </motion.div>
            </div>
            <motion.div
              className="a3-hero-card"
              aria-label="Asc3nd Collective mission image"
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img
                src="/images/asc3nd-site-reference.jpg"
                alt="Asc3nd Collective youth program in action"
              />
              <div className="a3-hero-card-caption">
                <strong>Seattle youth deserve real pathways.</strong>
                <span>Education. Mentorship. Leadership. Community.</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PILLARS ───────────────────────────────────────────────────── */}
        <section className="a3-pillar-strip" aria-label="Asc3nd mission pillars">
          <RevealList className="a3-container a3-pillars">
            {tenantSite.pillars.map(([title, text]) => (
              <RevealItem key={title}>
                <Pillar title={title} text={text} />
              </RevealItem>
            ))}
          </RevealList>
        </section>

        {/* ── MISSION ───────────────────────────────────────────────────── */}
        <section className="a3-section a3-mission" id="mission">
          <div className="a3-container a3-split">
            <Reveal delay={0}>
              <div className="a3-image-panel">
                <img
                  src="/images/asc3nd-logo.jpg"
                  alt="Asc3nd Collective logo mark"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <div className="a3-section-copy">
              <Reveal delay={0.06}>
                <span className="a3-kicker">Who we are</span>
              </Reveal>
              <Reveal delay={0.12}>
                <h2>We believe in the potential of every youth.</h2>
              </Reveal>
              <Reveal delay={0.18}>
                <p>{tenantSite.mission}</p>
              </Reveal>
              <Reveal delay={0.24}>
                <p>
                  Asc3nd Collective is built for the practical work behind community change:
                  showing up consistently, building trust, opening doors, and giving young
                  people the support they need before opportunity passes them by.
                </p>
              </Reveal>
              <RevealList className="a3-stat-row">
                {impactStats.map(([value, label]) => (
                  <RevealItem key={label}>
                    <div>
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </div>
                  </RevealItem>
                ))}
              </RevealList>
            </div>
          </div>
        </section>

        {/* ── PROGRAMS ──────────────────────────────────────────────────── */}
        <section className="a3-section a3-programs" id="programs">
          <div className="a3-container">
            <Reveal className="a3-center-heading">
              <span className="a3-kicker">Our programs</span>
              <h2>Building brighter tomorrows.</h2>
              <p>
                Each program lane is designed to help youth gain confidence, support,
                skills, and community connection.
              </p>
            </Reveal>
            <RevealList className="a3-program-grid">
              {tenantSite.programs.map(([title, text], index) => (
                <RevealItem key={title}>
                  <ProgramCard title={title} text={text} index={index} />
                </RevealItem>
              ))}
            </RevealList>
          </div>
        </section>

        {/* ── STORIES ───────────────────────────────────────────────────── */}
        <section className="a3-section a3-stories" id="stories">
          <div className="a3-container">
            <Reveal className="a3-center-heading">
              <span className="a3-kicker">Why it matters</span>
              <h2>Real community support has to be organized.</h2>
            </Reveal>
            <RevealList className="a3-story-grid">
              {storyCards.map(([title, text]) => (
                <RevealItem key={title}>
                  <div className="a3-story-card">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealList>
          </div>
        </section>

        {/* ── GET INVOLVED ──────────────────────────────────────────────── */}
        <section className="a3-section a3-involved" id="get-involved">
          <div className="a3-container a3-involved-grid">
            <div>
              <Reveal delay={0}><span className="a3-kicker">Get involved</span></Reveal>
              <Reveal delay={0.08}><h2>Be part of the movement.</h2></Reveal>
              <Reveal delay={0.14}>
                <p>
                  Whether you volunteer, donate, mentor, sponsor, or partner with us,
                  your support helps Asc3nd create pathways youth can actually use.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="a3-ein">
                  501(c)(3) nonprofit &middot; EIN: {tenantSite.ein}
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Asc3ndPublicForms />
            </Reveal>
          </div>
        </section>

        {/* ── AI-READABLE ───────────────────────────────────────────────── */}
        <section className="a3-section a3-ai-readable" id="contact">
          <div className="a3-container">
            <Reveal>
              <div className="a3-ai-card">
                <div>
                  <span className="a3-kicker">AI-readable nonprofit presence</span>
                  <h2>
                    Built for people first. Ready for modern search and AI agents.
                  </h2>
                  <p>
                    This frontend includes structured data, clear program pages, public
                    forms, and <code>llms.txt</code> so donors, grant reviewers, partners,
                    and AI assistants can understand what Asc3nd does and how to help.
                  </p>
                </div>
                <div className="a3-contact-links">
                  <a className="a3-button a3-button-outline" href="/llms.txt">
                    View llms.txt
                  </a>
                  <a className="a3-button a3-button-gold" href="/login">
                    Staff ops login
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="a3-footer">
        <div className="a3-container a3-footer-grid">
          <div>
            <img
              src="/images/asc3nd-logo.jpg"
              alt="Asc3nd Collective logo"
              loading="lazy"
            />
            <p>{tenantSite.tagline}</p>
            <small>&copy; 2026 {tenantSite.orgName}. All rights reserved.</small>
          </div>
          <div>
            <strong>Quick links</strong>
            <a href="#mission">Mission</a>
            <a href="#programs">Programs</a>
            <a href="#get-involved">Get involved</a>
          </div>
          <div>
            <strong>Community</strong>
            <a href="#volunteer">Volunteer</a>
            <a href={tenantSite.donationUrl}>Donate</a>
            <a href="#contact">Partner with us</a>
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Pillar({ title, text }) {
  return (
    <article className="a3-pillar">
      <span aria-hidden="true">&#9733;</span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </article>
  );
}

const programIcons = ['★', '★', '★', '★', '★'];

function ProgramCard({ title, text, index }) {
  return (
    <article className="a3-program-card">
      <div className="a3-program-media">
        <span aria-hidden="true">{programIcons[index] || '★'}</span>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
