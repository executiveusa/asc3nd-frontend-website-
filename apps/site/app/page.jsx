import { tenantSite } from '../tenant.config';
import { PublicNav } from '../components/PublicNav';

export const metadata = {
  title: 'Asc3nd Collective | Elevate. Empower. Asc3nd.',
  description: 'Asc3nd Collective is a youth development nonprofit dedicated to empowering young people through mentorship, education, leadership development, and community engagement.',
  openGraph: {
    title: 'Asc3nd Collective',
    description: tenantSite.heroLead,
    images: ['/images/asc3nd-site-reference.jpg']
  }
};

const pillars = [
  { icon: '👥', title: 'YOUTH FOCUSED',       text: 'Building confidence, leadership and life skills.' },
  { icon: '🎓', title: 'FUTURE DRIVEN',        text: 'Providing education, mentorship and real-world opportunities.' },
  { icon: '❤️', title: 'COMMUNITY BUILT',      text: 'Strengthening families and creating lasting impact.' },
  { icon: '📈', title: 'TOGETHER WE ASC3ND',   text: 'Uniting our community to elevate every generation.' }
];

const programs = [
  { title: 'EDUCATION SUPPORT',      text: 'Tutoring, homework help, and academic resources to help youth succeed.',                           icon: '📚' },
  { title: 'MENTORSHIP',             text: 'One-on-one mentorship that builds confidence, character and leadership.',                           icon: '🤝' },
  { title: 'LEADERSHIP DEVELOPMENT', text: 'Equipping youth with the skills to lead, inspire and create change.',                               icon: '💡' },
  { title: 'COMMUNITY ENGAGEMENT',   text: 'Service projects and community initiatives that create impact and build unity.',                     icon: '🫶' },
  { title: 'LIFE SKILLS & WELLNESS', text: 'Workshops and resources that support mental health, wellness and resilience.',                      icon: '⭐' }
];

