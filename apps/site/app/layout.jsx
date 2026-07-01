import { Inter } from 'next/font/google';
import './globals.css';
import RootLayoutClient from './layout-client';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Asc3nd Collective | Seattle Youth Development Nonprofit',
  description:
    'Asc3nd Collective empowers Seattle youth through mentorship, education support, leadership development, community engagement, and life skills wellness.',
  metadataBase: new URL(process.env.PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Asc3nd Collective | Seattle Youth Development Nonprofit',
    description:
      'Asc3nd Collective empowers Seattle youth through mentorship, education support, leadership development, community engagement, and life skills wellness.',
    images: ['/images/asc3nd-site-reference.jpg'],
  },
};

export const viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} bg-[#030303]`}>
      <head />
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
