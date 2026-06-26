import { tenantSite } from '../tenant.config';

export function PublicNav() {
  return (
    <nav className="a3-nav" aria-label="Asc3nd public navigation">
      <div className="a3-container a3-nav-inner">
        <a className="a3-brand" href="#home" aria-label="Asc3nd Collective home">
          <img src="/images/asc3nd-logo.jpg" alt="Asc3nd Collective logo" />
          <span>
            <strong>ASC3ND</strong>
            <small>{tenantSite.tagline}</small>
          </span>
        </a>
        <div className="a3-nav-links">
          <a href="#mission">Mission</a>
          <a href="#programs">Programs</a>
          <a href="#get-involved">Get involved</a>
          <a href="#stories">Stories</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="a3-button a3-button-gold" href={tenantSite.donationUrl}>Donate</a>
      </div>
    </nav>
  );
}
