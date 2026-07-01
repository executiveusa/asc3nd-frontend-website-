'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LOCALES = [
  { code: 'en', flag: '🇺🇸', label: 'EN' },
  { code: 'es', flag: '🇲🇽', label: 'ES' },
];

export function LanguageToggle() {
  const pathname = usePathname();

  // Determine target locale: if already on /es, switch to /; otherwise prepend /es
  const currentLocale = pathname.startsWith('/es') ? 'es' : 'en';
  const targetLocale = currentLocale === 'en' ? 'es' : 'en';
  const targetPath = targetLocale === 'es' ? `/es${pathname === '/' ? '' : pathname}` : pathname.replace(/^\/es/, '');

  const current = LOCALES.find((l) => l.code === currentLocale);
  const target = LOCALES.find((l) => l.code === targetLocale);

  return (
    <div className="a3-lang-toggle" role="navigation" aria-label="Language selection">
      <Link
        href={targetPath || '/'}
        locale={targetLocale}
        className="a3-lang-link"
        aria-label={`Switch to ${targetLocale === 'es' ? 'Spanish' : 'English'}`}
      >
        <span className="a3-lang-flag" aria-hidden="true">{current.flag}</span>
        <span className="a3-lang-label">{current.label}</span>
      </Link>
    </div>
  );
}
