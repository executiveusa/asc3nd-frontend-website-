import { Inter } from 'next/font/google';
import './globals.css';
import './themes.css';

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

const themeInitScript = `
  try {
    const stored = localStorage.getItem('asc3nd-community-cuts-theme');
    const theme = stored === 'dark' || stored === 'light' ? stored : 'light';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (_) {
    document.documentElement.dataset.theme = 'light';
  }
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
