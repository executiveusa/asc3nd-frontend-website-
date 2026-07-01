'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tenantSite } from '../tenant.config';

export function PublicNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isSpanish = pathname.startsWith('/es');
  const currentLang = isSpanish ? 'es' : 'en';
  const targetLang = isSpanish ? 'en' : 'es';
  const targetPath = targetLang === 'es' ? `/es${pathname === '/' || pathname === '' ? '' : pathname.replace(/^\/es/, '')}` : pathname.replace(/^\/es/, '');

  return (
    <nav className="a3-nav" aria-label="Asc3nd Collective navigation">
      <div className="a3-container a3-nav-inner">
        {/* Logo mark */}
        <a className="a3-brand" href="#home" aria-label="Asc3nd Collective home">
          <div className="a3-logo-mark">
            <span className="a3-logo-main">ASC<span className="a3-logo-3">3</span>ND</span>
            <span className="a3-logo-sub">COLLECTIVE</span>
            <span className="a3-logo-tag">ELEVATE. EMPOWER. ASC3ND.</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="a3-nav-links" role="list">
          <a href="#home" className="a3-nav-link a3-nav-active" role="listitem">Home</a>
          <a href="#mission" className="a3-nav-link" role="listitem">About Us</a>
          <a href="#mission" className="a3-nav-link" role="listitem">Our Mission</a>
          <a href="#programs" className="a3-nav-link" role="listitem">Programs</a>
          <a href="#get-involved" className="a3-nav-link" role="listitem">Get Involved</a>
          <a href="#events" className="a3-nav-link" role="listitem">Events</a>
          <a href="#stories" className="a3-nav-link" role="listitem">Stories</a>
          <a href="#contact" className="a3-nav-link" role="listitem">Contact</a>
        </div>

        {/* Language toggle */}
        <Link
          href={targetPath || '/'}
          className="a3-lang-toggle"
          aria-label={`Switch to ${targetLang === 'es' ? 'Spanish' : 'English'}`}
        >
          <span aria-hidden="true">{currentLang === 'en' ? '🇺🇸' : '🇲🇽'}</span>
          <span>{currentLang === 'en' ? 'EN' : 'ES'}</span>
        </Link>

        {/* Donate CTA */}
        <a className="a3-btn-donate" href={tenantSite.donationUrl} id="nav-donate-btn">
          <span className="a3-heart">♥</span> {isSpanish ? 'DONAR' : 'DONATE'}
        </a>

        {/* Mobile hamburger */}
        <button
          className="a3-hamburger"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="a3-mobile-menu">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#mission" onClick={() => setMenuOpen(false)}>About Us</a>
          <a href="#mission" onClick={() => setMenuOpen(false)}>Our Mission</a>
          <a href="#programs" onClick={() => setMenuOpen(false)}>Programs</a>
          <a href="#get-involved" onClick={() => setMenuOpen(false)}>Get Involved</a>
          <a href="#events" onClick={() => setMenuOpen(false)}>Events</a>
          <a href="#stories" onClick={() => setMenuOpen(false)}>Stories</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <Link
            href={targetPath || '/'}
            className="a3-lang-toggle-mobile"
            onClick={() => setMenuOpen(false)}
          >
            🌐 {currentLang === 'en' ? 'EN' : 'ES'} → {targetLang === 'es' ? 'ES' : 'EN'}
          </Link>
          <a href={tenantSite.donationUrl} className="a3-mobile-donate">♥ {isSpanish ? 'DONAR' : 'DONATE'}</a>
        </div>
      )}
    </nav>
  );
}
