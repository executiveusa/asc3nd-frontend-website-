'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { tenantSite } from '../tenant.config';

const navLinks = [
  { label: 'Mission', href: '#mission' },
  { label: 'Programs', href: '#programs' },
  { label: 'Get involved', href: '#get-involved' },
  { label: 'Stories', href: '#stories' },
  { label: 'Contact', href: '#contact' },
];

export function PublicNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 24);
  });

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <motion.nav
        className="a3-nav"
        aria-label="Asc3nd public navigation"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        data-scrolled={scrolled ? 'true' : 'false'}
      >
        <div className="a3-container a3-nav-inner">
          <a className="a3-brand" href="#home" aria-label="Asc3nd Collective home">
            <img src="/images/asc3nd-logo.jpg" alt="Asc3nd Collective logo" />
            <span>
              <strong>ASC3ND</strong>
              <small>{tenantSite.tagline}</small>
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="a3-nav-links" role="list">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} role="listitem">
                {link.label}
              </a>
            ))}
          </div>

          <div className="a3-nav-end">
            <a className="a3-button a3-button-gold" href={tenantSite.donationUrl}>
              Donate
            </a>
            {/* Hamburger button — mobile only */}
            <button
              className="a3-hamburger"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className={`a3-ham-line ${menuOpen ? 'open' : ''}`} aria-hidden="true" />
              <span className={`a3-ham-line ${menuOpen ? 'open' : ''}`} aria-hidden="true" />
              <span className={`a3-ham-line ${menuOpen ? 'open' : ''}`} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="a3-mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={closeMenu}
              aria-hidden="true"
            />
            {/* Drawer panel */}
            <motion.div
              className="a3-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.34, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="a3-mobile-menu-header">
                <a className="a3-brand" href="#home" onClick={closeMenu} aria-label="Asc3nd home">
                  <img src="/images/asc3nd-logo.jpg" alt="Asc3nd Collective logo" />
                  <span>
                    <strong>ASC3ND</strong>
                    <small>{tenantSite.tagline}</small>
                  </span>
                </a>
                <button
                  className="a3-mobile-close"
                  aria-label="Close menu"
                  onClick={closeMenu}
                >
                  &#x2715;
                </button>
              </div>
              <nav aria-label="Mobile links">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="a3-mobile-link"
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.055, duration: 0.3 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <div className="a3-mobile-menu-cta">
                <a
                  className="a3-button a3-button-gold"
                  href={tenantSite.donationUrl}
                  onClick={closeMenu}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Donate today
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