export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: tenantSite.orgName,
    slogan: tenantSite.tagline,
    areaServed: tenantSite.region,
    taxID: tenantSite.ein,
    description: tenantSite.heroLead,
    url: process.env.PUBLIC_SITE_URL || 'http://localhost:3000',
    knowsAbout: ['youth mentorship', 'education support', 'leadership development', 'community engagement', 'life skills', 'wellness']
  };

  return (
    <>
      <PublicNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main id="home">

        {/* ── HERO ── */}
        <section className="hp-hero" aria-label="Asc3nd Collective hero">
          <div className="hp-hero-overlay" aria-hidden="true" />
          <div className="hp-container hp-hero-content">
            <div className="hp-hero-copy">
              <h1>
                EMPOWERING <em>YOUTH.</em>
                ELEVATING <em>FUTURES.</em>
                BUILDING <em>COMMUNITY.</em>
              </h1>
              <p>We equip youth with the tools, opportunities, and support they need to rise, lead, and create the future they deserve.</p>
              <div className="hp-hero-ctas">
                <a href={tenantSite.donationUrl} className="hp-btn-gold" id="hero-donate-btn">
                  <span aria-hidden="true">♥</span> DONATE TODAY
                </a>
                <a href="#get-involved" className="hp-btn-outline" id="hero-volunteer-btn">
                  <span aria-hidden="true">👥</span> VOLUNTEER WITH US
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── PILLARS STRIP ── */}
        <section className="hp-pillars-strip" aria-label="Core pillars">
          <div className="hp-container hp-pillars-grid">
            {pillars.map((p) => (
              <article className="hp-pillar" key={p.title}>
                <div className="hp-pillar-icon" aria-hidden="true">{p.icon}</div>
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── WHO WE ARE ── */}
        <section className="hp-section hp-who" id="mission" aria-labelledby="who-heading">
          <div className="hp-container hp-split">
            <div className="hp-who-image">
              <img
                src="/images/asc3nd-site-reference.jpg"
                alt="Asc3nd Collective youth working together — Leaders Create, Dream Plan ASC3ND"
                loading="lazy"
              />
            </div>
            <div className="hp-who-copy">
              <span className="hp-eyebrow">WHO WE ARE</span>
              <h2 id="who-heading">
                WE BELIEVE IN THE
                <em>POTENTIAL OF EVERY YOUTH.</em>
              </h2>
              <p>
                Asc3nd Collective is a youth development nonprofit dedicated to empowering young people
                through mentorship, education, leadership development, and community engagement. We meet
                youth where they are and walk beside them as they ASC3ND to their highest potential.
              </p>
              <a href="#mission" className="hp-btn-dark" id="learn-more-btn">
                LEARN MORE ABOUT US →
              </a>
            </div>
          </div>
        </section>

        {/* ── PROGRAMS ── */}
        <section className="hp-section hp-programs" id="programs" aria-labelledby="programs-heading">
          <div className="hp-container">
            <div className="hp-center-head">
              <span className="hp-eyebrow hp-eyebrow-gold">OUR PROGRAMS</span>
              <h2 id="programs-heading">BUILDING BRIGHTER TOMORROWS</h2>
            </div>
            <div className="hp-program-grid">
              {programs.map((card, i) => (
                <article className="hp-program-card" key={card.title}>
                  <div className="hp-program-img" style={{ backgroundPositionY: `${15 + i * 17}%` }}>
                    <div className="hp-program-icon-wrap">
                      <span className="hp-program-icon" aria-hidden="true">{card.icon}</span>
                    </div>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── GET INVOLVED CTA BAND ── */}
        <section className="hp-cta-band" id="get-involved" aria-labelledby="cta-heading">
          <div className="hp-container hp-cta-inner">
            <div className="hp-cta-copy">
              <span className="hp-eyebrow hp-eyebrow-gold">GET INVOLVED</span>
              <h2 id="cta-heading">BE PART OF THE MOVEMENT.</h2>
              <p>
                Whether you volunteer, donate, mentor or partner with us—your support helps us empower
                youth and transform communities.
              </p>
            </div>
            <div className="hp-cta-buttons">
              <a href={tenantSite.donationUrl} className="hp-cta-btn-gold" id="cta-donate-btn">
                <span aria-hidden="true">♥</span> DONATE
              </a>
              <a href="#volunteer" className="hp-cta-btn-outline" id="cta-volunteer-btn">
                <span aria-hidden="true">👥</span> VOLUNTEER
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="hp-footer" id="contact" aria-label="Site footer">
        <div className="hp-container hp-footer-grid">

          {/* Brand */}
          <div className="hp-footer-brand">
            <div className="hp-footer-logo">
              <span className="hp-footer-logo-main">ASC<span className="hp-logo-3">3</span>ND</span>
              <span className="hp-footer-logo-sub">COLLECTIVE</span>
              <span className="hp-footer-logo-tag">ELEVATE. EMPOWER. ASC3ND.</span>
            </div>
            <p>A 501(c)(3) nonprofit organization empowering youth, elevating futures, and building community.</p>
            <p className="hp-ein"><strong>EIN: {tenantSite.ein}</strong></p>
          </div>

          {/* Quick links */}
          <div className="hp-footer-col">
            <strong>QUICK LINKS</strong>
            <a href="#mission">About Us</a>
            <a href="#mission">Our Mission</a>
            <a href="#programs">Programs</a>
            <a href="#get-involved">Get Involved</a>
            <a href="#events">Events</a>
            <a href="#stories">Stories</a>
            <a href="#contact">Contact</a>
          </div>

          {/* Social */}
          <div className="hp-footer-col" id="stories">
            <strong>STAY CONNECTED</strong>
            <div className="hp-social-row" aria-label="Social media links">
              <a href="https://instagram.com/asc3ndcollective" aria-label="Instagram" className="hp-social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://facebook.com/asc3ndcollective" aria-label="Facebook" className="hp-social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://youtube.com/@asc3ndcollective" aria-label="YouTube" className="hp-social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
              </a>
              <a href="https://tiktok.com/@asc3ndcollective" aria-label="TikTok" className="hp-social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a href="https://linkedin.com/company/asc3nd-collective" aria-label="LinkedIn" className="hp-social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Subscribe */}
          <div className="hp-footer-col">
            <strong>JOIN OUR COMMUNITY</strong>
            <p>Subscribe to our newsletter for updates, events and ways to get involved.</p>
            <form className="hp-subscribe-form" onSubmit={(e) => e.preventDefault()} aria-label="Newsletter subscribe">
              <div className="hp-subscribe-row">
                <input type="email" placeholder="Enter your email" aria-label="Email address" id="footer-email-input" required />
                <button type="submit" id="footer-subscribe-btn">SUBSCRIBE</button>
              </div>
            </form>
          </div>

        </div>

        <div className="hp-footer-bottom">
          <div className="hp-container hp-footer-bottom-inner">
            <span>© 2024 Asc3nd Collective. All Rights Reserved.</span>
            <div className="hp-footer-legal">
              <a href="/privacy">Privacy Policy</a>
              <span aria-hidden="true">|</span>
              <a href="/terms">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
