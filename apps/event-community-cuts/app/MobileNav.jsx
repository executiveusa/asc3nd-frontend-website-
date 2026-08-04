'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Mobile navigation disclosure — wireframe §4.1
 *
 * - Native button with aria-expanded, aria-controls, accessible name
 * - Closed by default
 * - Escape closes; selection closes; focus returns to trigger
 * - No focus trap (disclosure menu, not modal)
 * - Visible only below 720px (CSS-controlled)
 * - Zero copy: uses the same labels passed from the locked content ledger
 */
export function MobileNav({ links, ctaLabel, ctaHref, languageLabel, languageHref }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="mobileNavToggle"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="Toggle navigation menu"
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'none', /* shown via CSS media query */
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '44px',
          minHeight: '44px',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '6px',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="mobileNavPanel"
          style={{
            position: 'absolute',
            top: '64px',
            left: 0,
            right: 0,
            background: '#050505',
            borderBottom: '1px solid rgba(255,255,255,0.16)',
            padding: '16px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 30,
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '17px',
                fontWeight: '700',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaHref}
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '52px',
              background: '#F5A617',
              color: '#050505',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '700',
              textDecoration: 'none',
            }}
          >
            {ctaLabel}
          </a>
          <a
            href={languageHref}
            onClick={() => setOpen(false)}
            style={{
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '700',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {languageLabel}
          </a>
        </div>
      )}
    </>
  );
}
