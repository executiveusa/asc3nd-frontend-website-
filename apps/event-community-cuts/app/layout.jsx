import { headers } from 'next/headers';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import './globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
  weight: ['500', '600', '700', '800', '900'],
});

const title = 'Community Cuts for Kids | Asc3nd Collective';
const description = 'Free back-to-school community event in Everett with haircuts for kids, school supplies, food, giveaways, and community connection.';

export const metadata = {
  metadataBase: new URL('https://asc3nd-frontend.vercel.app'),
  title,
  description,
  alternates: { canonical: '/', languages: { en: '/', es: '/es' } },
  openGraph: { title, description, type: 'website', url: '/' },
  twitter: { card: 'summary', title, description },
};

export const viewport = {
  themeColor: '#0b0b0b',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
};

export default async function RootLayout({ children }) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get('x-page-locale') === 'es' ? 'es' : 'en';
  return (
    <html lang={locale} className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
