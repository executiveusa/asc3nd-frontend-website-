import { Asc3ndPublicForms } from '../components/Asc3ndPublicForms';
import { PublicNav } from '../components/PublicNav';
import { tenantSite } from '../tenant.config';

const impactStats = [
  ['5', 'core program lanes'],
  ['4', 'community pillars'],
  ['100%', 'human-reviewed youth workflows']
];

const storyCards = [
  ['For youth', 'Confidence, mentorship, leadership, wellness, and academic support in one community-centered pathway.'],
  ['For families', 'A trusted team that communicates clearly, follows up, and helps young people access positive opportunities.'],
  ['For partners', 'A Seattle youth development nonprofit ready for schools, sponsors, volunteers, donors, and civic allies.']
];

export const metadata = {
  title: 'Asc3nd Collective | Seattle Youth Development Nonprofit',
  description: 'Asc3nd Collective empowers Seattle youth through education support, mentorship, leadership development, community engagement, and life skills wellness.',
  openGraph: {
    title: 'Asc3nd Collective',
    description: tenantSite.heroLead,
    images: ['/images/asc3nd-site-reference.jpg']
  }
};

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
      <main className="a3-page" id="home">
        <section className="a3-hero">
          <div className="a3-hero-bg" aria-hidden="true" />
          <div className="a3-container a3-hero-grid">
            <div className="a3-hero-copy">
              <span className="a3-kicker">{tenantSite.heroEyebrow}</span>
              <h1>
                Empowering <em>youth.</em><br />
                Elevating <em>futures.</em><br />
                Building <em>community.</em>
              </h1>
              <p>{tenantSite.heroLead}</p>
              <div className="a3-hero-actions">
                <a className="a3-button a3-button-gold" href={tenantSite.donationUrl}>Donate today</a>
                <a className="a3-button a3-button-outline" href="#volunteer">Volunteer with us</a>
              </div>
            </div>
            <div className="a3-hero-card" aria-label="Asc3nd Collective mission image">
              <img src="/images/asc3nd-site-reference.jpg" alt="Asc3nd Collective youth landing page reference" />
              <div className="a3-hero-card-caption">
                <strong>Seattle youth deserve real pathways.</strong>
                <span>Education. Mentorship. Leadership. Community.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="a3-pillar-strip" aria-label="Asc3nd mission pillars">
          <div className="a3-container a3-pillars">
            {tenantSite.pillars.map(([title, text]) => <Pillar key={title} title={title} text={text} />)}
          </div>
        </section>

        <section className="a3-section a3-mission" id="mission">
          <div className="a3-container a3-split">
            <div className="a3-image-panel">
              <img src="/images/asc3nd-logo.jpg" alt="Asc3nd Collective logo mark" />
            </div>
            <div className="a3-section-copy">
              <span className="a3-kicker">Who we are</span>
              <h2>We believe in the potential of every youth.</h2>
              <p>{tenantSite.mission}</p>
              <p>Asc3nd Collective is built for the practical work behind community change: showing up consistently, building trust, opening doors, and giving young people the support they need before opportunity passes them by.</p>
              <div className="a3-stat-row">
                {impactStats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="a3-section a3-programs" id="programs">
          <div className="a3-container">
            <div className="a3-center-heading">
              <span className="a3-kicker">Our programs</span>
              <h2>Building brighter tomorrows.</h2>
              <p>Each program lane is designed to help youth gain confidence, support, skills, and community connection.</p>
            </div>
            <div className="a3-program-grid">
              {tenantSite.programs.map(([title, text], index) => <ProgramCard key={title} title={title} text={text} index={index} />)}
            </div>
          </div>
        </section>

        <section className="a3-section a3-stories" id="stories">
          <div className="a3-container">
            <div className="a3-center-heading">
              <span className="a3-kicker">Why it matters</span>
              <h2>Real community support has to be organized.</h2>
            </div>
            <div className="a3-story-grid">
              {storyCards.map(([title, text]) => <div className="a3-story-card" key={title}><h3>{title}</h3><p>{text}</p></div>)}
            </div>
          </div>
        </section>

        <section className="a3-section a3-involved" id="get-involved">
          <div className="a3-container a3-involved-grid">
            <div>
              <span className="a3-kicker">Get involved</span>
              <h2>Be part of the movement.</h2>
              <p>Whether you volunteer, donate, mentor, sponsor, or partner with us, your support helps Asc3nd create pathways youth can actually use.</p>
              <div className="a3-ein">501(c)(3) nonprofit · EIN: {tenantSite.ein}</div>
            </div>
            <Asc3ndPublicForms />
          </div>
        </section>

        <section className="a3-section a3-ai-readable" id="contact">
          <div className="a3-container a3-ai-card">
            <div>
              <span className="a3-kicker">AI-readable nonprofit presence</span>
              <h2>Built for people first. Ready for modern search and AI agents.</h2>
              <p>This frontend includes structured data, clear program pages, public forms, and `llms.txt` so donors, grant reviewers, partners, and AI assistants can understand what Asc3nd does and how to help.</p>
            </div>
            <div className="a3-contact-links">
              <a className="a3-button a3-button-outline" href="/llms.txt">View llms.txt</a>
              <a className="a3-button a3-button-gold" href="/login">Staff ops login</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="a3-footer">
        <div className="a3-container a3-footer-grid">
          <div>
            <img src="/images/asc3nd-logo.jpg" alt="Asc3nd Collective logo" />
            <p>{tenantSite.tagline}</p>
            <small>© 2026 {tenantSite.orgName}. All rights reserved.</small>
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

function Pillar({ title, text }) {
  return <article className="a3-pillar"><span aria-hidden="true">★</span><div><strong>{title}</strong><p>{text}</p></div></article>;
}

function ProgramCard({ title, text, index }) {
  const icons = ['📘', '🤝', '💡', '🫶', '⭐'];
  return <article className="a3-program-card"><div className="a3-program-media"><span>{icons[index] || '★'}</span></div><h3>{title}</h3><p>{text}</p></article>;
}
