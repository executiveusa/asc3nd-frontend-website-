import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const title = 'Community Cuts for Kids | Asc3nd Collective';
const description = 'Community Cuts for Kids is Asc3nd Collective’s back-to-school community event in Everett, Washington, with free haircuts for kids, school supplies, giveaways, food, and community connection.';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
};

export const viewport = {
  themeColor: '#0b0b0b',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
